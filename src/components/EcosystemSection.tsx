'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const CARDS = [
  {
    num: '01',
    titleKey: 'eco.card1Title',
    categoryKey: 'eco.card1Category',
    descKey: 'eco.card1Desc',
    tagKeys: ['eco.card1Tag1', 'eco.card1Tag2', 'eco.card1Tag3', 'eco.card1Tag4'],
    link: '/architecture',
  },
  {
    num: '02',
    titleKey: 'eco.card2Title',
    categoryKey: 'eco.card2Category',
    descKey: 'eco.card2Desc',
    tagKeys: ['eco.card2Tag1', 'eco.card2Tag2', 'eco.card2Tag3', 'eco.card2Tag4'],
    link: '/design',
  },
  {
    num: '03',
    titleKey: 'eco.card3Title',
    categoryKey: 'eco.card3Category',
    descKey: 'eco.card3Desc',
    tagKeys: ['eco.card3Tag1', 'eco.card3Tag2', 'eco.card3Tag3', 'eco.card3Tag4'],
    link: '/tools',
  },
  {
    num: '04',
    titleKey: 'eco.card4Title',
    categoryKey: 'eco.card4Category',
    descKey: 'eco.card4Desc',
    tagKeys: ['eco.card4Tag1', 'eco.card4Tag2', 'eco.card4Tag3'],
    link: '/fabrication',
  },
  {
    num: '05',
    titleKey: 'eco.card5Title',
    categoryKey: 'eco.card5Category',
    descKey: 'eco.card5Desc',
    tagKeys: ['eco.card5Tag1', 'eco.card5Tag2', 'eco.card5Tag3'],
    link: '/shop',
  },
];

export default function EcosystemSection() {
  const { t } = useLanguage();
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const items = revealRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.setProperty('--revealed', '1');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    revealRefs.current[i] = el;
  };

  return (
    <section
      id="section-03"
      className="ecosystem-section"
      aria-labelledby="ecosystem-heading"
    >
      <span className="eco-bg-number" aria-hidden="true">03</span>

      <div className="eco-top-rule" aria-hidden="true">
        <span className="eco-section-label">{t('eco.label')}</span>
        <div className="eco-rule-line" />
      </div>

      <div className="eco-header">
        <h2
          id="ecosystem-heading"
          ref={setRef(0)}
          className="eco-heading reveal-item"
          style={{ '--delay': '0ms' } as React.CSSProperties}
        >
          {t('eco.heading')}
        </h2>
      </div>

      {/* Horizontal card row */}
      <div className="eco-grid" role="list">
        {CARDS.map((card, i) => (
          <a
            key={card.num}
            href={card.link}
            ref={setRef(i + 1) as unknown as (el: HTMLAnchorElement | null) => void}
            className="eco-card reveal-item"
            style={{ '--delay': `${(i + 1) * 80}ms` } as React.CSSProperties}
            role="listitem"
            aria-label={`${t(card.titleKey)} — ${t(card.categoryKey)}`}
          >
            {/* Accent line — draws on hover */}
            <div className="eco-card-accent-line" aria-hidden="true" />

            {/* Perforation dot field — fades in on hover */}
            <div className="eco-card-dots" aria-hidden="true" />

            {/* Ghost numeral */}
            <span className="eco-card-ghostnum" aria-hidden="true">{card.num}</span>

            {/* Corner registration ticks */}
            <span className="eco-card-tick eco-card-tick-tl" aria-hidden="true" />
            <span className="eco-card-tick eco-card-tick-br" aria-hidden="true" />

            {/* Top row */}
            <div className="eco-card-top">
              <span className="eco-card-category">{t(card.categoryKey)}</span>
              <span className="eco-card-num">{card.num}</span>
            </div>

            {/* Title */}
            <h3 className="eco-card-title">{t(card.titleKey)}</h3>

            {/* Description */}
            <p className="eco-card-desc">{t(card.descKey)}</p>

            {/* Tags */}
            <div className="eco-card-tags">
              {card.tagKeys.map((tagKey) => (
                <span key={tagKey} className="eco-card-tag">{t(tagKey)}</span>
              ))}
            </div>

            {/* Enter row — reveals on hover */}
            <div className="eco-card-enter" aria-hidden="true">
              <span>{t('eco.enter')}</span>
              <span className="eco-card-enter-arrow">→</span>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}
