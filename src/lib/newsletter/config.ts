/**
 * Newsletter launch control. Server only: it reads secrets, so never import it from a client component.
 *
 * NEWSLETTER_MODE
 *   off      Default (also when unset or misspelled). No form anywhere, /updates, /updates/* and /privacy answer 404,
 *            and every /api/newsletter route answers 404 except the daily clean-up.
 *   preview  Only on `next dev` and on Vercel Preview deployments; on the production deployment it counts as off.
 *            No email is sent: the confirmation email is shown on screen instead, with its link pointing at the
 *            deployment being tested. Data goes to DATABASE_URL when that is set for the environment (a Neon
 *            branch, never the production database), otherwise to a throwaway in-memory store.
 *   live     Real database, real confirmation emails. Must be set explicitly and needs every variable below;
 *            if one is missing the form stays hidden and the API refuses requests.
 *
 * Other variables (names only; values live in Vercel → Settings → Environment Variables):
 *   NEWSLETTER_SECRET    32+ random characters. Signs unsubscribe links and keys the rate-limit counters.
 *                        Changing it breaks unsubscribe links already sent, so set it once.
 *   DATABASE_URL         Neon connection string (live; optional in preview).
 *   SITE_URL             Base of every link in emails, e.g. https://amdnsri.com (live; never a vercel.app address).
 *   RESEND_API_KEY       Shared with the contact form (live).
 *   CONTACT_FROM_EMAIL   Sender, shared with the contact form (live). No fallback sender here.
 *   NEWSLETTER_REPLY_TO  Reply-To of the confirmation email; falls back to CONTACT_TO_EMAIL, else none.
 *   CRON_SECRET          Lets Vercel's daily cron call /api/newsletter/cleanup (live), which deletes expired sign-ups.
 *   NEWSLETTER_PREVIEW_CONFIRM_TTL_MINUTES  Preview only: a short link lifetime to test an expired link.
 */
export type NewsletterMode = 'off' | 'preview' | 'live';

const DAY_MS = 24 * 60 * 60 * 1000;
/** Unconfirmed sign-ups (and their links) expire after 7 days; the daily clean-up then deletes them. */
export const CONFIRM_TTL_MS = 7 * DAY_MS;

const env = (name: string) => process.env[name]?.trim() || '';

export function newsletterMode(): NewsletterMode {
  const raw = env('NEWSLETTER_MODE').toLowerCase();
  if (raw === 'live') return 'live';
  if (raw === 'preview') {
    // preview can never be active on the production site, whatever the variable says
    if (process.env.VERCEL_ENV === 'production') return 'off';
    if (process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development') return 'preview';
  }
  return 'off';
}

export interface NewsletterConfig {
  mode: NewsletterMode;
  secret: string;
  databaseUrl: string;
  /** Live: SITE_URL without a trailing slash. Preview: empty, links use the deployment's own address. */
  siteUrl: string;
  resendKey: string;
  from: string;
  replyTo: string;
  confirmTtlMs: number;
  /** Names of missing or invalid variables. The feature stays off while this is not empty. */
  problems: string[];
}

export function newsletterConfig(): NewsletterConfig {
  const mode = newsletterMode();
  const problems: string[] = [];
  const secret = env('NEWSLETTER_SECRET');
  const databaseUrl = env('DATABASE_URL');
  let siteUrl = env('SITE_URL').replace(/\/+$/, '');
  const resendKey = env('RESEND_API_KEY');
  const from = env('CONTACT_FROM_EMAIL');
  const replyTo = env('NEWSLETTER_REPLY_TO') || env('CONTACT_TO_EMAIL');
  let confirmTtlMs = CONFIRM_TTL_MS;

  if (mode !== 'off' && secret.length < 32) problems.push('NEWSLETTER_SECRET (32+ characters)');
  if (mode === 'live') {
    if (!databaseUrl) problems.push('DATABASE_URL');
    if (!resendKey) problems.push('RESEND_API_KEY');
    if (!from) problems.push('CONTACT_FROM_EMAIL');
    // without it the daily clean-up is refused and expired sign-ups would never be deleted
    if (!env('CRON_SECRET')) problems.push('CRON_SECRET');
    let host = '';
    try { const u = new URL(siteUrl); if (u.protocol === 'https:') host = u.hostname; } catch { /* reported below */ }
    if (!host || host.endsWith('.vercel.app')) problems.push('SITE_URL (https://, not a vercel.app address)');
  } else {
    siteUrl = '';
  }
  if (mode === 'preview') {
    const minutes = Number(env('NEWSLETTER_PREVIEW_CONFIRM_TTL_MINUTES'));
    if (Number.isFinite(minutes) && minutes > 0) confirmTtlMs = Math.min(minutes * 60 * 1000, CONFIRM_TTL_MS);
  }
  return { mode, secret, databaseUrl, siteUrl, resendKey, from, replyTo, confirmTtlMs, problems };
}

let warned = false;

/** Whether the form is shown and the API answers: a mode other than off, with nothing missing. */
export function newsletterEnabled(): boolean {
  const { mode, problems } = newsletterConfig();
  if (mode === 'off') return false;
  if (problems.length) {
    if (!warned) console.error(`[newsletter] mode ${mode} but not configured, kept off. Missing or invalid: ${problems.join(', ')}`);
    warned = true;
    return false;
  }
  return true;
}

/**
 * Unsubscribing keeps working after NEWSLETTER_MODE goes back to off, as long as a database and the secret are
 * configured: anyone who has received an email must always be able to leave.
 */
export function newsletterUnsubscribeAvailable(): boolean {
  const { databaseUrl, secret } = newsletterConfig();
  return newsletterEnabled() || (!!databaseUrl && secret.length >= 32);
}
