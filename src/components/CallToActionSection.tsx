'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';

const WORKS = [
  { nameKey: 'nav.architecture', href: '/architecture' },
  { nameKey: 'nav.design',       href: '/design' },
  { nameKey: 'nav.fabrication',  href: '/fabrication' },
  { nameKey: 'nav.tools',        href: '/tools' },
] as const;

export default function CallToActionSection() {
  const { t } = useLanguage();
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const [worksOpen, setWorksOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Clear any pending close timer on unmount
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const openPopover = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setWorksOpen(true);
  };
  const closePopover = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setWorksOpen(false), 100);
  };
  // Close immediately when focus leaves the whole wrapper (keyboard users)
  const onWrapBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setWorksOpen(false);
  };

  const setRef = (i: number) => (el: HTMLElement | null) => {
    revealRefs.current[i] = el;
  };

  // Headline: a normal multiline part + an emphasized multiline part. Line
  // breaks (\n) are chosen per language so each line stacks like the original.
  const renderLines = (text: string) =>
    text.split('\n').map((line, i) => (
      <span key={i}>{i > 0 && <br />}{line}</span>
    ));

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
        <span className="cta-section-label">{t('cta.label')}</span>
        <div className="cta-rule-line" />
        <span className="cta-header-tag">{t('cta.tag')}</span>
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
            {t('cta.eyebrow')}
          </p>

          <h2
            ref={setRef(1)}
            className="cta-headline reveal-item"
            style={{ '--delay': '80ms' } as React.CSSProperties}
          >
            {renderLines(t('cta.headline'))}<br />
            <em>{renderLines(t('cta.headlineEm'))}</em>
          </h2>

          <div
            ref={setRef(2)}
            className="cta-buttons reveal-item"
            style={{ '--delay': '200ms' } as React.CSSProperties}
          >
            <a href="mailto:ahmed@amdnsri.com" className="cta-btn-primary">
              {t('cta.primaryBtn')} →
            </a>

            {/* Explore Works — hover/focus popover */}
            <div
              className="cta-works-wrap"
              onMouseEnter={openPopover}
              onMouseLeave={closePopover}
              onFocus={openPopover}
              onBlur={onWrapBlur}
              onKeyDown={(e) => { if (e.key === 'Escape') setWorksOpen(false); }}
            >
              <button
                type="button"
                className="cta-btn-ghost cta-works-trigger"
                onClick={openPopover}
                aria-haspopup="true"
                aria-expanded={worksOpen}
                aria-controls="cta-works-pop"
              >
                {t('cta.exploreWorks')}
              </button>

              {worksOpen && (
                <div
                  id="cta-works-pop"
                  className="cta-works-pop"
                  role="group"
                  aria-label="Explore works"
                >
                  {WORKS.map((w, i) => (
                    <Link
                      key={w.href}
                      href={w.href}
                      className="cta-works-card"
                      style={{ animationDelay: `${i * 60}ms` }}
                      onClick={() => setWorksOpen(false)}
                    >
                      <span className="cta-works-card-name">{t(w.nameKey)}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT — info column */}
        <div
          ref={setRef(3)}
          className="cta-right reveal-item"
          style={{ '--delay': '160ms' } as React.CSSProperties}
        >

          <div className="cta-info-block">
            <p className="cta-info-label">{t('cta.directContact')}</p>
            <a href="mailto:ahmed@amdnsri.com" className="cta-info-email">
              ahmed@amdnsri.com
            </a>
          </div>

          <div className="cta-divider" />

          <div className="cta-info-block">
            <p className="cta-info-label">{t('common.location')}</p>
            <p className="cta-info-value">{t('common.istanbul')}</p>
          </div>

          <div className="cta-divider" />

          <Link href="/contact" className="cta-contact-link">
            {t('cta.openContactForm')} →
          </Link>

        </div>
      </div>

      {/* Bottom title-block strip */}
      <div className="cta-bottom" aria-hidden="true">
        <span>AMD NSRI</span>
        <span>{t('cta.collaboration')}</span>
        <span>{t('common.est2026')}</span>
        <span className="cta-bottom-fill" />
      </div>

      <style>{`
        .cta-works-wrap {
          position: relative;
          display: inline-flex;
        }

        .cta-works-pop {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 0;
          z-index: 100;
          width: 100%;
          display: flex;
          flex-direction: column-reverse;
        }

        .cta-works-card {
          box-sizing: border-box;
          width: 100%;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px 20px;
          background: rgba(255, 255, 255, 0.08);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 2px;
          cursor: pointer;
          text-decoration: none;
          animation: ctaWorksRise 250ms ease-out both;
          transition: border-color 200ms ease, background 200ms ease;
        }
        .cta-works-card:hover,
        .cta-works-card:focus-visible {
          border-color: #b8956a;
          background: rgba(255, 255, 255, 0.12);
          outline: none;
        }
        @keyframes ctaWorksRise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cta-works-card-name {
          font-family: var(--font-title);
          font-size: 15px;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: #ffffff;
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-works-card { animation: none; opacity: 1; transition: none; }
        }

        @media (max-width: 1023px) {
          .cta-works-wrap { width: 100%; }
          .cta-works-trigger { width: 100%; justify-content: center; }
        }
      `}</style>

    </section>
  );
}
