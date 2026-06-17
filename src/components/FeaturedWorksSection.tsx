'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import projects from '@/data/projects';

export default function FeaturedWorksSection() {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.setProperty('--revealed', '1');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.filter(Boolean).forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="featured-works" className="works-section" aria-labelledby="works-heading">

      <span className="works-bg-number" aria-hidden="true">04</span>

      {/* Header rule */}
      <div className="works-top-rule" aria-hidden="true">
        <span className="works-section-label">04 — Featured Works</span>
        <div className="works-rule-line" />
      </div>

      {/* Heading */}
      <div className="works-header">
        <h2 id="works-heading" className="works-heading">
          Selected Works.
        </h2>
      </div>

      {/* Grid */}
      <div className="works-grid" role="list">
        {projects.map((project, i) => (
          <article
            key={project.num}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="work-card reveal-item"
            style={{
              '--delay': `${i * 80}ms`,
              '--revealed': '0',
            } as React.CSSProperties}
            role="listitem"
          >
            {/* Image zone — shows real image if set in projects.ts, placeholder grid otherwise */}
            <div className="work-card-image" aria-hidden="true">
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 680px) 50vw, 100vw"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
              <svg className="work-card-img-pattern" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                {/* Subtle architectural grid */}
                {[0,1,2,3,4,5,6,7,8].map(n => (
                  <line key={`v${n}`} x1={n*50} y1="0" x2={n*50} y2="180" stroke="#2a2a26" strokeWidth="0.5" />
                ))}
                {[0,1,2,3,4].map(n => (
                  <line key={`h${n}`} x1="0" y1={n*45} x2="400" y2={n*45} stroke="#2a2a26" strokeWidth="0.5" />
                ))}
                {/* Diagonal construction line */}
                <line x1="0" y1="0" x2="400" y2="180" stroke="#2e2e2a" strokeWidth="0.5" strokeDasharray="6 8" />
                <line x1="0" y1="180" x2="400" y2="0" stroke="#2e2e2a" strokeWidth="0.5" strokeDasharray="6 8" />
                {/* Center crosshair */}
                <circle cx="200" cy="90" r="18" stroke="#2e2e2a" strokeWidth="0.5" fill="none" />
                <circle cx="200" cy="90" r="3" fill="#3a3a36" />
                <line x1="182" y1="90" x2="194" y2="90" stroke="#2e2e2a" strokeWidth="0.5" />
                <line x1="206" y1="90" x2="218" y2="90" stroke="#2e2e2a" strokeWidth="0.5" />
                <line x1="200" y1="72" x2="200" y2="84" stroke="#2e2e2a" strokeWidth="0.5" />
                <line x1="200" y1="96" x2="200" y2="108" stroke="#2e2e2a" strokeWidth="0.5" />
              </svg>
              {/* Hover keyword overlay — floats over image */}
              <div className="work-img-overlay" aria-hidden="true">
                <div className="work-overlay-corner work-overlay-corner--tl" />
                <div className="work-overlay-corner work-overlay-corner--tr" />
                <div className="work-overlay-corner work-overlay-corner--bl" />
                <div className="work-overlay-corner work-overlay-corner--br" />
                <div className="work-overlay-keywords">
                  {project.overlayKeywords.map((kw) => (
                    <span key={kw} className="work-overlay-kw">{kw}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card content */}
            <div className="work-card-inner">
              {/* Top row */}
              <div className="work-card-top">
                <span className="work-card-num">{project.num}</span>
                <span className="work-card-status">{project.status}</span>
              </div>

              {/* Category + year */}
              <div className="work-card-meta">
                <span className="work-card-category">{project.category}</span>
                <span className="work-card-year">{project.year}</span>
              </div>

              {/* Title */}
              <h3 className="work-card-title">{project.title}</h3>

              {/* Concept */}
              <p className="work-card-concept">{project.concept}</p>

              {/* Tags */}
              <div className="work-card-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="work-card-tag">{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <a href={project.caseStudyLink} className="work-card-cta" aria-label={`View case study for ${project.title}`}>
                <span>View Case Study</span>
                <span className="work-card-cta-arrow">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom rule */}
      <div className="works-bottom-rule" aria-hidden="true">
        <div className="works-rule-line" />
        <a href="/architecture" className="works-view-all">View all works →</a>
      </div>

    </section>
  );
}
