'use client';

import { useEffect, useRef } from 'react';
import HeroPanelImage from '@/components/HeroPanelImage';
import { useLanguage } from '@/lib/LanguageContext';

const JOURNEY_KEYS = [
  'hero.journey1',
  'hero.journey2',
  'hero.journey3',
  'hero.journey4',
  'hero.journey5',
];

export default function HeroSection() {
  const { t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      contentRef.current?.classList.add('visible');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero2" aria-label="AMD NSRI — Hero">
      <HeroPanelImage
        rightBleed="2%"
        solidStop={0.18}
        objectPosition="right center"
        grayscale={false}
        opacity={0.55}
      />

      {/* Drawing-frame verticals */}
      <div className="hero2-frame-left" aria-hidden="true" />
      <div className="hero2-frame-right" aria-hidden="true" />

      <div ref={contentRef} className="hero2-inner reveal-stagger">
        {/* Top meta row */}
        <div className="hero2-toprow">
          <span className="hero2-sheetno" aria-hidden="true">{t('hero.sheetNo')}</span>
        </div>

        {/* Monumental staircase title */}
        <h1 className="hero2-title">
          <span className="hero2-amd">AMD</span>
          <span className="hero2-nsri">NSRI</span>
        </h1>

        {/* Datum line */}
        <div className="hero2-datum" aria-hidden="true" />

        {/* Lower band: tagline + ctas left, journey spec right */}
        <div className="hero2-band">
          <div>
            <p className="hero2-tagline">
              {t('hero.tagline')}
            </p>
            <div className="hero2-ctas">
              <a href="/architecture" className="btn-primary" aria-label="Explore the AMD NSRI ecosystem">
                <span>{t('hero.exploreEcosystem')}</span>
                <span style={{ fontSize: '14px', opacity: 0.7, fontFamily: 'var(--font-body)', fontWeight: 300 }}>→</span>
              </a>
              <a href="#featured-works" className="btn-ghost" aria-label="View selected works">
                <span>{t('hero.viewSelectedWorks')}</span>
              </a>
            </div>
          </div>

          <ul className="hero2-journey" role="list">
            {JOURNEY_KEYS.map((key, i) => (
              <li key={key}>
                <span className="hero2-idx" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom title-block strip */}
      <div className="hero2-titleblock">
        <span>{t('common.istanbul')}</span>
        <span>41.0082° N, 28.9784° E</span>
        <span>{t('hero.tbEst')}</span>
        <span className="hero2-tb-fill" aria-hidden="true">{t('hero.tbSheet')}</span>
      </div>
    </section>
  );
}
