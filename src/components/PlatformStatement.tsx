'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const SPEC_KEYS = [
  ['platform.specDomainL',   'platform.specDomainV'],
  ['platform.specOriginL',   'platform.specOriginV'],
  ['platform.specApproachL', 'platform.specApproachV'],
  ['platform.specOutputL',   'platform.specOutputV'],
  ['platform.specScaleL',    'platform.specScaleV'],
] as const;

const AMD = [
  ['A', '01', 'platform.amdA'],
  ['M', '02', 'platform.amdM'],
  ['D', '03', 'platform.amdD'],
] as const;

export default function PlatformStatement() {
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
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    revealRefs.current[i] = el;
  };

  return (
    <section
      id="section-02"
      className="ps2"
      aria-labelledby="platform-statement-heading"
    >
      {/* dashed section-cut line down the left */}
      <div className="ps2-cutline" aria-hidden="true">
        <span className="ps2-cutline-marker ps2-cutline-marker-top" />
        <span className="ps2-cutline-marker ps2-cutline-marker-bottom" />
      </div>

      {/* ghost section number */}
      <span className="ps2-bg-number" aria-hidden="true">02</span>

      {/* header rule */}
      <div className="ps2-header" aria-hidden="true">
        <span className="ps2-header-label">{t('platform.label')}</span>
        <div className="ps2-header-rule" />
        <span className="ps2-header-tag">{t('platform.tag')}</span>
      </div>

      <div className="ps2-grid">
        {/* left — statement */}
        <div className="ps2-statement">
          <p
            ref={setRef(0)}
            className="ps2-eyebrow reveal-item"
            style={{ '--delay': '0ms' } as React.CSSProperties}
          >
            {t('platform.eyebrow')}
          </p>

          <h2
            id="platform-statement-heading"
            ref={setRef(1)}
            className="ps2-heading reveal-item"
            style={{ '--delay': '80ms' } as React.CSSProperties}
          >
            <span className="ps2-heading-line">{t('platform.headingLine1')}</span>
            <span className="ps2-heading-line">{t('platform.headingLine2')}</span>
            <span className="ps2-heading-line ps2-heading-em">
              {t('platform.headingPre')}<em>{t('platform.headingSystem')}</em><span className="ps2-period">.</span>
            </span>
          </h2>

          <div
            ref={setRef(2)}
            className="ps2-body-cols reveal-item"
            style={{ '--delay': '160ms' } as React.CSSProperties}
          >
            <p className="ps2-body">
              {t('platform.body1')}
            </p>
            <p className="ps2-body">
              {t('platform.body2')}
            </p>
          </div>
        </div>

        {/* right — stamped spec card */}
        <aside
          ref={setRef(3)}
          className="ps2-spec reveal-item"
          style={{ '--delay': '240ms' } as React.CSSProperties}
          aria-label="Platform specification"
        >
          <div className="ps2-spec-head">
            <span>{t('platform.specTitle')}</span>
            <span className="ps2-spec-no">AMD-NSRI / 00</span>
          </div>
          <dl className="ps2-spec-list">
            {SPEC_KEYS.map(([labelKey, valueKey]) => (
              <div className="ps2-spec-row" key={labelKey}>
                <dt>{t(labelKey)}</dt>
                <dd>{t(valueKey)}</dd>
              </div>
            ))}
          </dl>
          <div className="ps2-spec-foot" aria-hidden="true">
            <span className="ps2-spec-stamp">{t('platform.specVerified')}</span>
          </div>
        </aside>
      </div>

      {/* ── Identity plate ── */}
      <div
        ref={setRef(4)}
        className="ps2-plate reveal-item"
        style={{ '--delay': '0ms' } as React.CSSProperties}
      >
        <div className="ps2-plate-label" aria-hidden="true">
          <span>{t('platform.plate1')}</span>
          <span>{t('platform.plate2')}</span>
        </div>

        <div className="ps2-plate-grid">
          {/* the mark */}
          <div className="ps2-amad-stage">
            <svg
              className="ps2-amad-geo"
              viewBox="0 0 300 300"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
              <circle cx="150" cy="150" r="92" stroke="currentColor" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 6" />
              <line x1="150" y1="6" x2="150" y2="34" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <line x1="150" y1="266" x2="150" y2="294" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <line x1="6" y1="150" x2="34" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
              <line x1="266" y1="150" x2="294" y2="150" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            </svg>
            <span
              className="ps2-amad"
              lang="ar"
              role="img"
              aria-label={t('platform.amadAria')}
            >
              أَمَد
            </span>
          </div>

          {/* two readings */}
          <div className="ps2-readings">
            <div className="ps2-reading">
              <span className="ps2-reading-idx">{t('platform.reading1Label')}</span>
              <p>
                {t('platform.reading1Pre')}<em>{t('platform.reading1Em')}</em>{t('platform.reading1Post')}
              </p>
            </div>
            <div className="ps2-reading">
              <span className="ps2-reading-idx">{t('platform.reading2Label')}</span>
              <p>
                {t('platform.reading2Pre')}
                <span lang="ar" className="ps2-arabic-inline">أَمَد</span>
                {t('platform.reading2Post')}
              </p>
            </div>
          </div>
        </div>

        {/* A · M · D breakdown */}
        <div className="ps2-amd-grid">
          {AMD.map(([letter, num, descKey]) => (
            <div className="ps2-amd-col" key={letter}>
              <div className="ps2-amd-letterrow" aria-hidden="true">
                <span className="ps2-amd-letter">{letter}</span>
                <span className="ps2-amd-num">/ {num}</span>
              </div>
              <p className="ps2-amd-desc">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* bottom rule */}
      <div className="ps2-bottom" aria-hidden="true">
        <div className="ps2-header-rule" />
        <span className="ps2-bottom-label">
          {t('platform.bottomLabel')}
        </span>
      </div>
    </section>
  );
}
