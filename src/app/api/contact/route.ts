import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * POST /api/contact
 * Sends the contact-form submission to the studio inbox via Resend.
 *
 * Environment variables (read on every request, see readConfig below):
 *   RESEND_API_KEY      — required. Without it nothing is sent; the visitor sees the generic error.
 *   CONTACT_TO_EMAIL    — where messages arrive          (default: ahmed@amdnsri.com)
 *   CONTACT_FROM_EMAIL  — sender, e.g. "AMD NSRI <contact@amdnsri.com>"
 *                         (default: "AMD NSRI <onboarding@resend.dev>", Resend's shared test sender)
 *
 * Until a domain is verified in Resend, keep the default sender: it only delivers to the address
 * the Resend account was created with, so CONTACT_TO_EMAIL must be that address in the meantime.
 *
 * Every message is sent with reply-to set to the visitor, so replying in the inbox answers them.
 * Failures are logged with the real reason; the visitor only ever gets a generic message.
 */

const DEFAULT_TO = 'ahmed@amdnsri.com';
const DEFAULT_FROM = 'AMD NSRI <onboarding@resend.dev>';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Server-side limits. The message limit matches the form's 600-character counter.
const MAX = { name: 120, email: 254, subject: 120, message: 600 };

// Best-effort rate limit per IP: 5 messages per 10 minutes. It lives in memory, so on Vercel
// each running instance keeps its own count — enough to stop a script hammering the form.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

// One generic message for the visitor whatever went wrong on the server.
const GENERIC_ERROR = 'Could not send your message.';

function readConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() || '',
    to: process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO,
    from: process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM,
  };
}

/** The bare address inside "Name <address>" (or the whole value when there are no brackets). */
function bareAddress(value: string): string {
  const m = value.match(/<([^>]+)>\s*$/);
  return (m ? m[1] : value).trim();
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return req.headers.get('x-real-ip')?.trim() || 'unknown';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // keep the map from growing without bound
  if (hits.size > 5000) {
    hits.forEach((times, key) => {
      if (!times.some(t => now - t < RATE_WINDOW_MS)) hits.delete(key);
    });
  }
  return false;
}

/** A plain-language reason for the server log, from Resend's error name and message. */
function explainResendError(error: { name?: string; message?: string; statusCode?: number | null }): string {
  const name = error.name ?? 'unknown';
  const msg = (error.message ?? '').toLowerCase();
  if (name === 'missing_api_key') return 'RESEND_API_KEY is missing';
  // Resend reports a bad key as validation_error 401 "API key is invalid", so match the text too
  if (name === 'invalid_api_key' || (msg.includes('api key') && msg.includes('invalid'))) {
    return 'RESEND_API_KEY is invalid (check it was copied in full and not revoked)';
  }
  if (name === 'restricted_api_key' || (error.statusCode === 403 && msg.includes('api key'))) {
    return 'RESEND_API_KEY lacks permission to send emails';
  }
  if (msg.includes('domain') && msg.includes('not verified')) {
    return 'the sender domain in CONTACT_FROM_EMAIL is not verified in Resend (Resend → Domains)';
  }
  if (msg.includes('only send testing emails')) {
    return 'Resend test mode: with the onboarding@resend.dev sender, CONTACT_TO_EMAIL must be the address the Resend account was created with';
  }
  if (name === 'invalid_from_address') return 'CONTACT_FROM_EMAIL is not a valid sender (use "Name <address@domain>")';
  if (name === 'validation_error' || name === 'invalid_parameter' || name === 'missing_required_field') {
    return 'Resend rejected the request (often an invalid CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL)';
  }
  if (name === 'daily_quota_exceeded' || name === 'monthly_quota_exceeded') return 'the Resend sending quota is used up';
  if (name === 'rate_limit_exceeded') return 'Resend rate limit hit';
  return 'Resend returned an error';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  let body: { name?: unknown; email?: unknown; subject?: unknown; message?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(body.name);
  const email = str(body.email);
  const subject = str(body.subject);
  const message = str(body.message);

  // Honeypot: a hidden field people never see. A bot that fills it gets a normal-looking
  // success, so it has no reason to retry, and nothing is sent.
  if (str(body.website)) {
    console.warn('[contact] honeypot filled, submission dropped');
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }
  if (name.length > MAX.name || email.length > MAX.email || subject.length > MAX.subject || message.length > MAX.message) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    console.warn(`[contact] rate limit: more than ${RATE_MAX} messages in ${RATE_WINDOW_MS / 60000} min from ${ip}`);
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 });
  }

  const { apiKey, to, from } = readConfig();

  // Misconfiguration, not a visitor error: log what is wrong, answer with the generic message.
  if (!apiKey) {
    console.error('[contact] not sent: RESEND_API_KEY is not set (Vercel → Settings → Environment Variables, then redeploy)');
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
  if (!EMAIL_RE.test(bareAddress(to))) {
    console.error(`[contact] not sent: CONTACT_TO_EMAIL is not a valid address: "${to}"`);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
  if (!EMAIL_RE.test(bareAddress(from))) {
    console.error(`[contact] not sent: CONTACT_FROM_EMAIL is not a valid sender: "${from}" (use "Name <address@domain>")`);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }

  const text = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const html = `
    <div style="background:#0d0d0b;padding:32px;font-family:'IBM Plex Mono',ui-monospace,monospace;color:#e8e4dc;">
      <div style="max-width:560px;margin:0 auto;border:1px solid #2a2a26;">
        <div style="padding:24px 28px;border-bottom:1px solid #2a2a26;">
          <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#b8956a;">AMD NSRI — New Inquiry</div>
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:18px 28px 6px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#5a5854;">Name</td>
          </tr>
          <tr><td style="padding:0 28px 14px;font-size:14px;color:#e8e4dc;">${escapeHtml(name)}</td></tr>
          <tr>
            <td style="padding:6px 28px 6px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#5a5854;">Email</td>
          </tr>
          <tr><td style="padding:0 28px 14px;font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#b8956a;text-decoration:none;">${escapeHtml(email)}</a></td></tr>
          <tr>
            <td style="padding:6px 28px 6px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#5a5854;">Subject</td>
          </tr>
          <tr><td style="padding:0 28px 14px;font-size:14px;color:#e8e4dc;">${escapeHtml(subject)}</td></tr>
          <tr>
            <td style="padding:6px 28px 6px;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#5a5854;">Message</td>
          </tr>
          <tr><td style="padding:0 28px 24px;font-size:14px;line-height:1.7;color:#e8e4dc;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
        </table>
        <div style="padding:16px 28px;border-top:1px solid #2a2a26;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#5a5854;">
          Reply directly to respond to ${escapeHtml(name)}
        </div>
      </div>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `AMD NSRI Contact — ${subject}`,
      text,
      html,
    });

    if (error) {
      console.error(
        `[contact] not sent: ${explainResendError(error)}. ` +
        `Resend said: ${error.name ?? '?'} (${error.statusCode ?? '?'}) "${error.message ?? ''}". from="${from}" to="${to}"`,
      );
      return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error('[contact] not sent: unexpected error while calling Resend:', err);
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 500 });
  }
}
