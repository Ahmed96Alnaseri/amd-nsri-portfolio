/*
 * The welcome email the gate sends to a visitor after a successful sign-up (service.ts), in the language they used
 * on the gate. Plain text plus a simple HTML part, so Arabic reads right to left in every mail program. Nothing in
 * it comes from the visitor. Replies (STOP) go to the contact address the legal pages name for removal requests.
 */
type Lang3 = 'EN' | 'TR' | 'AR';

export const WELCOME_REPLY_TO = 'AMD NSRI <contact@amdnsri.com>';
const SITE = 'https://amdnsri.com';

const TEXT: Record<Lang3, { subject: string; lines: string[] }> = {
  EN: {
    subject: 'Welcome to AMD NSRI',
    lines: [
      'Thank you for signing up for the AMD NSRI tools.',
      'AMD NSRI works on architecture, facade design and fabrication tools.',
      'From time to time we will send you news and updates about new projects, journal articles and tools.',
      'Reply STOP to this email to unsubscribe.',
      'If you unsubscribe, the tools stop working for this address.',
    ],
  },
  TR: {
    subject: "AMD NSRI'ye hoş geldiniz",
    lines: [
      'AMD NSRI araçlarına kaydolduğunuz için teşekkür ederiz.',
      'AMD NSRI; mimarlık, cephe tasarımı ve imalat araçları üzerine çalışır.',
      'Zaman zaman size yeni projeler, günlük yazıları ve araçlar hakkında haberler ve güncellemeler göndereceğiz.',
      'Abonelikten çıkmak için bu e-postayı STOP yazarak yanıtlayın.',
      'Abonelikten çıkarsanız araçlar bu adres için çalışmaz.',
    ],
  },
  AR: {
    subject: 'مرحباً بك في AMD NSRI',
    lines: [
      'شكراً لاشتراكك في أدوات AMD NSRI.',
      'تعمل AMD NSRI في مجالات العمارة وتصميم الواجهات وأدوات التصنيع.',
      'سنرسل إليك من حين لآخر أخباراً وتحديثات حول المشاريع الجديدة ومقالات المدونة والأدوات.',
      'لإلغاء الاشتراك، ردّ على هذه الرسالة بكلمة STOP.',
      'إذا ألغيت الاشتراك، تتوقف الأدوات عن العمل لهذا العنوان.',
    ],
  },
};

export function welcomeEmail(lang: Lang3) {
  const t = TEXT[lang] ?? TEXT.EN;
  const rtl = lang === 'AR';
  const dir = rtl ? 'rtl' : 'ltr';
  const align = rtl ? 'right' : 'left';
  const text = [...t.lines.flatMap((l) => [l, '']), 'AMD NSRI', SITE].join('\n');
  const html =
    `<!doctype html><html lang="${lang.toLowerCase()}" dir="${dir}"><head><meta charset="utf-8"><title>${t.subject}</title></head>` +
    `<body style="margin:0;padding:24px;background:#ffffff;">` +
    `<div dir="${dir}" style="max-width:560px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#222222;text-align:${align};">` +
    t.lines.map((l) => `<p style="margin:0 0 14px;">${l}</p>`).join('') +
    `<p style="margin:22px 0 0;">AMD NSRI<br><a href="${SITE}" style="color:#7a6144;">amdnsri.com</a></p>` +
    `</div></body></html>`;
  return {
    subject: t.subject,
    text,
    html,
    replyTo: WELCOME_REPLY_TO,
    // lets mail programs show their own "unsubscribe" button; it opens an email to the same contact address
    headers: { 'List-Unsubscribe': '<mailto:contact@amdnsri.com?subject=STOP>' },
  };
}
