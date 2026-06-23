import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * POST /api/contact
 * Sends the contact-form submission to the studio inbox via Resend.
 *
 * Required env var: RESEND_API_KEY  (see .env.local / Vercel project settings)
 * Optional overrides:
 *   CONTACT_TO_EMAIL    — destination inbox      (default: ahmed@amdnsri.com)
 *   CONTACT_FROM_EMAIL  — verified sender address (default: Resend sandbox)
 *
 * The default sender uses Resend's shared `onboarding@resend.dev` address, which
 * works immediately with a fresh free key. Once a domain is verified in Resend,
 * set CONTACT_FROM_EMAIL to something like "AMD NSRI <hello@amdnsri.com>".
 */

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'ahmed@amdnsri.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'AMD NSRI <onboarding@resend.dev>';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = body.name?.trim() ?? '';
  const email = body.email?.trim() ?? '';
  const subject = body.subject?.trim() ?? '';
  const message = body.message?.trim() ?? '';

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Misconfiguration, not a user error — log server-side, return a generic 500.
    console.error('[contact] RESEND_API_KEY is not set.');
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const resend = new Resend(apiKey);

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
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `AMD NSRI Contact — ${subject}`,
      text,
      html,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ error: 'Failed to send your message.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
