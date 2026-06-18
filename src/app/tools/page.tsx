'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import tools, {
  TOOL_PLATFORMS,
  type Tool,
  type ToolStatus,
} from '@/data/tools';

const FILTERS = ['All', ...TOOL_PLATFORMS] as const;
type Filter = (typeof FILTERS)[number];

/* status → modifier class */
const STATUS_MOD: Record<ToolStatus, string> = {
  'Live': 'tc-status--live',
  'Beta': 'tc-status--beta',
  'Coming Soon': 'tc-status--soon',
};

/* ── card ───────────────────────────────────────────────────────────── */
function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const { t, tv } = useLanguage();

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="tc"
      aria-label={`${tool.name} — view details`}
    >
      {tool.image
        ? <span className="tc-media" style={{ backgroundImage: `url(${tool.image})` }} aria-hidden="true" />
        : <span className="tc-media tc-media--placeholder" aria-hidden="true"><span className="tc-diamond" aria-hidden="true">◆</span></span>
      }
      <span className="tc-fade" aria-hidden="true" />

      <span className="tc-content">
        <span className="tc-top">
          <span className="tc-platform">{tool.platform}</span>
          <span className="tc-top-right">
            {tool.type === 'product' && tool.price
              ? <span className="tc-price">{tv(tool.price)}</span>
              : <span className="tc-showcase">{t('tools.showcase')}</span>}
            <span className={`tc-status ${STATUS_MOD[tool.status]}`}>
              <span className="tc-status-dot" aria-hidden="true" />
              {tv(tool.status)}
            </span>
          </span>
        </span>

        <span className="tc-body">
          <span className="tc-name">{tv(tool.name)}</span>
          <span className="tc-desc">{tv(tool.description)}</span>
        </span>

        <span className="tc-foot">
          <span className="tc-index" aria-hidden="true">
            T-{String(index + 1).padStart(2, '0')}
          </span>
          <span className="tc-arrow" aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function ToolsPage() {
  const { t, tv } = useLanguage();
  const [active, setActive] = useState<Filter>('All');

  const visible = active === 'All'
    ? tools
    : tools.filter(tl => tl.platform.includes(active));

  return (
    <>
      <style>{`
        /* ── page ──────────────────────────────────────────────── */
        .tp {
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: clamp(96px, 12vh, 140px) 24px clamp(32px, 4vh, 56px);
          min-height: 100vh;
        }
        .tp-rule { height: 1px; background: var(--color-border); margin-bottom: clamp(40px,6vh,72px); }
        .tp-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-accent); margin-bottom: 28px;
        }
        .tp-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px; background: var(--color-accent); opacity: .7;
        }
        .tp-title {
          font-family: var(--font-title);
          font-size: clamp(48px,8vw,116px);
          letter-spacing: -0.03em; line-height: .98;
          color: var(--color-text-primary); margin: 0 0 28px; max-width: 14ch;
        }
        .tp-desc {
          font-size: clamp(14px,1.4vw,17px); font-weight: 300;
          letter-spacing: .02em; line-height: 1.7;
          color: var(--color-text-secondary); max-width: 58ch;
          margin: 0 0 clamp(40px,6vh,64px);
        }

        /* ── filters ───────────────────────────────────────────── */
        .tp-filters {
          display: flex; align-items: center; gap: clamp(20px,3vw,44px);
          flex-wrap: wrap;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          padding: 22px 0; margin-bottom: clamp(48px,7vh,80px);
        }
        .tp-f {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.35); padding: 0;
          transition: color 300ms ease;
        }
        .tp-f:hover { color: rgba(255,255,255,.7); }
        .tp-f.on   { color: var(--color-accent); }
        .tp-f:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 6px; }
        .tp-fn { font-size: 9px; color: var(--color-text-meta); margin-left: 6px; }
        .tp-f.on .tp-fn { color: var(--color-accent-dim); }

        /* ── grid ──────────────────────────────────────────────── */
        .tp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          align-content: start;
        }
        .tp-empty {
          grid-column: 1/-1; padding: 80px 0; text-align: center;
          font-size: 13px; letter-spacing: .08em; color: var(--color-text-meta);
        }

        /* ── card ──────────────────────────────────────────────── */
        .tc {
          position: relative; overflow: hidden;
          display: block;
          min-height: 252px;
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          text-decoration: none;
          transition:
            border-color 400ms cubic-bezier(.16,1,.3,1),
            transform 400ms cubic-bezier(.16,1,.3,1);
        }
        .tc:hover { border-color: var(--color-accent); transform: translateY(-3px); }
        .tc:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }

        /* background image, right side */
        .tc-media {
          position: absolute; inset: 0; z-index: 0;
          background-repeat: no-repeat;
          background-position: right center;
          background-size: cover;
          opacity: .85;
          transition: opacity 500ms ease, transform 600ms cubic-bezier(.16,1,.3,1);
        }
        .tc:hover .tc-media { opacity: 1; transform: scale(1.03); }
        .tc-fade {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to right, #0d0d0b 0%, #0d0d0b 45%, transparent 100%);
        }
        .tc-media--placeholder { background-image: none; }
        .tc-diamond {
          position: absolute; right: 22%; top: 50%; transform: translateY(-50%);
          font-size: 72px; line-height: 1;
          color: rgba(184,149,106,0.08);
          pointer-events: none; user-select: none;
        }

        .tc-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          height: 100%; min-height: 252px;
          padding: clamp(28px, 3vw, 40px);
          box-sizing: border-box;
        }

        /* top: platform + (price|showcase) + status */
        .tc-top {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: clamp(28px, 3.5vw, 44px);
        }
        .tc-top-right { display: flex; align-items: center; gap: 14px; }
        .tc-platform {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-accent);
          border: 1px solid rgba(184,149,106,.38);
          padding: 5px 11px; white-space: nowrap;
        }
        .tc-price {
          font-family: var(--font-body); font-size: 12px; font-weight: 500;
          letter-spacing: .06em; color: var(--color-accent); white-space: nowrap;
        }
        .tc-showcase {
          font-family: var(--font-body); font-size: 9px;
          letter-spacing: .2em; text-transform: uppercase;
          color: var(--color-text-meta); white-space: nowrap;
        }
        .tc-status {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .14em; text-transform: uppercase; white-space: nowrap;
        }
        .tc-status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
        .tc-status--live { color: var(--color-accent); }
        .tc-status--beta { color: rgba(255,255,255,.6); }
        .tc-status--soon { color: var(--color-text-meta); }
        .tc-status--soon .tc-status-dot { background: transparent; border: 1px solid currentColor; }

        /* body: name + description */
        .tc-body { flex: 1; display: flex; flex-direction: column; gap: 12px; }
        .tc-name {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(21px, 2.2vw, 24px);
          letter-spacing: -.01em; line-height: 1.12;
          color: var(--color-text-primary); margin: 0; max-width: 16ch;
        }
        .tc:hover .tc-name { color: #fff; }
        .tc-desc {
          font-family: var(--font-body); font-size: 14px; font-weight: 300;
          letter-spacing: .02em; line-height: 1.65;
          color: rgba(255,255,255,0.6); margin: 0; max-width: 36ch;
        }

        /* foot: index + arrow */
        .tc-foot {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-top: clamp(24px, 3vw, 36px);
        }
        .tc-index {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .16em; text-transform: uppercase; color: var(--color-text-meta);
        }
        .tc-arrow {
          font-family: var(--font-body); font-size: 20px; line-height: 1;
          color: var(--color-accent);
          transition: transform 400ms cubic-bezier(.16,1,.3,1);
        }
        .tc:hover .tc-arrow { transform: translateX(5px); }

        /* ── bottom strip ──────────────────────────────────────── */
        .tp-strip {
          display: flex; align-items: stretch;
          border-top: 1px solid var(--color-line);
          margin-top: clamp(56px,8vh,96px);
          font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .tp-strip > span {
          display: flex; align-items: center;
          padding: 14px clamp(14px,2.5vw,36px);
          border-right: 1px solid var(--color-line); white-space: nowrap;
        }
        .tp-strip > span:first-child { padding-left: 0; }
        .tp-strip-fill { flex: 1; border-right: none !important; }

        /* ── reduced motion ────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .tc, .tc-arrow, .tc-media, .tp-f { transition: none !important; }
          .tc:hover { transform: none; }
          .tc:hover .tc-media { transform: none; }
          .tc:hover .tc-arrow { transform: none; }
        }

        /* ── responsive ────────────────────────────────────────── */
        @media (max-width: 767px) {
          .tp-grid { grid-template-columns: 1fr; gap: 16px; }
          .tc, .tc-content { min-height: 0; }
          .tc-desc { max-width: 38ch; }
        }
      `}</style>

      <div className="tp">
        <div className="tp-rule" />

        <p className="tp-eyebrow">{t('tools.eyebrow')}</p>
        <h1 className="tp-title">{t('tools.title')}</h1>
        <p className="tp-desc">{t('tools.desc')}</p>

        <div className="tp-filters" role="group" aria-label="Filter tools by platform">
          {FILTERS.map(f => {
            const n = f === 'All'
              ? tools.length
              : tools.filter(tl => tl.platform.includes(f)).length;
            return (
              <button
                key={f}
                aria-pressed={active === f}
                className={`tp-f${active === f ? ' on' : ''}`}
                onClick={() => setActive(f)}
              >
                {f === 'All' ? tv('All') : f}
                <span className="tp-fn">{String(n).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        <div className="tp-grid">
          {visible.length === 0
            ? <p className="tp-empty">{t('common.noProjects')}</p>
            : visible.map((tl, i) => <ToolCard key={tl.slug} tool={tl} index={i} />)}
        </div>

        <div className="tp-strip" aria-hidden="true">
          <span>AMD NSRI</span>
          <span>{t('tools.eyebrow')}</span>
          <span>{t('common.est2026')}</span>
          <span className="tp-strip-fill" />
        </div>
      </div>
    </>
  );
}
