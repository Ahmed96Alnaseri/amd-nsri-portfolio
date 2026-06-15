import Image from 'next/image';
import Link from 'next/link';

/* ─── types & data ──────────────────────────────────────────────────── */
type GalleryImage = { src: string; caption: string };

type CaseStudy = {
  title: string;
  category: string;
  year: string;
  location: string;
  client: string;
  heroImage: string;
  description: string;
  program: string;
  area: string;
  status: string;
  tools: string;
  gallery: GalleryImage[];
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
    { src: '/project-hysel-01.png', caption: 'Exterior View' },
    { src: '/ceiling türkmen.png', caption: 'Ceiling Pattern Detail' },
    { src: '/kolon4.png', caption: 'Column Technical Drawing' },
    { src: '/kolon.png', caption: 'Parametric Column Detail' },
  ],
};

/* Case studies keyed by slug. Numbered keys match the caseStudyLink values
   in src/data/projects.ts (/architecture/001 …). Unknown slugs fall back to
   the Hasyl Canopy example so this template always renders. */
const CASE_STUDIES: Record<string, CaseStudy> = {
  'hasyl-canopy': HASYL_CANOPY,
  '001': HASYL_CANOPY,
};

/* ─── page ──────────────────────────────────────────────────────────── */
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = CASE_STUDIES[params.slug] ?? HASYL_CANOPY;

  const infoItems: { label: string; value: string }[] = [
    { label: 'Category', value: project.category },
    { label: 'Year', value: project.year },
    { label: 'Location', value: project.location },
    { label: 'Client', value: project.client },
  ];

  const detailItems: { label: string; value: string }[] = [
    { label: 'Program', value: project.program },
    { label: 'Area', value: project.area },
    { label: 'Status', value: project.status },
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
          left: 0;
          right: 0;
          bottom: 0;
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
          width: 28px;
          height: 1px;
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

        /* ── Gallery ─────────────────────────────────────────────── */
        .cs-gallery {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2vw, 32px);
          padding-bottom: clamp(48px, 8vh, 96px);
        }
        .cs-gallery-item {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
        }
        .cs-gallery-img { object-fit: cover; object-position: center; }
        .cs-gallery-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 2;
          padding: 28px 16px 12px;
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.78);
          background: linear-gradient(180deg, transparent 0%, rgba(13,13,11,0.72) 100%);
        }

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
        @media (max-width: 767px) {
          .cs-hero { height: 56vh; }
          .cs-body { grid-template-columns: 1fr; }
          .cs-gallery { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="cs-wrap">

        {/* 1 — Hero */}
        <div className="cs-hero">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="cs-hero-img"
          />
          <div className="cs-hero-scrim" aria-hidden="true" />
          <div className="cs-hero-inner">
            <p className="cs-hero-eyebrow">{project.category}</p>
            <h1 className="cs-hero-title">{project.title}</h1>
          </div>
        </div>

        <div className="cs-section">

          {/* 2 — Info bar */}
          <div className="cs-infobar">
            {infoItems.map((item) => (
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
                {detailItems.map((item) => (
                  <div className="cs-detail-row" key={item.label}>
                    <span className="cs-detail-label">{item.label}</span>
                    <span className="cs-detail-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5 — Gallery */}
          <div className="cs-gallery">
            {project.gallery.map((img, i) => (
              <div className="cs-gallery-item" key={`${img.src}-${i}`}>
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="cs-gallery-img"
                />
                <span className="cs-gallery-caption">{img.caption}</span>
              </div>
            ))}
          </div>

          {/* 6 — Back link */}
          <div className="cs-back-wrap">
            <Link href="/architecture" className="cs-back">
              <span aria-hidden="true">←</span>
              <span>Back to Architecture</span>
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
