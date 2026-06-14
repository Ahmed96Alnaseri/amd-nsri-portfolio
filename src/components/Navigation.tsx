'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '/architecture', label: 'Architecture' },
  { href: '/design',       label: 'Design' },
  { href: '/fabrication',  label: 'Fabrication' },
  { href: '/works',        label: 'Works' },
  { href: '/shop',         label: 'Shop' },
  { href: '/contact',      label: 'Contact' },
];

const MOBILE_LINKS = [
  { num: '01', href: '/architecture', label: 'Architecture',  desc: 'Spatial concepts and visualization' },
  { num: '02', href: '/design',       label: 'Design',        desc: 'Experimental design and objects' },
  { num: '03', href: '/fabrication',  label: 'Fabrication',   desc: 'Production and fabrication logic' },
  { num: '04', href: '/works',        label: 'Works',         desc: 'All projects' },
  { num: '05', href: '/shop',         label: 'Shop',          desc: 'Products and resources' },
  { num: '06', href: '/contact',      label: 'Contact',       desc: 'Collaboration inquiries' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

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
          {/* Spacer — pushes all links to the right */}
          <div style={{ flex: 1 }} />

          {/* All links — wordmark first, then nav items */}
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
            <Link
              href="/about"
              className="nav-link"
              role="listitem"
              aria-label="About AMD NSRI"
            >
              AMD NSRI
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                role="listitem"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-end',
            }}
            className="show-mobile"
          >
            <span
              style={{
                display: 'block',
                width: menuOpen ? '20px' : '24px',
                height: '1px',
                backgroundColor: 'var(--color-text-secondary)',
                transition: 'width 400ms ease, transform 400ms ease, opacity 400ms ease',
                transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '16px',
                height: '1px',
                backgroundColor: 'var(--color-text-secondary)',
                transition: 'opacity 300ms ease',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: 'block',
                width: menuOpen ? '20px' : '20px',
                height: '1px',
                backgroundColor: 'var(--color-text-secondary)',
                transition: 'width 400ms ease, transform 400ms ease',
                transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>

        {/* 1px rule separator */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 'clamp(24px, 6vw, 120px)',
            right: 'clamp(24px, 6vw, 120px)',
            height: '1px',
            backgroundColor: 'var(--color-line)',
            opacity: scrolled ? 0 : 0,
          }}
        />
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <div
        ref={menuRef}
        className={`mobile-nav-overlay ${menuOpen ? 'open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label="Mobile navigation"
        role="dialog"
      >
        {/* Close row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
            }}
          >
            AMD NSRI
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-end',
            }}
          >
            <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: 'var(--color-text-secondary)', transform: 'translateY(3px) rotate(45deg)' }} />
            <span style={{ display: 'block', width: '20px', height: '1px', backgroundColor: 'var(--color-text-secondary)', transform: 'translateY(-3px) rotate(-45deg)' }} />
          </button>
        </div>

        {/* Thin line under close row */}
        <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '8px' }} />

        {/* Nav Items */}
        <nav aria-label="Mobile navigation links">
          {MOBILE_LINKS.map((link) => (
            <div key={link.href} className="mobile-nav-item">
              <span className="mobile-nav-num">{link.num}</span>
              <Link
                href={link.href}
                className="mobile-nav-label"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
              <span className="mobile-nav-desc">{link.desc}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Responsive style block */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
        @media (max-width: 1023px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
