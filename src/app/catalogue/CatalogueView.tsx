'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { PDF_FILE, PDF_DOWNLOAD_NAME, PDFJS_DIR } from './files';

/* decimal megabytes, as file managers show them: 14 508 132 bytes → "14.5 MB" */
const mb = (bytes: number) => (bytes ? `${(bytes / 1e6).toFixed(1)} MB` : '');

type Stage = 'idle' | 'loading' | 'ready' | 'error';

/* the parts of PDF.js this page uses */
type PdfViewport = { width: number; height: number };
type PdfPage = {
  getViewport(o: { scale: number }): PdfViewport;
  render(o: { canvasContext: CanvasRenderingContext2D; viewport: PdfViewport }): { promise: Promise<void>; cancel(): void };
};
type PdfDoc = { numPages: number; getPage(n: number): Promise<PdfPage>; destroy(): Promise<void> };

export default function CatalogueView({ pdfBytes }: { pdfBytes: number }) {
  const { t } = useLanguage();
  const [stage, setStage] = useState<Stage>('idle');
  const [pages, setPages] = useState(0);
  const [ratio, setRatio] = useState(595 / 842);
  const scrollRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<PdfDoc | null>(null);

  /* Load PDF.js and open the file only after the visitor asks. The file is read as it is; PDF.js only draws it. */
  useEffect(() => {
    if (stage !== 'loading') return;
    let cancelled = false;
    (async () => {
      try {
        const lib = `${PDFJS_DIR}/pdf.min.mjs`;
        const pdfjs = await import(/* webpackIgnore: true */ lib);
        pdfjs.GlobalWorkerOptions.workerSrc = `${PDFJS_DIR}/pdf.worker.min.mjs`;
        // pages stream in as they are needed (range requests) instead of waiting for the whole file
        // verbosity 0: errors only (PDF.js otherwise notes, harmlessly, that some shadings are drawn in JS rather than wasm)
        const doc: PdfDoc = await pdfjs.getDocument({ url: PDF_FILE, isEvalSupported: false, disableAutoFetch: true, verbosity: 0 }).promise;
        if (cancelled) { doc.destroy(); return; }
        const first = (await doc.getPage(1)).getViewport({ scale: 1 });
        docRef.current = doc;
        setRatio(first.height / first.width);
        setPages(doc.numPages);
        setStage('ready');
      } catch (err) {
        console.error('[catalogue] preview failed:', err);
        if (!cancelled) setStage('error');
      }
    })();
    return () => { cancelled = true; };
  }, [stage]);

  useEffect(() => () => { docRef.current?.destroy(); }, []);

  /* Draw a page when it scrolls near the view and release it when it is far away, so a phone never holds
     all fourteen canvases at once. */
  useEffect(() => {
    if (stage !== 'ready' || !scrollRef.current) return;
    const root = scrollRef.current;
    const tasks = new Map<HTMLCanvasElement, { cancel(): void }>();

    const draw = async (canvas: HTMLCanvasElement) => {
      const doc = docRef.current;
      if (!doc || canvas.dataset.drawn) return;
      canvas.dataset.drawn = '1';
      try {
        const page = await doc.getPage(Number(canvas.dataset.page));
        const base = page.getViewport({ scale: 1 });
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale: (canvas.clientWidth * dpr) / base.width });
        canvas.width = Math.round(viewport.width);
        canvas.height = Math.round(viewport.height);
        const task = page.render({ canvasContext: canvas.getContext('2d')!, viewport });
        tasks.set(canvas, task);
        await task.promise;
        canvas.parentElement?.setAttribute('data-drawn', '1');
      } catch {
        /* a cancelled render (page scrolled away) is expected */
      } finally {
        tasks.delete(canvas);
      }
    };
    const release = (canvas: HTMLCanvasElement) => {
      tasks.get(canvas)?.cancel();
      delete canvas.dataset.drawn;
      canvas.parentElement?.removeAttribute('data-drawn');
      canvas.width = 0;
      canvas.height = 0;
    };

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const canvas = e.target.querySelector('canvas');
        if (!canvas) continue;
        if (e.isIntersecting) draw(canvas);
        else release(canvas);
      }
    }, { root, rootMargin: '150% 0px' });
    root.querySelectorAll('.cg-page').forEach((el) => io.observe(el));
    return () => { io.disconnect(); tasks.forEach((task) => task.cancel()); };
  }, [stage, pages]);

  const pdfSize = mb(pdfBytes);
  const covered = stage !== 'ready';

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

        /* ── actions ── */
        .cg-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 32px; margin-bottom: clamp(32px, 5vh, 56px); }
        .cg .btn-primary { font-size: 11px; padding: 15px 26px; }
        .cg .btn-primary:focus-visible, .cg .btn-ghost:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }
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

        /* the pages, stacked and scrolled inside the frame */
        .cg-pages {
          position: absolute; inset: 0; overflow-y: auto; overscroll-behavior: contain;
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          padding: clamp(12px, 2vw, 24px);
          scrollbar-width: thin; scrollbar-color: var(--color-border) transparent;
        }
        .cg-page {
          position: relative; flex: none; width: 100%; max-width: 1180px;
          background: #1a1916; box-shadow: 0 0 0 1px var(--color-border);
        }
        .cg-page canvas { display: block; width: 100%; height: 100%; opacity: 0; transition: opacity 400ms ease; }
        .cg-page[data-drawn] canvas { opacity: 1; }
        .cg-page-no {
          position: absolute; right: 10px; bottom: 8px; z-index: 1;
          font-size: 10px; letter-spacing: .14em; color: var(--color-text-meta);
        }
        .cg-page[data-drawn] .cg-page-no { display: none; }

        /* idle / loading / error cover: a quiet drawing-grid ground */
        .cg-cover {
          position: absolute; inset: 0; z-index: 2;
          display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;
          padding: 24px; text-align: center;
          background:
            linear-gradient(rgba(232, 228, 220, .035) 1px, transparent 1px) 0 0 / 48px 48px,
            linear-gradient(90deg, rgba(232, 228, 220, .035) 1px, transparent 1px) 0 0 / 48px 48px,
            radial-gradient(ellipse 70% 60% at 50% 40%, rgba(184, 149, 106, .07), transparent 70%),
            #0d0d0b;
        }
        .cg-cover-mark { font-family: var(--font-title); font-size: clamp(28px, 4vw, 44px); letter-spacing: -0.02em; color: var(--color-text-primary); }
        .cg-note { margin: 0; max-width: 44ch; font-size: 12px; line-height: 1.6; color: var(--color-text-meta); }
        .cg-progress { width: min(220px, 60%); height: 1px; background: var(--color-border); overflow: hidden; }
        .cg-progress::after { content: ''; display: block; width: 40%; height: 100%; background: var(--color-accent); animation: cgSlide 1.4s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
        @keyframes cgSlide { from { transform: translateX(-100%); } to { transform: translateX(250%); } }
        .cg-status { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--color-text-secondary); }
        @media (prefers-reduced-motion: reduce) {
          .cg-progress::after { animation: none; width: 100%; opacity: .5; }
          .cg-page canvas { transition: none; }
        }

        @media (max-width: 760px) {
          .cg-view { height: 72svh; min-height: 380px; }
          .cg-bar { padding: 0 12px; }
          .cg-bar .cg-bar-meta { display: none; }
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
          <a className="btn-ghost" href={PDF_FILE} target="_blank" rel="noopener">
            {t('catalogue.openFull')} ↗
          </a>
        </div>

        <section className="cg-frame" aria-label={t('catalogue.pdfLabel')}>
          <div className="cg-bar">
            <span>
              <b>{t('catalogue.pdfLabel')}</b>
              <span className="cg-bar-meta" dir="ltr">
                {pdfSize && ` · PDF · ${pdfSize}`}
                {pages > 0 && ` · ${t('catalogue.pages').replace('{n}', String(pages))}`}
              </span>
            </span>
            <a href={PDF_FILE} target="_blank" rel="noopener">{t('catalogue.openFull')} ↗</a>
          </div>

          <div className="cg-view">
            {stage === 'ready' && (
              <div className="cg-pages" ref={scrollRef} tabIndex={0} aria-label={t('catalogue.pdfLabel')}>
                {Array.from({ length: pages }, (_, i) => (
                  <div key={i} className="cg-page" style={{ aspectRatio: `1 / ${ratio}` }}>
                    <canvas data-page={i + 1} aria-label={`${i + 1} / ${pages}`} role="img" />
                    <span className="cg-page-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                ))}
              </div>
            )}

            {covered && (
              <div className="cg-cover">
                <span className="cg-cover-mark">AMD NSRI</span>
                {stage === 'idle' && (
                  <>
                    <button type="button" className="btn-primary" onClick={() => setStage('loading')}>
                      <span>{t('catalogue.loadPreview')}</span>
                    </button>
                    <p className="cg-note">{t('catalogue.previewNote').replace('{size}', pdfSize || '—')}</p>
                  </>
                )}
                {stage === 'loading' && (
                  <>
                    <div className="cg-progress" aria-hidden="true" />
                    <span className="cg-status" role="status">{t('catalogue.loading')}</span>
                  </>
                )}
                {stage === 'error' && (
                  <p className="cg-note" role="alert">{t('catalogue.previewError')}</p>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
