'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { MAP_DOTS } from '@/data/map-dots';

const LOCATIONS = [
  { country: 'Turkey',         city: 'Istanbul',  lat: 41.01, lon: 28.98, home: true },
  { country: 'Iraq',           city: 'Baghdad',   lat: 33.31, lon: 44.36 },
  { country: 'United Kingdom', city: 'London',    lat: 51.51, lon: -0.13 },
  { country: 'United States',  city: 'New York',  lat: 40.71, lon: -74.00 },
  { country: 'UAE',            city: 'Dubai',     lat: 25.20, lon: 55.27 },
  { country: 'Qatar',          city: 'Doha',      lat: 25.29, lon: 51.53 },
  { country: 'Germany',        city: 'Berlin',    lat: 52.52, lon: 13.40 },
];

function proj(lon: number, lat: number) {
  return { x: (lon + 180) * 2, y: (80 - lat) * 2 };
}

const STAT_DEFS: { target: number; suffix: string; labelKey: string; id?: string }[] = [
  { target: 48, suffix: '+', labelKey: 'stats.projects' },
  { target: 12, suffix: '',  labelKey: 'stats.tools' },
  { target: 0,  suffix: '',  labelKey: 'stats.countries', id: 'amdCountries' },
  { target: 30, suffix: '+', labelKey: 'stats.clients' },
];

export default function StatsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);
  const arcsRef   = useRef<SVGGElement | null>(null);
  const nodesRef  = useRef<SVGGElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const root    = sectionRef.current;
    const arcsG   = arcsRef.current;
    const nodesG  = nodesRef.current;
    if (!root || !arcsG || !nodesG) return;

    const SVGNS = 'http://www.w3.org/2000/svg';
    const home  = LOCATIONS.find((l) => l.home) ?? LOCATIONS[0];
    const hp    = proj(home.lon, home.lat);

    LOCATIONS.forEach((loc) => {
      const p = proj(loc.lon, loc.lat);
      if (loc === home) return;

      const mx = (hp.x + p.x) / 2;
      const d  = Math.hypot(p.x - hp.x, p.y - hp.y);
      const my = Math.min(hp.y, p.y) - 0.22 * d;

      const path = document.createElementNS(SVGNS, 'path');
      path.setAttribute('class', 'amd-map__arc');
      path.setAttribute('d', `M${hp.x} ${hp.y} Q${mx.toFixed(1)} ${my.toFixed(1)} ${p.x} ${p.y}`);
      arcsG.appendChild(path);

      const node = document.createElementNS(SVGNS, 'circle');
      node.setAttribute('class', 'amd-map__node');
      node.setAttribute('cx', String(p.x));
      node.setAttribute('cy', String(p.y));
      node.setAttribute('r', '2.4');
      nodesG.appendChild(node);
    });

    Array.from(arcsG.querySelectorAll<SVGElement>('.amd-map__arc')).forEach((a, i) => {
      a.style.animationDelay = `${0.12 * i}s`;
    });

    const pulse = document.createElementNS(SVGNS, 'circle');
    pulse.setAttribute('class', 'amd-map__pulse');
    pulse.setAttribute('cx', String(hp.x));
    pulse.setAttribute('cy', String(hp.y));
    pulse.setAttribute('r', '3');
    nodesG.appendChild(pulse);

    const homeDot = document.createElementNS(SVGNS, 'circle');
    homeDot.setAttribute('class', 'amd-map__home');
    homeDot.setAttribute('cx', String(hp.x));
    homeDot.setAttribute('cy', String(hp.y));
    homeDot.setAttribute('r', '3.2');
    nodesG.appendChild(homeDot);

    const countriesEl = root.querySelector<HTMLElement>('#amdCountries');
    if (countriesEl) countriesEl.dataset.target = String(LOCATIONS.length);

    const nums   = root.querySelectorAll<HTMLElement>('.amd-stat__num');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function fmt(n: number) { return n.toLocaleString('en-US'); }
    function withSuffix(v: number, s: string) {
      return `${fmt(v)}${s ? `<span class="amd-stat__suffix">${s}</span>` : ''}`;
    }
    function setFinal(e: HTMLElement) {
      e.innerHTML = withSuffix(parseFloat(e.dataset.target ?? '0') || 0, e.dataset.suffix ?? '');
    }
    function animate(e: HTMLElement) {
      const target = parseFloat(e.dataset.target ?? '0') || 0;
      const suffix = e.dataset.suffix ?? '';
      const dur    = 1800;
      let start: number | null = null;
      function step(now: number) {
        if (start === null) start = now;
        const p = Math.min((now - start) / dur, 1);
        const k = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        e.innerHTML = withSuffix(Math.round(target * k), suffix);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    nums.forEach((e) => { if (reduce) setFinal(e); else animate(e); });
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      className={`amd-stats${visible ? ' is-visible' : ''}`}
      aria-label={t('stats.mapAria')}
    >
      <div className="amd-stats__inner">
        <p className="amd-stats__eyebrow">{t('stats.eyebrow')}</p>
        <h2 className="amd-stats__title">{t('stats.title')}</h2>
        <p className="amd-stats__sub">{t('stats.subtitle')}</p>

        <div className="amd-stats__map" role="img" aria-label={t('stats.mapAria')} style={{ overflow: 'hidden', maxHeight: '800px' }}>
          <svg viewBox="-10 -10 740 292" xmlns="http://www.w3.org/2000/svg" overflow="visible" width="100%" height="800px" style={{ maxHeight: '800px' }}>
            <g className="amd-map__land">
              {MAP_DOTS.map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={1.15} />
              ))}
            </g>
            <g className="amd-map__arcs" ref={arcsRef} />
            <g className="amd-map__nodes" ref={nodesRef} />
          </svg>
        </div>

        <div className="amd-stats__grid">
          {STAT_DEFS.map((s) => (
            <div key={s.labelKey} className="amd-stat">
              <div
                className="amd-stat__num"
                id={s.id}
                data-target={s.target}
                data-suffix={s.suffix}
              >
                0
              </div>
              <div className="amd-stat__label">{t(s.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
