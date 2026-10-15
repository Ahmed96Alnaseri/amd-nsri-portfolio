import type { Lang } from '@/lib/translations';

/**
 * The confirmation email, in the language the form was shown in. It only asks the person to confirm: no
 * promotional content. TR and AR are translations by Claude, awaiting review.
 */
const COPY: Record<Lang, { subject: string; intro: string; button: string; expiry: (days: string) => string; ignore: string; dir: 'ltr' | 'rtl' }> = {
  EN: {
    subject: 'Confirm your subscription to AMD NSRI updates',
    intro: 'Please confirm that you want to receive emails from AMD NSRI about new projects, journal articles and updates to its digital tools.',
    button: 'Confirm subscription',
    expiry: (d) => `This link works once and expires in ${d}.`,
    ignore: 'If you did not ask for this, ignore this email: you will not be subscribed, and the request is deleted automatically.',
    dir: 'ltr',
  },
  TR: {
    subject: 'AMD NSRI güncellemelerine aboneliğinizi onaylayın',
    intro: 'AMD NSRI\'dan yeni projeler, günlük yazıları ve dijital araçlarındaki güncellemeler hakkında e-posta almak istediğinizi lütfen onaylayın.',
    button: 'Aboneliği onayla',
    expiry: (d) => `Bu bağlantı yalnızca bir kez çalışır ve ${d} sonra geçerliliğini yitirir.`,
    ignore: 'Bu talebi siz yapmadıysanız bu e-postayı dikkate almayın: abone olmazsınız ve talep otomatik olarak silinir.',
    dir: 'ltr',
  },
  AR: {
    subject: 'أكّد اشتراكك في تحديثات AMD NSRI',
    intro: 'يُرجى تأكيد رغبتك في تلقّي رسائل بريد إلكتروني من AMD NSRI حول المشاريع الجديدة ومقالات المدونة وتحديثات أدواتها الرقمية.',
    button: 'تأكيد الاشتراك',
    expiry: (d) => `يعمل هذا الرابط مرة واحدة فقط وتنتهي صلاحيته بعد ${d}.`,
    ignore: 'إن لم تطلب ذلك فتجاهل هذه الرسالة: لن يتم اشتراكك، وسيُحذف الطلب تلقائياً.',
    dir: 'rtl',
  },
};

/** "7 days", or minutes for the short preview lifetime. */
function duration(lang: Lang, ms: number): string {
  const minutes = Math.round(ms / 60000);
  const days = Math.round(minutes / 1440);
  if (minutes % 1440 === 0) return lang === 'TR' ? `${days} gün` : lang === 'AR' ? `${days} أيام` : `${days} day${days === 1 ? '' : 's'}`;
  return lang === 'TR' ? `${minutes} dakika` : lang === 'AR' ? `${minutes} دقيقة` : `${minutes} minute${minutes === 1 ? '' : 's'}`;
}

const escapeHtml = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

export interface BuiltEmail { subject: string; text: string; html: string }

export function confirmationEmail(lang: Lang, confirmUrl: string, ttlMs: number): BuiltEmail {
  const c = COPY[lang] ?? COPY.EN;
  const expiry = c.expiry(duration(lang, ttlMs));
  const text = [c.intro, '', `${c.button}: ${confirmUrl}`, '', expiry, c.ignore, '', 'AMD NSRI'].join('\n');
  const align = c.dir === 'rtl' ? 'right' : 'left';
  const p = (s: string, color = '#8a8880') =>
    `<p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:${color};text-align:${align};">${escapeHtml(s)}</p>`;
  const html = `
    <div dir="${c.dir}" style="background:#0d0d0b;padding:32px;font-family:'IBM Plex Mono',ui-monospace,monospace;color:#e8e4dc;">
      <div style="max-width:560px;margin:0 auto;border:1px solid #2a2a26;">
        <div style="padding:24px 28px;border-bottom:1px solid #2a2a26;">
          <div style="font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#b8956a;text-align:${align};">AMD NSRI</div>
        </div>
        <div style="padding:28px;">
          ${p(c.intro, '#e8e4dc')}
          <p style="margin:24px 0;text-align:${align};">
            <a href="${escapeHtml(confirmUrl)}" style="display:inline-block;padding:14px 24px;background:#b8956a;color:#0d0d0b;text-decoration:none;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">${escapeHtml(c.button)}</a>
          </p>
          ${p(expiry)}
          ${p(c.ignore)}
        </div>
      </div>
    </div>`;
  return { subject: c.subject, text, html };
}
