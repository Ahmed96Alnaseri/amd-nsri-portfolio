'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

/* ─── types & data ──────────────────────────────────────────────────── */
type GalleryImage = { src: string; caption: string; w: number; h: number };

type CaseStudy = {
  title: string;
  category: string;
  year: string;
  location: string;
  client: string;
  architect?: string;
  /** Empty string renders a placeholder hero (perforation pattern) */
  heroImage: string;
  /** CSS object-position for the hero image crop; defaults to 'center' */
  heroPosition?: string;
  /** CSS height for the hero section; defaults to 70vh (56vh on mobile) */
  heroHeight?: string;
  /** object-fit for the hero image; defaults to 'cover' (crops to fill). Use 'contain' to show the full image, uncropped. */
  heroFit?: 'cover' | 'contain';
  description: string;
  program: string;
  area: string;
  status: string;
  tools?: string;
  /** When set, replaces the "Tools Used" row with a "Manufacturers" row */
  manufacturers?: string;
  gallery: GalleryImage[];
  /** Back-link target + label; defaults to /architecture */
  backHref?: string;
  backLabel?: string;
};

const NATIONAL_HOSPITAL: CaseStudy = {
  title: 'National Hospital Facade',
  category: 'Architecture',
  year: '2025',
  location: 'Baghdad, Iraq',
  client: 'National Hospital — Mansoor',
  architect: 'Ahmed Alnaseri',
  heroImage: '/Hospital in mansoor/hospital mansor gpt.png',
  description:
    "A facade for a cardiac hospital that wears its purpose on its surface. The design centers on a single, large perforated heart form cut into the aluminum cladding — not as symbol applied after the fact, but as the organizing geometry of the entire panel system. Light passes through the perforation from behind, so the facade reads differently by day and by night: a precise metal skin in daylight, a glowing heart after dark. The perforated pattern graduates in density outward from the heart's edge, giving the form weight at its center and dissolving it toward the boundary — a field of light that breathes. For a building where cardiac care happens daily, the architecture makes no attempt to hide what occurs inside. The heart is the facade.",
  program: 'Facade Design',
  area: '300 m²',
  status: 'Built',
  gallery: [
    { src: '/Hospital in mansoor/hospital mansor gpt.png', caption: 'Exterior View', w: 1448, h: 1086 },
    { src: '/Hospital in mansoor/hospital mansore.png',    caption: 'Interior View', w: 1447, h: 1087 },
    { src: '/Hospital in mansoor/facade hospital.png',     caption: 'Massing Model', w: 3742, h: 4490 },
    { src: '/Hospital in mansoor/detail 1.png',            caption: 'Facade Detail', w: 1448, h: 1086 },
    { src: '/Hospital in mansoor/panel facade hos.png',    caption: 'Panel Study',        w: 5000, h: 5000 },
    { src: '/Hospital in mansoor/hos 1.png',               caption: 'Night View — Red',   w: 1199, h: 1312 },
    { src: '/Hospital in mansoor/hos3.png',                caption: 'Night View — Green', w: 1199, h: 1312 },
  ],
};

const PPG_FACTORY_FACADE: CaseStudy = {
  title: 'PPG Factory Facade',
  category: 'Architecture',
  year: '2024',
  location: 'Bursa, Türkiye',
  client: 'PPG Industries',
  architect: 'Ahmed Alnaseri, Furkan Kartekin',
  heroImage: '/PPG FACADE/RENDER/V3_2.png',
  description:
    'A facade conceived not as decoration but as identity. PPG produces paint — substance that flows, layers, and transforms surfaces. The cladding system answers that logic directly: aluminum panels cut and folded into wave-derived geometries, each a frozen moment of pigment in motion. The surface shifts tone as light rakes across it through the day, from warm copper at dawn to cool silver by midday, without a single painted surface. The 1,371 m² system was developed parametrically, panel geometry driven by a sine-based attractor field so the whole facade behaves as one continuous form despite being fabricated as individual sheet metal components.',
  program: 'Facade Design',
  area: '1,371 m²',
  status: 'Concept Design',
  gallery: [
    { src: '/PPG FACADE/RENDER/V3_2.png', caption: 'Exterior View',    w: 1920, h: 1080 },
    { src: '/PPG FACADE/RENDER/V3_1.png', caption: 'Facade Detail',    w: 1920, h: 1080 },
    { src: '/PPG FACADE/RENDER/V3_3.png', caption: 'Panel Study',      w: 1920, h: 1080 },
    { src: '/PPG FACADE/RENDER/4.png',    caption: 'Close-up',         w: 1920, h: 1080 },
    { src: '/PPG FACADE/RENDER/v4.png',   caption: 'Courtyard Detail', w: 1448, h: 1086 },
  ],
};

const HASYL_CANOPY: CaseStudy = {
  title: 'Hasyl Canopy',
  category: 'Architecture',
  year: '2025',
  location: 'Awaza, Turkmenistan',
  client: 'Mahli',
  architect: 'Ahmed Alnaseri, Furkan Kartekin',
  heroImage: '/Hasyl/render/CANOPY_V1_1 - Photo.jpg',
  description:
    'A parametric canopy designed for the entrance of the Hasyl Complex, creating a refined architectural gesture with a sense of movement and luxury. The column forms extend upward and continue into the ceiling, maintaining one continuous design language. The concept is translated into a contemporary fabrication logic through algorithmic design tools, allowing the form to be developed with precision, rhythm, and buildable geometry.',
  program: 'Canopy',
  area: '500 m²',
  status: 'Built',
  manufacturers: 'Kasso Engineering',
  gallery: [
    { src: '/Hasyl/render/CANOPY_V1_1 - Photo.jpg', caption: 'Exterior View',            w: 1920, h: 1080 },
    { src: '/Hasyl/Diagram/ceiling türkmen.png',    caption: 'Ceiling Pattern Detail',   w: 1200, h: 900  },
    { src: '/Hasyl/Diagram/kolon4.png',             caption: 'Column Technical Drawing', w: 900,  h: 1200 },
    { src: '/Hasyl/Diagram/kolon.png',              caption: 'Parametric Column Detail', w: 900,  h: 1200 },
    { src: '/Hasyl/render/CANOPY_V1_3 - Photo.jpg', caption: 'Canopy View 3',            w: 1920, h: 1080 },
    { src: '/Hasyl/render/CANOPY_V1_4 - Photo.jpg', caption: 'Canopy View 4',            w: 1920, h: 1080 },
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

const CORTEN_FACADE_VILLA: CaseStudy = {
  title: 'Corten Facade Villa',
  category: 'Architecture',
  year: '2026',
  location: 'Lamu, Kenya',
  client: 'Kaba',
  architect: 'Ahmed Alnaseri, Yassir Rawi',
  heroImage: '/Kalilou Kaba/render/image 11.png',
  heroPosition: 'center 55%',
  description:
    'A contemporary villa facade study exploring Corten steel as both a protective skin and an architectural expression. The design uses perforated and folded metal panels to create privacy, shading, and depth, while allowing light and shadow to animate the building throughout the day.\nThe warm weathered texture of Corten gives the project a natural, timeless character, blending modern geometry with an earthy material presence.',
  program: 'Villa',
  area: '140 m²',
  status: 'Concept',
  gallery: [
    { src: '/Kalilou Kaba/render/image 11.png', caption: 'Exterior View',        w: 1123, h: 1401 },
    { src: '/Kalilou Kaba/render/İmage 2.png', caption: 'Facade Detail',         w: 1920, h: 1080 },
    { src: '/Kalilou Kaba/render/interior.png', caption: 'Interior View',        w: 1122, h: 1402 },
    { src: '/Kalilou Kaba/render/İmage 3.png', caption: 'Corten Panel Close-up', w: 1350, h: 1080 },
    { src: '/Kalilou Kaba/render/image 4.png', caption: 'Living Room View',      w: 1122, h: 1402 },
    { src: '/Kalilou Kaba/render/model.png',   caption: 'Massing Model',         w: 1920, h: 1080 },
  ],
};

const BAGHDAD_HOSPITAL: CaseStudy = {
  title: 'Baghdad Private Hospital',
  category: 'Architecture',
  year: '2026',
  location: 'Baghdad, Iraq',
  client: 'Dr. Saif Alshamarati',
  architect: 'Ahmed Alnaseri, Yassir Rawi',
  heroImage: '/Baghdad Private Hospital/Render/facade 1.jpeg',
  heroHeight: '56vh',
  heroPosition: 'center 27%',
  description:
    'Baghdad Private Hospital explores a contemporary healthcare identity through a fluid parametric façade. Perforated aluminum panels filter natural light, provide privacy, and create a dynamic architectural expression that changes throughout the day, combining performance with a calm, welcoming presence.',
  program: 'Hospital',
  area: '800 m²',
  status: 'Concept',
  gallery: [
    { src: '/Baghdad Private Hospital/Render/facade 1.jpeg',          caption: 'Main Entrance',        w: 1254, h: 1254 },
    { src: '/Baghdad Private Hospital/Render/Exterior hospital 2.png', caption: 'Facade Detail',        w: 1254, h: 1254 },
    { src: '/Baghdad Private Hospital/Render/scrpt.png',              caption: 'Parametric Definition', w: 1080, h: 1350 },
    { src: '/Baghdad Private Hospital/Render/model1.jpeg',            caption: 'Panel Shop Drawing',    w: 877,  h: 1101 },
  ],
};

const CASE_STUDIES: Record<string, CaseStudy> = {
  'ppg-factory-facade': PPG_FACTORY_FACADE,
  'national-hospital-facade': NATIONAL_HOSPITAL,
  'national-hospital-baghdad': NATIONAL_HOSPITAL,
  'hasyl-canopy': HASYL_CANOPY,
  '001': HASYL_CANOPY,
  'hospital-facade-perforation-system': HOSPITAL_FACADE,
  'aziz-gold-smith-facade': AZIZ_FACADE,
  'sustainable-cities-monument': SUSTAINABLE_MONUMENT,
  'corten-facade-villa': CORTEN_FACADE_VILLA,
  'baghdad-private-hospital': BAGHDAD_HOSPITAL,
};

/* ─── page ──────────────────────────────────────────────────────────── */
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const { t, tv } = useLanguage();
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
    { label: t('common.category'), value: tv(project.category) },
    { label: t('common.year'),     value: project.year },
    { label: t('common.location'), value: tv(project.location) },
    { label: t('common.client'),   value: tv(project.client) },
  ];
  const detailItems = [
    { label: t('common.program'), value: tv(project.program) },
    ...(project.architect
      ? [{ label: t('common.architect'), value: tv(project.architect) }]
      : []),
    { label: t('common.area'),   value: project.area },
    { label: t('common.status'), value: tv(project.status) },
    ...(project.manufacturers
      ? [{ label: t('common.manufacturers'), value: tv(project.manufacturers) }]
      : project.tools
        ? [{ label: t('common.toolsUsed'), value: tv(project.tools) }]
        : []),
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
          white-space: pre-line;
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
        <div
          className={`cs-hero${project.heroImage ? '' : ' cs-hero--ph'}`}
          style={project.heroHeight ? { height: project.heroHeight } : undefined}
        >
          {project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="cs-hero-img"
              style={{
                ...(project.heroPosition ? { objectPosition: project.heroPosition } : {}),
                ...(project.heroFit ? { objectFit: project.heroFit } : {}),
              }}
            />
          ) : (
            <>
              <div className="cs-hero-perf" aria-hidden="true" />
              <span className="cs-hero-ph-badge" aria-hidden="true">{t('common.imageryPending')}</span>
            </>
          )}
          <div className="cs-hero-top-scrim" aria-hidden="true" />
          <div className="cs-hero-scrim" aria-hidden="true" />
          <div className="cs-hero-inner">
            <p className="cs-hero-eyebrow">{tv(project.category)}</p>
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
              <p className="cs-body-label">{t('cs.overview')}</p>
              <p className="cs-description">{tv(project.description)}</p>
            </div>
            <div>
              <p className="cs-body-label">{t('cs.details')}</p>
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
              <span>{t('cs.galleryPending')}</span>
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
                  <span className="cs-gallery-cap">{tv(img.caption)}</span>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* 6 — Back link */}
          <div className="cs-back-wrap">
            <Link href={project.backHref ?? '/architecture'} className="cs-back">
              <span aria-hidden="true">←</span>
              <span>{tv(project.backLabel ?? 'Back to Architecture')}</span>
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
