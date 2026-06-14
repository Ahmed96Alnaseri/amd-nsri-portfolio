'use client';

import { useEffect, useRef, useMemo } from 'react';

// ─────────────────────────────────────────────────────────────
// Grid — increased rows to match perforation density
// ─────────────────────────────────────────────────────────────
const COLS = 18;
const ROWS = 24;

// Field occupies top-right portion of the viewport (ABOVE the panel image)
// Values are % of viewport width / height
const FIELD_LEFT   = 35;   // 35% from left edge
const FIELD_RIGHT  = 100;  // bleeds to right edge
const FIELD_TOP    = 2;    // 2% from top
const FIELD_BOTTOM = 37;   // stops just above the panel image top edge

// Dash shape — always dashes, no morph
const DASH_W = 1.5;
const DASH_H = 10;

// Scroll thresholds (multiples of heroHeight)
// Particles appear only after scrolling begins
const APPEAR_START  = 0.04;   // start appearing at 4% scroll
const APPEAR_WINDOW = 0.18;   // stagger spread
// Fade out slowly into section 02
const FADE_START    = 0.90;   // begin fading when section 02 arrives
const FADE_END      = 1.50;   // fully gone midway through section 02

type Particle = {
  index:   number;
  leftPct: number;
  topPct:  number;
  stagger: number; // 0–1 — how late this particle appears relative to others
};

export default function HeroParticleField() {
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef       = useRef<number>(0);

  const particles = useMemo<Particle[]>(() => {
    const list: Particle[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const colFrac = c / (COLS - 1); // 0 → 1
        const rowFrac = r / (ROWS - 1); // 0 → 1
        list.push({
          index:   r * COLS + c,
          leftPct: FIELD_LEFT + colFrac * (FIELD_RIGHT - FIELD_LEFT),
          topPct:  FIELD_TOP  + rowFrac * (FIELD_BOTTOM - FIELD_TOP),
          // Left columns appear first, diagonal wave left→right top→bottom
          stagger: colFrac * 0.55 + rowFrac * 0.12,
        });
      }
    }
    return list;
  }, []);

  useEffect(() => {
    const hero = document.querySelector('.hero-section') as HTMLElement | null;
    if (!hero) return;

    const getHeroHeight = () => hero.offsetHeight;

    const update = () => {
      const scrollY  = window.scrollY;
      const heroH    = getHeroHeight();
      // progress: 0 at page top, 1 when hero fully scrolled past viewport
      const progress = Math.max(0, scrollY / heroH);

      // Global fade — dissolves into section 02, not at hero boundary
      const globalFade =
        progress < FADE_START ? 1 :
        progress > FADE_END   ? 0 :
        1 - (progress - FADE_START) / (FADE_END - FADE_START);

      const els = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const el = els[i];
        if (!el) continue;

        const { stagger } = particles[i];

        // Per-particle appear threshold — staggered across scroll
        const localStart  = APPEAR_START + stagger * APPEAR_WINDOW;
        const localAppear = Math.max(0, Math.min(1,
          (progress - localStart) / 0.10   // each particle fades in over 10% of scroll
        ));

        el.style.opacity = (localAppear * 0.52 * globalFade).toFixed(4);
      }
    };

    let active = false;

    const onScroll = () => {
      if (!active) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    // rootMargin '100% bottom' keeps listener alive well into section 02
    const observer = new IntersectionObserver(
      (entries) => {
        active = entries[0].isIntersecting;
        if (active) {
          window.addEventListener('scroll', onScroll, { passive: true });
          update();
        } else {
          window.removeEventListener('scroll', onScroll);
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0, rootMargin: '0px 0px 120% 0px' }
    );

    observer.observe(hero);
    update(); // sync on mount (in case page is already scrolled)

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        // Fixed so it floats above both hero AND section 02 during scroll
        position: 'fixed',
        top:    0,
        left:   0,
        width:  '100vw',
        height: '100vh',
        zIndex: 4,          // above hero image (z1), below nav
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {particles.map(({ leftPct, topPct, index }) => (
        <div
          key={index}
          ref={el => { particlesRef.current[index] = el; }}
          style={{
            position:        'absolute',
            left:            `${leftPct.toFixed(3)}%`,
            top:             `${topPct.toFixed(3)}%`,
            transform:       'translate(-50%, -50%)',
            width:           `${DASH_W}px`,
            height:          `${DASH_H}px`,
            borderRadius:    0,
            backgroundColor: '#e8e4dc',
            opacity:         0,
          }}
        />
      ))}
    </div>
  );
}
