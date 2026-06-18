'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { LANGS } from '@/lib/translations';
import { useTheme, type Theme } from '@/lib/ThemeContext';

const THEME_OPTIONS: { id: Theme; label: string; color: string; border: string }[] = [
  { id: 'dark',  label: 'DARK',  color: '#0d0d0b', border: '1px solid rgba(255,255,255,0.22)' },
  { id: 'grey',  label: 'GREY',  color: '#e8e6e0', border: '1px solid rgba(0,0,0,0.18)'       },
  { id: 'white', label: 'WHITE', color: '#ffffff',  border: '1px solid rgba(0,0,0,0.22)'       },
];

const NAV_HREFS = [
  { href: '/architecture', key: 'architecture', descKey: 'archDesc'   },
  { href: '/design',       key: 'design',       descKey: 'designDesc' },
  { href: '/tools',        key: 'tools',        descKey: 'toolsDesc'  },
  { href: '/fabrication',  key: 'fabrication',  descKey: 'fabDesc'    },
  { href: '/shop',         key: 'shop',         descKey: 'shopDesc'   },
  { href: '/contact',      key: 'contact',      descKey: 'contactDesc'},
] as const;

const MOBILE_NUMS = ['01', '02', '03', '04', '05', '06'] as const;

export default function Navigation() {
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [langOpen,  setLangOpen]  = useState(false);
  const langTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMenuOpen(false); setLangOpen(false); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => () => { if (langTimer.current) clearTimeout(langTimer.current); }, []);

  const openLang  = () => {
    if (langTimer.current) { clearTimeout(langTimer.current); langTimer.current = null; }
    setLangOpen(true);
  };
  const closeLang = () => {
    if (langTimer.current) clearTimeout(langTimer.current);
    langTimer.current = setTimeout(() => setLangOpen(false), 100);
  };
  const onLangWrapBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setLangOpen(false);
  };

  return (
    <>
      {/* Desktop + Mobile Bar */}
      <nav
        className={`nav-root ${scrolled ? 'scrolled' : ''}`}
        aria-label="Main navigation"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
            paddingLeft: 'clamp(24px, 6vw, 120px)',
            paddingRight: 'clamp(24px, 6vw, 120px)',
          }}
        >
          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Desktop links */}
          <div
            role="list"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '36px',
              listStyle: 'none',
            }}
            className="hidden-mobile"
          >
            <Link href="/" className="nav-link" role="listitem" aria-label="AMD NSRI homepage">
              <span style={{ color: '#b8956a' }}>{t('nav.wordmark')}</span>
            </Link>

            {NAV_HREFS.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link" role="listitem">
                {t(`nav.${item.key}`)}
              </Link>
            ))}

            {/* Language switcher */}
            <div
              className="nav-lang-wrap"
              onMouseEnter={openLang}
              onMouseLeave={closeLang}
              onFocus={openLang}
              onBlur={onLangWrapBlur}
              onKeyDown={(e) => { if (e.key === 'Escape') setLangOpen(false); }}
              role="listitem"
            >
              <button
                type="button"
                className="nav-lang-trigger nav-link"
                onClick={openLang}
                aria-haspopup="true"
                aria-expanded={langOpen}
                aria-controls="nav-lang-pop"
                aria-label="Switch language"
              >
                {lang}
              </button>

              {langOpen && (
                <div
                  id="nav-lang-pop"
                  className="nav-lang-pop"
                  role="group"
                  aria-label="Select language"
                >
                  {LANGS.map((l, i) => (
                    <button
                      key={l}
                      type="button"
                      className={`nav-lang-card${l === lang ? ' is-active' : ''}`}
                      style={{ animationDelay: `${i * 60}ms` }}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      aria-pressed={l === lang}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme switcher */}
            <div className="theme-switcher" role="listitem" aria-label="Switch theme">
              <span className="theme-divider" aria-hidden="true" />
              {THEME_OPTIONS.map((opt) => (
                <div key={opt.id} className="theme-dot-wrap">
                  <button
                    type="button"
                    className={`theme-dot${theme === opt.id ? ' is-active' : ''}`}
                    style={{ backgroundColor: opt.color, border: opt.border }}
                    onClick={() => setTheme(opt.id)}
                    aria-pressed={theme === opt.id}
                    aria-label={`Switch to ${opt.label} theme`}
                  />
                  <span className="theme-dot-tooltip">{opt.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={menuOpen}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
              display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end',
            }}
            className="show-mobile"
          >
            <span style={{
              display: 'block', width: menuOpen ? '20px' : '24px', height: '1px',
              backgroundColor: 'var(--color-text-secondary)',
              transition: 'width 400ms ease, transform 400ms ease, opacity 400ms ease',
              transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '16px', height: '1px',
              backgroundColor: 'var(--color-text-secondary)',
              transition: 'opacity 300ms ease', opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '20px', height: '1px',
              backgroundColor: 'var(--color-text-secondary)',
              transition: 'width 400ms ease, transform 400ms ease',
              transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>

        {/* 1px rule separator */}
        <div style={{
          position: 'absolute', bottom: 0,
          left: 'clamp(24px, 6vw, 120px)', right: 'clamp(24px, 6vw, 120px)',
          height: '1px', backgroundColor: 'var(--color-line)', opacity: 0,
        }} />
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
        role="dialog"
      >
        {/* Close row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '72px', flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: '500',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--color-text-primary)',
          }}>
            {t('nav.menuLabel')}
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label={t('nav.closeMenu')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '8px',
              display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end',
            }}
          >
            <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: 'var(--color-text-secondary)', transform: 'translateY(3px) rotate(45deg)' }} />
            <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: 'var(--color-text-secondary)', transform: 'translateY(-3px) rotate(-45deg)' }} />
          </button>
        </div>

        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '8px' }} />

        {/* Nav items */}
        <nav aria-label="Mobile navigation links">
          {NAV_HREFS.map((item, i) => (
            <div key={item.href} className="mobile-nav-item">
              <span className="mobile-nav-num">{MOBILE_NUMS[i]}</span>
              <Link href={item.href} className="mobile-nav-label" onClick={() => setMenuOpen(false)}>
                {t(`nav.${item.key}`)}
              </Link>
              <span className="mobile-nav-desc">{t(`nav.${item.descKey}`)}</span>
            </div>
          ))}
        </nav>

        {/* Mobile language switcher */}
        <div className="mobile-lang-row">
          {LANGS.map((l, i) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {i > 0 && <span className="mobile-lang-sep" aria-hidden="true">·</span>}
              <button
                type="button"
                className={`mobile-lang-btn${l === lang ? ' is-active' : ''}`}
                onClick={() => { setLang(l); setMenuOpen(false); }}
                aria-pressed={l === lang}
              >
                {l}
              </button>
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 1024px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
        @media (max-width: 1023px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }

        /* ── lang switcher (desktop) ── */
        .nav-lang-wrap {
          position: relative;
          display: inline-flex;
        }
        .nav-lang-trigger {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          color: rgba(255, 255, 255, 0.5);
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          transition: color 250ms ease;
        }
        .nav-lang-trigger:hover {
          color: #b8956a;
        }
        .nav-lang-pop {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 200;
          min-width: 72px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .nav-lang-card {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.08);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 2px;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.6);
          animation: navLangDrop 250ms ease-out both;
          transition: border-color 200ms ease, background 200ms ease, color 200ms ease;
          white-space: nowrap;
        }
        .nav-lang-card:hover,
        .nav-lang-card:focus-visible {
          border-color: #b8956a;
          background: rgba(255, 255, 255, 0.12);
          outline: none;
          color: #ffffff;
        }
        .nav-lang-card.is-active {
          color: #b8956a;
          cursor: default;
          border-color: rgba(184, 149, 106, 0.3);
        }
        @keyframes navLangDrop {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-lang-card { animation: none; opacity: 1; }
        }

        /* ── theme switcher ── */
        .theme-switcher {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .theme-divider {
          display: inline-block;
          width: 1px;
          height: 12px;
          background: var(--color-border);
          margin: 0 2px;
          opacity: 0.6;
        }
        .theme-dot-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .theme-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 300ms ease;
        }
        .theme-dot:hover {
          transform: scale(1.4);
        }
        .theme-dot.is-active {
          box-shadow: 0 0 0 1.5px var(--color-accent);
          transform: scale(1.2);
        }
        .theme-dot-tooltip {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 200ms ease;
        }
        .theme-dot-wrap:hover .theme-dot-tooltip {
          opacity: 1;
        }

        /* ── nav light-theme overrides ── */
        html[data-theme="grey"] .nav-lang-trigger,
        html[data-theme="white"] .nav-lang-trigger {
          color: rgba(26, 26, 24, 0.5);
        }
        html[data-theme="grey"] .nav-lang-trigger:hover,
        html[data-theme="white"] .nav-lang-trigger:hover {
          color: var(--color-accent);
        }
        html[data-theme="grey"] .nav-lang-card,
        html[data-theme="white"] .nav-lang-card {
          background: rgba(0, 0, 0, 0.04);
          border-color: rgba(0, 0, 0, 0.12);
          color: rgba(26, 26, 24, 0.6);
        }
        html[data-theme="grey"] .nav-lang-card:hover,
        html[data-theme="white"] .nav-lang-card:hover {
          background: rgba(0, 0, 0, 0.08);
          color: var(--color-text-primary);
        }
        html[data-theme="grey"] .mobile-lang-sep,
        html[data-theme="white"] .mobile-lang-sep {
          color: rgba(0, 0, 0, 0.2);
        }
        html[data-theme="grey"] .mobile-lang-btn,
        html[data-theme="white"] .mobile-lang-btn {
          color: rgba(26, 26, 24, 0.35);
        }
        html[data-theme="grey"] .mobile-lang-btn:hover,
        html[data-theme="white"] .mobile-lang-btn:hover {
          color: rgba(26, 26, 24, 0.65);
        }

        /* ── lang switcher (mobile) ── */
        .mobile-lang-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 32px 0 16px;
          border-top: 1px solid var(--color-border);
          margin-top: 24px;
        }
        .mobile-lang-sep {
          font-family: var(--font-body);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.2);
          user-select: none;
        }
        .mobile-lang-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
          padding: 0;
          transition: color 200ms ease;
        }
        .mobile-lang-btn:hover {
          color: rgba(255, 255, 255, 0.65);
        }
        .mobile-lang-btn.is-active {
          color: #b8956a;
          cursor: default;
        }
      `}</style>
    </>
  );
}
