'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import products, {
  SHOP_FILTERS,
  matchesFilter,
  type ShopProduct,
  type ShopFilter,
} from '@/data/shop-products';

/* filter chip → translation key */
const FILTER_KEY: Record<ShopFilter, string> = {
  'All':         'common.all',
  'Scripts':     'shop.fScripts',
  '3D Assets':   'shop.f3dAssets',
  '3D Printing': 'shop.f3dPrinting',
  'Free':        'shop.fFree',
};

/* ── Copper diamond SVG placeholder ───────────────────────────────────── */
function DiamondPlaceholder() {
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* crosshair lines */}
      <line x1="200" y1="0" x2="200" y2="400" stroke="#b8956a" strokeWidth="0.5" strokeOpacity="0.08" />
      <line x1="0" y1="200" x2="400" y2="200" stroke="#b8956a" strokeWidth="0.5" strokeOpacity="0.08" />
      {/* diagonal construction */}
      <line x1="0" y1="0" x2="400" y2="400" stroke="#b8956a" strokeWidth="0.3" strokeOpacity="0.05" />
      <line x1="400" y1="0" x2="0" y2="400" stroke="#b8956a" strokeWidth="0.3" strokeOpacity="0.05" />
      {/* corner registration ticks */}
      <path d="M20 40 L20 20 L40 20" stroke="#b8956a" strokeWidth="0.8" strokeOpacity="0.15" />
      <path d="M360 40 L360 20 L340 20" stroke="#b8956a" strokeWidth="0.8" strokeOpacity="0.15" />
      <path d="M20 360 L20 380 L40 380" stroke="#b8956a" strokeWidth="0.8" strokeOpacity="0.15" />
      <path d="M360 360 L360 380 L340 380" stroke="#b8956a" strokeWidth="0.8" strokeOpacity="0.15" />
      {/* diamond */}
      <polygon
        points="200,120 280,200 200,280 120,200"
        fill="none"
        stroke="#b8956a"
        strokeWidth="1"
        strokeOpacity="0.14"
      />
      {/* inner diamond */}
      <polygon
        points="200,152 248,200 200,248 152,200"
        fill="none"
        stroke="#b8956a"
        strokeWidth="0.6"
        strokeOpacity="0.08"
      />
    </svg>
  );
}

/* ── Product card ──────────────────────────────────────────────────────── */
function ProductCard({ product, index }: { product: ShopProduct; index: number }) {
  const { t, tv } = useLanguage();
  const isComingSoon = product.mode === 'coming-soon';
  const ctaLabel     = isComingSoon ? t('shop.notifyMe') : t('shop.get');

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="spc"
      aria-label={`${tv(product.name)} — ${isComingSoon ? t('shop.comingSoon') : product.price}`}
    >
      {/* ── image / placeholder ──────────────────────── */}
      <span className="spc-img" aria-hidden="true">
        {product.image
          ? <span className="spc-bg-img" style={{ backgroundImage: `url(${product.image})` }} />
          : <DiamondPlaceholder />
        }

        {/* category badge */}
        <span className="spc-badge">{tv(product.category)}</span>

        {/* coming soon overlay */}
        {isComingSoon && (
          <span className="spc-soon">
            <span className="spc-soon-line" />
            <span className="spc-soon-text">{t('shop.comingSoon')}</span>
            <span className="spc-soon-line" />
          </span>
        )}

        {/* index tag — top right */}
        <span className="spc-idx" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* hover glass CTA */}
        <span className="spc-glass" aria-hidden="true">
          <span className="spc-glass-text">{ctaLabel}</span>
          <span className="spc-glass-arrow">→</span>
        </span>
      </span>

      {/* ── product info ─────────────────────────────── */}
      <span className="spc-info">
        <span className="spc-name">{tv(product.name)}</span>
        <span className="spc-desc">{tv(product.description)}</span>
        <span className="spc-price-row">
          <span className={`spc-price${isComingSoon ? ' spc-price--soon' : ''}`}>
            {isComingSoon ? t('shop.comingSoon') : tv(product.price)}
          </span>
          <span className="spc-delivery">{tv(product.deliveryType)}</span>
        </span>
      </span>
    </Link>
  );
}

/* ── Page ──────────────────────────────────────────────────────────────── */
export default function ShopPage() {
  const { t } = useLanguage();
  const [active, setActive] = useState<ShopFilter>('All');

  const visible = products.filter(p => matchesFilter(p, active));

  return (
    <>
      <style>{`
        /* ── page ──────────────────────────────────────────────── */
        .sp {
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: clamp(96px, 12vh, 140px) clamp(24px, 6vw, 80px) clamp(32px, 4vh, 56px);
          min-height: 100vh;
        }
        .sp-rule { height: 1px; background: var(--color-border); margin-bottom: clamp(40px,6vh,72px); }
        .sp-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-accent); margin-bottom: 28px;
        }
        .sp-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px; background: var(--color-accent); opacity: .7;
        }
        .sp-title {
          font-family: var(--font-title);
          font-size: clamp(44px,7vw,100px);
          letter-spacing: -0.03em; line-height: .98;
          color: var(--color-text-primary); margin: 0 0 28px; max-width: 16ch;
        }
        .sp-desc {
          font-size: clamp(14px,1.4vw,17px); font-weight: 300;
          letter-spacing: .02em; line-height: 1.7;
          color: var(--color-text-secondary); max-width: 58ch;
          margin: 0 0 clamp(40px,6vh,64px);
        }

        /* ── filters ───────────────────────────────────────────── */
        .sp-filters {
          display: flex; align-items: center; gap: clamp(18px,3vw,40px);
          flex-wrap: wrap;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          padding: 22px 0; margin-bottom: clamp(44px,6vh,72px);
        }
        .sp-f {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .16em; text-transform: uppercase;
          color: var(--color-text-secondary); padding: 0;
          transition: color 300ms ease;
        }
        .sp-f:hover { color: var(--color-text-primary); }
        .sp-f.on   { color: var(--color-accent); }
        .sp-f:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 6px; }
        .sp-fn { font-size: 9px; color: var(--color-text-meta); margin-left: 6px; }
        .sp-f.on .sp-fn { color: var(--color-accent-dim); }

        /* ── 3-column grid ─────────────────────────────────────── */
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-content: start;
          margin-bottom: clamp(56px,8vh,96px);
        }
        .sp-empty {
          grid-column: 1/-1; padding: 80px 0; text-align: center;
          font-size: 13px; letter-spacing: .08em; color: var(--color-text-meta);
        }

        /* ── card ──────────────────────────────────────────────── */
        .spc {
          position: relative;
          display: flex; flex-direction: column;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          text-decoration: none; color: inherit;
          overflow: hidden;
          transition:
            border-color 400ms cubic-bezier(.16,1,.3,1),
            transform 400ms cubic-bezier(.16,1,.3,1);
        }
        .spc:hover {
          border-color: var(--color-accent);
          transform: translateY(-4px);
        }
        .spc:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }

        /* ── square image area ─────────────────────────────────── */
        .spc-img {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: var(--color-surface-2);
          overflow: hidden;
          flex-shrink: 0;
          display: block;
        }
        .spc-bg-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          opacity: .85;
          transition: opacity 500ms ease, transform 600ms cubic-bezier(.16,1,.3,1);
        }
        .spc:hover .spc-bg-img { opacity: 1; transform: scale(1.03); }

        /* ── category badge top-left ───────────────────────────── */
        .spc-badge {
          position: absolute; top: 12px; left: 12px; z-index: 3;
          font-family: var(--font-body); font-size: 9px;
          letter-spacing: .16em; text-transform: uppercase;
          color: var(--color-accent);
          background: rgba(13,13,11,.78);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: 1px solid rgba(184,149,106,.3);
          padding: 4px 9px;
        }

        /* ── index number top-right ────────────────────────────── */
        .spc-idx {
          position: absolute; top: 12px; right: 12px; z-index: 3;
          font-family: var(--font-body); font-size: 9px;
          letter-spacing: .14em;
          color: var(--color-text-meta);
          opacity: .5;
        }

        /* ── COMING SOON overlay ───────────────────────────────── */
        .spc-soon {
          position: absolute; inset: 0; z-index: 2;
          background: rgba(13,13,11,.62);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 10px;
        }
        .spc-soon-line {
          display: block; width: 28px; height: 1px;
          background: var(--color-accent); opacity: .4;
        }
        .spc-soon-text {
          font-family: var(--font-body); font-size: 9px;
          letter-spacing: .28em; text-transform: uppercase;
          color: rgba(255,255,255,.45);
        }

        /* ── hover glass CTA ───────────────────────────────────── */
        .spc-glass {
          position: absolute; bottom: 0; left: 0; right: 0; z-index: 4;
          display: flex; align-items: center; justify-content: space-between; gap: 8px;
          padding: 12px 16px;
          background: rgba(13,13,11,.56);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-top: 1px solid rgba(184,149,106,.22);
          transform: translateY(100%);
          transition: transform 400ms cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .spc:hover .spc-glass { transform: translateY(0); }
        .spc-glass-text {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .24em; text-transform: uppercase;
          color: rgba(255,255,255,.9);
        }
        .spc-glass-arrow {
          font-size: 17px; color: var(--color-accent); line-height: 1;
          transition: transform 400ms cubic-bezier(.16,1,.3,1);
        }
        .spc:hover .spc-glass-arrow { transform: translateX(4px); }

        /* ── product info below image ──────────────────────────── */
        .spc-info {
          display: flex; flex-direction: column; gap: 6px;
          padding: 16px 18px 20px;
          border-top: 1px solid var(--color-border);
        }
        .spc-name {
          font-family: var(--font-title);
          font-size: 16px; font-weight: 400;
          letter-spacing: -.01em; line-height: 1.22;
          color: var(--color-text-primary); margin: 0;
          transition: color 350ms ease;
        }
        .spc:hover .spc-name { color: var(--color-accent); }
        .spc-desc {
          font-family: var(--font-body); font-size: 12px; font-weight: 300;
          letter-spacing: .01em; line-height: 1.6;
          color: var(--color-text-secondary); margin: 0;
        }
        .spc-price-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 4px; gap: 8px;
        }
        .spc-price {
          font-family: var(--font-body); font-size: 13px; font-weight: 400;
          letter-spacing: .04em; color: #b8956a;
        }
        .spc-price--soon {
          font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .spc-delivery {
          font-family: var(--font-body); font-size: 9px;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--color-text-meta); opacity: .6;
          white-space: nowrap;
        }

        /* ── tools referral banner ─────────────────────────────── */
        .sp-tools-banner {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; flex-wrap: wrap;
          border: 1px solid var(--color-border);
          padding: 20px 28px;
          margin-bottom: clamp(40px,6vh,72px);
          background: var(--color-surface);
        }
        .sp-tools-banner-text {
          font-family: var(--font-body); font-size: 13px;
          letter-spacing: .04em;
          color: var(--color-text-secondary);
        }
        .sp-tools-banner-link {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .18em; text-transform: uppercase;
          color: var(--color-accent);
          text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: gap 350ms ease, color 300ms ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .sp-tools-banner-link:hover { gap: 14px; }
        .sp-tools-banner-link::after { content: '→'; }

        /* ── bottom strip ──────────────────────────────────────── */
        .sp-strip {
          display: flex; align-items: stretch;
          border-top: 1px solid var(--color-line);
          font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .sp-strip > span {
          display: flex; align-items: center;
          padding: 14px clamp(14px,2.5vw,36px);
          border-right: 1px solid var(--color-line); white-space: nowrap;
        }
        .sp-strip > span:first-child { padding-left: 0; }
        .sp-strip-fill { flex: 1; border-right: none !important; }

        /* ── reduced motion ────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .spc, .spc-glass, .spc-glass-arrow, .spc-bg-img { transition: none !important; }
          .spc:hover { transform: none; }
          .spc:hover .spc-bg-img { transform: none; }
          .spc:hover .spc-glass { transform: translateY(0); opacity: 1; }
          .spc:hover .spc-glass-arrow { transform: none; }
        }

        /* ── responsive ────────────────────────────────────────── */
        @media (max-width: 1100px) {
          .sp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (max-width: 640px) {
          .sp-grid { grid-template-columns: 1fr; gap: 12px; }
          .spc-glass { transform: translateY(0); }
        }
      `}</style>

      <div className="sp">
        <div className="sp-rule" />

        <p className="sp-eyebrow">{t('shop.eyebrow')}</p>
        <h1 className="sp-title">{t('shop.title')}</h1>
        <p className="sp-desc">{t('shop.desc')}</p>

        <div className="sp-filters" role="group" aria-label="Filter products by category">
          {SHOP_FILTERS.map(f => {
            const n = products.filter(p => matchesFilter(p, f)).length;
            return (
              <button
                key={f}
                aria-pressed={active === f}
                className={`sp-f${active === f ? ' on' : ''}`}
                onClick={() => setActive(f)}
              >
                {t(FILTER_KEY[f])}
                <span className="sp-fn">{String(n).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        <div className="sp-grid">
          {visible.length === 0
            ? <p className="sp-empty">{t('common.noProjects')}</p>
            : visible.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>

        {/* Tools referral banner */}
        <div className="sp-tools-banner" role="complementary">
          <span className="sp-tools-banner-text">{t('shop.toolsBanner')}</span>
          <Link href="/tools" className="sp-tools-banner-link">
            {t('shop.visitTools')}
          </Link>
        </div>

        <div className="sp-strip" aria-hidden="true">
          <span>AMD NSRI</span>
          <span>{t('shop.eyebrow')}</span>
          <span>{t('common.est2026')}</span>
          <span className="sp-strip-fill" />
        </div>
      </div>
    </>
  );
}
