'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * /identity — a one-screen "about": hero and statement side by side, method and
 * disciplines side by side, then the closing line and the two CTAs.
 * The name origin folds into the statement; the founder bio is the statement body.
 * All visible copy is keyed via t('about.*') so it switches with EN/TR/AR.
 */
export default function IdentityPage() {
  const { t } = useLanguage();
  const flow = [
    t('about.flowConcept'),
    t('about.flowGeometry'),
    t('about.flowSystem'),
    t('about.flowTool'),
    t('about.flowFabrication'),
    t('about.flowBuilt'),
  ];
  const disciplines = [
    [t('about.disc1Title'), t('about.disc1Body')],
    [t('about.disc2Title'), t('about.disc2Body')],
    [t('about.disc3Title'), t('about.disc3Body')],
  ];
  return (
    <main className="id">
      <div className="id-glow" aria-hidden="true" />

      {/* ── HERO + STATEMENT ─────────────────────────────────────── */}
      <section className="id-top">
        <header className="id-hero">
          <h1 className="id-wordmark">AMD NSRI</h1>
          {/* only the word is Arabic: a lang="ar" wrapper would pull the gloss into RTL via the global [lang="ar"] span rule */}
          <p className="id-amad">
            <span className="id-amad-word" dir="rtl" lang="ar">أَمَد</span>
            <span className="id-amad-en">{t('about.amadEn')}</span>
          </p>
          <p className="id-subline">{t('common.istanbul')} · {t('common.est2026')}</p>
        </header>

        <div className="id-statement">
          <p className="id-eyebrow">{t('about.stmtEyebrow')}</p>
          <p className="id-lead">{t('about.stmtLead')}</p>
          <p className="id-body">{t('about.stmtBody')}</p>
          <p className="id-body id-name">
            <b>AMD</b> {t('about.nameAmdPre')}<span dir="rtl" lang="ar">أَمَد</span>{t('about.nameAmdPost')}{' '}
            <b>NSRI</b> {t('about.nameNsri')}
          </p>
        </div>
      </section>

      <div className="id-rule" />

      {/* ── METHOD + DISCIPLINES ─────────────────────────────────── */}
      <section className="id-mid">
        <div className="id-approach">
          <p className="id-eyebrow">{t('about.approachEyebrow')}</p>
          <h2 className="id-h2">{t('about.approachTitle')}</h2>
          <ol className="id-flow" aria-label={t('about.approachTitle')}>
            {flow.map((stage, i) => (
              <li key={i} className="id-flow-step">
                <span className="id-flow-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="id-flow-label">{stage}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="id-practice">
          <p className="id-eyebrow">{t('about.practiceEyebrow')}</p>
          <h2 className="id-h2">{t('about.practiceTitle')}</h2>
          <div className="id-disc-grid">
            {disciplines.map(([title, body], i) => (
              <div key={i} className="id-disc">
                <h3 className="id-disc-title">
                  <span className="id-disc-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {title}
                </h3>
                <p className="id-body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="id-rule" />

      {/* ── CLOSING / CTA ────────────────────────────────────────── */}
      <section className="id-cta">
        <p className="id-cta-line">
          {t('about.ctaLine1')}<br />{' '}{t('about.ctaLine2')}
        </p>
        <div className="id-cta-actions">
          <Link href="/contact" className="id-btn id-btn--solid">{t('about.ctaSolid')}</Link>
          <Link href="/architecture" className="id-btn">{t('about.ctaGhost')}</Link>
        </div>
      </section>

      <div className="id-strip" aria-hidden="true">
        <span>AMD NSRI</span>
        <span>{t('nav.identity')}</span>
        <span>{t('common.istanbul')} · {t('common.est2026')}</span>
        <span className="id-strip-fill" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* one screen: gaps scale with viewport height so the three bands fit under the 72px nav.
           The page is exactly a screen tall and any spare height is shared out between the bands
           (space-between), so there is never one empty block above or below the strip. */
        .id {
          position: relative;
          display: flex; flex-direction: column; justify-content: space-between;
          min-height: 100vh; min-height: 100svh;
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: calc(72px + clamp(20px, 4vh, 48px)) clamp(24px, 6vw, 120px) 0;
        }
        .id-glow {
          position: absolute; inset: 0 0 auto 0; height: 60%; z-index: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 20% 20%, rgba(184,149,106,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 85% 40%, rgba(26,32,48,0.12) 0%, transparent 60%);
        }
        .id > section, .id > .id-rule, .id > .id-strip { position: relative; z-index: 1; }

        /* shared primitives */
        .id-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-accent); margin: 0 0 clamp(10px, 1.6vh, 16px);
        }
        .id-eyebrow::before {
          content: ''; display: block; width: 28px; height: 1px;
          background: var(--color-accent); opacity: .7;
        }
        .id-h2 {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(20px, 1.9vw, 28px);
          letter-spacing: -0.02em; line-height: 1.1;
          color: var(--color-text-primary); margin: 0 0 clamp(12px, 2vh, 20px);
        }
        .id-body {
          font-family: var(--font-body); font-size: 13px;
          font-weight: 300; letter-spacing: .01em; line-height: 1.7;
          color: var(--color-text-secondary); margin: 0; max-width: 62ch;
        }
        .id-rule { height: 1px; background: var(--color-line); margin: clamp(20px, 4vh, 44px) 0; flex: none; }

        /* ── hero + statement ── */
        .id-top {
          display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
          gap: clamp(32px, 5vw, 96px); align-items: end;
        }
        .id-wordmark {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(56px, min(8.4vw, 13vh), 132px);
          letter-spacing: -0.04em; line-height: .9;
          color: var(--color-text-primary); margin: 0 0 clamp(14px, 2.4vh, 24px);
        }
        .id-amad {
          font-family: var(--font-body); font-size: 13px;
          font-weight: 300; letter-spacing: .02em; line-height: 1.7;
          color: var(--color-text-secondary); margin: 0 0 10px;
          display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 12px;
        }
        .id-amad-word { font-family: var(--font-title), serif; font-size: 20px; color: var(--color-accent); }
        .id-subline {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .18em; text-transform: uppercase;
          color: var(--color-accent); margin: 0;
        }
        .id-statement { display: flex; flex-direction: column; gap: clamp(8px, 1.4vh, 14px); }
        .id-statement .id-eyebrow { margin-bottom: 0; }
        .id-lead {
          font-family: var(--font-title); font-style: italic; font-weight: 400;
          font-size: clamp(19px, min(1.9vw, 3vh), 27px);
          letter-spacing: -0.01em; line-height: 1.35;
          color: var(--color-text-primary); margin: 0; max-width: 34ch;
        }
        .id-name b { font-weight: 500; letter-spacing: .2em; color: var(--color-accent); }
        .id-name span[dir="rtl"] { color: var(--color-accent); padding: 0 2px; }

        /* ── method + disciplines ── */
        .id-mid {
          display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
          gap: clamp(32px, 5vw, 96px); align-items: stretch;
        }
        /* both columns share the row height: the six steps (01–03, 04–06 down two columns)
           spread down the left column so it ends on the same line as the disciplines */
        .id-approach, .id-practice { display: flex; flex-direction: column; }
        /* and when the steps are the taller side, the disciplines drop as one block to meet them */
        .id-disc-grid { margin-top: auto; }
        .id-flow {
          list-style: none; margin: 0; padding: 0; flex: 1;
          display: grid; grid-template-columns: repeat(2, auto); grid-template-rows: repeat(3, auto);
          grid-auto-flow: column; justify-content: start; align-content: space-between;
          /* a small minimum row gap keeps this column the shorter one; space-between stretches it */
          gap: 4px clamp(28px, 3.4vw, 56px);
        }
        .id-flow-step { display: inline-flex; align-items: baseline; gap: 8px; }
        .id-flow-num { font-size: 10px; letter-spacing: .12em; color: var(--color-accent); }
        .id-flow-label {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(16px, 1.4vw, 20px); letter-spacing: -.01em;
          color: var(--color-text-primary);
        }
        .id-disc-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(16px, 2vw, 32px); }
        .id-disc-title {
          display: flex; flex-direction: column; gap: 6px;
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(15px, 1.25vw, 18px); letter-spacing: -.01em; line-height: 1.2;
          color: var(--color-text-primary); margin: 0 0 8px;
          padding-top: 10px; border-top: 1px solid var(--color-line);
        }
        .id-disc-no { font-family: var(--font-body); font-size: 10px; letter-spacing: .2em; color: var(--color-accent-dim); }
        .id-disc .id-body { font-size: 12px; line-height: 1.6; }

        /* ── closing / cta ── */
        .id-cta {
          display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between;
          gap: 20px 40px; padding-bottom: clamp(20px, 4vh, 44px);
        }
        .id-cta-line {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(28px, min(3.6vw, 5.6vh), 52px);
          letter-spacing: -0.03em; line-height: 1.02;
          color: var(--color-text-primary); margin: 0;
        }
        .id-cta-actions { display: flex; flex-wrap: wrap; gap: 12px; }
        .id-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 15px 26px;
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .16em; text-transform: uppercase;
          color: var(--color-accent); text-decoration: none;
          background: transparent; border: 1px solid var(--color-accent);
          transition: background 350ms ease, color 350ms ease;
        }
        .id-btn:hover { background: var(--color-accent); color: var(--color-bg); }
        .id-btn:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }
        .id-btn--solid { background: var(--color-accent); color: var(--color-bg); }
        .id-btn--solid:hover { background: transparent; color: var(--color-accent); }

        /* ── bottom strip ── */
        .id-strip {
          display: flex; align-items: stretch;
          border-top: 1px solid var(--color-line);
          font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .id-strip > span {
          display: flex; align-items: center;
          padding: 12px clamp(14px,2.5vw,36px);
          border-inline-end: 1px solid var(--color-line); white-space: nowrap;
        }
        .id-strip > span:first-child { padding-inline-start: 0; }
        .id-strip-fill { flex: 1; border-inline-end: none !important; }

        @media (prefers-reduced-motion: reduce) {
          .id-btn { transition: none !important; }
        }
        /* short desktop windows (laptops): tighter rhythm, the statement runs wider, the closing
           line sits on one line and the strip (which repeats the hero subline) steps aside */
        @media (min-width: 961px) and (max-height: 920px) {
          .id { padding-top: calc(72px + 2.5vh); }
          .id-rule { margin: 2.4vh 0; }
          .id-cta { padding-bottom: 2.5vh; }
          .id-lead { max-width: 46ch; font-size: clamp(17px, 2.7vh, 22px); }
          .id-statement { gap: 1vh; }
          .id-cta-line { font-size: clamp(24px, 4.4vh, 36px); }
          .id-cta-line br { display: none; }
          .id-strip { display: none; }
        }
        /* narrow screens stack; one screen is a desktop goal, phones scroll a short page */
        @media (max-width: 960px) {
          .id-top, .id-mid { grid-template-columns: 1fr; gap: 28px; }
          .id-flow { align-content: start; }
          .id-wordmark { font-size: clamp(52px, 15vw, 96px); }
        }
        @media (max-width: 560px) {
          .id-disc-grid { grid-template-columns: 1fr; gap: 14px; }
          .id-strip > span:nth-child(2) { display: none; }
        }
      ` }} />
    </main>
  );
}
