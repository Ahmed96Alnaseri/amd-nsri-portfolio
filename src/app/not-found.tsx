'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/LanguageContext';

/* The "not found" page for every address that doesn't exist (and for notFound() in tool, project and journal
   pages). It answers with status 404 and stays out of search; Next adds the noindex itself.
   In the site's style: a large muted "404" behind, a copper eyebrow, the serif title, a 1px rule and the
   two site buttons. In Arabic the block mirrors (text and buttons from the right, the arrow pointing left). */
export default function NotFound() {
  const { t } = useLanguage();
  const path = usePathname();

  // the tab title follows the visitor's language (the page's metadata comes from the section it is under)
  useEffect(() => {
    document.title = `${t('notFound.docTitle')} — AMD NSRI`;
  }, [t]);

  return (
    <section className="nf" aria-labelledby="nf-title">
      <span className="nf-bg" aria-hidden="true">404</span>
      <div className="nf-inner">
        <p className="nf-eyebrow">{t('notFound.eyebrow')}</p>
        <h1 id="nf-title" className="nf-title">{t('notFound.title')}</h1>
        <p className="nf-body">{t('notFound.body')}</p>
        {path && path !== '/' && (
          <p className="nf-path">
            <span className="nf-path-lbl">{t('notFound.requested')}</span>
            {/* an address reads left to right in every language */}
            <code dir="ltr">{path}</code>
          </p>
        )}
        <div className="nf-rule" aria-hidden="true" />
        <div className="nf-actions">
          <Link href="/" className="btn-primary">
            <span>{t('notFound.home')}</span>
            <span className="nf-arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/tools" className="btn-ghost">{t('notFound.tools')}</Link>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: css }} />
    </section>
  );
}

const css = `
  .nf {
    position: relative; overflow: hidden;
    min-height: calc(100vh - 72px);
    display: flex; align-items: center;
    padding: clamp(120px, 18vh, 200px) clamp(24px, 6vw, 120px) clamp(80px, 12vh, 160px);
    background:
      radial-gradient(ellipse 80% 60% at 30% 0%, rgba(184,149,106,0.07) 0%, transparent 70%),
      radial-gradient(ellipse 60% 40% at 85% 60%, rgba(26,32,48,0.12) 0%, transparent 60%),
      var(--color-bg);
  }
  .nf-bg {
    position: absolute; right: clamp(-40px, -2vw, 0px); bottom: -0.12em;
    font-family: var(--font-title); font-size: clamp(200px, 34vw, 520px);
    line-height: 1; letter-spacing: -0.04em;
    color: var(--color-text-primary); opacity: 0.035;
    pointer-events: none; user-select: none;
  }
  .nf-inner { position: relative; z-index: 1; max-width: 640px; }
  .nf-eyebrow {
    font-family: var(--font-body); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--color-accent); margin: 0 0 28px;
  }
  .nf-title {
    font-family: var(--font-title); font-weight: 400;
    font-size: clamp(40px, 6vw, 76px); line-height: 1.05; letter-spacing: -0.02em;
    color: var(--color-text-primary); margin: 0 0 28px;
  }
  .nf-body {
    font-family: var(--font-body); font-size: clamp(14px, 1.3vw, 16px); font-weight: 300; line-height: 1.7;
    color: var(--color-text-secondary); max-width: 52ch; margin: 0 0 20px;
  }
  .nf-path {
    display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px;
    font-family: var(--font-body); font-size: 12px; color: var(--color-text-meta); margin: 0;
  }
  .nf-path-lbl { letter-spacing: 0.08em; text-transform: uppercase; font-size: 10px; }
  .nf-path code {
    font-family: var(--font-body); color: var(--color-text-secondary);
    unicode-bidi: isolate; word-break: break-all;
  }
  .nf-rule { width: 120px; height: 1px; background: var(--color-line); margin: 40px 0 36px; }
  .nf-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 32px; }
  .nf-arrow { display: inline-block; }

  /* Arabic: the block reads from the right; the big number moves to the left; the arrow points left */
  [lang="ar"] .nf { direction: rtl; }
  [lang="ar"] .nf-bg { right: auto; left: clamp(-40px, -2vw, 0px); }
  [lang="ar"] .nf-arrow { scale: -1 1; }
  [lang="ar"] .nf-eyebrow, [lang="ar"] .nf-path-lbl { letter-spacing: 0; }

  @media (max-width: 640px) {
    .nf-actions { flex-direction: column; align-items: flex-start; gap: 8px; }
    .nf-rule { margin: 32px 0 28px; }
  }
`;
