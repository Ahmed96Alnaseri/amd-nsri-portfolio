'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/* ─── types & data ──────────────────────────────────────────────────── */
type GalleryImage = { src: string; caption: string; w: number; h: number };

type CaseStudy = {
  title: string;
  category: string;
  year: string;
  location: string;
  client: string;
  /** Empty string renders a placeholder hero (perforation pattern) */
  heroImage: string;
  description: string;
  program: string;
  area: string;
  status: string;
  tools: string;
  gallery: GalleryImage[];
  /** Back-link target + label; defaults to /architecture */
  backHref?: string;
  backLabel?: string;
};

const HASYL_CANOPY: CaseStudy = {
  title: 'Hasyl Canopy',
  category: 'Architecture',
  year: '2024',
  location: 'Turkmenistan',
  client: 'Hasyl',
  heroImage: '/project-hysel-01.png',
  description:
    'A parametric canopy structure designed for the Hasyl complex entrance. The columns draw from Islamic geometric patterns, translated into a contemporary fabrication logic using algorithmic design tools.',
  program: 'Canopy Structure',
  area: '800 m²',
  status: 'Built',
  tools: 'Rhino, Grasshopper, 3ds Max',
  gallery: [
    { src: '/project-hysel-01.png',      caption: 'Exterior View',            w: 1920, h: 1080 },
    { src: '/ceiling türkmen.png',       caption: 'Ceiling Pattern Detail',   w: 1200, h: 900  },
    { src: '/kolon4.png',                caption: 'Column Technical Drawing', w: 900,  h: 1200 },
    { src: '/kolon.png',                 caption: 'Parametric Column Detail', w: 900,  h: 1200 },
    { src: '/Canopy_V3_3 - Photo.jpg',   caption: 'Canopy View 3',            w: 1920, h: 1080 },
    { src: '/Canopy_V3_4 - Photo.jpg',   caption: 'Canopy View 4',            w: 1920, h: 1080 },
    { src: '/Canopy_V3_6.jpg',           caption: 'Canopy View 6',            w: 1920, h: 1080 },
  ],
};

/* ─── Design case studies (imagery pending — placeholder hero) ───────── */
const HOSPITAL_FACADE: CaseStudy = {
  title: 'Hospital Facade Perforation System',
  category: 'Parametric Design',
  year: '2024',
  location: 'Istanbul',
  client: 'Confidential',
  heroImage: '',
  description:
    'A parametric perforation system for a hospital facade, mapping interior daylight and privacy requirements to a gradient of aperture sizes across the building skin. The pattern is generated algorithmically and rationalized into fabrication-ready panels.',
  program: 'Perforated Facade',
  area: '—',
  status: 'In Development',
  tools: 'Grasshopper + Rhino',
  gallery: [],
  backHref: '/design',
  backLabel: 'Back to Design',
};

const AZIZ_FACADE: CaseStudy = {
  title: 'Aziz Gold Smith Facade',
  category: 'Facade Systems',
  year: '2024',
  location: 'Istanbul',
  client: 'Aziz Gold Smith',
  heroImage: '',
  description:
    'A facade system for the Aziz Gold Smith building, developed parametrically to balance retail visibility with a refined, ornamental street presence. Panel geometry and mullion rhythm are driven by a single controllable definition.',
  program: 'Commercial Facade',
  area: '—',
  status: 'Completed',
  tools: 'Grasshopper + Rhino',
  gallery: [],
  backHref: '/design',
  backLabel: 'Back to Design',
};

const SUSTAINABLE_MONUMENT: CaseStudy = {
  title: 'Sustainable Cities Monument',
  category: 'Competition',
  year: '2024',
  location: 'International',
  client: 'Open Competition',
  heroImage: '',
  description:
    'A competition entry for a monument celebrating sustainable cities. Parametric geometry and real-time visualization in Unreal Engine 5 were used to study form, light, and public experience at urban scale.',
  program: 'Monument',
  area: '—',
  status: 'Competition Entry',
  tools: 'Grasshopper + Unreal Engine 5',
  gallery: [],
  backHref: '/design',
  backLabel: 'Back to Design',
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  'hasyl-canopy': HASYL_CANOPY,
  '001': HASYL_CANOPY,
  'hospital-facade-perforation-system': HOSPITAL_FACADE,
  'aziz-gold-smith-facade': AZIZ_FACADE,
  'sustainable-cities-monument': SUSTAINABLE_MONUMENT,
};

/* ─── page ──────────────────────────────────────────────────────────── */
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = CASE_STUDIES[params.slug] ?? HASYL_CANOPY;

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [scale, setScale]   = useState(1);
  const [pan, setPan]       = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const lightboxRef  = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  const didDragRef   = useRef(false);

  const lightboxOpen = lightboxIndex !== null;
  const isZoomed     = scale > 1;

  useEffect(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
    setDragging(false);
    didDragRef.current = false;
  }, [lightboxIndex]);

  useEffect(() => {
    if (!lightboxOpen) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightboxIndex(null); return; }
      if (!isZoomed) {
        if (e.key === 'ArrowRight') setLightboxIndex(i => i === null ? null : (i + 1) % project.gallery.length);
        if (e.key === 'ArrowLeft')  setLightboxIndex(i => i === null ? null : (i - 1 + project.gallery.length) % project.gallery.length);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen, isZoomed, project.gallery.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const el = lightboxRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const step = e.deltaY > 0 ? -0.2 : 0.2;
      setScale(s => {
        const next = Math.min(4, Math.max(1, s + step));
        if (next <= 1) setPan({ x: 0, y: 0 });
        return next;
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [lightboxOpen]);

  const closeLightbox = () => setLightboxIndex(null);
  const goNext = () => setLightboxIndex(i => i === null ? null : (i + 1) % project.gallery.length);
  const goPrev = () => setLightboxIndex(i => i === null ? null : (i - 1 + project.gallery.length) % project.gallery.length);

  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (didDragRef.current) { didDragRef.current = false; return; }
    closeLightbox();
  };

  const onLbMouseDown = (e: React.MouseEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    setDragging(true);
    didDragRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };
  const onLbMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    didDragRef.current = true;
    setPan({
      x: dragStartRef.current.panX + (e.clientX - dragStartRef.current.x),
      y: dragStartRef.current.panY + (e.clientY - dragStartRef.current.y),
    });
  };
  const onLbMouseUp = () => setDragging(false);
  const onDblClick   = () => { setScale(1); setPan({ x: 0, y: 0 }); };

  const infoItems = [
    { label: 'Category', value: project.category },
    { label: 'Year',     value: project.year },
    { label: 'Location', value: project.location },
    { label: 'Client',   value: project.client },
  ];
  const detailItems = [
    { label: 'Program',    value: project.program },
    { label: 'Area',       value: project.area },
    { label: 'Status',     value: project.status },
    { label: 'Tools Used', value: project.tools },
  ];

  return (
    <>
      <style>{`
        /* ── Wrapper ──────────────────────────────────────────────── */
        .cs-wrap {
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          min-height: 100vh;
        }

        /* ── Hero ─────────────────────────────────────────────────── */
        .cs-hero {
          position: relative;
          width: 100%;
          height: 70vh;
          min-height: 420px;
          overflow: hidden;
        }
        .cs-hero-img { object-fit: cover; object-position: center; }
        .cs-hero-perf {
          position: absolute; inset: 0;
          background-color: var(--color-surface-2);
          background-image: radial-gradient(rgba(184,149,106,0.13) 1.6px, transparent 1.8px);
          background-size: 26px 26px; background-position: center;
        }
        .cs-hero-ph-badge {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          z-index: 2;
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .26em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .cs-hero-top-scrim {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 120px;
          background: linear-gradient(180deg, rgba(0,0,0,0.70) 0%, transparent 100%);
          z-index: 1;
        }
        .cs-hero-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(13,13,11,0.10) 0%,
            rgba(13,13,11,0.05) 45%,
            rgba(13,13,11,0.78) 100%
          );
          z-index: 1;
        }
        .cs-hero-inner {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          z-index: 2;
          padding: 0 clamp(24px, 8vw, 120px) clamp(32px, 5vh, 56px);
        }
        .cs-hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0 0 18px;
        }
        .cs-hero-eyebrow::before {
          content: '';
          display: block;
          width: 28px; height: 1px;
          background: var(--color-accent);
          opacity: 0.7;
        }
        .cs-hero-title {
          font-family: var(--font-title);
          font-size: clamp(44px, 8vw, 104px);
          letter-spacing: -0.03em;
          line-height: 0.98;
          color: #ffffff;
          margin: 0;
          text-shadow: 0 2px 24px rgba(0,0,0,0.45);
          max-width: 16ch;
        }

        /* ── Section padding ─────────────────────────────────────── */
        .cs-section { padding: 0 clamp(24px, 8vw, 120px); }

        /* ── Info bar ────────────────────────────────────────────── */
        .cs-infobar {
          display: flex;
          flex-wrap: wrap;
          gap: clamp(32px, 6vw, 96px);
          padding: clamp(32px, 5vh, 56px) 0 clamp(28px, 4vh, 44px);
        }
        .cs-info-item { display: flex; flex-direction: column; gap: 8px; }
        .cs-info-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .cs-info-value {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: var(--color-text-primary);
        }

        /* ── Copper divider ──────────────────────────────────────── */
        .cs-divider {
          height: 1px;
          background: var(--color-accent);
          opacity: 0.55;
        }

        /* ── Two-column body ─────────────────────────────────────── */
        .cs-body {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: clamp(40px, 7vw, 120px);
          padding: clamp(48px, 8vh, 96px) 0;
        }
        .cs-body-label {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin: 0 0 24px;
        }
        .cs-description {
          font-family: var(--font-body);
          font-size: clamp(16px, 1.6vw, 20px);
          font-weight: 300;
          letter-spacing: 0.01em;
          line-height: 1.8;
          color: var(--color-text-secondary);
          margin: 0;
          max-width: 56ch;
        }
        .cs-details { display: flex; flex-direction: column; }
        .cs-detail-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 18px 0;
          border-bottom: 1px solid var(--color-line);
        }
        .cs-detail-row:first-of-type { border-top: 1px solid var(--color-line); }
        .cs-detail-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .cs-detail-value {
          font-family: var(--font-body);
          font-size: 15px;
          letter-spacing: 0.02em;
          color: var(--color-text-primary);
        }

        /* ── Gallery — masonry ───────────────────────────────────── */
        .cs-gallery {
          columns: 3;
          column-gap: 16px;
          padding-bottom: clamp(48px, 8vh, 96px);
        }
        .cs-gallery-cell {
          break-inside: avoid;
          margin-bottom: 16px;
          position: relative;
          cursor: zoom-in;
          overflow: hidden;
        }
        .cs-gallery-cell img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Gallery pending (no imagery yet) */
        .cs-gallery-pending {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 14px;
          min-height: 260px;
          margin-bottom: clamp(48px, 8vh, 96px);
          border: 1px solid var(--color-border);
          background-color: var(--color-surface);
          background-image: radial-gradient(rgba(184,149,106,0.10) 1.4px, transparent 1.6px);
          background-size: 22px 22px; background-position: center;
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .cs-gallery-pending-mark { font-size: 22px; color: var(--color-accent-dim); line-height: 1; }

        /* Hover overlay */
        .cs-gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.85) 100%);
          opacity: 0;
          transition: opacity 500ms ease-in-out;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px 18px 18px;
        }
        .cs-gallery-cell:hover .cs-gallery-overlay {
          opacity: 1;
        }

        /* Caption — bottom-left, fades in with overlay */
        .cs-gallery-cap {
          font-family: var(--font-body);
          font-size: 14px;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.85);
          margin: 0;
          opacity: 0;
          transform: translateY(5px);
          transition: opacity 400ms ease, transform 400ms ease;
        }
        .cs-gallery-cell:hover .cs-gallery-cap {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Lightbox ────────────────────────────────────────────── */
        .cs-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .cs-lightbox-img-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 90vw;
          max-height: 90vh;
          user-select: none;
        }
        .cs-lightbox-counter {
          position: fixed;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-body);
          font-size: 12px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.50);
          z-index: 10001;
          pointer-events: none;
          white-space: nowrap;
        }
        .cs-lightbox-close {
          position: fixed;
          top: 20px; right: 24px;
          width: 40px; height: 40px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid rgba(184,149,106,0.45);
          color: #b8956a;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10001;
          transition: background 300ms ease;
          font-family: var(--font-body);
        }
        .cs-lightbox-close:hover { background: rgba(184,149,106,0.15); }
        .cs-lightbox-hint {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.22);
          z-index: 10001;
          pointer-events: none;
          white-space: nowrap;
        }
        .cs-lightbox-arrow {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 44px; height: 44px;
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
          z-index: 10001;
          transition: background 300ms ease, opacity 300ms ease;
          padding: 0 0 1px;
        }
        .cs-lightbox-arrow:hover { background: rgba(184,149,106,0.22); }
        .cs-lightbox-arrow.is-hidden { opacity: 0; pointer-events: none; }
        .cs-lightbox-arrow-l { left: 28px; }
        .cs-lightbox-arrow-r { right: 28px; }

        /* ── Back link ───────────────────────────────────────────── */
        .cs-back-wrap {
          border-top: 1px solid var(--color-line);
          padding: clamp(32px, 5vh, 56px) 0 clamp(48px, 7vh, 80px);
        }
        .cs-back {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 350ms ease, gap 350ms ease;
        }
        .cs-back:hover { color: var(--color-accent); gap: 16px; }

        /* ── Responsive ──────────────────────────────────────────── */
        @media (max-width: 1023px) {
          .cs-gallery { columns: 2; }
        }
        @media (max-width: 767px) {
          .cs-hero { height: 56vh; }
          .cs-body { grid-template-columns: 1fr; }
          .cs-gallery { columns: 1; }
          .cs-lightbox-arrow-l { left: 10px; }
          .cs-lightbox-arrow-r { right: 10px; }
        }
      `}</style>

      <div className="cs-wrap">

        {/* 1 — Hero */}
        <div className={`cs-hero${project.heroImage ? '' : ' cs-hero--ph'}`}>
          {project.heroImage ? (
            <Image src={project.heroImage} alt={project.title} fill priority sizes="100vw" className="cs-hero-img" />
          ) : (
            <>
              <div className="cs-hero-perf" aria-hidden="true" />
              <span className="cs-hero-ph-badge" aria-hidden="true">Imagery Pending</span>
            </>
          )}
          <div className="cs-hero-top-scrim" aria-hidden="true" />
          <div className="cs-hero-scrim" aria-hidden="true" />
          <div className="cs-hero-inner">
            <p className="cs-hero-eyebrow">{project.category}</p>
            <h1 className="cs-hero-title">{project.title}</h1>
          </div>
        </div>

        <div className="cs-section">

          {/* 2 — Info bar */}
          <div className="cs-infobar">
            {infoItems.map(item => (
              <div className="cs-info-item" key={item.label}>
                <span className="cs-info-label">{item.label}</span>
                <span className="cs-info-value">{item.value}</span>
              </div>
            ))}
          </div>

          {/* 3 — Copper divider */}
          <div className="cs-divider" aria-hidden="true" />

          {/* 4 — Two-column section */}
          <div className="cs-body">
            <div>
              <p className="cs-body-label">Overview</p>
              <p className="cs-description">{project.description}</p>
            </div>
            <div>
              <p className="cs-body-label">Details</p>
              <div className="cs-details">
                {detailItems.map(item => (
                  <div className="cs-detail-row" key={item.label}>
                    <span className="cs-detail-label">{item.label}</span>
                    <span className="cs-detail-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5 — Gallery (masonry) */}
          {project.gallery.length === 0 ? (
            <div className="cs-gallery-pending" aria-hidden="true">
              <span className="cs-gallery-pending-mark">＋</span>
              <span>Visual documentation in progress</span>
            </div>
          ) : (
          <div className="cs-gallery">
            {project.gallery.map((img, i) => (
              <div
                key={`${img.src}-${i}`}
                className="cs-gallery-cell"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${img.caption} fullscreen`}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setLightboxIndex(i); }}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  width={img.w}
                  height={img.h}
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div className="cs-gallery-overlay" aria-hidden="true">
                  <span className="cs-gallery-cap">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* 6 — Back link */}
          <div className="cs-back-wrap">
            <Link href={project.backHref ?? '/architecture'} className="cs-back">
              <span aria-hidden="true">←</span>
              <span>{project.backLabel ?? 'Back to Architecture'}</span>
            </Link>
          </div>

        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      {lightboxOpen && lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          className="cs-lightbox"
          onClick={onBackdropClick}
          onMouseDown={onLbMouseDown}
          onMouseMove={onLbMouseMove}
          onMouseUp={onLbMouseUp}
          onMouseLeave={onLbMouseUp}
          style={{ cursor: isZoomed ? (dragging ? 'grabbing' : 'grab') : 'default' }}
        >
          <span className="cs-lightbox-counter">
            {lightboxIndex + 1} / {project.gallery.length}
          </span>

          <button
            className="cs-lightbox-close"
            onClick={e => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close lightbox"
          >✕</button>

          <button
            className={`cs-lightbox-arrow cs-lightbox-arrow-l${isZoomed ? ' is-hidden' : ''}`}
            onClick={e => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
            tabIndex={isZoomed ? -1 : 0}
          >‹</button>

          <div
            className="cs-lightbox-img-wrap"
            onClick={e => e.stopPropagation()}
            onDoubleClick={onDblClick}
          >
            <Image
              src={project.gallery[lightboxIndex].src}
              alt={project.gallery[lightboxIndex].caption}
              width={1600}
              height={1200}
              priority
              draggable={false}
              style={{
                maxHeight: '90vh',
                maxWidth: '90vw',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
                transition: dragging ? 'none' : 'transform 200ms ease',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            />
          </div>

          <button
            className={`cs-lightbox-arrow cs-lightbox-arrow-r${isZoomed ? ' is-hidden' : ''}`}
            onClick={e => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
            tabIndex={isZoomed ? -1 : 0}
          >›</button>

          {isZoomed && (
            <span className="cs-lightbox-hint">double-click to reset zoom</span>
          )}
        </div>
      )}
    </>
  );
}
