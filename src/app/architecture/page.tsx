'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slugify = (t: string) => t.toLowerCase().replace(/\s+/g, '-');

type ProjectImage = { src: string; subtitle: string };
type Category = 'Residential' | 'Commercial' | 'Competition' | 'Mixed Use';

type Project = {
  title: string;
  category: Category;
  type: string;
  year: string;
  location: string;
  architect: string;
  area: string;
  images: ProjectImage[];
};

const PROJECTS: Project[] = [
  {
    title: 'Hasyl Canopy',
    category: 'Commercial',
    type: 'Parametric Canopy',
    year: '2024',
    location: 'Turkmenistan',
    architect: 'Ahmed Alnaseri',
    area: '—',
    images: [
      { src: '/project-hysel-01.png',      subtitle: 'Exterior View' },
      { src: '/ceiling türkmen.png',        subtitle: 'Ceiling Pattern Detail' },
      { src: '/kolon4.png',                 subtitle: 'Column Drawing' },
      { src: '/kolon.png',                  subtitle: 'Column Detail' },
      { src: '/Canopy_V3_3 - Photo.jpg',   subtitle: 'Canopy View 3' },
      { src: '/Canopy_V3_4 - Photo.jpg',   subtitle: 'Canopy View 4' },
      { src: '/Canopy_V3_6.jpg',           subtitle: 'Canopy View 6' },
    ],
  },
];

const FILTERS = ['All', 'Residential', 'Commercial', 'Competition', 'Mixed Use'] as const;
type Filter = (typeof FILTERS)[number];

/* ── icons ─────────────────────────────────────────────────────────── */
const IcoArchitect = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="7" cy="4.5" r="2" /><path d="M2 13c0-2.76 2.24-5 5-5s5 2.24 5 5" />
  </svg>
);
const IcoArea = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <rect x="1.5" y="1.5" width="11" height="11" rx="0.5" />
    <line x1="1.5" y1="7" x2="12.5" y2="7" /><line x1="7" y1="1.5" x2="7" y2="12.5" />
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

/* ── card ───────────────────────────────────────────────────────────── */
function ProjectCard({ project, index, slug }: { project: Project; index: number; slug: string }) {
  const [current, setCurrent] = useState(0);
  const [fading,  setFading]  = useState(false);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
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

  const img = project.images[current];

  return (
    <>
      <article className="ac">

        {/* ── main image — only this is a Link ───────────────── */}
        <Link href={`/architecture/${slug}`} className="ac-main-link">
          <div className="ac-main">
            {/* image */}
            <div className="ac-img-wrap" style={{ opacity: fading ? 0 : 1, transition: 'opacity 160ms ease' }}>
              <Image
                src={img.src}
                alt={project.title}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={index === 0}
              />
            </div>

            {/* bottom gradient overlay */}
            <div className="ac-gradient" aria-hidden="true" />

            {/* frosted glass pill + DISCOVER */}
            <div className="ac-glass" aria-hidden="true">
              <p className="ac-glass-title">{project.title}</p>
              <p className="ac-glass-sub">{project.year} · {project.location}</p>
              <div className="ac-discover">
                <span className="ac-discover-text">Discover</span>
                <div className="ac-discover-line" />
              </div>
            </div>

            {/* zoom */}
            <button
              className="ac-zoom"
              onClick={e => { e.preventDefault(); e.stopPropagation(); setLightbox(true); }}
              aria-label="View fullscreen"
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="4.5" cy="4.5" r="3.2" /><line x1="7" y1="7" x2="10" y2="10" />
              </svg>
            </button>
          </div>
        </Link>

        {/* ── thumbnails — skip images[0] (shown in main), start from images[1] */}
        <div className="ac-thumbs">
          {Array.from({ length: 4 }, (_, i) => {
            const imgIndex   = i + 1;                              // offset by 1
            const hasImage   = imgIndex < project.images.length;
            const isOverflow = project.images.length > 5 && i === 3; // >5 total means >4 after skipping first
            const imgSrc     = hasImage ? project.images[imgIndex] : null;
            const overflowN  = project.images.length - 4;         // images shown: main(1) + 3 thumbs

            if (isOverflow) {
              return (
                <Link
                  key={i}
                  href={`/architecture/${slug}`}
                  className="ac-thumb"
                  style={{ display: 'block', textDecoration: 'none', position: 'relative' }}
                  aria-label={`View all ${project.images.length} images`}
                >
                  {imgSrc && (
                    <Image src={imgSrc.src} alt={imgSrc.subtitle} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="25vw" />
                  )}
                  <span className="ac-thumb-n">+{overflowN}</span>
                </Link>
              );
            }

            return (
              <button
                key={i}
                className={`ac-thumb${current === imgIndex ? ' ac-thumb--on' : ''}${!hasImage ? ' ac-thumb-empty' : ''}`}
                onClick={() => hasImage && jumpTo(imgIndex)}
                aria-label={imgSrc ? `View ${imgSrc.subtitle}` : undefined}
                disabled={!hasImage}
              >
                {imgSrc && (
                  <Image src={imgSrc.src} alt={imgSrc.subtitle} fill style={{ objectFit: 'cover', objectPosition: 'center' }} sizes="25vw" />
                )}
              </button>
            );
          })}
        </div>

        {/* ── tags ───────────────────────────────────────────── */}
        <p className="ac-tags">
          {project.category} · {project.type} · {project.location}
        </p>

        {/* ── info rows ──────────────────────────────────────── */}
        <div className="ac-info">
          <div className="ac-row">
            <span className="ac-ico"><IcoArchitect /></span>
            <span className="ac-lbl">Architect</span>
            <span className="ac-val">{project.architect}</span>
          </div>
          <div className="ac-sep" />
          <div className="ac-row">
            <span className="ac-ico"><IcoArea /></span>
            <span className="ac-lbl">Area</span>
            <span className="ac-val">{project.area}</span>
          </div>
          <div className="ac-sep" />
          <div className="ac-row">
            <span className="ac-ico"><IcoYear /></span>
            <span className="ac-lbl">Year</span>
            <span className="ac-val">{project.year}</span>
          </div>
          <div className="ac-sep" />
          <div className="ac-row">
            <span className="ac-ico"><IcoLocation /></span>
            <span className="ac-lbl">Location</span>
            <span className="ac-val">{project.location}</span>
          </div>
        </div>

      </article>

      {/* lightbox */}
      {lightbox && (
        <div className="ac-lb" onClick={() => setLightbox(false)}>
          <button className="ac-lb-x" onClick={() => setLightbox(false)}>✕</button>
          {project.images.length > 1 && (
            <button className="ac-lb-arr ac-lb-arr--l" onClick={e => { e.stopPropagation(); go(-1); }}>‹</button>
          )}
          <div onClick={e => e.stopPropagation()}>
            <Image src={img.src} alt={project.title} width={1600} height={1200}
              style={{ maxHeight: '90vh', maxWidth: '90vw', width: 'auto', height: 'auto', objectFit: 'contain' }} priority />
          </div>
          {project.images.length > 1 && (
            <button className="ac-lb-arr ac-lb-arr--r" onClick={e => { e.stopPropagation(); go(1); }}>›</button>
          )}
        </div>
      )}
    </>
  );
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function ArchitecturePage() {
  const [active, setActive] = useState<Filter>('All');
  const visible = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <>
      <style>{`
        /* ── page ──────────────────────────────────────────────── */
        .ap {
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: clamp(96px, 12vh, 140px) 24px clamp(32px, 4vh, 56px);
          min-height: 100vh;
        }
        .ap-rule { height: 1px; background: var(--color-border); margin-bottom: clamp(40px,6vh,72px); }
        .ap-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-accent); margin-bottom: 28px;
        }
        .ap-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px; background: var(--color-accent); opacity: .7;
        }
        .ap-title {
          font-family: var(--font-title);
          font-size: clamp(48px,8vw,116px);
          letter-spacing: -0.03em; line-height: .98;
          color: var(--color-text-primary); margin: 0 0 28px; max-width: 14ch;
        }
        .ap-desc {
          font-size: clamp(14px,1.4vw,17px); font-weight: 300;
          letter-spacing: .02em; line-height: 1.7;
          color: var(--color-text-secondary); max-width: 56ch;
          margin: 0 0 clamp(40px,6vh,64px);
        }

        /* ── filters ───────────────────────────────────────────── */
        .ap-filters {
          display: flex; align-items: center; gap: clamp(20px,3vw,44px);
          flex-wrap: wrap;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          padding: 22px 0; margin-bottom: clamp(48px,7vh,80px);
        }
        .ap-f {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.35); padding: 0;
          transition: color 300ms ease;
        }
        .ap-f:hover { color: rgba(255,255,255,.7); }
        .ap-f.on   { color: var(--color-accent); }
        .ap-fn { font-size: 9px; color: var(--color-text-meta); margin-left: 6px; }
        .ap-f.on .ap-fn { color: var(--color-accent-dim); }

        /* ── grid ──────────────────────────────────────────────── */
        .ap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          align-content: start;
        }
        .ap-empty {
          grid-column: 1/-1; padding: 80px 0; text-align: center;
          font-size: 13px; letter-spacing: .08em; color: var(--color-text-meta);
        }

        /* ── card ──────────────────────────────────────────────── */
        .ac {
          display: flex; flex-direction: column;
          background: transparent;
        }

        /* ── main image link wrapper ───────────────────────────── */
        .ac-main-link { display: block; text-decoration: none; }

        /* ── main image ────────────────────────────────────────── */
        .ac-main {
          position: relative;
          width: 100%; height: 500px;
          overflow: hidden;
          background: var(--color-surface-2);
          flex-shrink: 0;
          cursor: pointer;
        }
        .ac-img-wrap { position: absolute; inset: 0; }

        /* gradient overlay — fades in on hover */
        .ac-gradient {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.80) 100%);
          opacity: 0;
          transition: opacity 500ms ease;
        }
        .ac-main:hover .ac-gradient { opacity: 1; }

        /* frosted glass pill + DISCOVER */
        .ac-glass {
          position: absolute; bottom: 16px; left: 16px;
          width: fit-content; z-index: 3;
          padding: 12px 16px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background: rgba(0,0,0,.5);
          border-radius: 8px;
          display: flex; flex-direction: column; gap: 2px;
          transform: translateY(12px); opacity: 0;
          transition: opacity 350ms ease, transform 350ms cubic-bezier(.22,1,.36,1);
          pointer-events: none;
        }
        .ac-main:hover .ac-glass { opacity: 1; transform: translateY(0); }
        .ac-glass-title {
          font-family: var(--font-title);
          font-size: 18px; font-weight: 400;
          letter-spacing: -.01em; color: #fff;
          margin: 0; line-height: 1.2; white-space: nowrap;
        }
        .ac-glass-sub {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.55); margin: 0; white-space: nowrap;
        }

        /* DISCOVER + animated copper line */
        .ac-discover {
          display: flex; flex-direction: column; gap: 5px;
          width: fit-content; margin-top: 8px;
        }
        .ac-discover-text {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: 0.32em; text-transform: uppercase;
          color: rgba(255,255,255,.9); margin: 0;
        }
        .ac-discover-line {
          height: 3px; width: 0;
          background: linear-gradient(to right, #b8956a, rgba(184,149,106,.5));
          transition: width 420ms ease-out 120ms;
        }
        .ac-main:hover .ac-discover-line { width: 100%; }

        /* zoom */
        .ac-zoom {
          position: absolute; top: 10px; right: 10px;
          width: 26px; height: 26px; z-index: 4;
          background: rgba(0,0,0,.4);
          border: 1px solid rgba(255,255,255,.18);
          color: rgba(255,255,255,.85);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          opacity: 0; transition: opacity 250ms ease;
        }
        .ac-main:hover .ac-zoom { opacity: 1; }

        /* ── thumbnails ────────────────────────────────────────── */
        .ac-thumbs { display: flex; gap: 15px; margin-top: 20px; }
        .ac-thumb {
          position: relative; flex: 1; aspect-ratio: 1 / 1;
          overflow: hidden; cursor: pointer;
          border: none; padding: 0;
          background: var(--color-surface-2);
          outline: 2px solid transparent; outline-offset: -2px;
          transition: outline-color 200ms ease;
        }
        .ac-thumb--on { outline-color: var(--color-accent); }
        .ac-thumb-empty { cursor: default; }
        .ac-thumb-n {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.70);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-body); font-size: 25px; font-weight: 500;
          color: #fff; z-index: 2; pointer-events: none;
        }

        /* ── tags ──────────────────────────────────────────────── */
        .ac-tags {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .12em; text-transform: uppercase;
          color: #b8956a; margin: 0; padding: 12px 0 10px;
        }

        /* ── info rows ─────────────────────────────────────────── */
        .ac-info { display: flex; flex-direction: column; }
        .ac-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; }
        .ac-ico { display: flex; align-items: center; flex-shrink: 0; color: rgba(255,255,255,.35); }
        .ac-lbl {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .1em; text-transform: uppercase;
          color: rgba(255,255,255,.4); flex-shrink: 0; width: 64px;
        }
        .ac-val { font-family: var(--font-body); font-size: 11px; letter-spacing: .03em; color: rgba(255,255,255,.88); }
        .ac-sep { height: 1px; background: rgba(255,255,255,.07); }

        /* ── lightbox ──────────────────────────────────────────── */
        .ac-lb {
          position: fixed; inset: 0; background: rgba(0,0,0,.95);
          z-index: 9999; display: flex; align-items: center; justify-content: center;
          cursor: zoom-out;
        }
        .ac-lb-x {
          position: fixed; top: 22px; right: 26px;
          width: 36px; height: 36px;
          background: transparent; border: 1px solid rgba(184,149,106,.4);
          color: #b8956a; font-size: 14px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 10000; font-family: var(--font-body);
          transition: background 250ms ease;
        }
        .ac-lb-x:hover { background: rgba(184,149,106,.15); }
        .ac-lb-arr {
          position: fixed; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px;
          background: rgba(184,149,106,.1); border: 1px solid rgba(184,149,106,.4);
          color: #b8956a; font-size: 22px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; z-index: 10000; padding: 0 0 1px;
          transition: background 250ms ease;
        }
        .ac-lb-arr:hover { background: rgba(184,149,106,.2); }
        .ac-lb-arr--l { left: 26px; }
        .ac-lb-arr--r { right: 26px; }

        /* ── bottom strip ──────────────────────────────────────── */
        .ap-strip {
          display: flex; align-items: stretch;
          border-top: 1px solid var(--color-line);
          margin-top: clamp(56px,8vh,96px);
          font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .ap-strip > span {
          display: flex; align-items: center;
          padding: 14px clamp(14px,2.5vw,36px);
          border-right: 1px solid var(--color-line); white-space: nowrap;
        }
        .ap-strip > span:first-child { padding-left: 0; }
        .ap-strip-fill { flex: 1; border-right: none !important; }

        /* ── responsive ────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .ap-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 767px) {
          .ap-grid { grid-template-columns: 1fr; gap: 16px; }
          .ac-main { height: 260px; }
          .ac-thumb { height: 60px; }
        }
      `}</style>

      <div className="ap">
        <div className="ap-rule" />

        <p className="ap-eyebrow">Architecture</p>
        <h1 className="ap-title">Space. Structure. Skin.</h1>
        <p className="ap-desc">From concept to construction document — architecture as a complete act.</p>

        <div className="ap-filters" role="tablist">
          {FILTERS.map(f => {
            const n = f === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === f).length;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                className={`ap-f${active === f ? ' on' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}<span className="ap-fn">{String(n).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        <div className="ap-grid">
          {visible.length === 0
            ? <p className="ap-empty">No projects in this category yet.</p>
            : visible.map((p, i) => (
                <ProjectCard key={p.title} project={p} index={i} slug={slugify(p.title)} />
              ))}
        </div>

        <div className="ap-strip" aria-hidden="true">
          <span>AMD NSRI</span>
          <span>Architecture</span>
          <span>Est. 2026</span>
          <span className="ap-strip-fill" />
        </div>
      </div>
    </>
  );
}
