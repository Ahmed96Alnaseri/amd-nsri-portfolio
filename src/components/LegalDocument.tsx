'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import type { Lang } from '@/lib/translations';
import type { LegalDoc } from '@/lib/privacy-content';

/** Renders a [[text|/path]] link inside a sentence; everything else stays plain text. */
export function withLinks(text: string, newTab = false) {
  return text.split(/(\[\[[^\]|]+\|[^\]]+\]\])/).map((part, i) => {
    const m = part.match(/^\[\[([^\]|]+)\|([^\]]+)\]\]$/);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    return newTab
      ? <a key={i} href={m[2]} target="_blank" rel="noopener">{m[1]}</a>
      : <Link key={i} href={m[2]}>{m[1]}</Link>;
  });
}

/**
 * The draft legal pages (/privacy, /consent) in the visitor's language, with the DRAFT banner on top. Text lives in
 * src/lib/privacy-content.ts and src/lib/consent-content.ts.
 */
export default function LegalDocument({ content }: { content: Record<Lang, LegalDoc> }) {
  const { lang } = useLanguage();
  const c = content[lang] ?? content.TR;
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
        .pv-title { font-family: var(--font-title); font-weight: 400; font-size: clamp(34px, 4.6vw, 56px); letter-spacing: -0.02em; line-height: 1.08; margin: 0 0 12px; }
        .pv-status { font-family: var(--font-body); font-size: 12px; line-height: 1.7; letter-spacing: .04em; color: var(--color-text-meta); margin: 0 0 40px; }
        .pv-h2 {
          font-family: var(--font-body); font-size: 12px; font-weight: 500; letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-accent); margin: 40px 0 14px; padding-top: 20px; border-top: 1px solid var(--color-border);
        }
        .pv p, .pv li { font-family: var(--font-body); font-size: 14px; font-weight: 300; line-height: 1.75; letter-spacing: .01em; color: var(--color-text-secondary); }
        .pv p { margin: 0 0 14px; }
        .pv ul { margin: 0 0 16px; padding-inline-start: 20px; }
        .pv li { margin-bottom: 6px; }
        .pv a { color: var(--color-accent); text-decoration: none; border-bottom: 1px solid rgba(184,149,106,.4); }
      ` }} />
      <article className="pv">
        <div className="pv-inner">
          <p className="pv-draft" role="note">{c.draft}</p>
          <h1 className="pv-title">{c.title}</h1>
          <p className="pv-status">{c.status}</p>
          {c.intro.map((p, i) => <p key={i}>{withLinks(p)}</p>)}
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="pv-h2">{s.heading}</h2>
              {s.blocks.map((b, i) =>
                typeof b === 'string'
                  ? <p key={i}>{withLinks(b)}</p>
                  : <ul key={i}>{b.map((item) => <li key={item}>{withLinks(item)}</li>)}</ul>,
              )}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
