import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { Resend } from 'resend';
import type { Lang } from '@/lib/translations';
import { newsletterConfig, newsletterEnabled, newsletterUnsubscribeAvailable, type NewsletterConfig } from './config';
import { CONSENT_VERSION } from './consent';
import { confirmationEmail } from './emails';
import type { NewsletterStore } from './store';
import { memoryStore } from './store-memory';
import { postgresStore, type Query } from './store-postgres';
import { newToken, rateLimitKey, sha256, UUID_RE, validUnsubscribeSignature } from './tokens';
import { unsubscribeUrl } from './unsubscribe';

/*
 * Request handling behind /api/newsletter/*. Logs carry event names only: never an email address, a name, an IP
 * address or a token.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL = 254;
const MAX_NAME = 100;
/** A person needs a few seconds to fill the form; anything faster is a script. */
const MIN_FILL_MS = 2500;
const IP_LIMIT = { max: 5, windowSeconds: 60 * 60 };
const EMAIL_LIMIT = { max: 3, windowSeconds: 24 * 60 * 60 };
const LANGS: Lang[] = ['EN', 'TR', 'AR'];
/** ?from= values the standalone tool pages send, recorded as the source page. */
const TOOL_SOURCES: Record<string, string> = {
  nestri: '/nestri.html', 'nestri-pro': '/nestri-pro.html', ipunch: '/ipunch.html',
  'expanded-mesh-generator': '/expanded-mesh-generator.html',
};

const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
/** The answer to every accepted sign-up, whether the address is new, pending, confirmed or unsubscribed. */
const accepted = () => json({ ok: true });
const notFound = () => json({ error: 'not_found' }, 404);

const stores = new Map<string, NewsletterStore>();

/** Postgres when a database is configured; in preview without one, the throwaway in-memory store. */
function storeFor(cfg: NewsletterConfig): NewsletterStore {
  const key = cfg.databaseUrl || 'memory';
  let store = stores.get(key);
  if (!store) {
    if (cfg.databaseUrl) {
      const sql = neon(cfg.databaseUrl);
      store = postgresStore(((text, params) => sql.query(text, params ?? [])) as Query);
    } else {
      store = memoryStore();
    }
    stores.set(key, store);
  }
  return store;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}

/** The path the form was on, without query string or fragment; a tool page when it came from one. */
function sourcePath(path: unknown, from: unknown): string {
  if (typeof from === 'string' && TOOL_SOURCES[from]) return TOOL_SOURCES[from];
  if (typeof path !== 'string' || !path.startsWith('/')) return '/';
  const clean = path.split(/[?#]/)[0];
  return /^\/[A-Za-z0-9/_.-]{0,199}$/.test(clean) ? clean : '/';
}

/** Links in a live email use SITE_URL; in preview nothing is sent, so they point at the deployment being tested. */
const baseUrl = (cfg: NewsletterConfig, req: Request) => cfg.siteUrl || new URL(req.url).origin;

export async function subscribe(req: Request) {
  if (!newsletterEnabled()) return notFound();
  const cfg = newsletterConfig();

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'invalid' }, 400);
  }

  // Bots get the normal answer so they have no reason to retry; nothing is stored or sent.
  if (typeof body.website === 'string' && body.website.trim()) {
    console.warn('[newsletter] sign-up dropped: honeypot filled');
    return accepted();
  }
  if (typeof body.elapsed !== 'number' || body.elapsed < MIN_FILL_MS) {
    console.warn('[newsletter] sign-up dropped: form sent too fast');
    return accepted();
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!email || email.length > MAX_EMAIL || !EMAIL_RE.test(email)) return json({ error: 'email' }, 400);
  const rawName = typeof body.name === 'string' ? body.name.replace(/[\u0000-\u001f\u007f]/g, ' ').replace(/\s+/g, ' ').trim() : '';
  if (rawName.length > MAX_NAME) return json({ error: 'name' }, 400);
  // the consent box must be ticked: checked again here, whatever the page sent
  if (body.consent !== true) return json({ error: 'consent' }, 400);
  const lang = LANGS.includes(body.lang as Lang) ? (body.lang as Lang) : 'EN';

  const store = storeFor(cfg);
  try {
    if ((await store.hit(rateLimitKey(cfg.secret, 'ip', clientIp(req)), IP_LIMIT.windowSeconds)) > IP_LIMIT.max) {
      console.warn('[newsletter] sign-up refused: rate limit per IP');
      return json({ error: 'rate' }, 429);
    }
    // per address: silent, so the answer never tells anyone whether an address was tried before
    if ((await store.hit(rateLimitKey(cfg.secret, 'email', email), EMAIL_LIMIT.windowSeconds)) > EMAIL_LIMIT.max) {
      console.warn('[newsletter] sign-up not sent: rate limit per address');
      return accepted();
    }

    const token = newToken();
    const started = await store.beginSubscription({
      email,
      name: rawName || null,
      lang,
      source: sourcePath(body.path, body.from),
      consentVersion: CONSENT_VERSION,
      tokenHash: sha256(token),
      expiresAt: new Date(Date.now() + cfg.confirmTtlMs),
    });

    if (!started) {
      // already confirmed: no email, same answer
      return cfg.mode === 'preview' ? json({ ok: true, preview: { note: 'already_confirmed' } }) : accepted();
    }

    const confirmUrl = `${baseUrl(cfg, req)}/updates/confirm?token=${token}&lang=${lang.toLowerCase()}`;
    const mail = confirmationEmail(lang, confirmUrl, cfg.confirmTtlMs);

    if (cfg.mode === 'preview') {
      // preview: the email is shown instead of sent
      return json({ ok: true, preview: { subject: mail.subject, text: mail.text, confirmUrl } });
    }

    const { error } = await new Resend(cfg.resendKey).emails.send({
      from: cfg.from,
      to: email,
      ...(cfg.replyTo ? { replyTo: cfg.replyTo } : {}),
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    if (error) {
      console.error(`[newsletter] confirmation email not sent: Resend ${error.name ?? 'error'} (${error.statusCode ?? '?'})`);
      return json({ error: 'generic' }, 502);
    }
    return accepted();
  } catch (err) {
    console.error('[newsletter] sign-up failed:', err instanceof Error ? err.name : 'error');
    return json({ error: 'generic' }, 500);
  }
}

export async function confirm(req: Request) {
  if (!newsletterEnabled()) return notFound();
  const cfg = newsletterConfig();
  let token = '';
  try {
    const body = await req.json();
    token = typeof body.token === 'string' ? body.token : '';
  } catch { /* invalid below */ }
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(token)) return json({ status: 'invalid' }, 400);

  try {
    const result = await storeFor(cfg).confirm(sha256(token));
    if (result.status !== 'confirmed') return json({ status: result.status });
    // preview: hand back the unsubscribe link a newsletter would carry, so the whole flow can be tried
    return cfg.mode === 'preview'
      ? json({ status: 'confirmed', preview: { unsubscribeUrl: unsubscribeUrl(baseUrl(cfg, req), cfg.secret, result.id, result.lang) } })
      : json({ status: 'confirmed' });
  } catch (err) {
    console.error('[newsletter] confirm failed:', err instanceof Error ? err.name : 'error');
    return json({ status: 'error' }, 500);
  }
}

export async function unsubscribe(req: Request) {
  if (!newsletterUnsubscribeAvailable()) return notFound();
  const cfg = newsletterConfig();
  // id and sig come in the query string: from our page, and from mail apps' one-click POST (RFC 8058)
  const params = new URL(req.url).searchParams;
  const id = params.get('id') ?? '';
  const sig = params.get('sig') ?? '';
  if (!UUID_RE.test(id) || !validUnsubscribeSignature(cfg.secret, id, sig)) return json({ status: 'invalid' }, 400);
  try {
    await storeFor(cfg).unsubscribe(id);
    return json({ status: 'unsubscribed' });
  } catch (err) {
    console.error('[newsletter] unsubscribe failed:', err instanceof Error ? err.name : 'error');
    return json({ status: 'error' }, 500);
  }
}

export function status() {
  return newsletterEnabled() ? json({ enabled: true }) : notFound();
}

/** Daily (vercel.json cron): deletes expired unconfirmed sign-ups and old rate-limit counters. */
export async function cleanup(req: Request) {
  const cfg = newsletterConfig();
  if (!cfg.databaseUrl) return json({ skipped: 'no database' });
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!cronSecret || req.headers.get('authorization') !== `Bearer ${cronSecret}`) return json({ error: 'unauthorized' }, 401);
  try {
    const result = await storeFor(cfg).cleanup();
    console.log(`[newsletter] clean-up: ${result.expiredSignups} expired sign-ups, ${result.rateCounters} rate counters deleted`);
    return json(result);
  } catch (err) {
    console.error('[newsletter] clean-up failed:', err instanceof Error ? err.name : 'error');
    return json({ error: 'failed' }, 500);
  }
}
