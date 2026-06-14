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
      { threshold: 0.08 }
    );
    revealRefs.current.filter(Boolean).forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    revealRefs.current[i] = el;
  };

  return (
    <section className="cta-section">
      <div aria-hidden="true" style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '600px',
        height: '400px',
        background: 'radial-gradient(ellipse at 100% 100%, rgba(184,149,106,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div className="cta-top-rule" aria-hidden="true" style={{ position: 'relative', zIndex: 3 }}>
        <span className="cta-section-label">06 — COLLABORATE</span>
        <div className="cta-rule-line" />
      </div>

      <div className="cta-inner" style={{ position: 'relative', zIndex: 3 }}>

        <h2
          ref={setRef(0)}
          className="cta-headline reveal-item"
          style={{ '--delay': '0ms' } as React.CSSProperties}
        >
          From the first sketch to the last bolt — every step is a decision.
        </h2>

        <div
          ref={setRef(1)}
          className="cta-buttons reveal-item"
          style={{ '--delay': '120ms' } as React.CSSProperties}
        >
          <a href="mailto:hello@amdnsri.com" className="cta-btn-primary">
            Start a Collaboration
          </a>
          <Link href="/works" className="cta-btn-ghost">
            Explore Works
          </Link>
        </div>

        <div
          ref={setRef(2)}
          className="cta-meta-block reveal-item"
          style={{ '--delay': '240ms' } as React.CSSProperties}
        >
          <p className="cta-meta-text">Istanbul, Turkey&nbsp;&nbsp;·&nbsp;&nbsp;AMD NSRI&nbsp;&nbsp;·&nbsp;&nbsp;Est. 2024</p>
        </div>

      </div>
    </section>
  );
}
