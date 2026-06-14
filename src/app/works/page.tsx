'use client';

import { useState } from 'react';

/* ─── data ─────────────────────────────────────────────────────────── */
type Project = {
  title: string;
  category: 'Architecture' | 'Facade' | 'Fabrication' | 'Design';
  year: string;
  location: string;
};

const PROJECTS: Project[] = [
  { title: 'Hospital Facade Perforation System', category: 'Facade',       year: '2023', location: 'Istanbul' },
  { title: 'Aziz Gold Smith Facade',             category: 'Facade',       year: '2023', location: 'Istanbul' },
  { title: 'Sustainable Cities Monument',        category: 'Architecture', year: '2022', location: 'Competition' },
  { title: 'Panel Nesting System',               category: 'Fabrication',  year: '2024', location: 'Istanbul' },
];

const FILTERS = ['All', 'Architecture', 'Facade', 'Fabrication', 'Design'] as const;
type Filter = (typeof FILTERS)[number];

/* ─── card ─────────────────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="wcard">
      {/* Image placeholder — 4:3 */}
      <div className="wcard-media" aria-hidden="true">
        <span className="wcard-tick wcard-tick-tl" />
        <span className="wcard-tick wcard-tick-br" />
        <span className="wcard-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="wcard-media-label">No preview</span>
      </div>

      {/* Meta */}
      <div className="wcard-body">
        <div className="wcard-row">
          <h2 className="wcard-title">{project.title}</h2>
          <span className="wcard-cat">{project.category}</span>
        </div>
        <div className="wcard-foot">
          <span>{project.year}</span>
          <span className="wcard-dot">·</span>
          <span>{project.location}</span>
        </div>
      </div>
    </article>
  );
}

/* ─── page ─────────────────────────────────────────────────────────── */
export default function WorksPage() {
  const [active, setActive] = useState<Filter>('All');

  const visible =
    active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <>
      <style>{`
        .wpage-wrap {
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

        /* Header */
        .wpage-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 24px;
        }
        .wpage-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: var(--color-accent);
          opacity: 0.7;
        }
        .wpage-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .wpage-title {
          font-family: var(--font-title);
          font-size: clamp(56px, 9vw, 132px);
          letter-spacing: -0.03em;
          line-height: 0.95;
          color: var(--color-text-primary);
          margin: 0;
        }
        .wpage-count {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-text-meta);
          padding-bottom: 12px;
        }

        /* Filter bar */
        .wpage-filters {
          display: flex;
          align-items: center;
          gap: clamp(20px, 3vw, 44px);
          flex-wrap: wrap;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          padding: 22px 0;
          margin-bottom: 56px;
        }
        .wpage-filter {
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
          position: relative;
        }
        .wpage-filter:hover { color: rgba(255,255,255,0.75); }
        .wpage-filter.is-active { color: var(--color-accent); }
        .wpage-filter .wpage-filter-n {
          font-size: 9px;
          color: var(--color-text-meta);
          margin-left: 7px;
          letter-spacing: 0.1em;
        }
        .wpage-filter.is-active .wpage-filter-n { color: var(--color-accent-dim); }

        /* Grid */
        .wpage-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(32px, 4vw, 64px);
          align-content: start;
        }

        /* Card */
        .wcard {
          display: block;
          border: 1px solid transparent;
          transition: transform 400ms cubic-bezier(0.16,1,0.3,1), border-color 400ms ease;
          cursor: pointer;
        }
        @media (hover: hover) and (pointer: fine) {
          .wcard:hover {
            transform: scale(1.012);
            border-color: var(--color-accent);
          }
          .wcard:hover .wcard-media-label { color: var(--color-accent); }
          .wcard:hover .wcard-tick { opacity: 0.7; }
        }
        .wcard-media {
          position: relative;
          aspect-ratio: 4 / 3;
          width: 100%;
          background:
            repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 22px),
            var(--color-surface);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .wcard-media-label {
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-text-meta);
          transition: color 400ms ease;
        }
        .wcard-index {
          position: absolute;
          top: 14px;
          left: 16px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.14em;
          color: var(--color-text-meta);
        }
        .wcard-tick {
          position: absolute;
          width: 12px;
          height: 12px;
          border: 0 solid var(--color-accent);
          opacity: 0.3;
          transition: opacity 400ms ease;
        }
        .wcard-tick-tl { top: 10px; right: 12px; border-top-width: 1px; border-right-width: 1px; }
        .wcard-tick-br { bottom: 10px; left: 12px; border-bottom-width: 1px; border-left-width: 1px; }

        .wcard-body { padding: 20px 4px 4px; }
        .wcard-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 12px;
        }
        .wcard-title {
          font-family: var(--font-title);
          font-size: clamp(20px, 1.9vw, 28px);
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: var(--color-text-primary);
          margin: 0;
        }
        .wcard-cat {
          flex-shrink: 0;
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent);
          border: 1px solid var(--color-accent-dim);
          padding: 5px 10px;
          white-space: nowrap;
        }
        .wcard-foot {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-size: 12px;
          letter-spacing: 0.08em;
          color: var(--color-text-meta);
        }
        .wcard-dot { opacity: 0.6; }

        /* Empty state */
        .wpage-empty {
          grid-column: 1 / -1;
          padding: 80px 0;
          text-align: center;
          font-family: var(--font-body);
          font-size: 13px;
          letter-spacing: 0.08em;
          color: var(--color-text-meta);
        }

        /* Bottom strip */
        .wpage-strip {
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
        .wpage-strip > span {
          display: flex;
          align-items: center;
          padding: 14px clamp(14px, 2.5vw, 36px);
          border-right: 1px solid var(--color-line);
          white-space: nowrap;
        }
        .wpage-strip > span:first-child { padding-left: 0; }
        .wpage-strip > span:last-child { border-right: none; }
        .wpage-strip .wpage-strip-fill { flex: 1; border-right: none; }

        /* Responsive */
        @media (max-width: 767px) {
          .wpage-grid { grid-template-columns: 1fr; }
          .wpage-head { margin-bottom: 40px; }
          .wpage-filters { gap: 18px 24px; margin-bottom: 40px; }
          .wpage-strip { flex-wrap: wrap; gap: 0 18px; }
          .wpage-strip > span { border-right: none !important; padding: 10px 0 0 !important; }
        }
      `}</style>

      <div className="wpage-wrap">

        {/* Top rule (sheet edge) */}
        <div style={{ height: '1px', background: 'var(--color-border)', marginBottom: 'clamp(40px, 6vh, 72px)' }} />

        {/* Header */}
        <p className="wpage-eyebrow">Selected works</p>
        <div className="wpage-head">
          <h1 className="wpage-title">Works</h1>
          <span className="wpage-count">
            {String(visible.length).padStart(2, '0')} {visible.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        {/* Filter bar */}
        <div className="wpage-filters" role="tablist" aria-label="Filter projects by category">
          {FILTERS.map((f) => {
            const n =
              f === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                className={`wpage-filter${active === f ? ' is-active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
                <span className="wpage-filter-n">{String(n).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="wpage-grid">
          {visible.length === 0 ? (
            <p className="wpage-empty">No projects in this category yet.</p>
          ) : (
            visible.map((p, i) => <ProjectCard key={p.title} project={p} index={i} />)
          )}
        </div>

        {/* Bottom title-block strip */}
        <div className="wpage-strip" aria-hidden="true">
          <span>AMD NSRI</span>
          <span>Works</span>
          <span>Est. 2026</span>
          <span className="wpage-strip-fill" />
        </div>

      </div>
    </>
  );
}
