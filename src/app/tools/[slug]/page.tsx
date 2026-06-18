'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { toolsBySlug, type ToolStatus } from '@/data/tools';

const STATUS_MOD: Record<ToolStatus, string> = {
  'Live': 'td-status--live',
  'Beta': 'td-status--beta',
  'Coming Soon': 'td-status--soon',
};

export default function ToolDetailPage({ params }: { params: { slug: string } }) {
  const { t, tv } = useLanguage();
  const tool = toolsBySlug[params.slug];

  if (!tool) {
    return (
      <div className="td td--missing">
        <p className="td-eyebrow">{t('tools.eyebrow')}</p>
        <h1 className="td-title">404</h1>
        <p className="td-lede">{t('common.noProjects')}</p>
        <Link href="/tools" className="td-back">← {t('tools.back')}</Link>
        <style>{baseCss}</style>
      </div>
    );
  }

  const isProduct = tool.type === 'product';

  return (
    <div className="td">
      <Link href="/tools" className="td-back">← {t('tools.back')}</Link>

      <p className="td-eyebrow">
        {tool.platform} · {isProduct ? t('tools.product') : t('tools.showcase')}
      </p>
      <h1 className="td-title">{tv(tool.name)}</h1>
      <p className="td-lede">{tv(tool.detail)}</p>

      <div
        className={`td-hero${tool.image ? '' : ' td-hero--placeholder'}`}
        style={tool.image ? { backgroundImage: `url(${tool.image})` } : undefined}
        role="img"
        aria-label={tool.name}
      >
        {!tool.image && <span className="td-hero-diamond" aria-hidden="true">◆</span>}
        <span className="td-hero-fade" aria-hidden="true" />
        <span className={`td-status ${STATUS_MOD[tool.status]}`}>
          <span className="td-status-dot" aria-hidden="true" />
          {tv(tool.status)}
        </span>
      </div>

      <div className="td-grid">
        {/* What it does */}
        <div className="td-main">
          <h2 className="td-h2">{t('tools.whatItDoes')}</h2>
          <ul className="td-features">
            {tool.features.map(f => (
              <li key={f} className="td-feature">
                <span className="td-feature-mark" aria-hidden="true" />
                {tv(f)}
              </li>
            ))}
          </ul>
        </div>

        {/* Spec + CTA */}
        <aside className="td-side">
          <div className="td-spec">
            <div className="td-spec-row">
              <span className="td-spec-lbl">{t('tools.platform')}</span>
              <span className="td-spec-val">{tool.platform}</span>
            </div>
            <div className="td-spec-sep" />
            <div className="td-spec-row">
              <span className="td-spec-lbl">{t('common.status')}</span>
              <span className="td-spec-val">{tv(tool.status)}</span>
            </div>
            {isProduct && tool.price && (
              <>
                <div className="td-spec-sep" />
                <div className="td-spec-row">
                  <span className="td-spec-lbl">{t('tools.price')}</span>
                  <span className="td-spec-val td-spec-val--price">{tv(tool.price)}</span>
                </div>
              </>
            )}
          </div>

          {isProduct ? (
            <Link href="/shop" className="td-btn">{t('tools.getTool')} →</Link>
          ) : (
            <Link href="/contact" className="td-btn">{t('tools.commission')} →</Link>
          )}
        </aside>
      </div>

      <div className="td-strip" aria-hidden="true">
        <span>AMD NSRI</span>
        <span>{t('tools.eyebrow')}</span>
        <span>{t('common.est2026')}</span>
        <span className="td-strip-fill" />
      </div>

      <style>{baseCss}</style>
    </div>
  );
}

const baseCss = `
  .td {
    background: var(--color-bg);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    padding: clamp(96px, 12vh, 140px) clamp(24px, 6vw, 120px) clamp(32px, 4vh, 56px);
    min-height: 100vh;
  }
  .td--missing { display: flex; flex-direction: column; gap: 18px; }

  .td-back {
    display: inline-block;
    font-family: var(--font-body); font-size: 11px;
    letter-spacing: .18em; text-transform: uppercase;
    color: var(--color-text-secondary); text-decoration: none;
    margin-bottom: clamp(32px, 5vh, 56px);
    transition: color 300ms ease;
  }
  .td-back:hover { color: var(--color-accent); }

  .td-eyebrow {
    display: flex; align-items: center; gap: 12px;
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--color-accent); margin: 0 0 22px;
  }
  .td-eyebrow::before {
    content: ''; display: block; width: 28px; height: 1px;
    background: var(--color-accent); opacity: .7;
  }
  .td-title {
    font-family: var(--font-title);
    font-size: clamp(40px, 6.5vw, 92px);
    letter-spacing: -0.03em; line-height: 1.0;
    color: var(--color-text-primary); margin: 0 0 24px; max-width: 18ch;
  }
  .td-lede {
    font-size: clamp(15px, 1.5vw, 19px); font-weight: 300;
    letter-spacing: .01em; line-height: 1.7;
    color: var(--color-text-secondary); max-width: 64ch;
    margin: 0 0 clamp(40px, 6vh, 64px);
  }

  /* hero media */
  .td-hero {
    position: relative; overflow: hidden;
    width: 100%; height: clamp(260px, 42vh, 480px);
    background-color: var(--color-surface);
    background-repeat: no-repeat; background-position: center;
    background-size: cover;
    border: 1px solid var(--color-border);
    margin-bottom: clamp(48px, 7vh, 88px);
  }
  .td-hero-fade {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(13,13,11,.55) 0%, transparent 45%),
                radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,149,106,0.06) 0%, transparent 70%);
  }
  .td-hero--placeholder { background-color: var(--color-surface); }
  .td-hero-diamond {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    font-size: 96px; line-height: 1;
    color: rgba(184,149,106,0.08);
    pointer-events: none; user-select: none;
  }
  .td-status {
    position: absolute; top: 16px; right: 16px;
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font-body); font-size: 10px;
    letter-spacing: .14em; text-transform: uppercase;
    padding: 7px 13px;
    background: rgba(0,0,0,.5);
    -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,.14);
  }
  .td-status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
  .td-status--live { color: var(--color-accent); }
  .td-status--beta { color: rgba(255,255,255,.7); }
  .td-status--soon { color: var(--color-text-meta); }
  .td-status--soon .td-status-dot { background: transparent; border: 1px solid currentColor; }

  /* two-column body */
  .td-grid {
    display: grid;
    grid-template-columns: 1fr clamp(280px, 32%, 380px);
    gap: clamp(40px, 6vw, 96px);
    align-items: start;
  }
  .td-h2 {
    font-family: var(--font-title); font-weight: 400;
    font-size: clamp(24px, 3vw, 34px);
    letter-spacing: -.01em; color: var(--color-text-primary);
    margin: 0 0 28px;
  }
  .td-features { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .td-feature {
    display: flex; align-items: baseline; gap: 16px;
    font-size: clamp(14px, 1.3vw, 16px); font-weight: 300;
    line-height: 1.6; color: var(--color-text-secondary);
    padding: 16px 0; border-top: 1px solid var(--color-line);
  }
  .td-feature:last-child { border-bottom: 1px solid var(--color-line); }
  .td-feature-mark {
    width: 7px; height: 7px; flex-shrink: 0; transform: translateY(2px);
    border: 1px solid var(--color-accent); background: transparent;
  }

  /* side: spec + cta */
  .td-side { display: flex; flex-direction: column; gap: 28px; }
  .td-spec { display: flex; flex-direction: column; }
  .td-spec-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; padding: 13px 0; }
  .td-spec-lbl {
    font-family: var(--font-body); font-size: 11px;
    letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.4);
  }
  .td-spec-val { font-family: var(--font-body); font-size: 13px; letter-spacing: .03em; color: rgba(255,255,255,.9); }
  .td-spec-val--price { color: var(--color-accent); font-weight: 500; font-size: 15px; }
  .td-spec-sep { height: 1px; background: rgba(255,255,255,.07); }

  .td-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; box-sizing: border-box;
    padding: 17px 24px;
    font-family: var(--font-body); font-size: 12px;
    letter-spacing: .16em; text-transform: uppercase;
    color: var(--color-accent); text-decoration: none;
    background: transparent; border: 1px solid var(--color-accent);
    transition: background 350ms ease, color 350ms ease;
  }
  .td-btn:hover { background: var(--color-accent); color: var(--color-bg); }
  .td-btn:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }

  /* bottom strip */
  .td-strip {
    display: flex; align-items: stretch;
    border-top: 1px solid var(--color-line);
    margin-top: clamp(56px,8vh,96px);
    font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
    color: var(--color-text-meta);
  }
  .td-strip > span {
    display: flex; align-items: center;
    padding: 14px clamp(14px,2.5vw,36px);
    border-right: 1px solid var(--color-line); white-space: nowrap;
  }
  .td-strip > span:first-child { padding-left: 0; }
  .td-strip-fill { flex: 1; border-right: none !important; }

  @media (prefers-reduced-motion: reduce) {
    .td-back, .td-btn { transition: none !important; }
  }
  @media (max-width: 860px) {
    .td-grid { grid-template-columns: 1fr; gap: 40px; }
    .td-side { order: -1; }
  }
`;
