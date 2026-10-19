'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { LANGS, type Lang } from '@/lib/translations';
import type { LegalDoc } from '@/lib/privacy-content';

/** Renders a [[text|/path]] link inside a sentence; everything else stays plain text. With newTabNoteId the link opens
    in a new tab (used inside the sign-up form, so what was typed is kept) and is described by that element's text
    ("opens in a new tab"), read after the link name so a word ending such as Turkish 'nı stays attached. */
export function withLinks(text: string, newTabNoteId?: string) {
  return text.split(/(\[\[[^\]|]+\|[^\]]+\]\])/).map((part, i) => {
    const m = part.match(/^\[\[([^\]|]+)\|([^\]]+)\]\]$/);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    return newTabNoteId
      ? <a key={i} href={m[2]} target="_blank" rel="noopener" aria-describedby={newTabNoteId}>{m[1]}</a>
      : <Link key={i} href={m[2]}>{m[1]}</Link>;
  });
}

/**
 * The draft legal pages (/privacy, /consent) in the visitor's language, with the DRAFT banner on top. Text lives in
 * src/lib/privacy-content.ts and src/lib/consent-content.ts (newsletter), src/lib/tool-gate/legal-content.ts (email gate).
 * A ?lang=EN|TR|AR in the address shows that language without changing the visitor's saved choice: the tool pages,
 * which keep their own language, open these pages in the language of their email form.
 */
export default function LegalDocument({ content }: { content: Record<Lang, LegalDoc> }) {
  const { lang: siteLang } = useLanguage();
  const [asked, setAsked] = useState<Lang | null>(null);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('lang')?.toUpperCase() as Lang | undefined;
    if (q && LANGS.includes(q)) setAsked(q);
  }, []);
  const lang = asked ?? siteLang;
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
      {/* lang/dir here too, so the site's Arabic right-to-left rules ([lang="ar"] …) apply when ?lang= asks for it */}
      <article className="pv" lang={lang.toLowerCase()} dir={lang === 'AR' ? 'rtl' : 'ltr'}>
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
