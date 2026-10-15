import type { Lang } from '@/lib/translations';
import { unsubscribeSignature } from './tokens';

/**
 * Unsubscribe links for future newsletters (nothing here sends anything). Every newsletter email to a confirmed
 * subscriber must carry both:
 *   - unsubscribeUrl(...) in the visible text: opens /updates/unsubscribe, which unsubscribes on arrival;
 *   - listUnsubscribeHeaders(...) as email headers: mail apps show their own "Unsubscribe" button and POST to the
 *     API (RFC 8058 one-click), no page involved.
 * Before sending, skip anyone whose status is not 'confirmed' and anyone on newsletter_suppressions.
 *
 * Example with Resend:
 *   resend.emails.send({ from, to, subject, html, text, headers: listUnsubscribeHeaders(siteUrl, secret, id) })
 */
export function unsubscribeUrl(siteUrl: string, secret: string, id: string, lang?: Lang): string {
  const q = new URLSearchParams({ id, sig: unsubscribeSignature(secret, id) });
  if (lang) q.set('lang', lang.toLowerCase());
  return `${siteUrl}/updates/unsubscribe?${q}`;
}

export function listUnsubscribeHeaders(siteUrl: string, secret: string, id: string): Record<string, string> {
  const q = new URLSearchParams({ id, sig: unsubscribeSignature(secret, id) });
  return {
    'List-Unsubscribe': `<${siteUrl}/api/newsletter/unsubscribe?${q}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  };
}
