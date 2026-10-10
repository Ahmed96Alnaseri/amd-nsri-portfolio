'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { WEB_FILE, PDF_FILE, PDF_DOWNLOAD_NAME } from './files';

/* decimal megabytes, as file managers show them: 6 400 226 bytes → "6.4 MB" */
const mb = (bytes: number) => (bytes ? `${(bytes / 1e6).toFixed(1)} MB` : '');

type Stage = 'idle' | 'loading' | 'ready';

export default function CatalogueView({ webBytes, pdfBytes }: { webBytes: number; pdfBytes: number }) {
  const { t } = useLanguage();
  const [stage, setStage] = useState<Stage>('idle');
  const frameRef = useRef<HTMLIFrameElement>(null);

  /* The web edition is a self-unpacking bundle: its own loading screen is light, so the frame stays
     covered by ours until the bundle has removed its "Unpacking…" marker (same origin, so readable).
     If that never shows up, the frame is revealed after 25 s anyway. */
  useEffect(() => {
    if (stage !== 'loading') return;
    const started = Date.now();
    const timer = window.setInterval(() => {
      let unpacked = false;
      try {
        const doc = frameRef.current?.contentDocument;
        // the frame starts on about:blank, which also has no marker, so wait for the catalogue's own document
        unpacked = !!doc && doc.URL.includes(WEB_FILE) && doc.readyState === 'complete' && !doc.getElementById('__bundler_loading');
      } catch {
        unpacked = true;
      }
      if (unpacked || Date.now() - started > 25000) {
        window.clearInterval(timer);
        setStage('ready');
      }
    }, 250);
    return () => window.clearInterval(timer);
  }, [stage]);

  const webSize = mb(webBytes);
  const pdfSize = mb(pdfBytes);

  return (
    <main className="cg">
      <style dangerouslySetInnerHTML={{ __html: `
        .cg {
          background: var(--color-bg); color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: clamp(96px, 12vh, 140px) clamp(16px, 4vw, 64px) clamp(48px, 8vh, 96px);
          min-height: 100vh;
        }
        .cg-inner { max-width: 1280px; margin: 0 auto; }
        .cg-rule { height: 1px; background: var(--color-border); margin-bottom: clamp(40px, 6vh, 72px); }
        .cg-eyebrow {
          display: flex; align-items: center; gap: 12px; margin: 0 0 28px;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--color-accent);
        }
        .cg-eyebrow::before { content: ''; width: 28px; height: 1px; background: var(--color-accent); opacity: .7; }
        .cg-title {
          margin: 0 0 28px; max-width: 16ch;
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(40px, 6.4vw, 96px); line-height: 1; letter-spacing: -0.03em;
        }
        .cg-desc {
          margin: 0 0 clamp(32px, 5vh, 48px); max-width: 62ch;
          font-size: clamp(14px, 1.3vw, 16px); font-weight: 300; line-height: 1.7; letter-spacing: .02em;
          color: var(--color-text-secondary);
        }

        /* ── the two editions ── */
        .cg-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 32px; margin-bottom: clamp(32px, 5vh, 56px); }
        .cg .btn-primary { font-size: 11px; padding: 15px 26px; }
        .cg .btn-primary:focus-visible, .cg .btn-ghost:focus-visible, .cg-load:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }
        .cg-btn-dl { border-color: var(--color-accent-dim); }
        .cg-size { color: var(--color-text-meta); transition: color 350ms ease; }
        .cg .btn-primary:hover .cg-size { color: rgba(13, 13, 11, .65); }
        .cg .btn-ghost { font-size: 11px; color: var(--color-text-secondary); }

        /* ── preview frame ── */
        .cg-frame { border: 1px solid var(--color-border); background: #100f0d; }
        .cg-bar {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          height: 44px; padding: 0 16px; border-bottom: 1px solid var(--color-border);
          font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--color-text-meta);
        }
        .cg-bar b { font-weight: 400; color: var(--color-text-secondary); }
        .cg-bar a { color: var(--color-accent); text-decoration: none; white-space: nowrap; transition: opacity 400ms ease; }
        .cg-bar a:hover { opacity: .75; }
        .cg-view { position: relative; height: min(78vh, 880px); min-height: 420px; overflow: hidden; }
        .cg-view iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; background: #0d0d0b; opacity: 0; transition: opacity 600ms ease; }
        .cg-view[data-stage="ready"] iframe { opacity: 1; }

        /* idle and loading cover: a quiet drawing-grid ground with the call to load */
        .cg-cover {
          position: absolute; inset: 0; z-index: 1;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;
          padding: 24px; text-align: center;
          background:
            linear-gradient(rgba(232, 228, 220, .035) 1px, transparent 1px) 0 0 / 48px 48px,
            linear-gradient(90deg, rgba(232, 228, 220, .035) 1px, transparent 1px) 0 0 / 48px 48px,
            radial-gradient(ellipse 70% 60% at 50% 40%, rgba(184, 149, 106, .07), transparent 70%),
            #0d0d0b;
          transition: opacity 600ms ease, visibility 600ms;
        }
        .cg-view[data-stage="ready"] .cg-cover { opacity: 0; visibility: hidden; }
        .cg-cover-mark { font-family: var(--font-title); font-size: clamp(28px, 4vw, 44px); letter-spacing: -0.02em; color: var(--color-text-primary); }
        .cg-note { margin: 0; max-width: 40ch; font-size: 12px; line-height: 1.6; color: var(--color-text-meta); }
        .cg-load { font-family: var(--font-body); }
        .cg-progress { width: min(220px, 60%); height: 1px; background: var(--color-border); overflow: hidden; }
        .cg-progress::after { content: ''; display: block; width: 40%; height: 100%; background: var(--color-accent); animation: cgSlide 1.4s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        @keyframes cgSlide { from { transform: translateX(-100%); } to { transform: translateX(250%); } }
        .cg-status { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--color-text-secondary); }
        @media (prefers-reduced-motion: reduce) {
          .cg-progress::after { animation: none; width: 100%; opacity: .5; }
          .cg-view iframe, .cg-cover { transition: none; }
        }

        @media (max-width: 760px) {
          .cg-view { height: 72svh; min-height: 380px; }
          .cg-bar { padding: 0 12px; }
          .cg-bar .cg-bar-size { display: none; }
          .cg-actions { flex-direction: column; align-items: stretch; }
          .cg .btn-primary { justify-content: center; }
          .cg .btn-ghost { align-self: flex-start; }
        }
      ` }} />

      <div className="cg-inner">
        <div className="cg-rule" />
        <p className="cg-eyebrow">{t('catalogue.eyebrow')}</p>
        <h1 className="cg-title">{t('catalogue.title')}</h1>
        <p className="cg-desc">{t('catalogue.desc')}</p>

        <div className="cg-actions">
          <a className="btn-primary cg-btn-dl" href={PDF_FILE} download={PDF_DOWNLOAD_NAME} type="application/pdf">
            <span>{t('catalogue.download')} ↓</span>
            {pdfSize && <span className="cg-size" dir="ltr">PDF · {pdfSize}</span>}
          </a>
          <a className="btn-ghost" href={WEB_FILE} target="_blank" rel="noopener">
            {t('catalogue.openFull')} ↗
          </a>
        </div>

        <section className="cg-frame" aria-label={t('catalogue.webLabel')}>
          <div className="cg-bar">
            <span><b>{t('catalogue.webLabel')}</b>{webSize && <span className="cg-bar-size" dir="ltr"> · HTML · {webSize}</span>}</span>
            <a href={WEB_FILE} target="_blank" rel="noopener">{t('catalogue.openFull')} ↗</a>
          </div>

          <div className="cg-view" data-stage={stage}>
            {stage !== 'idle' && (
              <iframe ref={frameRef} src={WEB_FILE} title={t('catalogue.frameTitle')} />
            )}
            <div className="cg-cover" aria-hidden={stage === 'ready'}>
              <span className="cg-cover-mark">AMD NSRI</span>
              {stage === 'idle' ? (
                <>
                  <button type="button" className="btn-primary cg-load" onClick={() => setStage('loading')}>
                    <span>{t('catalogue.loadPreview')}</span>
                  </button>
                  <p className="cg-note">{t('catalogue.previewNote').replace('{size}', webSize || '—')}</p>
                </>
              ) : (
                <>
                  <div className="cg-progress" aria-hidden="true" />
                  <span className="cg-status" role="status">{t('catalogue.loading')}</span>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
