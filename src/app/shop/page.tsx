'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import products, {
  SHOP_FILTERS,
  matchesFilter,
  type ShopProduct,
  type ShopFilter,
  type PurchaseMode,
} from '@/data/shop-products';

/* filter chip → translation key */
const FILTER_KEY: Record<ShopFilter, string> = {
  'All': 'common.all',
  'Plugins': 'shop.fPlugins',
  'Digital Tools': 'shop.fDigitalTools',
  'Software': 'shop.fSoftware',
  'Free': 'shop.fFree',
};

/* purchase mode → CTA translation key */
const CTA_KEY: Record<PurchaseMode, string> = {
  'buy': 'shop.purchase',
  'free': 'shop.getIt',
  'contact': 'shop.contact',
};

/* ── card ───────────────────────────────────────────────────────────── */
function ProductCard({ product }: { product: ShopProduct }) {
  const { t, tv } = useLanguage();
  const isFree = product.mode === 'free';

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="sc"
      aria-label={`${product.name} — view details`}
    >
      {product.image
        ? <span className="sc-media" style={{ backgroundImage: `url(${product.image})` }} aria-hidden="true" />
        : <span className="sc-media sc-media--placeholder" aria-hidden="true"><span className="sc-diamond" aria-hidden="true">◆</span></span>
      }
      <span className="sc-fade" aria-hidden="true" />

      <span className="sc-content">
        <span className="sc-top">
          <span className="sc-cat">{tv(product.category)}</span>
          <span className={`sc-price${isFree ? ' sc-price--free' : ''}`}>{tv(product.price)}</span>
        </span>

        <span className="sc-body">
          <span className="sc-name">
            {tv(product.name)}{product.variant ? ` (${product.variant})` : ''}
          </span>
          <span className="sc-desc">{tv(product.description)}</span>
        </span>

        <span className="sc-foot">
          <span className="sc-cta" aria-hidden="true">{t(CTA_KEY[product.mode])}</span>
          <span className="sc-arrow" aria-hidden="true">→</span>
        </span>
      </span>
    </Link>
  );
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function ShopPage() {
  const { t, tv } = useLanguage();
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
          padding: clamp(96px, 12vh, 140px) 24px clamp(32px, 4vh, 56px);
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
          font-size: clamp(48px,8vw,116px);
          letter-spacing: -0.03em; line-height: .98;
          color: var(--color-text-primary); margin: 0 0 28px; max-width: 14ch;
        }
        .sp-desc {
          font-size: clamp(14px,1.4vw,17px); font-weight: 300;
          letter-spacing: .02em; line-height: 1.7;
          color: var(--color-text-secondary); max-width: 58ch;
          margin: 0 0 clamp(40px,6vh,64px);
        }

        /* ── filters ───────────────────────────────────────────── */
        .sp-filters {
          display: flex; align-items: center; gap: clamp(20px,3vw,44px);
          flex-wrap: wrap;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          padding: 22px 0; margin-bottom: clamp(48px,7vh,80px);
        }
        .sp-f {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.35); padding: 0;
          transition: color 300ms ease;
        }
        .sp-f:hover { color: rgba(255,255,255,.7); }
        .sp-f.on   { color: var(--color-accent); }
        .sp-f:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 6px; }
        .sp-fn { font-size: 9px; color: var(--color-text-meta); margin-left: 6px; }
        .sp-f.on .sp-fn { color: var(--color-accent-dim); }

        /* ── grid ──────────────────────────────────────────────── */
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          align-content: start;
        }
        .sp-empty {
          grid-column: 1/-1; padding: 80px 0; text-align: center;
          font-size: 13px; letter-spacing: .08em; color: var(--color-text-meta);
        }

        /* ── card ──────────────────────────────────────────────── */
        .sc {
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
        .sc:hover { border-color: var(--color-accent); transform: translateY(-3px); }
        .sc:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }

        /* background image / placeholder, right side */
        .sc-media {
          position: absolute; inset: 0; z-index: 0;
          background-repeat: no-repeat;
          background-position: right center;
          background-size: cover;
          opacity: .85;
          transition: opacity 500ms ease, transform 600ms cubic-bezier(.16,1,.3,1);
        }
        .sc:hover .sc-media { opacity: 1; transform: scale(1.03); }
        .sc-media--placeholder { background-image: none; }
        .sc-diamond {
          position: absolute; right: 22%; top: 50%; transform: translateY(-50%);
          font-size: 72px; line-height: 1;
          color: rgba(184,149,106,0.08);
          pointer-events: none; user-select: none;
        }
        .sc-fade {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(to right, #0d0d0b 0%, #0d0d0b 45%, transparent 100%);
        }

        .sc-content {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          height: 100%; min-height: 252px;
          padding: clamp(28px, 3vw, 40px);
          box-sizing: border-box;
        }

        /* top: category badge + price */
        .sc-top {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: clamp(26px, 3vw, 38px);
        }
        .sc-cat {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-accent);
          border: 1px solid rgba(184,149,106,.38);
          padding: 5px 11px; white-space: nowrap;
        }
        .sc-price {
          font-family: var(--font-title); font-size: 20px; line-height: 1;
          letter-spacing: -.01em; color: var(--color-accent); white-space: nowrap;
        }
        .sc-price--free { text-transform: uppercase; letter-spacing: .04em; }

        /* body: name + description */
        .sc-body { flex: 1; display: flex; flex-direction: column; gap: 12px; }
        .sc-name {
          font-family: var(--font-title); font-weight: 400;
          font-size: 22px;
          letter-spacing: -.01em; line-height: 1.14;
          color: var(--color-text-primary); margin: 0; max-width: 18ch;
        }
        .sc:hover .sc-name { color: #fff; }
        .sc-desc {
          font-family: var(--font-body); font-size: 12px; font-weight: 300;
          letter-spacing: .02em; line-height: 1.6;
          color: var(--color-text-secondary); margin: 0; max-width: 34ch;
        }

        /* foot: hover CTA + arrow */
        .sc-foot {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-top: clamp(24px, 3vw, 36px);
        }
        .sc-cta {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .16em; text-transform: uppercase;
          color: var(--color-accent);
          border: 1px solid var(--color-accent);
          padding: 9px 16px; white-space: nowrap;
          opacity: 0; transform: translateY(6px);
          transition: opacity 350ms ease, transform 350ms cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }
        .sc:hover .sc-cta { opacity: 1; transform: translateY(0); }
        .sc-arrow {
          font-family: var(--font-body); font-size: 20px; line-height: 1;
          color: var(--color-accent); margin-left: auto;
          transition: transform 400ms cubic-bezier(.16,1,.3,1);
        }
        .sc:hover .sc-arrow { transform: translateX(5px); }

        /* ── bottom strip ──────────────────────────────────────── */
        .sp-strip {
          display: flex; align-items: stretch;
          border-top: 1px solid var(--color-line);
          margin-top: clamp(56px,8vh,96px);
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
          .sc, .sc-arrow, .sc-media, .sc-cta, .sp-f { transition: none !important; }
          .sc:hover { transform: none; }
          .sc:hover .sc-media { transform: none; }
          .sc:hover .sc-arrow { transform: none; }
          .sc:hover .sc-cta { transform: none; }
        }

        /* ── responsive ────────────────────────────────────────── */
        @media (max-width: 767px) {
          .sp-grid { grid-template-columns: 1fr; gap: 16px; }
          .sc, .sc-content { min-height: 0; }
          .sc-cta { opacity: 1; transform: none; }
        }
      `}</style>

      <div className="sp">
        <div className="sp-rule" />

        <p className="sp-eyebrow">{t('shop.eyebrow')}</p>
        <h1 className="sp-title">{t('shop.title')}</h1>
        <p className="sp-desc">{t('shop.desc')}</p>

        <div className="sp-filters" role="group" aria-label="Filter products">
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
            : visible.map(p => <ProductCard key={p.slug} product={p} />)}
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
