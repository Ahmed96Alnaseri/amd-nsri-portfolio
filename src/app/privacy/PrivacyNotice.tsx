'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { PRIVACY } from '@/lib/privacy-content';

export default function PrivacyNotice() {
  const { lang } = useLanguage();
  const c = PRIVACY[lang] ?? PRIVACY.EN;
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .pv { background: var(--color-bg); color: var(--color-text-primary); padding: clamp(112px, 15vh, 160px) var(--spacing-side-sm) 120px; }
        @media (min-width: 1024px) { .pv { padding-left: var(--spacing-side-lg); padding-right: var(--spacing-side-lg); } }
        @media (max-width: 768px) { .pv { padding-left: 24px; padding-right: 24px; } }
        .pv-inner { max-width: 760px; }
        .pv-draft {
          border: 1px solid #b8956a; padding: 14px 18px; margin: 0 0 40px;
          font-family: var(--font-body); font-size: 12px; line-height: 1.7; letter-spacing: .04em; color: #b8956a;
        }
        .pv-title { font-family: var(--font-title); font-weight: 400; font-size: clamp(36px, 5vw, 60px); letter-spacing: -0.02em; line-height: 1.05; margin: 0 0 12px; }
        .pv-status { font-family: var(--font-body); font-size: 12px; letter-spacing: .06em; color: var(--color-text-meta); margin: 0 0 48px; }
        .pv-h2 {
          font-family: var(--font-body); font-size: 12px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
          color: var(--color-accent); margin: 40px 0 14px; padding-top: 20px; border-top: 1px solid var(--color-border);
        }
        .pv p, .pv li { font-family: var(--font-body); font-size: 14px; font-weight: 300; line-height: 1.75; letter-spacing: .01em; color: var(--color-text-secondary); }
        .pv p { margin: 0 0 14px; }
        .pv ul { margin: 0 0 14px; padding-inline-start: 20px; }
        .pv li { margin-bottom: 6px; }
      ` }} />
      <article className="pv">
        <div className="pv-inner">
          <p className="pv-draft" role="note">{c.draft}</p>
          <h1 className="pv-title">{c.title}</h1>
          <p className="pv-status">{c.status}</p>
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="pv-h2">{s.heading}</h2>
              {s.blocks.map((b, i) =>
                typeof b === 'string'
                  ? <p key={i}>{b}</p>
                  : <ul key={i}>{b.map((item) => <li key={item}>{item}</li>)}</ul>,
              )}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
