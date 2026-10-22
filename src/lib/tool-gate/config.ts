/**
 * Email gate on the free tools: launch control. Server only (it reads the SMTP password), never import it from
 * a client component or from the tool pages.
 *
 * TOOL_GATE_MODE
 *   off      Default (also when unset or misspelled). No gate anywhere: the tools open as before, and
 *            /api/tool-gate/* answers 404.
 *   preview  Only on `next dev` and on Vercel Preview deployments; on the production deployment it counts as off.
 *            The gate is shown and the form is checked, but NO email is sent (a dry run). Needs no other variable.
 *   live     The gate is shown and each sign-up is sent as one email over SMTP. Must be set explicitly and needs
 *            every variable below; if one is missing or invalid the whole gate stays off.
 *
 * Other variables (names only; values live in Vercel → Settings → Environment Variables, never in the code):
 *   SMTP_HOST            The SMTP server of the mailbox, e.g. mail.example.com.tr
 *   SMTP_PORT            465 (TLS from the start) or 587 (STARTTLS, TLS required).
 *   SMTP_USER            SMTP login.
 *   SMTP_PASS            SMTP password.
 *   SMTP_FROM            Sender address of the notification email, e.g. "AMD NSRI <signups@news.amdnsri.com>".
 *   TOOL_GATE_TO         The mailbox that receives each sign-up: signups@news.amdnsri.com
 *   TOOL_GATE_HOURLY_MAX Optional. Emails per hour (per server instance) before sending pauses; default 50, at most 60.
 *   TOOL_GATE_LOCAL_TEST Local testing only: "1" lets preview run on a local production build (`next start`).
 *                        Ignored on Vercel's production deployment, where preview is always off.
 *
 * Nothing about a sign-up is stored: no database, no file, no Vercel storage, and no log line contains an address.
 */
export type ToolGateMode = 'off' | 'preview' | 'live';

const env = (name: string) => process.env[name]?.trim() || '';

/** A plain address, or "Name <address>". */
const ADDRESS = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;
const isAddress = (s: string) => ADDRESS.test(s);
const isSender = (s: string) => isAddress(s) || /^[^<>]*<[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+>$/.test(s);

export function toolGateMode(): ToolGateMode {
  const raw = env('TOOL_GATE_MODE').toLowerCase();
  if (raw === 'live') return 'live';
  if (raw === 'preview') {
    // preview can never be active on the production site, whatever the variable says
    if (process.env.VERCEL_ENV === 'production') return 'off';
    if (process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development' || process.env.TOOL_GATE_LOCAL_TEST === '1') return 'preview';
  }
  return 'off';
}

export interface ToolGateConfig {
  mode: ToolGateMode;
  smtp: { host: string; port: number; secure: boolean; user: string; pass: string };
  from: string;
  to: string;
  hourlyMax: number;
  /** Names of missing or invalid variables. The gate stays off while this is not empty. */
  problems: string[];
}

export function toolGateConfig(): ToolGateConfig {
  const mode = toolGateMode();
  const problems: string[] = [];
  const host = env('SMTP_HOST');
  const port = Number(env('SMTP_PORT'));
  const user = env('SMTP_USER');
  const pass = env('SMTP_PASS');
  const from = env('SMTP_FROM');
  const to = env('TOOL_GATE_TO');
  const max = Number(env('TOOL_GATE_HOURLY_MAX'));
  const hourlyMax = Number.isInteger(max) && max > 0 ? Math.min(max, 60) : 50;

  if (mode === 'live') {
    if (!host) problems.push('SMTP_HOST');
    if (port !== 465 && port !== 587) problems.push('SMTP_PORT (465 or 587)');
    if (!user) problems.push('SMTP_USER');
    if (!pass) problems.push('SMTP_PASS');
    if (!isSender(from)) problems.push('SMTP_FROM (an address, or "Name <address>")');
    if (!isAddress(to)) problems.push('TOOL_GATE_TO (an address)');
  }
  return { mode, smtp: { host, port, secure: port === 465, user, pass }, from, to, hourlyMax, problems };
}

let warned = false;

/** Whether the gate is shown and the API answers: a mode other than off, with nothing missing. */
export function toolGateEnabled(): boolean {
  const { mode, problems } = toolGateConfig();
  if (mode === 'off') return false;
  if (problems.length) {
    // the variable names only, never their values
    if (!warned) console.error(`[tool-gate] mode ${mode} but not configured, kept off. Missing or invalid: ${problems.join(', ')}`);
    warned = true;
    return false;
  }
  return true;
}
