'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

/* ── stat definitions ────────────────────────────────────────────────── */
const STATS: { value: number; suffix: string; labelKey: string }[] = [
  { value: 12, suffix: '+', labelKey: 'stats.projects' },
  { value: 4,  suffix: '',  labelKey: 'stats.countries' },
  { value: 6,  suffix: '',  labelKey: 'stats.tools' },
  { value: 3,  suffix: '',  labelKey: 'stats.disciplines' },
];

/* ── dotted world map (equirectangular) ──────────────────────────────────
   Low-res land mask. Each row = a latitude band (80°N → -50°S, 5° steps).
   Each entry = inclusive [startCol, endCol] column ranges across 60 columns
   (-180° → 180° longitude). Markers are projected with the same function so
   they always land on the dot field. ───────────────────────────────────── */
const COLS = 60;
const ROWS = 27;
const VW = 600;
const VH = 300;

const LAND: [number, number][][] = [
  /* 80 */ [[12, 16], [23, 26]],
  /* 75 */ [[11, 17], [22, 27], [46, 55]],
  /* 70 */ [[9, 18], [23, 27], [30, 58]],
  /* 65 */ [[8, 18], [24, 26], [29, 58]],
  /* 60 */ [[7, 18], [29, 58]],
  /* 55 */ [[7, 19], [28, 58]],
  /* 50 */ [[7, 19], [28, 58]],
  /* 45 */ [[9, 20], [28, 58]],
  /* 40 */ [[10, 19], [28, 28], [30, 58]],
  /* 35 */ [[11, 19], [28, 58]],
  /* 30 */ [[12, 16], [28, 57]],
  /* 25 */ [[13, 15], [28, 40], [43, 57]],
  /* 20 */ [[15, 16], [28, 40], [43, 55]],
  /* 15 */ [[15, 17], [28, 41], [44, 54]],
  /* 10 */ [[19, 21], [27, 42], [50, 54]],
  /*  5 */ [[19, 23], [28, 42], [49, 55]],
  /*  0 */ [[19, 24], [29, 40], [50, 55]],
  /* -5 */ [[19, 25], [31, 40], [51, 55]],
  /* -10 */ [[19, 26], [32, 40], [52, 55]],
  /* -15 */ [[19, 26], [32, 40], [52, 57]],
  /* -20 */ [[20, 26], [32, 39], [51, 57]],
  /* -25 */ [[21, 26], [33, 38], [51, 57]],
  /* -30 */ [[21, 25], [33, 37], [52, 56]],
  /* -35 */ [[21, 24], [53, 55]],
  /* -40 */ [[21, 23]],
  /* -45 */ [[21, 23]],
  /* -50 */ [[22, 22]],
];

const proj = (lon: number, lat: number) => ({
  x: ((lon + 180) / 360) * VW,
  y: ((80 - lat) / 130) * VH,
});

const MARKERS = [
  { key: 'istanbul', lon: 29, lat: 41, delay: 0 },
  { key: 'iraq', lon: 44, lat: 33.3, delay: 0.8 },
  { key: 'turkmenistan', lon: 58, lat: 39, delay: 1.6 },
];

/* ── animated counter ────────────────────────────────────────────────── */
function StatItem({
  value,
  suffix,
  label,
  run,
}: {
  value: number;
  suffix: string;
  label: string;
  run: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(value);
      return;
    }
    const duration = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, value]);

  return (
    <div className="stat" role="img" aria-label={`${value}${suffix} ${label}`}>
      <span className="stat-num" aria-hidden="true">
        {n}
        <span className="stat-suffix">{suffix}</span>
      </span>
      <span className="stat-label" aria-hidden="true">
        {label}
      </span>
    </div>
  );
}

/* ── section ─────────────────────────────────────────────────────────── */
export default function StatsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRun(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (const [a, b] of LAND[r]) {
        for (let c = a; c <= b; c++) {
          out.push({
            x: +((c / (COLS - 1)) * VW).toFixed(1),
            y: +((r / (ROWS - 1)) * VH).toFixed(1),
          });
        }
      }
    }
    return out;
  }, []);

  return (
    <section ref={sectionRef} className="stats-section" aria-labelledby="stats-heading">
      {/* Header — PRESENCE + copper rule */}
      <div className="stats-top-rule">
        <span id="stats-heading" className="stats-label">
          {t('stats.eyebrow')}
        </span>
        <span className="stats-rule-line" aria-hidden="true" />
      </div>

      <div className="stats-inner">
        {/* Left — counters */}
        <div className="stats-grid">
          {STATS.map((s) => (
            <StatItem
              key={s.labelKey}
              value={s.value}
              suffix={s.suffix}
              label={t(s.labelKey)}
              run={run}
            />
          ))}
        </div>

        {/* Right — dotted world map */}
        <div className="stats-map">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="stats-map-svg"
            role="img"
            aria-label={t('stats.mapAria')}
            preserveAspectRatio="xMidYMid meet"
          >
            <g className="stats-dots">
              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={1.5} />
              ))}
            </g>

            {MARKERS.map((m) => {
              const { x, y } = proj(m.lon, m.lat);
              return (
                <g key={m.key} style={{ ['--pulse-delay' as string]: `${m.delay}s` }}>
                  <circle className="stats-pulse" cx={x} cy={y} r={6} />
                  <rect
                    className="stats-marker"
                    x={x - 4}
                    y={y - 4}
                    width={8}
                    height={8}
                    transform={`rotate(45 ${x} ${y})`}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          position: relative;
          padding: var(--spacing-section) var(--spacing-side-sm);
          background:
            radial-gradient(ellipse 70% 50% at 75% 50%, rgba(184, 149, 106, 0.06) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 40%, rgba(26, 32, 48, 0.14) 0%, transparent 55%),
            var(--color-bg);
          overflow: hidden;
        }
        @media (min-width: 1024px) {
          .stats-section {
            padding-left: var(--spacing-side-lg);
            padding-right: var(--spacing-side-lg);
          }
        }

        /* header */
        .stats-top-rule {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: clamp(48px, 7vh, 80px);
        }
        .stats-label {
          font-family: var(--font-body);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-text-meta);
          white-space: nowrap;
          font-weight: 400;
        }
        .stats-rule-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            to right,
            var(--color-accent) 0%,
            rgba(184, 149, 106, 0.15) 100%
          );
        }

        /* layout */
        .stats-inner {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(40px, 6vw, 96px);
          align-items: center;
        }

        /* counters */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--color-border);
          border: 1px solid var(--color-border);
        }
        .stat {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: clamp(28px, 3.5vw, 48px) clamp(20px, 2.5vw, 36px);
          background: var(--color-bg);
        }
        .stat-num {
          font-family: var(--font-body);
          font-weight: 400;
          font-size: clamp(40px, 5vw, 52px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--color-accent);
          font-variant-numeric: tabular-nums;
        }
        .stat-suffix {
          color: var(--color-accent);
          opacity: 0.65;
          margin-left: 1px;
        }
        .stat-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-text-meta);
        }

        /* map */
        .stats-map {
          position: relative;
          width: 100%;
        }
        .stats-map-svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .stats-dots :global(circle) {
          fill: var(--color-text-meta);
        }
        .stats-marker {
          fill: var(--color-accent);
        }
        .stats-pulse {
          fill: none;
          stroke: var(--color-accent);
          stroke-width: 1.2;
          transform-box: fill-box;
          transform-origin: center;
          opacity: 0;
          animation: statsPulse 3s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          animation-delay: var(--pulse-delay, 0s);
        }

        @keyframes statsPulse {
          0% {
            transform: scale(0.5);
            opacity: 0.7;
          }
          70% {
            transform: scale(2.6);
            opacity: 0;
          }
          100% {
            transform: scale(2.6);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stats-pulse {
            animation: none;
          }
        }

        /* responsive */
        @media (max-width: 900px) {
          .stats-inner {
            grid-template-columns: 1fr;
            gap: clamp(40px, 7vw, 64px);
          }
          .stats-map {
            order: -1;
            max-width: 520px;
            margin: 0 auto;
          }
        }
        @media (max-width: 600px) {
          .stats-section {
            padding-left: 24px;
            padding-right: 24px;
            padding-top: 96px;
            padding-bottom: 96px;
          }
        }
      `}</style>
    </section>
  );
}
