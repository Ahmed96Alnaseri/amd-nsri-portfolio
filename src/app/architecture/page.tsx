'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const slugify = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

/* ─── types & data ──────────────────────────────────────────────────── */
type ProjectImage = { src: string; subtitle: string };

type Category = 'Residential' | 'Commercial' | 'Competition' | 'Mixed Use';

type Project = {
  title: string;
  category: Category;
  year: string;
  location: string;
  images?: ProjectImage[];
};

const PROJECTS: Project[] = [
  {
    title: 'Hasyl Canopy',
    category: 'Commercial',
    year: '2024',
    location: 'Turkmenistan',
    images: [
      { src: '/project-hysel-01.png',   subtitle: 'Exterior View' },
      { src: '/ceiling türkmen.png',    subtitle: 'Ceiling Pattern Detail' },
      { src: '/kolon4.png',             subtitle: 'Column Technical Drawing' },
      { src: '/kolon.png',              subtitle: 'Parametric Column Detail' },
    ],
  },
];

const FILTERS = ['All', 'Residential', 'Commercial', 'Competition', 'Mixed Use'] as const;
type Filter = (typeof FILTERS)[number];

/* ─── card ──────────────────────────────────────────────────────────── */
function ProjectCard({ project, index, slug }: { project: Project; index: number; slug: string }) {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const images = project.images ?? [];
  const hasImages = images.length > 0;
  const img = images[current];

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [lightbox]);

  const go = (dir: 1 | -1) => {
    if (images.length <= 1) return;
    setFading(true);
    setTimeout(() => {
      setCurrent(c => (c + dir + images.length) % images.length);
      setFading(false);
    }, 180);
  };

  return (
    <>
      <Link href={`/architecture/${slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
      <article className="acard">
        <div className="acard-media">

          {/* Index — top left */}
          <span className="acard-index">{String(index + 1).padStart(2, '0')}</span>

          {/* Category tag — top right */}
          <span className="acard-cat-tag">{project.category}</span>

          {hasImages ? (
            <>
              {/* Image */}
              <div
                className="acard-img-wrap"
                style={{ opacity: fading ? 0 : 1, transition: 'opacity 180ms ease' }}
              >
                <Image
                  src={img.src}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  sizes="(max-width: 767px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>

              {/* Zoom button — visible on hover */}
              <button
                className="acard-zoom"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLightbox(true); }}
                aria-label="View fullscreen"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="5.5" cy="5.5" r="4" />
                  <line x1="8.5" y1="8.5" x2="12" y2="12" />
                </svg>
              </button>

              {/* Always-visible name — no background, floats on image */}
              <span className="acard-name">{project.title}</span>

              {/* Frosted glass overlay — slides up from bottom on hover */}
              <div className="acard-overlay">
                {images.length > 1 && (
                  <div className="acard-dots">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        className={`acard-dot${i === current ? ' is-active' : ''}`}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
                        aria-label={`Image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
                <h2 className="acard-overlay-title">{project.title}</h2>
                <p className="acard-overlay-sub">{img.subtitle}</p>
                <p className="acard-overlay-meta">{project.year}&thinsp;·&thinsp;{project.location}</p>
              </div>

              {/* Arrows */}
              {images.length > 1 && (
                <>
                  <button className="acard-arrow acard-arrow-l" onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(-1); }} aria-label="Previous image">‹</button>
                  <button className="acard-arrow acard-arrow-r" onClick={(e) => { e.preventDefault(); e.stopPropagation(); go(1); }} aria-label="Next image">›</button>
                </>
              )}
            </>
          ) : (
            <>
              <span className="acard-tick acard-tick-tl" />
              <span className="acard-tick acard-tick-br" />
              <span className="acard-no-preview">No preview</span>
              <span className="acard-name">{project.title}</span>
              <div className="acard-overlay">
                <h2 className="acard-overlay-title">{project.title}</h2>
                <p className="acard-overlay-meta">{project.year}&thinsp;·&thinsp;{project.location}</p>
              </div>
            </>
          )}
        </div>
      </article>
      </Link>

      {/* Lightbox */}
      {lightbox && hasImages && (
        <div className="acard-lightbox" onClick={() => setLightbox(false)}>
          <button className="acard-lightbox-close" onClick={() => setLightbox(false)} aria-label="Close">✕</button>

          {images.length > 1 && (
            <button
              className="acard-lightbox-arrow acard-lightbox-arrow-l"
              onClick={e => { e.stopPropagation(); go(-1); }}
              aria-label="Previous image"
            >‹</button>
          )}

          <div className="acard-lightbox-img" onClick={e => e.stopPropagation()}>
            <Image
              src={img.src}
              alt={project.title}
              width={1600}
              height={1200}
              style={{ maxHeight: '90vh', maxWidth: '90vw', width: 'auto', height: 'auto', objectFit: 'contain' }}
              priority
            />
          </div>

          {images.length > 1 && (
            <button
              className="acard-lightbox-arrow acard-lightbox-arrow-r"
              onClick={e => { e.stopPropagation(); go(1); }}
              aria-label="Next image"
            >›</button>
          )}
        </div>
      )}
    </>
  );
}

/* ─── page ──────────────────────────────────────────────────────────── */
export default function ArchitecturePage() {
  const [active, setActive] = useState<Filter>('All');

  const visible =
    active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <>
      <style>{`
        /* ── Page wrapper ─────────────────────────────────────────── */
        .apage-wrap {
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: clamp(96px, 12vh, 140px) clamp(24px, 8vw, 120px) clamp(32px, 4vh, 56px);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* ── Editorial header ─────────────────────────────────────── */
        .apage-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 28px;
        }
        .apage-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: var(--color-accent);
          opacity: 0.7;
        }
        .apage-title {
          font-family: var(--font-title);
          font-size: clamp(48px, 8vw, 116px);
          letter-spacing: -0.03em;
          line-height: 0.98;
          color: var(--color-text-primary);
          margin: 0 0 28px;
          max-width: 14ch;
        }
        .apage-desc {
          font-family: var(--font-body);
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 300;
          letter-spacing: 0.02em;
          line-height: 1.7;
          color: var(--color-text-secondary);
          max-width: 56ch;
          margin: 0 0 clamp(40px, 6vh, 64px);
        }
        /* ── Filter bar ───────────────────────────────────────────── */
        .apage-filters {
          display: flex;
          align-items: center;
          gap: clamp(20px, 3vw, 44px);
          flex-wrap: wrap;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          padding: 22px 0;
          margin-bottom: clamp(48px, 7vh, 80px);
        }
        .apage-filter {
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          padding: 0;
          transition: color 350ms ease;
        }
        .apage-filter:hover { color: rgba(255,255,255,0.75); }
        .apage-filter.is-active { color: var(--color-accent); }
        .apage-filter .apage-filter-n {
          font-size: 9px;
          color: var(--color-text-meta);
          margin-left: 7px;
          letter-spacing: 0.1em;
        }
        .apage-filter.is-active .apage-filter-n { color: var(--color-accent-dim); }

        /* ── Empty state ─────────────────────────────────────────── */
        .apage-empty {
          grid-column: 1 / -1;
          padding: 80px 0;
          text-align: center;
          font-family: var(--font-body);
          font-size: 13px;
          letter-spacing: 0.08em;
          color: var(--color-text-meta);
        }

        /* ── Grid ─────────────────────────────────────────────────── */
        .apage-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(24px, 3vw, 48px);
          align-content: start;
        }

        /* ── Card ─────────────────────────────────────────────────── */
        .acard {
          display: block;
          position: relative;
          border: 1px solid transparent;
          transition: border-color 400ms ease;
          cursor: pointer;
        }
        @media (hover: hover) and (pointer: fine) {
          .acard:hover { border-color: var(--color-accent); }
          .acard:hover .acard-tick { opacity: 0.6; }
        }

        .acard-media {
          position: relative;
          width: 100%;
          height: 620px;
          background:
            repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 22px),
            var(--color-surface);
          border: 1px solid var(--color-border);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .acard-img-wrap {
          position: absolute;
          inset: 0;
        }

        .acard-index {
          position: absolute;
          top: 14px;
          left: 16px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.5);
          z-index: 4;
        }

        .acard-cat-tag {
          position: absolute;
          top: 14px;
          right: 16px;
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-accent);
          border: 1px solid var(--color-accent-dim);
          padding: 4px 9px;
          z-index: 4;
          background: rgba(13,13,11,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .acard-tick {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 0 solid var(--color-accent);
          opacity: 0.25;
          transition: opacity 400ms ease;
          z-index: 4;
        }
        .acard-tick-tl { top: 40px; right: 12px; border-top-width: 1px; border-right-width: 1px; }
        .acard-tick-br { bottom: 100px; left: 12px; border-bottom-width: 1px; border-left-width: 1px; }

        .acard-no-preview {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-meta);
          z-index: 1;
        }

        /* ── Always-visible floating name ────────────────────────── */
        .acard-name {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          font-family: var(--font-title);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 1px 6px rgba(0,0,0,0.75), 0 3px 20px rgba(0,0,0,0.55);
          z-index: 2;
          pointer-events: none;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: opacity 200ms ease;
        }
        .acard:hover .acard-name { opacity: 0; }

        /* ── Frosted glass overlay — compact, slides up on hover ──── */
        .acard-overlay {
          position: absolute;
          bottom: 16px;
          left: 16px;
          display: inline-block;
          width: fit-content;
          min-width: 220px;
          max-width: 85%;
          background: rgba(0, 0, 0, 0.50);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          padding: 12px 28px 12px 16px;
          border-radius: 8px;
          z-index: 3;
          transform: translateY(calc(100% + 20px));
          transition: transform 300ms ease-out;
        }
        .acard:hover .acard-overlay { transform: translateY(0); }
        .acard-overlay-title {
          font-family: var(--font-title);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: #ffffff;
          margin: 0 0 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .acard-overlay-sub {
          font-family: var(--font-body);
          font-size: 13px;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.80);
          margin: 0 0 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .acard-overlay-meta {
          font-family: var(--font-body);
          font-size: 13px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.58);
          margin: 0;
        }

        /* ── Dots ────────────────────────────────────────────────── */
        .acard-dots {
          display: flex;
          gap: 6px;
          margin-bottom: 10px;
        }
        .acard-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(255,255,255,0.28);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 300ms ease, transform 300ms ease;
        }
        .acard-dot.is-active {
          background: #ffffff;
          transform: scale(1.3);
        }

        /* ── Arrow buttons — copper ──────────────────────────────── */
        .acard-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(calc(-50% - 44px));
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(184,149,106,0.12);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(184,149,106,0.50);
          color: #b8956a;
          font-size: 20px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 4;
          transition: background 300ms ease;
          padding: 0 0 1px;
        }
        .acard-arrow:hover { background: rgba(184,149,106,0.22); }
        .acard-arrow-l { left: 12px; }
        .acard-arrow-r { right: 12px; }

        /* ── Zoom button — visible on hover ──────────────────────── */
        .acard-zoom {
          position: absolute;
          top: 48px;
          right: 16px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(184,149,106,0.12);
          border: 1px solid rgba(184,149,106,0.50);
          color: #b8956a;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 4;
          opacity: 0;
          transition: opacity 300ms ease, background 300ms ease;
        }
        .acard:hover .acard-zoom { opacity: 1; }
        .acard-zoom:hover { background: rgba(184,149,106,0.24); }

        /* ── Lightbox ────────────────────────────────────────────── */
        .acard-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: zoom-out;
          overflow: hidden;
        }
        .acard-lightbox-img {
          cursor: default;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .acard-lightbox-close {
          position: fixed;
          top: 24px;
          right: 28px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(184,149,106,0.45);
          color: #b8956a;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          transition: background 300ms ease;
          font-family: var(--font-body);
        }
        .acard-lightbox-close:hover { background: rgba(184,149,106,0.15); }
        .acard-lightbox-arrow {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(184,149,106,0.12);
          border: 1px solid rgba(184,149,106,0.50);
          color: #b8956a;
          font-size: 24px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10000;
          transition: background 300ms ease;
          padding: 0 0 1px;
        }
        .acard-lightbox-arrow:hover { background: rgba(184,149,106,0.22); }
        .acard-lightbox-arrow-l { left: 32px; }
        .acard-lightbox-arrow-r { right: 32px; }

        /* ── Bottom strip ────────────────────────────────────────── */
        .apage-strip {
          display: flex;
          align-items: stretch;
          border-top: 1px solid var(--color-line);
          margin-top: clamp(56px, 8vh, 96px);
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .apage-strip > span {
          display: flex;
          align-items: center;
          padding: 14px clamp(14px, 2.5vw, 36px);
          border-right: 1px solid var(--color-line);
          white-space: nowrap;
        }
        .apage-strip > span:first-child { padding-left: 0; }
        .apage-strip > span:last-child { border-right: none; }
        .apage-strip .apage-strip-fill { flex: 1; border-right: none; }

        /* ── Responsive ──────────────────────────────────────────── */
        @media (max-width: 767px) {
          .apage-grid { grid-template-columns: 1fr; }
          .acard-media { height: 440px; }
          .apage-filters { gap: 18px 24px; }
          .apage-strip { flex-wrap: wrap; gap: 0 18px; }
          .apage-strip > span { border-right: none !important; padding: 10px 0 0 !important; }
        }
      `}</style>

      <div className="apage-wrap">

        {/* Top rule */}
        <div style={{ height: '1px', background: 'var(--color-border)', marginBottom: 'clamp(40px, 6vh, 72px)' }} />

        {/* Editorial header */}
        <p className="apage-eyebrow">Architecture</p>
        <h1 className="apage-title">Space. Structure. Skin.</h1>
        <p className="apage-desc">
          From concept to construction document — architecture as a complete act.
        </p>

        {/* Filter bar */}
        <div className="apage-filters" role="tablist" aria-label="Filter projects by category">
          {FILTERS.map(f => {
            const n = f === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === f).length;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                className={`apage-filter${active === f ? ' is-active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
                <span className="apage-filter-n">{String(n).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="apage-grid">
          {visible.length === 0 ? (
            <p className="apage-empty">No projects in this category yet.</p>
          ) : (
            visible.map((p, i) => <ProjectCard key={p.title} project={p} index={i} slug={slugify(p.title)} />)
          )}
        </div>

        {/* Bottom strip */}
        <div className="apage-strip" aria-hidden="true">
          <span>AMD NSRI</span>
          <span>Architecture</span>
          <span>Est. 2026</span>
          <span className="apage-strip-fill" />
        </div>

      </div>
    </>
  );
}
