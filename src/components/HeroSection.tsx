'use client';

import { useEffect, useRef } from 'react';
import HeroPanelImage from '@/components/HeroPanelImage';

const JOURNEY = [
  'From concept to geometry.',
  'From geometry to systems.',
  'From systems to tools.',
  'From tools to fabrication.',
  'From fabrication to built reality.',
];

export default function HeroSection() {
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
          <span className="hero2-eyebrow">Design — Architecture — Fabrication</span>
          <span className="hero2-sheetno" aria-hidden="true">Sheet 01 / 06</span>
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
              A design-driven ecosystem connecting architectural imagination
              with fabrication reality.
            </p>
            <div className="hero2-ctas">
              <a href="/works" className="btn-primary" aria-label="Explore the AMD NSRI ecosystem">
                <span>Explore the Ecosystem</span>
                <span style={{ fontSize: '14px', opacity: 0.7, fontFamily: 'var(--font-body)', fontWeight: 300 }}>→</span>
              </a>
              <a href="/works" className="btn-ghost" aria-label="View selected works">
                <span>View Selected Works</span>
              </a>
            </div>
          </div>

          <ul className="hero2-journey" role="list">
            {JOURNEY.map((line, i) => (
              <li key={line}>
                <span className="hero2-idx" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom title-block strip */}
      <div className="hero2-titleblock">
        <span>Istanbul, Turkey</span>
        <span>41.0082° N, 28.9784° E</span>
        <span>est. 2026</span>
        <span className="hero2-tb-fill" aria-hidden="true">01 — Hero</span>
      </div>
    </section>
  );
}
