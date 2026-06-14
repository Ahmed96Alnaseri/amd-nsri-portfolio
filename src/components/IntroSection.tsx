'use client';

import { useEffect, useRef } from 'react';

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export default function IntroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const solidRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const rafRef = useRef<number>(0);
  const cur = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.innerWidth <= 1023;
    // Mobile: faster lerp + earlier scan window (section is 140vh so 40vh of scroll room)
    const LERP       = isMobile ? 0.28 : 0.09;
    const SCAN_START = isMobile ? 0.12 : 0.30;
    const SCAN_RANGE = isMobile ? 0.62 : 0.42;
    const SUB_START  = isMobile ? 0.72 : 0.82;

    const apply = (p: number) => {
      const fill = clamp01((p - SCAN_START) / SCAN_RANGE);
      const eased = 1 - Math.pow(1 - fill, 2);
      const insetTop = (1 - eased) * 100;
      const done = eased > 0.995;

      if (solidRef.current) {
        solidRef.current.style.clipPath = `inset(${insetTop.toFixed(2)}% 0 0 0)`;
      }
      if (scanRef.current) {
        scanRef.current.style.top = `${insetTop.toFixed(2)}%`;
        scanRef.current.style.opacity = done ? '0' : '1';
      }
      if (pctRef.current) {
        pctRef.current.textContent = `${Math.round(eased * 100).toString().padStart(3, '0')}%`;
      }
      if (statusRef.current) {
        statusRef.current.textContent =
          p < SCAN_START ? 'Standby' : done ? 'Complete' : 'Fabricating';
      }
      stageRef.current?.classList.toggle('is-done', done);

      const sub = clamp01((p - SUB_START) / (1 - SUB_START));
      if (subRef.current) {
        subRef.current.style.opacity = sub.toFixed(3);
        subRef.current.style.transform = `translateY(${((1 - sub) * 28).toFixed(1)}px)`;
      }
    };

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { apply(1); return; }

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      const vh = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const scrollH = section.offsetHeight - vh;
      const target = clamp01(-rect.top / scrollH);
      cur.current += (target - cur.current) * LERP;
      apply(cur.current);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div ref={sectionRef} className="intro5" aria-label="AMD NSRI introduction">
      <div className="intro5-sticky">

        {/* corner registration ticks */}
        <span className="intro5-tick intro5-tick-tl" aria-hidden="true" />
        <span className="intro5-tick intro5-tick-tr" aria-hidden="true" />
        <span className="intro5-tick intro5-tick-bl" aria-hidden="true" />
        <span className="intro5-tick intro5-tick-br" aria-hidden="true" />

        {/* corner meta */}
        <span className="intro5-meta intro5-meta-tl" aria-hidden="true">File — AMD-NSRI / 00</span>
        <span className="intro5-meta intro5-meta-tr" aria-hidden="true">Fabrication preview</span>

        {/* wordmark: outline base + solid fill rising with scroll */}
        <div ref={stageRef} className="intro5-stage">
          <h2 className="intro5-word intro5-word-outline" aria-hidden="true">AMD&nbsp;NSRI</h2>
          <div ref={solidRef} className="intro5-word-solid-wrap">
            <h2 className="intro5-word intro5-word-solid">AMD&nbsp;NSRI</h2>
          </div>

          {/* scanline — clean, no text riding it */}
          <div ref={scanRef} className="intro5-scan" aria-hidden="true" />
        </div>

        {/* status readout — fixed below the wordmark, never overlaps */}
        <div className="intro5-readout" aria-hidden="true">
          <span ref={statusRef} className="intro5-status">Standby</span>
          <span className="intro5-readout-sep">—</span>
          <span ref={pctRef} className="intro5-pct">000%</span>
        </div>

        <p ref={subRef} className="intro5-subtitle">
          Architecture · Design · Fabrication
        </p>

        <div className="intro5-scroll-hint" aria-hidden="true">
          <div className="intro5-scroll-line" />
        </div>
      </div>
    </div>
  );
}
