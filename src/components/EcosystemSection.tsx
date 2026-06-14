'use client';

import { useEffect, useRef } from 'react';

const CARDS = [
  {
    num: '01',
    title: 'AMD Architecture',
    category: 'Space / Atmosphere',
    description:
      'Buildings, urban concepts, spatial visualization, and architectural storytelling. From programmatic diagrams to rendered atmospheric studies.',
    tags: ['Buildings', 'Urban', 'Visuals', 'Space'],
    link: '/architecture',
  },
  {
    num: '02',
    title: 'AMD Design',
    category: 'Objects / Experiments',
    description:
      'Facade studies, parametric objects, furniture concepts, and experimental fabrication-aware design.',
    tags: ['Patterns', 'Objects', 'Material', 'Studies'],
    link: '/design',
  },
  {
    num: '03',
    title: 'AMD Tools',
    category: 'Computation / Automation',
    description:
      'Digital systems for Grasshopper, Rhino, facade rationalization, panelization, unfolding, and AI-assisted workflows.',
    tags: ['Grasshopper', 'Rhino', 'Panelization', 'AI'],
    link: '/tools',
  },
  {
    num: '04',
    title: 'AMD Fabrication',
    category: 'Production / Reality',
    description:
      'Shop drawings, production-ready geometry, substructure logic, panel division, unfolding, and assembly intelligence.',
    tags: ['Shop Drawings', 'Unfolding', 'Substructure'],
    link: '/fabrication',
  },
  {
    num: '05',
    title: 'AMD Shop',
    category: 'Products / Objects',
    description:
      'Curated objects, limited fabrication runs, and design products that come directly from the studio\'s research and production process.',
    tags: ['Products', 'Limited', 'Studio'],
    link: '/shop',
  },
];

export default function EcosystemSection() {
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
        <span className="eco-section-label">03 — Ecosystem</span>
        <div className="eco-rule-line" />
      </div>

      <div className="eco-header">
        <h2
          id="ecosystem-heading"
          ref={setRef(0)}
          className="eco-heading reveal-item"
          style={{ '--delay': '0ms' } as React.CSSProperties}
        >
          AMD NSRI Directions.
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
            aria-label={`${card.title} — ${card.category}`}
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
              <span className="eco-card-category">{card.category}</span>
              <span className="eco-card-num">{card.num}</span>
            </div>

            {/* Title */}
            <h3 className="eco-card-title">{card.title}</h3>

            {/* Description */}
            <p className="eco-card-desc">{card.description}</p>

            {/* Tags */}
            <div className="eco-card-tags">
              {card.tags.map((tag) => (
                <span key={tag} className="eco-card-tag">{tag}</span>
              ))}
            </div>

            {/* Enter row — reveals on hover */}
            <div className="eco-card-enter" aria-hidden="true">
              <span>Enter</span>
              <span className="eco-card-enter-arrow">→</span>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}
