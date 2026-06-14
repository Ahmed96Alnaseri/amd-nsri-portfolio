'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CallToActionSection() {
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

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
      { threshold: 0.06 }
    );
    revealRefs.current.filter(Boolean).forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    revealRefs.current[i] = el;
  };

  return (
    <section className="cta-section">

      {/* Atmospheric glow */}
      <div aria-hidden="true" className="cta-gradient-orb" />

      {/* Ghost number */}
      <span className="cta-ghost-num" aria-hidden="true">06</span>

      {/* Registration ticks */}
      <span className="cta-tick cta-tick-tl" aria-hidden="true" />
      <span className="cta-tick cta-tick-br" aria-hidden="true" />

      {/* Top rule */}
      <div className="cta-top-rule" aria-hidden="false">
        <span className="cta-section-label">06 — Collaborate</span>
        <div className="cta-rule-line" />
        <span className="cta-header-tag">Commission inquiry</span>
      </div>

      {/* Main grid */}
      <div className="cta-grid">

        {/* LEFT — headline column */}
        <div className="cta-left">

          <p
            ref={setRef(0)}
            className="cta-eyebrow reveal-item"
            style={{ '--delay': '0ms' } as React.CSSProperties}
          >
            Work together
          </p>

          <h2
            ref={setRef(1)}
            className="cta-headline reveal-item"
            style={{ '--delay': '80ms' } as React.CSSProperties}
          >
            From the first<br />
            sketch to the<br />
            last bolt —<br />
            <em>every step is<br />a decision.</em>
          </h2>

          <div
            ref={setRef(2)}
            className="cta-buttons reveal-item"
            style={{ '--delay': '200ms' } as React.CSSProperties}
          >
            <a href="mailto:ahmed@amdnsri.com" className="cta-btn-primary">
              Start a Collaboration →
            </a>
            <Link href="/works" className="cta-btn-ghost">
              Explore Works
            </Link>
          </div>

        </div>

        {/* RIGHT — info column */}
        <div
          ref={setRef(3)}
          className="cta-right reveal-item"
          style={{ '--delay': '160ms' } as React.CSSProperties}
        >

          <div className="cta-info-block">
            <p className="cta-info-label">Direct contact</p>
            <a href="mailto:ahmed@amdnsri.com" className="cta-info-email">
              ahmed@amdnsri.com
            </a>
          </div>

          <div className="cta-divider" />

          <div className="cta-info-block">
            <p className="cta-info-label">Location</p>
            <p className="cta-info-value">Istanbul, Turkey</p>
            <p className="cta-info-sub">41.0082° N, 28.9784° E</p>
          </div>

          <div className="cta-divider" />

          <div className="cta-info-block">
            <p className="cta-info-label">Availability</p>
            <div className="cta-avail-row">
              <span className="cta-avail-dot" aria-hidden="true" />
              <p className="cta-info-value">Currently open</p>
            </div>
            <p className="cta-info-sub">New projects &amp; collaborations</p>
          </div>

          <div className="cta-divider" />

          <div className="cta-info-block">
            <p className="cta-info-label">Response time</p>
            <p className="cta-info-value">1–2 business days</p>
          </div>

          <Link href="/contact" className="cta-contact-link">
            Open contact form →
          </Link>

        </div>
      </div>

      {/* Bottom title-block strip */}
      <div className="cta-bottom" aria-hidden="true">
        <span>AMD NSRI</span>
        <span>Collaboration</span>
        <span>Est. 2026</span>
        <span className="cta-bottom-fill">Sheet 06 / 06</span>
      </div>

    </section>
  );
}
