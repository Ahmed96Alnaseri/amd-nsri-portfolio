'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * /identity — a single editorial page telling the story of the practice.
 * Not a portfolio grid: long-form, architectural, restrained.
 *
 * Copy is grounded in the brief + CLAUDE.md brand content. A few sections
 * (The Name → NSRI, Approach, The Practice, Founder, closing) extend past the
 * brief, which was cut off mid-sentence — they follow the documented voice.
 * All visible copy is keyed via t('about.*') so it switches with EN/TR/AR.
 */
export default function IdentityPage() {
  const { t } = useLanguage();
  return (
    <main className="id">
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <header className="id-hero">
        <div className="id-hero-glow" aria-hidden="true" />
        <h1 className="id-wordmark">AMD NSRI</h1>
        <p className="id-amad" dir="rtl" lang="ar">
          أَمَد
          <span className="id-amad-en" dir="ltr" lang="en">
            {t('about.amadEn')}
          </span>
        </p>
        <p className="id-subline">{t('common.istanbul')} · {t('common.est2026')}</p>
      </header>

      {/* ── 2. STATEMENT ────────────────────────────────────────── */}
      <section className="id-section id-statement">
        <p className="id-eyebrow">{t('about.stmtEyebrow')}</p>
        <p className="id-lead">
          {t('about.stmtLead')}
        </p>
        <p className="id-body">
          {t('about.stmtBody')}
        </p>
      </section>

      <div className="id-rule" />

      {/* ── 3. THE NAME ─────────────────────────────────────────── */}
      <section className="id-section id-name">
        <p className="id-eyebrow">{t('about.nameEyebrow')}</p>
        <h2 className="id-h2">{t('about.nameTitle')}</h2>

        <div className="id-name-grid">
          <div className="id-name-glyph" aria-hidden="true" dir="rtl" lang="ar">أَمَد</div>

          <div className="id-name-blocks">
            <div className="id-name-block">
              <span className="id-mono-mark">AMD</span>
              <p className="id-body">
                {t('about.amdPre')}<em>Ahmed</em>{t('about.amdMid')}
                <span dir="rtl" lang="ar">أَمَد</span>{t('about.amdParen')}<em>AMD</em>{t('about.amdPost')}
              </p>
            </div>

            <div className="id-name-block">
              <span className="id-mono-mark">NSRI</span>
              <p className="id-body">
                {t('about.nsriPre')}<em>Alnaseri</em>{t('about.nsriPost')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="id-rule" />

      {/* ── 4. APPROACH ─────────────────────────────────────────── */}
      <section className="id-section id-approach">
        <p className="id-eyebrow">{t('about.approachEyebrow')}</p>
        <h2 className="id-h2">{t('about.approachTitle')}</h2>
        <p className="id-body id-body--wide">
          {t('about.approachBody')}
        </p>

        <ol className="id-flow" aria-label={t('about.approachTitle')}>
          {[
            t('about.flowConcept'),
            t('about.flowGeometry'),
            t('about.flowSystem'),
            t('about.flowTool'),
            t('about.flowFabrication'),
            t('about.flowBuilt'),
          ].map((stage, i, arr) => (
            <li key={i} className="id-flow-step">
              <span className="id-flow-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="id-flow-label">{stage}</span>
              {i < arr.length - 1 && (
                <span className="id-flow-arrow" aria-hidden="true">→</span>
              )}
            </li>
          ))}
        </ol>
      </section>

      <div className="id-rule" />

      {/* ── 5. THE PRACTICE ─────────────────────────────────────── */}
      <section className="id-section id-practice">
        <p className="id-eyebrow">{t('about.practiceEyebrow')}</p>
        <h2 className="id-h2">{t('about.practiceTitle')}</h2>

        <div className="id-disc-grid">
          <div className="id-disc">
            <span className="id-disc-no" aria-hidden="true">01</span>
            <h3 className="id-disc-title">{t('about.disc1Title')}</h3>
            <p className="id-body">
              {t('about.disc1Body')}
            </p>
          </div>
          <div className="id-disc">
            <span className="id-disc-no" aria-hidden="true">02</span>
            <h3 className="id-disc-title">{t('about.disc2Title')}</h3>
            <p className="id-body">
              {t('about.disc2Body')}
            </p>
          </div>
          <div className="id-disc">
            <span className="id-disc-no" aria-hidden="true">03</span>
            <h3 className="id-disc-title">{t('about.disc3Title')}</h3>
            <p className="id-body">
              {t('about.disc3Body')}
            </p>
          </div>
        </div>
      </section>

      <div className="id-rule" />

      {/* ── 6. FOUNDER ──────────────────────────────────────────── */}
      <section className="id-section id-founder">
        <p className="id-eyebrow">{t('about.founderEyebrow')}</p>
        <div className="id-founder-grid">
          <h2 className="id-h2 id-founder-name">Ahmed Alnaseri</h2>
          <div className="id-founder-text">
            <p className="id-body">
              {t('about.founderBody1')}
            </p>
            <p className="id-body">
              {t('about.founderBody2')}
            </p>
          </div>
        </div>
      </section>

      {/* ── 7. CLOSING / CTA ────────────────────────────────────── */}
      <section className="id-cta">
        <p className="id-cta-line">
          {t('about.ctaLine1')}<br />{t('about.ctaLine2')}
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

      <style>{`
        .id {
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: 0 clamp(24px, 6vw, 120px) clamp(32px, 4vh, 56px);
          min-height: 100vh;
        }

        /* shared editorial primitives */
        .id-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-accent); margin: 0 0 26px;
        }
        .id-eyebrow::before {
          content: ''; display: block; width: 28px; height: 1px;
          background: var(--color-accent); opacity: .7;
        }
        .id-h2 {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(30px, 4.4vw, 56px);
          letter-spacing: -0.025em; line-height: 1.05;
          color: var(--color-text-primary); margin: 0 0 28px; max-width: 18ch;
        }
        .id-body {
          font-family: var(--font-body); font-size: clamp(14px, 1.4vw, 16px);
          font-weight: 300; letter-spacing: .01em; line-height: 1.85;
          color: var(--color-text-secondary); margin: 0 0 20px; max-width: 60ch;
        }
        .id-body em { font-style: italic; color: var(--color-text-primary); }
        .id-body--wide { max-width: 68ch; }
        .id-rule {
          height: 1px; background: var(--color-line);
          margin: clamp(64px, 10vh, 120px) 0;
        }
        .id-section { position: relative; }

        /* ── 1. hero ── */
        .id-hero {
          position: relative;
          padding: clamp(140px, 22vh, 240px) 0 clamp(80px, 12vh, 140px);
        }
        .id-hero-glow {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background:
            linear-gradient(to right, #0d0d0b 0%, transparent 20%),
            radial-gradient(ellipse 70% 60% at 20% 20%, rgba(184,149,106,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 85% 40%, rgba(26,32,48,0.14) 0%, transparent 60%);
        }
        .id-wordmark {
          position: relative; z-index: 1;
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(64px, 14vw, 200px);
          letter-spacing: -0.04em; line-height: .9;
          color: var(--color-text-primary); margin: 0 0 32px;
        }
        .id-amad {
          position: relative; z-index: 1;
          font-family: var(--font-body); font-size: clamp(13px, 1.5vw, 16px);
          font-weight: 300; letter-spacing: .02em; line-height: 1.8;
          color: var(--color-text-secondary); margin: 0 0 18px; max-width: 60ch;
          display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 12px;
        }
        .id-amad-en { color: var(--color-text-secondary); }
        .id-subline {
          position: relative; z-index: 1;
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .18em; text-transform: uppercase;
          color: var(--color-accent); margin: 0;
        }

        /* ── 2. statement ── */
        .id-lead {
          font-family: var(--font-title); font-style: italic; font-weight: 400;
          font-size: clamp(22px, 2.8vw, 30px);
          letter-spacing: -0.01em; line-height: 1.4;
          color: var(--color-text-primary); margin: 0 0 clamp(32px, 5vh, 48px);
          max-width: 26ch;
        }

        /* ── 3. the name ── */
        .id-name-grid {
          display: grid; grid-template-columns: clamp(180px, 22vw, 280px) 1fr;
          gap: clamp(32px, 6vw, 88px); align-items: start;
        }
        .id-name-glyph {
          font-family: var(--font-title), serif;
          font-size: clamp(96px, 14vw, 200px); line-height: .9;
          color: var(--color-accent); opacity: .85;
          letter-spacing: 0;
        }
        .id-name-blocks { display: flex; flex-direction: column; gap: clamp(28px, 4vh, 44px); }
        .id-name-block { display: flex; flex-direction: column; gap: 14px; }
        .id-mono-mark {
          font-family: var(--font-body); font-size: 13px; font-weight: 500;
          letter-spacing: .28em; text-transform: uppercase; color: var(--color-accent);
        }
        .id-name-block .id-body { margin: 0; }
        .id-name-block .id-body span[dir="rtl"] { color: var(--color-accent); padding: 0 2px; }

        /* ── 4. approach ── */
        .id-flow {
          list-style: none; margin: clamp(32px, 5vh, 52px) 0 0; padding: 0;
          display: flex; flex-wrap: wrap; align-items: center; gap: 10px 18px;
        }
        .id-flow-step { display: inline-flex; align-items: baseline; gap: 10px; }
        .id-flow-num {
          font-family: var(--font-body); font-size: 10px; letter-spacing: .12em;
          color: var(--color-text-meta);
        }
        .id-flow-label {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(18px, 2.2vw, 26px); letter-spacing: -.01em;
          color: var(--color-text-primary);
        }
        .id-flow-arrow {
          font-family: var(--font-body); font-size: clamp(16px, 1.8vw, 20px);
          color: var(--color-accent); margin-left: 8px;
        }

        /* ── 5. the practice ── */
        .id-disc-grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px, 4vw, 56px); margin-top: clamp(32px, 5vh, 52px);
        }
        .id-disc { display: flex; flex-direction: column; }
        .id-disc-no {
          font-family: var(--font-body); font-size: 11px; letter-spacing: .2em;
          color: var(--color-accent-dim); margin-bottom: 18px;
        }
        .id-disc-title {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(20px, 2.2vw, 26px); letter-spacing: -.01em; line-height: 1.15;
          color: var(--color-text-primary); margin: 0 0 16px;
          padding-top: 18px; border-top: 1px solid var(--color-line);
        }
        .id-disc .id-body { margin: 0; }

        /* ── 6. founder ── */
        .id-founder-grid {
          display: grid; grid-template-columns: clamp(220px, 28vw, 360px) 1fr;
          gap: clamp(32px, 6vw, 88px); align-items: start;
        }
        .id-founder-name { margin: 0; }
        .id-founder-text { display: flex; flex-direction: column; }
        .id-founder-text .id-body:last-child { margin-bottom: 0; }

        /* ── 7. closing / cta ── */
        .id-cta {
          padding: clamp(80px, 14vh, 180px) 0 clamp(56px, 9vh, 120px);
          display: flex; flex-direction: column; gap: clamp(36px, 5vh, 56px);
        }
        .id-cta-line {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(36px, 6vw, 84px);
          letter-spacing: -0.03em; line-height: 1.02;
          color: var(--color-text-primary); margin: 0;
        }
        .id-cta-actions { display: flex; flex-wrap: wrap; gap: 16px; }
        .id-btn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 17px 30px;
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
          padding: 14px clamp(14px,2.5vw,36px);
          border-right: 1px solid var(--color-line); white-space: nowrap;
        }
        .id-strip > span:first-child { padding-left: 0; }
        .id-strip-fill { flex: 1; border-right: none !important; }

        @media (prefers-reduced-motion: reduce) {
          .id-btn { transition: none !important; }
        }
        @media (max-width: 860px) {
          .id-name-grid, .id-founder-grid { grid-template-columns: 1fr; gap: 32px; }
          .id-disc-grid { grid-template-columns: 1fr; }
          .id-name-glyph { font-size: clamp(80px, 24vw, 140px); }
        }
      `}</style>
    </main>
  );
}
