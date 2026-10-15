import type { Lang } from '@/lib/translations';
import type { ConfirmResult, NewsletterStore, SubscriptionInput } from './store';
import { sha256 } from './tokens';

/** Runs one parameterised SQL statement and returns its rows (the Neon driver's `sql.query`). */
export type Query = (text: string, params?: unknown[]) => Promise<Record<string, unknown>[]>;

/**
 * The tables, created on first use. Only what the sign-up needs: no IP address, no user agent.
 * iys_status tracks Turkey's IYS separately from email confirmation; nothing here ever sets it to 'synced'.
 */
const SCHEMA = [
  `create table if not exists newsletter_subscribers (
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    name text,
    status text not null check (status in ('pending', 'confirmed', 'unsubscribed')),
    consent_at timestamptz not null,
    consent_version text not null,
    consent_lang text not null check (consent_lang in ('EN', 'TR', 'AR')),
    source_path text not null,
    confirm_token_hash text unique,
    confirm_expires_at timestamptz,
    confirmed_at timestamptz,
    unsubscribed_at timestamptz,
    iys_status text not null default 'not_synced' check (iys_status in ('not_synced', 'synced', 'rejected')),
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )`,
  `create table if not exists newsletter_suppressions (
    email_sha256 text primary key,
    suppressed_at timestamptz not null default now()
  )`,
  `create table if not exists newsletter_rate_limits (
    key text primary key,
    window_start timestamptz not null,
    hits integer not null
  )`,
];

export function postgresStore(query: Query): NewsletterStore {
  let ready: Promise<void> | null = null;
  const q: Query = async (text, params) => {
    ready ??= (async () => { for (const s of SCHEMA) await query(s); })().catch((err) => { ready = null; throw err; });
    await ready;
    return query(text, params);
  };

  return {
    async beginSubscription(i: SubscriptionInput) {
      // an already confirmed address is left untouched (the WHERE skips the update and nothing is returned)
      const rows = await q(
        `insert into newsletter_subscribers as s
           (email, name, status, consent_at, consent_version, consent_lang, source_path, confirm_token_hash, confirm_expires_at)
         values ($1, $2, 'pending', now(), $3, $4, $5, $6, $7)
         on conflict (email) do update set
           name = excluded.name, status = 'pending', consent_at = excluded.consent_at,
           consent_version = excluded.consent_version, consent_lang = excluded.consent_lang,
           source_path = excluded.source_path, confirm_token_hash = excluded.confirm_token_hash,
           confirm_expires_at = excluded.confirm_expires_at, updated_at = now()
         where s.status <> 'confirmed'
         returning id`,
        [i.email, i.name, i.consentVersion, i.lang, i.source, i.tokenHash, i.expiresAt.toISOString()],
      );
      return rows[0] ? { id: String(rows[0].id) } : null;
    },

    async confirm(tokenHash: string): Promise<ConfirmResult> {
      const rows = await q(
        `update newsletter_subscribers set
           status = 'confirmed', confirmed_at = now(), unsubscribed_at = null,
           confirm_token_hash = null, confirm_expires_at = null, updated_at = now()
         where confirm_token_hash = $1 and status = 'pending' and confirm_expires_at > now()
         returning id, email, consent_lang`,
        [tokenHash],
      );
      if (rows[0]) {
        // a fresh confirmation lifts an earlier suppression of this address
        await q(`delete from newsletter_suppressions where email_sha256 = $1`, [sha256(String(rows[0].email))]);
        return { status: 'confirmed', id: String(rows[0].id), lang: rows[0].consent_lang as Lang };
      }
      const known = await q(`select 1 from newsletter_subscribers where confirm_token_hash = $1`, [tokenHash]);
      return { status: known.length ? 'expired' : 'invalid' };
    },

    async unsubscribe(id: string) {
      const rows = await q(
        `update newsletter_subscribers set
           status = 'unsubscribed', unsubscribed_at = now(),
           confirm_token_hash = null, confirm_expires_at = null, updated_at = now()
         where id = $1 and status = 'confirmed'
         returning email`,
        [id],
      );
      if (rows[0]) {
        await q(`insert into newsletter_suppressions (email_sha256) values ($1) on conflict do nothing`, [sha256(String(rows[0].email))]);
      }
    },

    async hit(key: string, windowSeconds: number) {
      const rows = await q(
        `insert into newsletter_rate_limits as r (key, window_start, hits) values ($1, now(), 1)
         on conflict (key) do update set
           hits = case when r.window_start <= now() - $2::int * interval '1 second' then 1 else r.hits + 1 end,
           window_start = case when r.window_start <= now() - $2::int * interval '1 second' then now() else r.window_start end
         returning hits`,
        [key, windowSeconds],
      );
      return Number(rows[0].hits);
    },

    async cleanup() {
      const a = await q(
        `with d as (delete from newsletter_subscribers where status = 'pending' and confirm_expires_at < now() returning 1)
         select count(*)::int as n from d`,
      );
      const b = await q(
        `with d as (delete from newsletter_rate_limits where window_start < now() - interval '2 days' returning 1)
         select count(*)::int as n from d`,
      );
      return { expiredSignups: Number(a[0].n), rateCounters: Number(b[0].n) };
    },
  };
}
