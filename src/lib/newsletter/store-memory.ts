import { randomUUID } from 'crypto';
import type { Lang } from '@/lib/translations';
import type { ConfirmResult, NewsletterStore, SubscriptionInput } from './store';
import { sha256 } from './tokens';

/**
 * Throwaway store for preview mode without a database: everything lives in this server instance's memory and
 * is gone when it restarts. Never used in live mode. It follows the same rules as store-postgres.ts.
 */
interface Row {
  id: string; email: string; name: string | null; status: 'pending' | 'confirmed' | 'unsubscribed';
  lang: Lang; source: string; consentVersion: string; consentAt: Date;
  tokenHash: string | null; expiresAt: Date | null; confirmedAt: Date | null; unsubscribedAt: Date | null;
}

const g = globalThis as unknown as { __newsletterMemory?: { rows: Map<string, Row>; suppressed: Set<string>; hits: Map<string, { start: number; hits: number }> } };
const db = (g.__newsletterMemory ??= { rows: new Map(), suppressed: new Set(), hits: new Map() });

export function memoryStore(): NewsletterStore {
  return {
    async beginSubscription(i: SubscriptionInput) {
      const row = db.rows.get(i.email);
      if (row?.status === 'confirmed') return null;
      const next: Row = {
        id: row?.id ?? randomUUID(), email: i.email, name: i.name, status: 'pending', lang: i.lang, source: i.source,
        consentVersion: i.consentVersion, consentAt: new Date(), tokenHash: i.tokenHash, expiresAt: i.expiresAt,
        confirmedAt: row?.confirmedAt ?? null, unsubscribedAt: row?.unsubscribedAt ?? null,
      };
      db.rows.set(i.email, next);
      return { id: next.id };
    },

    async confirm(tokenHash: string): Promise<ConfirmResult> {
      const row = Array.from(db.rows.values()).find((r) => r.tokenHash === tokenHash);
      if (!row) return { status: 'invalid' };
      if (row.status !== 'pending' || !row.expiresAt || row.expiresAt.getTime() <= Date.now()) return { status: 'expired' };
      Object.assign(row, { status: 'confirmed', confirmedAt: new Date(), unsubscribedAt: null, tokenHash: null, expiresAt: null });
      db.suppressed.delete(sha256(row.email));
      return { status: 'confirmed', id: row.id, lang: row.lang };
    },

    async unsubscribe(id: string) {
      const row = Array.from(db.rows.values()).find((r) => r.id === id);
      if (!row || row.status !== 'confirmed') return;
      Object.assign(row, { status: 'unsubscribed', unsubscribedAt: new Date(), tokenHash: null, expiresAt: null });
      db.suppressed.add(sha256(row.email));
    },

    async hit(key: string, windowSeconds: number) {
      const now = Date.now(), cur = db.hits.get(key);
      const next = cur && now - cur.start < windowSeconds * 1000 ? { start: cur.start, hits: cur.hits + 1 } : { start: now, hits: 1 };
      db.hits.set(key, next);
      return next.hits;
    },

    async cleanup() {
      let expiredSignups = 0;
      db.rows.forEach((r, email) => {
        if (r.status === 'pending' && r.expiresAt && r.expiresAt.getTime() < Date.now()) { db.rows.delete(email); expiredSignups++; }
      });
      return { expiredSignups, rateCounters: 0 };
    },
  };
}
