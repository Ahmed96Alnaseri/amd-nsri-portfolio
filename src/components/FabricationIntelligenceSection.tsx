'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/LanguageContext';

const AmdFacade = dynamic(() => import('./AmdFacade'), { ssr: false });

export default function FabricationIntelligenceSection() {
  const { t } = useLanguage();
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.setProperty('--revealed', '1');
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    revealRefs.current.filter(Boolean).forEach((el) => textObserver.observe(el!));

    return () => {
      textObserver.disconnect();
    };
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    revealRefs.current[i] = el;
  };

  const KEYWORDS = [
    { labelKey: 'fabint.kw1L', noteKey: 'fabint.kw1N' },
    { labelKey: 'fabint.kw2L', noteKey: 'fabint.kw2N' },
    { labelKey: 'fabint.kw3L', noteKey: 'fabint.kw3N' },
    { labelKey: 'fabint.kw4L', noteKey: 'fabint.kw4N' },
    { labelKey: 'fabint.kw5L', noteKey: 'fabint.kw5N' },
    { labelKey: 'fabint.kw6L', noteKey: 'fabint.kw6N' },
  ];

  // Build the heading from pre / em / post parts, preserving line breaks (\n)
  // chosen per language so the staircase rhythm survives translation.
  const headingNodes: React.ReactNode[] = [];
  const pushHeadingLine = (node: React.ReactNode) => {
    if (headingNodes.length) headingNodes.push(<br key={`br${headingNodes.length}`} />);
    headingNodes.push(node);
  };
  const hPre = t('fabint.headingPre');
  const hPost = t('fabint.headingPost');
  if (hPre) hPre.split('\n').forEach((l, i) => pushHeadingLine(<span key={`pre${i}`}>{l}</span>));
  pushHeadingLine(<em key="em">{t('fabint.headingEm')}</em>);
  if (hPost) hPost.split('\n').forEach((l, i) => pushHeadingLine(<span key={`post${i}`}>{l}</span>));

  return (
    <section className="fabint-section" aria-labelledby="fabint-heading">
      <span className="fabint-bg-number" aria-hidden="true">05</span>

      <div className="fabint-top-rule" aria-hidden="true">
        <span className="fabint-section-label">{t('fabint.label')}</span>
        <div className="fabint-rule-line" />
        <span className="fabint-header-tag">{t('fabint.tag')}</span>
      </div>

      <div className="fabint-inner">

        {/* Left — text */}
        <div className="fabint-left">
          <p
            ref={setRef(0)}
            className="fabint-eyebrow reveal-item"
            style={{ '--delay': '0ms' } as React.CSSProperties}
          >
            {t('fabint.eyebrow')}
          </p>

          <h2
            id="fabint-heading"
            ref={setRef(1)}
            className="fabint-heading reveal-item"
            style={{ '--delay': '80ms' } as React.CSSProperties}
          >
            {headingNodes}
          </h2>

          <p
            ref={setRef(2)}
            className="fabint-body reveal-item"
            style={{ '--delay': '160ms' } as React.CSSProperties}
          >
            {t('fabint.body')}
          </p>

          <div
            ref={setRef(3)}
            className="fabint-kw-table reveal-item"
            style={{ '--delay': '240ms' } as React.CSSProperties}
          >
            {KEYWORDS.map((kw, i) => (
              <div key={i} className="fabint-kw-row">
                <span className="fabint-kw-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="fabint-kw-label">{t(kw.labelKey)}</span>
                <span className="fabint-kw-note">{t(kw.noteKey)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — interactive façade assembly */}
        <div
          className="fabint-right"
          style={{ minHeight: '700px', display: 'flex', alignItems: 'stretch' }}
        >
          <span className="fabint-tick fabint-tick-tl" />
          <span className="fabint-tick fabint-tick-br" />
          <AmdFacade />
        </div>

      </div>

    </section>
  );
}
