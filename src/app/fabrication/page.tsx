'use client';

import { useState, useEffect, useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import fabricationProjects, {
  type FabricationProject,
  type FabricationCategory,
} from '@/data/fabrication-projects';

const FILTERS = ['All', 'Cladding', 'Perforated Panels', 'Shop Drawings', 'Unfolding'] as const;
type Filter = (typeof FILTERS)[number];

/* ── icons ─────────────────────────────────────────────────────────── */
const IcoType = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
    <path d="M7 1.5 12.5 4.5 7 7.5 1.5 4.5 7 1.5z" />
    <path d="M1.5 7 7 10 12.5 7" /><path d="M1.5 9.5 7 12.5 12.5 9.5" />
  </svg>
);
const IcoMaterial = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
    <path d="M3 1.5h5l3 3v8H3z" /><path d="M8 1.5v3h3" />
  </svg>
);
const IcoYear = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <rect x="1.5" y="2.5" width="11" height="10" rx="0.5" />
    <line x1="1.5" y1="6" x2="12.5" y2="6" />
    <line x1="4.5" y1="1" x2="4.5" y2="4" /><line x1="9.5" y1="1" x2="9.5" y2="4" />
  </svg>
);
const IcoLocation = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path d="M7 1.5C4.79 1.5 3 3.29 3 5.5c0 3.25 4 7 4 7s4-3.75 4-7c0-2.21-1.79-4-4-4z" />
    <circle cx="7" cy="5.5" r="1.3" />
  </svg>
);

/* ── shared info rows ───────────────────────────────────────────────── */
function InfoRows({ project }: { project: FabricationProject }) {
  const { t, tv } = useLanguage();
  return (
    <div className="fc-info">
      <div className="fc-row">
        <span className="fc-ico"><IcoType /></span>
        <span className="fc-lbl">{t('common.type')}</span>
        <span className="fc-val">{tv(project.type)}</span>
      </div>
      <div className="fc-sep" />
      <div className="fc-row">
        <span className="fc-ico"><IcoMaterial /></span>
        <span className="fc-lbl">{t('common.material')}</span>
        <span className="fc-val">{tv(project.material)}</span>
      </div>
      <div className="fc-sep" />
      <div className="fc-row">
        <span className="fc-ico"><IcoYear /></span>
        <span className="fc-lbl">{t('common.year')}</span>
        <span className="fc-val">{project.year}</span>
      </div>
      <div className="fc-sep" />
      <div className="fc-row">
        <span className="fc-ico"><IcoLocation /></span>
        <span className="fc-lbl">{t('common.location')}</span>
        <span className="fc-val">{tv(project.location)}</span>
      </div>
    </div>
  );
}

/* ── placeholder card (no imagery yet) ──────────────────────────────── */
function PlaceholderCard({ project }: { project: FabricationProject }) {
  const { t, tv } = useLanguage();
  const id = useId().replace(/:/g, '');
  return (
    <article className="fc">
      <div className="fc-main fc-main--ph">
        <div className="fc-perf" aria-hidden="true" />
        <div className="fc-ph-label">
          <span className="fc-ph-mark" aria-hidden="true">＋</span>
          <span className="fc-ph-title">{project.title}</span>
          <span className="fc-ph-status">{t('common.imageryPending')}</span>
        </div>
        <span className="fc-ph-corner fc-ph-corner--tl" aria-hidden="true" />
        <span className="fc-ph-corner fc-ph-corner--br" aria-hidden="true" />
      </div>

      <div className="fc-thumbs" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={`${id}-${i}`} className="fc-thumb fc-thumb--ph">
            <div className="fc-perf fc-perf--sm" />
          </div>
        ))}
      </div>

      <p className="fc-tags">{tv(project.category)} · {tv(project.type)} · {tv(project.material)}</p>
      <InfoRows project={project} />
    </article>
  );
}

/* ── real card (with imagery) ───────────────────────────────────────── */
function ProjectCard({ project, index }: { project: FabricationProject; index: number }) {
  const { t, tv } = useLanguage();
  const [current, setCurrent]   = useState(0);
  const [fading, setFading]     = useState(false);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft')  go(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox]);

  const go = (dir: 1 | -1) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(c => (c + dir + project.images.length) % project.images.length);
      setFading(false);
    }, 160);
  };

  const jumpTo = (i: number) => {
    if (i === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 160);
  };

  const img       = project.images[current];
  const href      = project.detailHref ?? '#';
  const thumbs    = project.images.slice(1);          // skip the one shown in main
  const shown     = thumbs.slice(0, 4);
  const overflowN = project.images.length - 5;        // images beyond main + 4 thumbs

  /* main image — Link when detailHref exists, otherwise a plain div */
  const MainInner = (
    <div className="fc-main">
      <div className="fc-img-wrap" style={{ opacity: fading ? 0 : 1, transition: 'opacity 160ms ease' }}>
        <Image
          src={img.src}
          alt={img.subtitle}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index === 0}
        />
      </div>

      <div className="fc-gradient" aria-hidden="true" />

      <div className="fc-glass" aria-hidden="true">
        <p className="fc-glass-title">{project.title}</p>
        <p className="fc-glass-sub">{tv(project.type)} · {project.year}</p>
        {project.detailHref && (
          <div className="fc-discover">
            <span className="fc-discover-text">{t('common.discover')}</span>
            <div className="fc-discover-line" />
          </div>
        )}
      </div>

      <button
        className="fc-zoom"
        onClick={e => { e.preventDefault(); e.stopPropagation(); setLightbox(true); }}
        aria-label={`View ${project.title} fullscreen`}
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="4.5" cy="4.5" r="3.2" /><line x1="7" y1="7" x2="10" y2="10" />
        </svg>
      </button>
    </div>
  );

  return (
    <>
      <article className="fc">
        {project.detailHref
          ? <Link href={href} className="fc-main-link" aria-label={`${project.title} — view project`}>{MainInner}</Link>
          : MainInner}

        {/* thumbnails — only render those that exist */}
        {shown.length > 0 && (
          <div className="fc-thumbs">
            {shown.map((t, i) => {
              const imgIndex   = i + 1;                        // offset by 1 (main is images[0])
              const isOverflow = overflowN > 0 && i === shown.length - 1;
              if (isOverflow) {
                return (
                  <button
                    key={imgIndex}
                    className="fc-thumb"
                    onClick={() => setLightbox(true)}
                    aria-label={`View all ${project.images.length} images`}
                  >
                    <Image src={t.src} alt={t.subtitle} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="25vw" />
                    <span className="fc-thumb-n">+{overflowN}</span>
                  </button>
                );
              }
              return (
                <button
                  key={imgIndex}
                  className={`fc-thumb${current === imgIndex ? ' fc-thumb--on' : ''}`}
                  onClick={() => jumpTo(imgIndex)}
                  aria-label={`View ${t.subtitle}`}
                  aria-pressed={current === imgIndex}
                >
                  <Image src={t.src} alt={t.subtitle} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="25vw" />
                </button>
              );
            })}
          </div>
        )}

        <p className="fc-tags">{tv(project.category)} · {tv(project.type)} · {tv(project.material)}</p>
        <InfoRows project={project} />
      </article>

      {/* lightbox */}
      {lightbox && (
        <div className="fc-lb" onClick={() => setLightbox(false)} role="dialog" aria-modal="true" aria-label={`${project.title} gallery`}>
          <span className="fc-lb-counter">{current + 1} / {project.images.length}</span>
          <button className="fc-lb-x" onClick={() => setLightbox(false)} aria-label="Close gallery">✕</button>
          {project.images.length > 1 && (
            <button className="fc-lb-arr fc-lb-arr--l" onClick={e => { e.stopPropagation(); go(-1); }} aria-label="Previous image">‹</button>
          )}
          <div onClick={e => e.stopPropagation()}>
            <Image
              src={img.src}
              alt={img.subtitle}
              width={1600}
              height={1200}
              priority
              style={{ maxHeight: '90vh', maxWidth: '90vw', width: 'auto', height: 'auto', objectFit: 'contain', opacity: fading ? 0 : 1, transition: 'opacity 160ms ease' }}
            />
          </div>
          {project.images.length > 1 && (
            <button className="fc-lb-arr fc-lb-arr--r" onClick={e => { e.stopPropagation(); go(1); }} aria-label="Next image">›</button>
          )}
        </div>
      )}
    </>
  );
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function FabricationPage() {
  const { t, tv } = useLanguage();
  const [active, setActive] = useState<Filter>('All');
  const visible = active === 'All'
    ? fabricationProjects
    : fabricationProjects.filter(p => p.category === (active as FabricationCategory));

  return (
    <>
      <style>{`
        /* ── page ──────────────────────────────────────────────── */
        .fp {
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: clamp(96px, 12vh, 140px) 24px clamp(32px, 4vh, 56px);
          min-height: 100vh;
        }
        .fp-rule { height: 1px; background: var(--color-border); margin-bottom: clamp(40px,6vh,72px); }
        .fp-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-accent); margin-bottom: 28px;
        }
        .fp-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px; background: var(--color-accent); opacity: .7;
        }
        .fp-title {
          font-family: var(--font-title);
          font-size: clamp(48px,8vw,116px);
          letter-spacing: -0.03em; line-height: .98;
          color: var(--color-text-primary); margin: 0 0 28px; max-width: 14ch;
        }
        .fp-desc {
          font-size: clamp(14px,1.4vw,17px); font-weight: 300;
          letter-spacing: .02em; line-height: 1.7;
          color: var(--color-text-secondary); max-width: 58ch;
          margin: 0 0 clamp(40px,6vh,64px);
        }

        /* ── filters ───────────────────────────────────────────── */
        .fp-filters {
          display: flex; align-items: center; gap: clamp(20px,3vw,44px);
          flex-wrap: wrap;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          padding: 22px 0; margin-bottom: clamp(48px,7vh,80px);
        }
        .fp-f {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.35); padding: 0;
          transition: color 300ms ease;
        }
        .fp-f:hover { color: rgba(255,255,255,.7); }
        .fp-f.on   { color: var(--color-accent); }
        .fp-f:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 6px; }
        .fp-fn { font-size: 9px; color: var(--color-text-meta); margin-left: 6px; }
        .fp-f.on .fp-fn { color: var(--color-accent-dim); }

        /* ── grid ──────────────────────────────────────────────── */
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-content: start;
        }
        .fp-empty {
          grid-column: 1/-1; padding: 80px 0; text-align: center;
          font-size: 13px; letter-spacing: .08em; color: var(--color-text-meta);
        }

        /* ── card ──────────────────────────────────────────────── */
        .fc { display: flex; flex-direction: column; background: transparent; }
        .fc-main-link { display: block; text-decoration: none; }

        .fc-main {
          position: relative;
          width: 100%; height: 500px;
          overflow: hidden;
          background: var(--color-surface-2);
          flex-shrink: 0;
          cursor: pointer;
        }
        .fc-img-wrap { position: absolute; inset: 0; }

        .fc-gradient {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.80) 100%);
          opacity: 0; transition: opacity 500ms ease;
        }
        .fc-main:hover .fc-gradient { opacity: 1; }

        .fc-glass {
          position: absolute; bottom: 16px; left: 16px;
          width: fit-content; z-index: 3;
          padding: 12px 16px;
          backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          background: rgba(0,0,0,.5);
          display: flex; flex-direction: column; gap: 2px;
          transform: translateY(12px); opacity: 0;
          transition: opacity 350ms ease, transform 350ms cubic-bezier(.22,1,.36,1);
          pointer-events: none;
        }
        .fc-main:hover .fc-glass { opacity: 1; transform: translateY(0); }
        .fc-glass-title {
          font-family: var(--font-title);
          font-size: 18px; font-weight: 400;
          letter-spacing: -.01em; color: #fff;
          margin: 0; line-height: 1.2; white-space: nowrap;
        }
        .fc-glass-sub {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.55); margin: 0; white-space: nowrap;
        }
        .fc-discover { display: flex; flex-direction: column; gap: 5px; width: fit-content; margin-top: 8px; }
        .fc-discover-text {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(255,255,255,.9); margin: 0;
        }
        .fc-discover-line {
          height: 3px; width: 0;
          background: linear-gradient(to right, #b8956a, rgba(184,149,106,.5));
          transition: width 420ms ease-out 120ms;
        }
        .fc-main:hover .fc-discover-line { width: 100%; }

        .fc-zoom {
          position: absolute; top: 10px; right: 10px;
          width: 26px; height: 26px; z-index: 4;
          background: rgba(0,0,0,.4);
          border: 1px solid rgba(255,255,255,.18);
          color: rgba(255,255,255,.85);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          opacity: 0; transition: opacity 250ms ease;
        }
        .fc-main:hover .fc-zoom { opacity: 1; }
        .fc-zoom:focus-visible { opacity: 1; outline: 1px solid var(--color-accent); outline-offset: 2px; }

        /* ── placeholder main ──────────────────────────────────── */
        .fc-main--ph { cursor: default; display: flex; align-items: center; justify-content: center; }
        .fc-perf {
          position: absolute; inset: 0;
          background-color: var(--color-surface-2);
          background-image: radial-gradient(rgba(184,149,106,0.13) 1.4px, transparent 1.6px);
          background-size: 17px 17px; background-position: center;
        }
        .fc-perf--sm { background-size: 9px 9px; }
        .fc-ph-label {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          text-align: center; padding: 0 24px;
        }
        .fc-ph-mark { font-size: 22px; color: var(--color-accent-dim); line-height: 1; }
        .fc-ph-title {
          font-family: var(--font-title); font-weight: 400;
          font-size: 22px; letter-spacing: -.01em; line-height: 1.15;
          color: var(--color-text-secondary); max-width: 16ch;
        }
        .fc-ph-status {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .26em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .fc-ph-corner {
          position: absolute; width: 16px; height: 16px; z-index: 2;
          border-color: rgba(184,149,106,.45); border-style: solid; border-width: 0;
        }
        .fc-ph-corner--tl { top: 14px; left: 14px; border-top-width: 1px; border-left-width: 1px; }
        .fc-ph-corner--br { bottom: 14px; right: 14px; border-bottom-width: 1px; border-right-width: 1px; }

        /* ── thumbnails ────────────────────────────────────────── */
        .fc-thumbs { display: flex; gap: 15px; margin-top: 20px; height: 96px; }
        .fc-thumb {
          position: relative; flex: 1; height: 100%;
          overflow: hidden; cursor: pointer;
          border: none; padding: 0;
          background: var(--color-surface-2);
          outline: 2px solid transparent; outline-offset: -2px;
          transition: outline-color 200ms ease;
        }
        .fc-thumb--on { outline-color: var(--color-accent); }
        .fc-thumb:focus-visible { outline-color: var(--color-accent); }
        .fc-thumb--ph { cursor: default; }
        .fc-thumb-n {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.70);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-body); font-size: 22px; font-weight: 500;
          color: #fff; z-index: 2; pointer-events: none;
        }

        /* ── tags ──────────────────────────────────────────────── */
        .fc-tags {
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .12em; text-transform: uppercase;
          color: #b8956a; margin: 0; padding: 12px 0 10px;
        }

        /* ── info rows ─────────────────────────────────────────── */
        .fc-info { display: flex; flex-direction: column; }
        .fc-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
        .fc-ico { display: flex; align-items: center; flex-shrink: 0; color: rgba(255,255,255,.35); }
        .fc-lbl {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.4); flex-shrink: 0; width: 72px;
        }
        .fc-val { font-family: var(--font-body); font-size: 13px; letter-spacing: .03em; color: rgba(255,255,255,.88); }
        .fc-sep { height: 1px; background: rgba(255,255,255,.07); }

        /* ── lightbox ──────────────────────────────────────────── */
        .fc-lb {
          position: fixed; inset: 0; background: rgba(0,0,0,.95);
          z-index: 9999; display: flex; align-items: center; justify-content: center;
          cursor: zoom-out;
        }
        .fc-lb-counter {
          position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
          font-family: var(--font-body); font-size: 12px; letter-spacing: .16em;
          color: rgba(255,255,255,.5); z-index: 10000; pointer-events: none;
        }
        .fc-lb-x {
          position: fixed; top: 22px; right: 26px;
          width: 36px; height: 36px;
          background: transparent; border: 1px solid rgba(184,149,106,.4);
          color: #b8956a; font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 10000; font-family: var(--font-body);
          transition: background 250ms ease;
        }
        .fc-lb-x:hover { background: rgba(184,149,106,.15); }
        .fc-lb-arr {
          position: fixed; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px;
          background: rgba(184,149,106,.1); border: 1px solid rgba(184,149,106,.4);
          color: #b8956a; font-size: 22px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10000; padding: 0 0 1px;
          transition: background 250ms ease;
        }
        .fc-lb-arr:hover { background: rgba(184,149,106,.2); }
        .fc-lb-arr--l { left: 26px; }
        .fc-lb-arr--r { right: 26px; }

        /* ── bottom strip ──────────────────────────────────────── */
        .fp-strip {
          display: flex; align-items: stretch;
          border-top: 1px solid var(--color-line);
          margin-top: clamp(56px,8vh,96px);
          font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .fp-strip > span {
          display: flex; align-items: center;
          padding: 14px clamp(14px,2.5vw,36px);
          border-right: 1px solid var(--color-line); white-space: nowrap;
        }
        .fp-strip > span:first-child { padding-left: 0; }
        .fp-strip-fill { flex: 1; border-right: none !important; }

        /* ── touch — reveal hover info by default ──────────────── */
        @media (hover: none) {
          .fc-glass { opacity: 1; transform: none; }
          .fc-gradient { opacity: 1; }
          .fc-discover-line { width: 100%; }
        }

        /* ── reduced motion ────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .fc-glass, .fc-gradient, .fc-discover-line, .fc-zoom,
          .fc-img-wrap, .fc-thumb, .fp-f, .fc-lb-x, .fc-lb-arr {
            transition: none !important;
          }
        }

        /* ── responsive ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .fp-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 767px) {
          .fp-grid { grid-template-columns: 1fr; gap: 16px; }
          .fc-main { height: 280px; }
          .fc-thumbs { height: 72px; }
        }
      `}</style>

      <div className="fp">
        <div className="fp-rule" />

        <p className="fp-eyebrow">{t('fab.eyebrow')}</p>
        <h1 className="fp-title">{t('fab.title')}</h1>
        <p className="fp-desc">
          {t('fab.desc')}
        </p>

        <div className="fp-filters" role="group" aria-label="Filter projects by category">
          {FILTERS.map(f => {
            const n = f === 'All'
              ? fabricationProjects.length
              : fabricationProjects.filter(p => p.category === f).length;
            return (
              <button
                key={f}
                aria-pressed={active === f}
                className={`fp-f${active === f ? ' on' : ''}`}
                onClick={() => setActive(f)}
              >
                {tv(f)}<span className="fp-fn">{String(n).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        <div className="fp-grid">
          {visible.length === 0
            ? <p className="fp-empty">{t('common.noProjects')}</p>
            : visible.map((p, i) =>
                p.images.length === 0
                  ? <PlaceholderCard key={p.title} project={p} />
                  : <ProjectCard key={p.title} project={p} index={i} />
              )}
        </div>

        <div className="fp-strip" aria-hidden="true">
          <span>AMD NSRI</span>
          <span>{t('fab.eyebrow')}</span>
          <span>{t('common.est2026')}</span>
          <span className="fp-strip-fill" />
        </div>
      </div>
    </>
  );
}
