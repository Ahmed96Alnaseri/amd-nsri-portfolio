'use client';

import { useState, useEffect, useId } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import designProjects, {
  type DesignProject,
  type DesignCategory,
} from '@/data/design-projects';

const FILTERS = ['All', 'Parametric', 'Computational', 'Facade Systems', 'Competitions'] as const;
type Filter = (typeof FILTERS)[number];

/* ── icons ─────────────────────────────────────────────────────────── */
const IcoType = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
    <path d="M7 1.5 12.5 4.5 7 7.5 1.5 4.5 7 1.5z" />
    <path d="M1.5 7 7 10 12.5 7" /><path d="M1.5 9.5 7 12.5 12.5 9.5" />
  </svg>
);
const IcoSoftware = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
    <path d="M5 3.5 2 7l3 3.5" /><path d="M9 3.5 12 7l-3 3.5" />
  </svg>
);
const IcoYear = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <rect x="1.5" y="2.5" width="11" height="10" rx="0.5" />
    <line x1="1.5" y1="6" x2="12.5" y2="6" />
    <line x1="4.5" y1="1" x2="4.5" y2="4" /><line x1="9.5" y1="1" x2="9.5" y2="4" />
  </svg>
);
const IcoStatus = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="7" cy="7" r="5" />
    <circle cx="7" cy="7" r="1.6" fill="currentColor" stroke="none" />
  </svg>
);

/* ── shared info rows ───────────────────────────────────────────────── */
function InfoRows({ project }: { project: DesignProject }) {
  return (
    <div className="dc-info">
      <div className="dc-row">
        <span className="dc-ico"><IcoType /></span>
        <span className="dc-lbl">Type</span>
        <span className="dc-val">{project.type}</span>
      </div>
      <div className="dc-sep" />
      <div className="dc-row">
        <span className="dc-ico"><IcoSoftware /></span>
        <span className="dc-lbl">Software</span>
        <span className="dc-val">{project.software}</span>
      </div>
      <div className="dc-sep" />
      <div className="dc-row">
        <span className="dc-ico"><IcoYear /></span>
        <span className="dc-lbl">Year</span>
        <span className="dc-val">{project.year}</span>
      </div>
      <div className="dc-sep" />
      <div className="dc-row">
        <span className="dc-ico"><IcoStatus /></span>
        <span className="dc-lbl">Status</span>
        <span className="dc-val">{project.status}</span>
      </div>
    </div>
  );
}

/* ── placeholder card (no imagery yet) — linkable when detailHref set ─── */
function PlaceholderCard({ project }: { project: DesignProject }) {
  const id = useId().replace(/:/g, '');
  const linkable = Boolean(project.detailHref);

  const inner = (
    <div className={`dc-main dc-main--ph${linkable ? ' dc-main--link' : ''}`}>
      <div className="dc-perf" aria-hidden="true" />
      <div className="dc-gradient" aria-hidden="true" />
      <div className="dc-ph-label">
        <span className="dc-ph-mark" aria-hidden="true">＋</span>
        <span className="dc-ph-title">{project.title}</span>
        <span className="dc-ph-status">Imagery Pending</span>
        {linkable && (
          <span className="dc-ph-discover" aria-hidden="true">
            <span className="dc-ph-discover-text">Discover</span>
            <span className="dc-ph-discover-line" />
          </span>
        )}
      </div>
      <span className="dc-ph-corner dc-ph-corner--tl" aria-hidden="true" />
      <span className="dc-ph-corner dc-ph-corner--br" aria-hidden="true" />
    </div>
  );

  return (
    <article className="dc">
      {linkable
        ? <Link href={project.detailHref!} className="dc-main-link" aria-label={`${project.title} — view project`}>{inner}</Link>
        : inner}

      <div className="dc-thumbs" aria-hidden="true">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={`${id}-${i}`} className="dc-thumb dc-thumb--ph">
            <div className="dc-perf dc-perf--sm" />
          </div>
        ))}
      </div>

      <p className="dc-tags">{project.category} · {project.type} · {project.software}</p>
      <InfoRows project={project} />
    </article>
  );
}

/* ── real card (with imagery) — used once design projects gain images ── */
function ProjectCard({ project, index }: { project: DesignProject; index: number }) {
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
  const thumbs    = project.images.slice(1);
  const shown     = thumbs.slice(0, 4);
  const overflowN = project.images.length - 5;

  const MainInner = (
    <div className="dc-main">
      <div className="dc-img-wrap" style={{ opacity: fading ? 0 : 1, transition: 'opacity 160ms ease' }}>
        <Image
          src={img.src}
          alt={img.subtitle}
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={index === 0}
        />
      </div>
      <div className="dc-gradient" aria-hidden="true" />
      <div className="dc-glass" aria-hidden="true">
        <p className="dc-glass-title">{project.title}</p>
        <p className="dc-glass-sub">{project.type} · {project.year}</p>
        {project.detailHref && (
          <div className="dc-discover">
            <span className="dc-discover-text">Discover</span>
            <div className="dc-discover-line" />
          </div>
        )}
      </div>
      <button
        className="dc-zoom"
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
      <article className="dc">
        {project.detailHref
          ? <Link href={project.detailHref} className="dc-main-link" aria-label={`${project.title} — view project`}>{MainInner}</Link>
          : MainInner}

        {shown.length > 0 && (
          <div className="dc-thumbs">
            {shown.map((t, i) => {
              const imgIndex   = i + 1;
              const isOverflow = overflowN > 0 && i === shown.length - 1;
              if (isOverflow) {
                return (
                  <button key={imgIndex} className="dc-thumb" onClick={() => setLightbox(true)} aria-label={`View all ${project.images.length} images`}>
                    <Image src={t.src} alt={t.subtitle} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="25vw" />
                    <span className="dc-thumb-n">+{overflowN}</span>
                  </button>
                );
              }
              return (
                <button
                  key={imgIndex}
                  className={`dc-thumb${current === imgIndex ? ' dc-thumb--on' : ''}`}
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

        <p className="dc-tags">{project.category} · {project.type} · {project.software}</p>
        <InfoRows project={project} />
      </article>

      {lightbox && (
        <div className="dc-lb" onClick={() => setLightbox(false)} role="dialog" aria-modal="true" aria-label={`${project.title} gallery`}>
          <span className="dc-lb-counter">{current + 1} / {project.images.length}</span>
          <button className="dc-lb-x" onClick={() => setLightbox(false)} aria-label="Close gallery">✕</button>
          {project.images.length > 1 && (
            <button className="dc-lb-arr dc-lb-arr--l" onClick={e => { e.stopPropagation(); go(-1); }} aria-label="Previous image">‹</button>
          )}
          <div onClick={e => e.stopPropagation()}>
            <Image src={img.src} alt={img.subtitle} width={1600} height={1200} priority
              style={{ maxHeight: '90vh', maxWidth: '90vw', width: 'auto', height: 'auto', objectFit: 'contain', opacity: fading ? 0 : 1, transition: 'opacity 160ms ease' }} />
          </div>
          {project.images.length > 1 && (
            <button className="dc-lb-arr dc-lb-arr--r" onClick={e => { e.stopPropagation(); go(1); }} aria-label="Next image">›</button>
          )}
        </div>
      )}
    </>
  );
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function DesignPage() {
  const [active, setActive] = useState<Filter>('All');
  const visible = active === 'All'
    ? designProjects
    : designProjects.filter(p => p.category === (active as DesignCategory));

  return (
    <>
      <style>{`
        /* ── page ──────────────────────────────────────────────── */
        .dp {
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: clamp(96px, 12vh, 140px) 24px clamp(32px, 4vh, 56px);
          min-height: 100vh;
        }
        .dp-rule { height: 1px; background: var(--color-border); margin-bottom: clamp(40px,6vh,72px); }
        .dp-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-accent); margin-bottom: 28px;
        }
        .dp-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px; background: var(--color-accent); opacity: .7;
        }
        .dp-title {
          font-family: var(--font-title);
          font-size: clamp(48px,8vw,116px);
          letter-spacing: -0.03em; line-height: .98;
          color: var(--color-text-primary); margin: 0 0 28px; max-width: 14ch;
        }
        .dp-desc {
          font-size: clamp(14px,1.4vw,17px); font-weight: 300;
          letter-spacing: .02em; line-height: 1.7;
          color: var(--color-text-secondary); max-width: 58ch;
          margin: 0 0 clamp(40px,6vh,64px);
        }

        /* ── filters ───────────────────────────────────────────── */
        .dp-filters {
          display: flex; align-items: center; gap: clamp(20px,3vw,44px);
          flex-wrap: wrap;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          padding: 22px 0; margin-bottom: clamp(48px,7vh,80px);
        }
        .dp-f {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.35); padding: 0;
          transition: color 300ms ease;
        }
        .dp-f:hover { color: rgba(255,255,255,.7); }
        .dp-f.on   { color: var(--color-accent); }
        .dp-f:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 6px; }
        .dp-fn { font-size: 9px; color: var(--color-text-meta); margin-left: 6px; }
        .dp-f.on .dp-fn { color: var(--color-accent-dim); }

        /* ── grid ──────────────────────────────────────────────── */
        .dp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-content: start;
        }
        .dp-empty {
          grid-column: 1/-1; padding: 80px 0; text-align: center;
          font-size: 13px; letter-spacing: .08em; color: var(--color-text-meta);
        }

        /* ── card ──────────────────────────────────────────────── */
        .dc { display: flex; flex-direction: column; background: transparent; }
        .dc-main-link { display: block; text-decoration: none; }

        .dc-main {
          position: relative;
          width: 100%; height: 500px;
          overflow: hidden;
          background: var(--color-surface-2);
          flex-shrink: 0;
        }
        .dc-img-wrap { position: absolute; inset: 0; }

        .dc-gradient {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.80) 100%);
          opacity: 0; transition: opacity 500ms ease;
        }
        .dc-main:hover .dc-gradient { opacity: 1; }

        /* glass + discover (image-card variant) */
        .dc-glass {
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
        .dc-main:hover .dc-glass { opacity: 1; transform: translateY(0); }
        .dc-glass-title {
          font-family: var(--font-title); font-size: 18px; font-weight: 400;
          letter-spacing: -.01em; color: #fff; margin: 0; line-height: 1.2; white-space: nowrap;
        }
        .dc-glass-sub {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.55); margin: 0; white-space: nowrap;
        }
        .dc-discover { display: flex; flex-direction: column; gap: 5px; width: fit-content; margin-top: 8px; }
        .dc-discover-text {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(255,255,255,.9); margin: 0;
        }
        .dc-discover-line {
          height: 3px; width: 0;
          background: linear-gradient(to right, #b8956a, rgba(184,149,106,.5));
          transition: width 420ms ease-out 120ms;
        }
        .dc-main:hover .dc-discover-line { width: 100%; }

        .dc-zoom {
          position: absolute; top: 10px; right: 10px;
          width: 26px; height: 26px; z-index: 4;
          background: rgba(0,0,0,.4); border: 1px solid rgba(255,255,255,.18);
          color: rgba(255,255,255,.85);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; opacity: 0; transition: opacity 250ms ease;
        }
        .dc-main:hover .dc-zoom { opacity: 1; }
        .dc-zoom:focus-visible { opacity: 1; outline: 1px solid var(--color-accent); outline-offset: 2px; }

        /* ── placeholder main ──────────────────────────────────── */
        .dc-main--ph { cursor: default; display: flex; align-items: center; justify-content: center; }
        .dc-main--link { cursor: pointer; }
        .dc-perf {
          position: absolute; inset: 0;
          background-color: var(--color-surface-2);
          background-image: radial-gradient(rgba(184,149,106,0.13) 1.4px, transparent 1.6px);
          background-size: 17px 17px; background-position: center;
        }
        .dc-perf--sm { background-size: 9px 9px; }
        .dc-main--link:hover .dc-perf { background-image: radial-gradient(rgba(184,149,106,0.22) 1.4px, transparent 1.6px); }
        .dc-main--ph .dc-gradient {
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.55) 100%);
        }
        .dc-main--link:hover .dc-gradient { opacity: 1; }

        .dc-ph-label {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          text-align: center; padding: 0 24px;
        }
        .dc-ph-mark { font-size: 22px; color: var(--color-accent-dim); line-height: 1; }
        .dc-ph-title {
          font-family: var(--font-title); font-weight: 400;
          font-size: 22px; letter-spacing: -.01em; line-height: 1.15;
          color: var(--color-text-secondary); max-width: 16ch;
        }
        .dc-ph-status {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .26em; text-transform: uppercase;
          color: var(--color-text-meta);
          transition: opacity 300ms ease;
        }
        /* discover swaps in over "imagery pending" on hover for linkable cards */
        .dc-ph-discover {
          position: absolute; left: 50%; bottom: -2px; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          opacity: 0; transition: opacity 300ms ease;
        }
        .dc-ph-discover-text {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(255,255,255,.92);
        }
        .dc-ph-discover-line {
          height: 3px; width: 0;
          background: linear-gradient(to right, #b8956a, rgba(184,149,106,.5));
          transition: width 420ms ease-out 120ms;
        }
        .dc-main--link:hover .dc-ph-status { opacity: 0; }
        .dc-main--link:hover .dc-ph-discover { opacity: 1; }
        .dc-main--link:hover .dc-ph-discover-line { width: 64px; }

        .dc-ph-corner {
          position: absolute; width: 16px; height: 16px; z-index: 2;
          border-color: rgba(184,149,106,.45); border-style: solid; border-width: 0;
        }
        .dc-ph-corner--tl { top: 14px; left: 14px; border-top-width: 1px; border-left-width: 1px; }
        .dc-ph-corner--br { bottom: 14px; right: 14px; border-bottom-width: 1px; border-right-width: 1px; }

        /* ── thumbnails ────────────────────────────────────────── */
        .dc-thumbs { display: flex; gap: 15px; margin-top: 20px; height: 96px; }
        .dc-thumb {
          position: relative; flex: 1; height: 100%;
          overflow: hidden; cursor: pointer;
          border: none; padding: 0;
          background: var(--color-surface-2);
          outline: 2px solid transparent; outline-offset: -2px;
          transition: outline-color 200ms ease;
        }
        .dc-thumb--on { outline-color: var(--color-accent); }
        .dc-thumb:focus-visible { outline-color: var(--color-accent); }
        .dc-thumb--ph { cursor: default; }
        .dc-thumb-n {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.70);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-body); font-size: 22px; font-weight: 500;
          color: #fff; z-index: 2; pointer-events: none;
        }

        /* ── tags ──────────────────────────────────────────────── */
        .dc-tags {
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .12em; text-transform: uppercase;
          color: #b8956a; margin: 0; padding: 12px 0 10px;
        }

        /* ── info rows ─────────────────────────────────────────── */
        .dc-info { display: flex; flex-direction: column; }
        .dc-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
        .dc-ico { display: flex; align-items: center; flex-shrink: 0; color: rgba(255,255,255,.35); }
        .dc-lbl {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.4); flex-shrink: 0; width: 72px;
        }
        .dc-val { font-family: var(--font-body); font-size: 13px; letter-spacing: .03em; color: rgba(255,255,255,.88); }
        .dc-sep { height: 1px; background: rgba(255,255,255,.07); }

        /* ── lightbox ──────────────────────────────────────────── */
        .dc-lb {
          position: fixed; inset: 0; background: rgba(0,0,0,.95);
          z-index: 9999; display: flex; align-items: center; justify-content: center;
          cursor: zoom-out;
        }
        .dc-lb-counter {
          position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
          font-family: var(--font-body); font-size: 12px; letter-spacing: .16em;
          color: rgba(255,255,255,.5); z-index: 10000; pointer-events: none;
        }
        .dc-lb-x {
          position: fixed; top: 22px; right: 26px;
          width: 36px; height: 36px;
          background: transparent; border: 1px solid rgba(184,149,106,.4);
          color: #b8956a; font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 10000; font-family: var(--font-body);
          transition: background 250ms ease;
        }
        .dc-lb-x:hover { background: rgba(184,149,106,.15); }
        .dc-lb-arr {
          position: fixed; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px;
          background: rgba(184,149,106,.1); border: 1px solid rgba(184,149,106,.4);
          color: #b8956a; font-size: 22px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10000; padding: 0 0 1px;
          transition: background 250ms ease;
        }
        .dc-lb-arr:hover { background: rgba(184,149,106,.2); }
        .dc-lb-arr--l { left: 26px; }
        .dc-lb-arr--r { right: 26px; }

        /* ── bottom strip ──────────────────────────────────────── */
        .dp-strip {
          display: flex; align-items: stretch;
          border-top: 1px solid var(--color-line);
          margin-top: clamp(56px,8vh,96px);
          font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .dp-strip > span {
          display: flex; align-items: center;
          padding: 14px clamp(14px,2.5vw,36px);
          border-right: 1px solid var(--color-line); white-space: nowrap;
        }
        .dp-strip > span:first-child { padding-left: 0; }
        .dp-strip-fill { flex: 1; border-right: none !important; }

        /* ── reduced motion ────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .dc-glass, .dc-gradient, .dc-discover-line, .dc-zoom, .dc-img-wrap,
          .dc-thumb, .dp-f, .dc-lb-x, .dc-lb-arr, .dc-perf,
          .dc-ph-status, .dc-ph-discover, .dc-ph-discover-line {
            transition: none !important;
          }
        }

        /* ── responsive ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .dp-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 767px) {
          .dp-grid { grid-template-columns: 1fr; gap: 16px; }
          .dc-main { height: 280px; }
          .dc-thumbs { height: 72px; }
        }
      `}</style>

      <div className="dp">
        <div className="dp-rule" />

        <p className="dp-eyebrow">Design</p>
        <h1 className="dp-title">Think. Model. Resolve.</h1>
        <p className="dp-desc">
          Computational and parametric design — facade systems, generative geometry, and the tools that turn an idea into a resolvable model.
        </p>

        <div className="dp-filters" role="group" aria-label="Filter projects by category">
          {FILTERS.map(f => {
            const n = f === 'All'
              ? designProjects.length
              : designProjects.filter(p => p.category === f).length;
            return (
              <button
                key={f}
                aria-pressed={active === f}
                className={`dp-f${active === f ? ' on' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}<span className="dp-fn">{String(n).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        <div className="dp-grid">
          {visible.length === 0
            ? <p className="dp-empty">No projects in this category yet.</p>
            : visible.map((p, i) =>
                p.images.length === 0
                  ? <PlaceholderCard key={p.title} project={p} />
                  : <ProjectCard key={p.title} project={p} index={i} />
              )}
        </div>

        <div className="dp-strip" aria-hidden="true">
          <span>AMD NSRI</span>
          <span>Design</span>
          <span>Est. 2026</span>
          <span className="dp-strip-fill" />
        </div>
      </div>
    </>
  );
}
