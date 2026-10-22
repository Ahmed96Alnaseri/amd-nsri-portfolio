import { createHash, randomBytes } from 'crypto';
import nodemailer from 'nodemailer';
import { translations } from '@/lib/translations';
import { toolGateConfig, toolGateEnabled } from './config';
import consentTexts from './consent-texts.json';
import { welcomeEmail } from './welcome';
import { HASH, addressHash, removedList } from './removed';

/*
 * The email gate's two API answers (src/app/api/tool-gate/*). Server only.
 * Nothing about a sign-up is kept: the address is put in one email to TOOL_GATE_TO and forgotten; after that, one
 * welcome email goes to the visitor (welcome.ts). The spam and rate limits live in this server instance's memory
 * only (hashed, with a salt made fresh on every start) and are gone when the instance stops. No log line contains
 * an address or the SMTP server's error text. Addresses whose owners asked to stop emails are on the removed list
 * (removed.ts): the tools stay closed to them.
 */

/** The approval texts a sign-up agrees to (consent-texts.json): a new version whenever any of the wording changes. */
type Lang3 = 'EN' | 'TR' | 'AR';
interface ApprovalVersion { documents: string; privacy: Record<Lang3, string>; consent: Record<Lang3, string> }
const TEXTS_VERSION: string = consentTexts.current;
const APPROVALS = (consentTexts.versions as Record<string, ApprovalVersion>)[TEXTS_VERSION];
/** The wording as agreed to, without the [[text|/path]] link markers. */
const plain = (s: string) => s.replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, '$1');
const TOOLS = new Set(['ipunch', 'nestri', 'nestri-pro', 'expanded-mesh-generator']);
const LANGS = new Set(['EN', 'TR', 'AR']);
const EMAIL = /^[^\s@<>"(),;:\\[\]]+@[^\s@<>"(),;:\\[\]]+\.[^\s@<>"(),;:\\[\]]{2,}$/;

const SALT = randomBytes(16);
const hash = (s: string) => createHash('sha256').update(SALT).update(s).digest('base64url');

const MIN = 60 * 1000;
const HOUR = 60 * MIN;
const PER_IP_MAX = 5;          // sign-ups per 10 minutes from one address
const PER_IP_WINDOW = 10 * MIN;
const MIN_FORM_MS = 1500;      // a person needs longer than this to type an address and tick the box

const byIp = new Map<string, number[]>();
const recentAddresses = new Map<string, number>();
let sentTimes: number[] = [];

function prune(now: number) {
  for (const [k, ts] of Array.from(byIp)) {
    const keep = ts.filter((t) => now - t < PER_IP_WINDOW);
    if (keep.length) byIp.set(k, keep); else byIp.delete(k);
  }
  for (const [k, t] of Array.from(recentAddresses)) if (now - t >= HOUR) recentAddresses.delete(k);
  sentTimes = sentTimes.filter((t) => now - t < HOUR);
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
const notFound = () => json({ error: 'not found' }, 404);

/**
 * GET: whether the gate is on, its text in the three languages (src/lib/translations.ts) and the two approval
 * checkboxes with their version (consent-texts.json).
 */
export function status() {
  if (!toolGateEnabled()) return notFound();
  const { mode } = toolGateConfig();
  return json({
    enabled: true,
    dryRun: mode === 'preview',
    text: { EN: translations.EN.toolGate, TR: translations.TR.toolGate, AR: translations.AR.toolGate },
    approvals: { version: TEXTS_VERSION, privacy: APPROVALS.privacy, consent: APPROVALS.consent },
  });
}

/**
 * POST { email, privacy, consent, website (hidden), tool, lang, ms }. Both approvals are required. Always answers
 * quickly; the visitor's access never depends on the answer, except for an address on the removed list, which is
 * refused (403, nothing sent). Sends at most two emails per sign-up: the sign-up to the mailbox, then (only if that
 * worked) the welcome email to the visitor. Every accepted answer carries the address's hash (token), which the
 * browser keeps instead of the address for the check on later visits.
 */
export async function subscribe(req: Request) {
  if (!toolGateEnabled()) return notFound();
  const cfg = toolGateConfig();

  const raw = await req.text().catch(() => '');
  if (raw.length > 2048) return json({ error: 'too large' }, 413);
  let body: Record<string, unknown> = {};
  try { body = JSON.parse(raw); } catch { return json({ error: 'invalid request' }, 400); }
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

  const email = str(body.email, 254).toLowerCase();
  const tool = TOOLS.has(str(body.tool, 40)) ? str(body.tool, 40) : 'unknown';
  const lang = LANGS.has(str(body.lang, 2).toUpperCase()) ? str(body.lang, 2).toUpperCase() : 'EN';

  if (!EMAIL.test(email)) return json({ error: 'invalid email' }, 400);
  if (body.privacy !== true) return json({ error: 'privacy required' }, 400);
  if (body.consent !== true) return json({ error: 'consent required' }, 400);

  // spam: the hidden field is filled, or the form was sent faster than a person could. Pretend success.
  if (str(body.website, 200)) { console.warn('[tool-gate] dropped: hidden field filled'); return json({ ok: true }); }
  if (typeof body.ms === 'number' && body.ms < MIN_FORM_MS) { console.warn('[tool-gate] dropped: form sent too fast'); return json({ ok: true }); }

  const removed = removedList();
  const token = removed ? addressHash(email, removed.key) : undefined;
  const ok = (extra: Record<string, unknown>) => json({ ok: true, ...extra, ...(token ? { token } : {}) });

  const now = Date.now();
  prune(now);
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
  const ipKey = hash('ip:' + ip);
  const ipHits = byIp.get(ipKey) ?? [];
  if (ipHits.length >= PER_IP_MAX) { console.warn('[tool-gate] not sent: too many sign-ups from one address'); return ok({ sent: false }); }
  byIp.set(ipKey, [...ipHits, now]);

  // after the per-visitor limit, so the form cannot be used to test many addresses against the list
  if (removed && token && removed.hashes.has(token)) {
    console.log('[tool-gate] refused: address on the removed list');
    return json({ ok: false, blocked: true }, 403);
  }

  const addressKey = hash('email:' + email);
  if (recentAddresses.has(addressKey)) { console.log('[tool-gate] not sent: same address already sent this hour'); return ok({ sent: false }); }

  if (cfg.mode === 'preview') {
    recentAddresses.set(addressKey, now);
    console.log(`[tool-gate] dry run: two emails would be sent, sign-up and welcome (tool ${tool}, ${lang})`);
    return ok({ sent: false, dryRun: true });
  }

  // the mailbox accepts 60 emails an hour; stay under it (TOOL_GATE_HOURLY_MAX, default 50). Every email counts:
  // the sign-up takes the first free place, the welcome email only a second one, so the sign-up always comes first
  if (sentTimes.length >= cfg.hourlyMax) { console.warn('[tool-gate] not sent: hourly limit reached, sign-up lost'); return ok({ sent: false }); }
  sentTimes.push(now);
  recentAddresses.set(addressKey, now);

  // creating the transport only stores the settings; it connects when an email is sent
  const transport = nodemailer.createTransport({
    host: cfg.smtp.host,
    port: cfg.smtp.port,
    secure: cfg.smtp.secure,
    requireTLS: !cfg.smtp.secure,
    auth: { user: cfg.smtp.user, pass: cfg.smtp.pass },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000,
  });
  try {
    await transport.sendMail({
      from: cfg.from,
      to: cfg.to,
      replyTo: email,
      subject: 'AMD NSRI tools: new sign-up',
      text: [
        'New sign-up for the AMD NSRI free tools.',
        '',
        `Email: ${email}`,
        `Language: ${lang}`,
        `Tool: ${tool}`,
        `Time (UTC): ${new Date(now).toISOString()}`,
        '',
        `Approval 1, Privacy Notice read: YES`,
        `  Wording agreed to (${lang}): ${plain(APPROVALS.privacy[lang as Lang3])}`,
        `Approval 2, explicit consent (newsletter and tool access): YES`,
        `  Wording agreed to (${lang}): ${plain(APPROVALS.consent[lang as Lang3])}`,
        '',
        `Approval texts version: ${TEXTS_VERSION}`,
        `Notice version: ${APPROVALS.documents}`,
      ].join('\n'),
    });
    console.log(`[tool-gate] sent (tool ${tool}, ${lang})`);
  } catch (err) {
    console.error(`[tool-gate] not sent: ${smtpError(err)}, sign-up lost`);
    return ok({ sent: false });
  }

  // the welcome email: never changes the answer, the sign-up above has already worked
  if (sentTimes.length >= cfg.hourlyMax) {
    console.warn('[tool-gate] welcome not sent: hourly limit reached');
  } else {
    sentTimes.push(Date.now());
    try {
      const w = welcomeEmail(lang as Lang3);
      await transport.sendMail({ from: cfg.from, to: email, replyTo: w.replyTo, subject: w.subject, text: w.text, html: w.html, headers: w.headers });
      console.log(`[tool-gate] welcome sent (${lang})`);
    } catch (err) {
      console.error(`[tool-gate] welcome not sent: ${smtpError(err)}`);
    }
  }
  return ok({ sent: true });
}

const CHECK_MAX = 60;           // removed-list checks per 10 minutes from one address (one per tool page visit)
const checksByIp = new Map<string, number[]>();

/**
 * POST { token }: whether this hash is on the removed list. Answers only { blocked: true | false } and logs nothing
 * about it. The tool pages call it on every visit (public/tools/gate/gate.js); any failure there opens the tool.
 */
export async function check(req: Request) {
  if (!toolGateEnabled()) return notFound();
  const raw = await req.text().catch(() => '');
  if (raw.length > 256) return json({ error: 'too large' }, 413);
  let body: Record<string, unknown> = {};
  try { body = JSON.parse(raw); } catch { return json({ error: 'invalid request' }, 400); }
  const token = typeof body.token === 'string' ? body.token : '';
  if (!HASH.test(token)) return json({ error: 'invalid token' }, 400);

  const now = Date.now();
  for (const [k, ts] of Array.from(checksByIp)) {
    const keep = ts.filter((t) => now - t < PER_IP_WINDOW);
    if (keep.length) checksByIp.set(k, keep); else checksByIp.delete(k);
  }
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
  const ipKey = hash('check:' + ip);
  const hits = checksByIp.get(ipKey) ?? [];
  if (hits.length >= CHECK_MAX) { console.warn('[tool-gate] check: too many from one address'); return json({ error: 'too many' }, 429); }
  checksByIp.set(ipKey, [...hits, now]);

  const removed = removedList();
  return json({ blocked: !!removed && removed.hashes.has(token) });
}

/** The error code only: the SMTP server's message can quote the address. */
function smtpError(err: unknown) {
  const e = err as { code?: string; responseCode?: number };
  return `SMTP ${e.code ?? 'error'}${e.responseCode ? ' ' + e.responseCode : ''}`;
}
