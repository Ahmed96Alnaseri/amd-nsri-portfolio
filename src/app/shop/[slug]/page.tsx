'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { productsBySlug, type PurchaseMode } from '@/data/shop-products';

/* purchase mode → CTA translation key */
const CTA_KEY: Record<PurchaseMode, string> = {
  'download':    'shop.get',
  'coming-soon': 'shop.notifyMe',
  'free':        'shop.getIt',
};

export default function ShopProductPage({ params }: { params: { slug: string } }) {
  const { t, tv } = useLanguage();
  const product = productsBySlug[params.slug];

  if (!product) {
    return (
      <div className="sd sd--missing">
        <p className="sd-eyebrow">{t('shop.eyebrow')}</p>
        <h1 className="sd-title">404</h1>
        <p className="sd-lede">{t('common.noProjects')}</p>
        <Link href="/shop" className="sd-back">← {t('shop.back')}</Link>
        <style>{baseCss}</style>
      </div>
    );
  }

  const isFree = product.mode === 'free';
  const ctaHref = '/contact';
  const fullName = tv(product.name);

  const related = product.related
    .map(slug => productsBySlug[slug])
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="sd">
      <Link href="/shop" className="sd-back">← {t('shop.back')}</Link>

      <p className="sd-eyebrow">
        {tv(product.category)} · {tv(product.price)}
      </p>
      <h1 className="sd-title">{fullName}</h1>
      <p className="sd-lede">{tv(product.detail)}</p>

      <div
        className={`sd-hero${product.image ? '' : ' sd-hero--placeholder'}`}
        style={product.image ? { backgroundImage: `url(${product.image})` } : undefined}
        role="img"
        aria-label={fullName}
      >
        {!product.image && <span className="sd-hero-diamond" aria-hidden="true">◆</span>}
        <span className="sd-hero-fade" aria-hidden="true" />
        <span className="sd-cat-badge">{tv(product.category)}</span>
      </div>

      <div className="sd-grid">
        {/* What's included + Requirements */}
        <div className="sd-main">
          <section>
            <h2 className="sd-h2">{t('shop.whatIncluded')}</h2>
            <ul className="sd-list">
              {product.included.map(item => (
                <li key={item} className="sd-li">
                  <span className="sd-li-mark" aria-hidden="true" />
                  {tv(item)}
                </li>
              ))}
            </ul>
          </section>

          <section className="sd-req">
            <h2 className="sd-h2">{t('shop.requirements')}</h2>
            <ul className="sd-list">
              {product.requirements.map(item => (
                <li key={item} className="sd-li">
                  <span className="sd-li-mark sd-li-mark--alt" aria-hidden="true" />
                  {tv(item)}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Price + CTA */}
        <aside className="sd-side">
          <div className="sd-buy">
            <span className="sd-buy-lbl">{t('shop.price')}</span>
            <span className={`sd-buy-price${isFree ? ' sd-buy-price--free' : ''}`}>
              {tv(product.price)}
            </span>
            <div className="sd-spec">
              <div className="sd-spec-row">
                <span className="sd-spec-lbl">{t('shop.category')}</span>
                <span className="sd-spec-val">{tv(product.category)}</span>
              </div>
            </div>
            <Link href={ctaHref} className="sd-btn">{t(CTA_KEY[product.mode])} →</Link>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="sd-related">
          <h2 className="sd-h2">{t('shop.related')}</h2>
          <div className="sd-related-grid">
            {related.map(r => (
              <Link key={r.slug} href={`/shop/${r.slug}`} className="sd-rel">
                <span className="sd-rel-cat">{tv(r.category)}</span>
                <span className="sd-rel-name">{tv(r.name)}</span>
                <span className="sd-rel-foot">
                  <span className="sd-rel-price">{tv(r.price)}</span>
                  <span className="sd-rel-arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="sd-strip" aria-hidden="true">
        <span>AMD NSRI</span>
        <span>{t('shop.eyebrow')}</span>
        <span>{t('common.est2026')}</span>
        <span className="sd-strip-fill" />
      </div>

      <style>{baseCss}</style>
    </div>
  );
}

const baseCss = `
  .sd {
    background: var(--color-bg);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    padding: clamp(96px, 12vh, 140px) clamp(24px, 6vw, 120px) clamp(32px, 4vh, 56px);
    min-height: 100vh;
  }
  .sd--missing { display: flex; flex-direction: column; gap: 18px; }

  .sd-back {
    display: inline-block;
    font-family: var(--font-body); font-size: 11px;
    letter-spacing: .18em; text-transform: uppercase;
    color: var(--color-text-secondary); text-decoration: none;
    margin-bottom: clamp(32px, 5vh, 56px);
    transition: color 300ms ease;
  }
  .sd-back:hover { color: var(--color-accent); }

  .sd-eyebrow {
    display: flex; align-items: center; gap: 12px;
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--color-accent); margin: 0 0 22px;
  }
  .sd-eyebrow::before {
    content: ''; display: block; width: 28px; height: 1px;
    background: var(--color-accent); opacity: .7;
  }
  .sd-title {
    font-family: var(--font-title);
    font-size: clamp(40px, 6.5vw, 92px);
    letter-spacing: -0.03em; line-height: 1.0;
    color: var(--color-text-primary); margin: 0 0 24px; max-width: 18ch;
  }
  .sd-lede {
    font-size: clamp(15px, 1.5vw, 19px); font-weight: 300;
    letter-spacing: .01em; line-height: 1.7;
    color: var(--color-text-secondary); max-width: 64ch;
    margin: 0 0 clamp(40px, 6vh, 64px);
  }

  /* hero media */
  .sd-hero {
    position: relative; overflow: hidden;
    width: 100%; height: clamp(260px, 42vh, 480px);
    background-color: var(--color-surface);
    background-repeat: no-repeat; background-position: center;
    background-size: cover;
    border: 1px solid var(--color-border);
    margin-bottom: clamp(48px, 7vh, 88px);
  }
  .sd-hero--placeholder { background-color: var(--color-surface); }
  .sd-hero-diamond {
    position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
    font-size: 96px; line-height: 1;
    color: rgba(184,149,106,0.08);
    pointer-events: none; user-select: none;
  }
  .sd-hero-fade {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(13,13,11,.55) 0%, transparent 45%),
                radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,149,106,0.06) 0%, transparent 70%);
  }
  .sd-cat-badge {
    position: absolute; top: 16px; right: 16px;
    font-family: var(--font-body); font-size: 10px;
    letter-spacing: .14em; text-transform: uppercase;
    color: var(--color-accent);
    padding: 7px 13px;
    background: rgba(0,0,0,.5);
    -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
    border: 1px solid rgba(184,149,106,.3);
  }

  /* two-column body */
  .sd-grid {
    display: grid;
    grid-template-columns: 1fr clamp(280px, 32%, 380px);
    gap: clamp(40px, 6vw, 96px);
    align-items: start;
  }
  .sd-main { display: flex; flex-direction: column; gap: clamp(40px, 6vh, 64px); }
  .sd-h2 {
    font-family: var(--font-title); font-weight: 400;
    font-size: clamp(24px, 3vw, 34px);
    letter-spacing: -.01em; color: var(--color-text-primary);
    margin: 0 0 28px;
  }
  .sd-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .sd-li {
    display: flex; align-items: baseline; gap: 16px;
    font-size: clamp(14px, 1.3vw, 16px); font-weight: 300;
    line-height: 1.6; color: var(--color-text-secondary);
    padding: 15px 0; border-top: 1px solid var(--color-line);
  }
  .sd-li:last-child { border-bottom: 1px solid var(--color-line); }
  .sd-li-mark {
    width: 7px; height: 7px; flex-shrink: 0; transform: translateY(2px);
    border: 1px solid var(--color-accent); background: transparent;
  }
  .sd-li-mark--alt { border-radius: 50%; }

  /* side: price + cta */
  .sd-side { display: flex; flex-direction: column; gap: 28px; }
  .sd-buy {
    display: flex; flex-direction: column;
    border: 1px solid var(--color-border);
    padding: clamp(24px, 3vw, 34px);
    background: var(--color-surface);
  }
  .sd-buy-lbl {
    font-family: var(--font-body); font-size: 11px;
    letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.4);
    margin-bottom: 10px;
  }
  .sd-buy-price {
    font-family: var(--font-title); font-size: clamp(34px, 4vw, 44px);
    line-height: 1; letter-spacing: -.02em; color: var(--color-accent);
    margin-bottom: 24px;
  }
  .sd-buy-price--free { text-transform: uppercase; letter-spacing: .02em; font-size: clamp(28px, 3.4vw, 38px); }

  .sd-spec { display: flex; flex-direction: column; margin-bottom: 24px; }
  .sd-spec-row {
    display: flex; align-items: baseline; justify-content: space-between; gap: 16px;
    padding: 12px 0; border-top: 1px solid rgba(255,255,255,.07);
  }
  .sd-spec-lbl {
    font-family: var(--font-body); font-size: 11px;
    letter-spacing: .1em; text-transform: uppercase; color: rgba(255,255,255,.4);
  }
  .sd-spec-val { font-family: var(--font-body); font-size: 13px; letter-spacing: .03em; color: rgba(255,255,255,.9); }

  .sd-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    width: 100%; box-sizing: border-box;
    padding: 17px 24px;
    font-family: var(--font-body); font-size: 12px;
    letter-spacing: .16em; text-transform: uppercase;
    color: var(--color-accent); text-decoration: none;
    background: transparent; border: 1px solid var(--color-accent);
    transition: background 350ms ease, color 350ms ease;
  }
  .sd-btn:hover { background: var(--color-accent); color: var(--color-bg); }
  .sd-btn:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }

  /* related */
  .sd-related { margin-top: clamp(56px, 8vh, 96px); }
  .sd-related-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
  }
  .sd-rel {
    display: flex; flex-direction: column; gap: 16px;
    padding: clamp(22px, 2.4vw, 30px);
    border: 1px solid var(--color-border);
    text-decoration: none; min-height: 150px;
    transition: border-color 400ms cubic-bezier(.16,1,.3,1), transform 400ms cubic-bezier(.16,1,.3,1);
  }
  .sd-rel:hover { border-color: var(--color-accent); transform: translateY(-3px); }
  .sd-rel:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }
  .sd-rel-cat {
    font-family: var(--font-body); font-size: 9px;
    letter-spacing: .18em; text-transform: uppercase; color: var(--color-text-meta);
  }
  .sd-rel-name {
    font-family: var(--font-title); font-weight: 400; font-size: 18px;
    line-height: 1.18; letter-spacing: -.01em; color: var(--color-text-primary);
    flex: 1;
  }
  .sd-rel:hover .sd-rel-name { color: #fff; }
  .sd-rel-foot { display: flex; align-items: center; justify-content: space-between; }
  .sd-rel-price { font-family: var(--font-body); font-size: 12px; letter-spacing: .03em; color: var(--color-accent); }
  .sd-rel-arrow {
    font-family: var(--font-body); font-size: 17px; color: var(--color-accent);
    transition: transform 400ms cubic-bezier(.16,1,.3,1);
  }
  .sd-rel:hover .sd-rel-arrow { transform: translateX(4px); }

  /* bottom strip */
  .sd-strip {
    display: flex; align-items: stretch;
    border-top: 1px solid var(--color-line);
    margin-top: clamp(56px,8vh,96px);
    font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
    color: var(--color-text-meta);
  }
  .sd-strip > span {
    display: flex; align-items: center;
    padding: 14px clamp(14px,2.5vw,36px);
    border-right: 1px solid var(--color-line); white-space: nowrap;
  }
  .sd-strip > span:first-child { padding-left: 0; }
  .sd-strip-fill { flex: 1; border-right: none !important; }

  @media (prefers-reduced-motion: reduce) {
    .sd-back, .sd-btn, .sd-rel, .sd-rel-arrow { transition: none !important; }
    .sd-rel:hover { transform: none; }
    .sd-rel:hover .sd-rel-arrow { transform: none; }
  }
  @media (max-width: 860px) {
    .sd-grid { grid-template-columns: 1fr; gap: 40px; }
    .sd-side { order: -1; }
    .sd-related-grid { grid-template-columns: 1fr; }
  }
`;
