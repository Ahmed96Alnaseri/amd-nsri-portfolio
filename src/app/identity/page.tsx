'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/LanguageContext';

/**
 * /identity — one screen, nothing to scroll: a 2×2 arrangement.
 *   top-left  portrait frame with Miki the cat overlapping its corner
 *   top-right name + the two bio paragraphs
 *   bottom-left  contact (email, location, phone)
 *   bottom-right a location panel linking out to Google Maps
 * Every size scales off --s, the frame width (420px at the 1440×1080 mockup), so the
 * whole arrangement keeps the mockup's proportions at any window size.
 * All visible copy is keyed via t('about.*') so it switches with EN/TR/AR.
 */

const PORTRAIT = '/about/ahmed-alnaseri.png';
const CAT = '/about/miki-cat.png';
const MAP_IMG = '/about/beylikduzu-map-abstract.png';
const EMAIL = 'ahmed@amdnsri.com';
const PHONE_DISPLAY = '+90 537 872 64 52';
const PHONE_TEL = '+905378726452';
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=Beylikd%C3%BCz%C3%BC%2C%20Istanbul';

export default function IdentityPage() {
  const { t } = useLanguage();
  return (
    <main className="id">
      <div className="id-content">
        {/* ── row 1: portrait + bio ──────────────────────────────── */}
        <div className="id-row id-row--top">
          <div className="id-col-left">
            <div className="id-frame-wrap">
              <div className="id-frame">
                <Image src={PORTRAIT} alt={t('about.name')} fill priority sizes="(max-width: 760px) 90vw, 420px" className="id-portrait" />
              </div>
              <div className="id-cat">
                <div className="id-cat-img">
                  <Image src={CAT} alt="Miki" fill loading="eager" sizes="120px" className="id-cat-photo" />
                </div>
                <div className="id-bubble">{t('about.meow')}</div>
                <div className="id-bubble-tail" aria-hidden="true" />
              </div>
            </div>
            <p className="id-caption">{t('about.catCaption')}</p>
          </div>

          <div className="id-bio">
            <h1 className="id-name">{t('about.name')}</h1>
            <p className="id-body">{t('about.stmtBody')}</p>
            <p className="id-body">{t('about.bioFounding')}</p>
          </div>
        </div>

        {/* ── row 2: contact + location ──────────────────────────── */}
        <div className="id-spacer" aria-hidden="true" />

        <div className="id-row id-row--bottom">
          <div className="id-col-left id-contact">
            <p className="id-eyebrow">{t('nav.contact')}</p>
            <div className="id-field">
              <p className="id-label">{t('contact.emailLabel')}</p>
              <a className="id-value id-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
            <div className="id-field">
              <p className="id-label">{t('contact.locationLabel')}</p>
              <p className="id-value">{t('about.mapPlace')}</p>
            </div>
            <div className="id-field">
              <p className="id-label">{t('about.phoneLabel')}</p>
              <a className="id-value id-link" href={`tel:${PHONE_TEL}`} dir="ltr">{PHONE_DISPLAY}</a>
            </div>
          </div>

          <div className="id-map">
            <Image src={MAP_IMG} alt="" fill loading="eager" sizes="(max-width: 760px) 90vw, 55vw" className="id-map-img" />
            <div className="id-map-shade" aria-hidden="true" />
            <div className="id-map-top">
              <a className="id-map-open" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
                {t('about.mapOpenShort')} ↗
              </a>
            </div>
            <div className="id-map-foot">
              <p className="id-map-place">{t('about.mapPlace')}</p>
              <a className="id-map-link" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
                {t('about.mapOpen')} ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        /* at least the full viewport (dvh follows mobile browser chrome), below the fixed 72px nav.
           A minimum, not a fixed height: on a very small window the page grows instead of clipping. */
        .id {
          display: flex; flex-direction: column;
          min-height: 100vh; min-height: 100dvh; padding-top: 72px;
          background: var(--color-bg); color: var(--color-text-primary);
          font-family: var(--font-body);
          --hair: rgba(245,241,234,0.15);
          /* frame width: up to 600px (reached around 2560×1300). The height term leaves room for the
             contact/map row under it so the page stays one screen; the width term leaves room for the bio.
             Miki, the bubble and the tail are all positioned as fractions of it. */
          --s: clamp(200px, min(max(38.9vh, calc(85vh - 370px)), 31vw), 600px);
          --u: calc(var(--s) / 420);
          --px: clamp(24px, 4.45vw, 64px);
          --py: clamp(20px, 5.2vh, 56px);
          --gap-x: clamp(28px, 4.45vw, 64px);
          --bfs: clamp(14px, min(1.4vw, 2vh), 21px);
          /* content width: photo + gap + a 92-character bio line (IBM Plex Mono is 0.6em per character).
             Both rows use it, so the map panel ends where the bio text ends instead of running to the edge. */
          --cw: calc(var(--s) + var(--gap-x) + var(--bfs) * 55.2);
          --gap-y: clamp(18px, 4.1vh, 44px);
        }
        .id-content {
          flex: 1; display: flex; flex-direction: column;
          padding: var(--py) var(--px);
        }
        .id-row { display: flex; gap: var(--gap-x); width: 100%; max-width: var(--cw); }
        .id-row--top { align-items: flex-start; }
        /* the bottom row keeps its own height at the foot of the screen; the map stretches to the contact block */
        /* breathing room between bio and contact: about 10% of the screen, never below the row gap */
        /* grows with the spare height up to ~10% of the screen (the bottom row takes the rest);
           with no spare height it is just the row gap, so it never pushes the page past one screen */
        .id-spacer { flex: 1 1 0; min-height: var(--gap-y); max-height: clamp(40px, 10vh, 120px); }
        /* the bottom row spans the full content width, so the map can sit against the right edge */
        .id-row--bottom { flex: 1 0 auto; align-items: stretch; max-width: none; }
        .id-row--top .id-col-left { width: var(--s); flex: none; }

        /* ── portrait frame + Miki ── */
        .id-row--top .id-col-left { display: flex; flex-direction: column; gap: clamp(14px, 2.4vh, 26px); }
        .id-frame-wrap { position: relative; width: var(--s); height: var(--s); }
        .id-frame { position: absolute; inset: 0; border: 1px solid var(--hair); background: var(--color-bg); overflow: hidden; }
        .id-portrait { object-fit: cover; object-position: center top; }
        .id-cat {
          position: absolute; right: calc(var(--s) * -18 / 420); bottom: calc(var(--s) * -18 / 420);
          width: calc(var(--s) * 120 / 420); height: calc(var(--s) * 120 / 420);
        }
        .id-cat-img {
          position: absolute; inset: 0; border-radius: 50%; overflow: hidden;
          border: max(2px, calc(var(--u) * 3)) solid var(--color-bg); background: var(--color-bg);
          box-shadow: 0 0 0 1px var(--hair);
        }
        .id-cat-photo { object-fit: cover; object-position: center; }
        .id-bubble {
          position: absolute; right: calc(var(--u) * 22); bottom: calc(100% + var(--u) * 14);
          background: var(--color-bg); border: 1px solid rgba(245,241,234,0.25); border-radius: calc(var(--u) * 10 + 2px);
          padding: calc(var(--u) * 6 + 1px) calc(var(--u) * 12 + 2px); box-shadow: 0 4px 10px rgba(0,0,0,0.35); white-space: nowrap;
          /* scaled with the frame, but never below a readable 10px */
          font-family: var(--font-title); font-style: italic; font-size: max(10px, calc(var(--u) * 13)); color: var(--color-text-primary);
        }
        .id-bubble-tail {
          position: absolute; right: calc(var(--u) * 46); bottom: calc(100% + var(--u) * 2);
          width: max(6px, calc(var(--u) * 10)); height: max(6px, calc(var(--u) * 10)); background: var(--color-bg);
          border-right: 1px solid rgba(245,241,234,0.25); border-bottom: 1px solid rgba(245,241,234,0.25);
          transform: rotate(45deg);
        }
        /* Miki hangs 18/420 of the frame below it. On a small frame the caption drops below the cat in the flow.
           Once the frame is wide enough it keeps its old place in the flow, flush right under the frame, and is only
           nudged down (position, not layout) until it clears the cat by 10px, so the page does not grow.
           line-height 1.25 keeps the 12px line as tall as the old 10px one. */
        .id-row--top .id-col-left { container-type: inline-size; }
        .id-caption {
          margin: calc(var(--s) * 18 / 420) 0 0; padding-right: 6px; text-align: right; line-height: 1.25;
          font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-text-primary);
        }
        @container (min-width: 360px) {
          .id-caption {
            margin-top: 0; position: relative;
            top: max(0px, calc(100cqw * 18 / 420 + 10px - clamp(14px, 2.4vh, 26px)));
          }
        }

        /* ── name + bio ── */
        .id-bio { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: clamp(12px, 2vh, 22px); padding-top: 2px; }
        .id-name {
          margin: 0; font-family: var(--font-title); font-weight: 400;
          font-size: clamp(44px, min(7.6vw, 10.2vh), 110px); line-height: 1; letter-spacing: -0.02em;
          color: var(--color-text-primary);
        }
        .id-body {
          margin: 0; max-width: 92ch;
          font-size: var(--bfs); line-height: 1.7; color: var(--color-text-secondary);
        }

        /* ── contact ── */
        /* contact is as wide as the photo column, so the map starts in line with the bio text above it */
        /* its content sits at the bottom of the row, level with the foot of the map */
        .id-contact { flex: none; width: max(var(--s), 240px); display: flex; flex-direction: column; justify-content: flex-end; gap: clamp(12px, 2vh, 22px); }
        .id-eyebrow {
          margin: 0; display: flex; align-items: center; gap: 10px;
          font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--color-accent);
        }
        .id-eyebrow::before { content: ''; width: 24px; height: 1px; background: var(--color-accent); }
        .id-label { margin: 0 0 6px; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--color-text-meta); }
        .id-value { margin: 0; font-size: 14px; color: var(--color-text-primary); }
        .id-link {
          display: inline-block; text-decoration: none; border-bottom: 1px solid var(--color-accent);
          padding-bottom: 2px; transition: opacity 400ms ease; overflow-wrap: anywhere;
        }
        .id-link:hover { opacity: .75; }

        /* ── location panel: links out to Google Maps, no embed ── */
        .id-map {
          /* same width as when it sat under the bio text, pushed to the right edge; it gives way to the
             contact column when the window is too narrow for both */
          flex: 0 1 calc(var(--cw) - max(var(--s), 240px) - var(--gap-x)); margin-left: auto;
          min-width: 0; min-height: clamp(150px, 24vh, 300px); position: relative; overflow: hidden;
          display: flex; flex-direction: column; justify-content: space-between; padding: 20px;
          border: 1px solid var(--hair); background: #100f0d;
        }
        /* the pin sits at about 49% / 34% of the image, so the crop is anchored there */
        .id-map-img { object-fit: cover; object-position: 49% 34%; }
        /* a soft shade top and bottom keeps the overlaid links readable on the street lines */
        .id-map-shade {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, rgba(13,13,11,.6) 0%, rgba(13,13,11,0) 24%, rgba(13,13,11,0) 64%, rgba(13,13,11,.8) 100%);
        }
        .id-map-top { position: relative; display: flex; justify-content: flex-end; }
        .id-map-open {
          font-size: 11px; letter-spacing: 1px; text-transform: uppercase; color: var(--color-accent);
          text-decoration: none; transition: opacity 400ms ease;
        }
        .id-map-foot { position: relative; }
        .id-map-place { margin: 0 0 2px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; color: var(--color-text-primary); }
        .id-map-link { font-size: 11px; color: var(--color-text-meta); text-decoration: none; transition: opacity 400ms ease; }
        .id-map-open:hover, .id-map-link:hover { opacity: .75; }
        .id a:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }

        @media (prefers-reduced-motion: reduce) {
          .id-link, .id-map-open, .id-map-link { transition: none !important; }
        }
        /* short windows: tighter outer padding and row gap so the two rows still fit */
        @media (min-width: 761px) and (max-height: 720px) {
          .id { --py: clamp(14px, 2.8vh, 56px); --gap-y: clamp(12px, 2.8vh, 44px); }
        }
        /* very short windows: slightly smaller bio and a tighter contact list */
        @media (min-width: 761px) and (max-height: 640px) {
          .id { --bfs: 13px; }
          .id-body { line-height: 1.6; }
          .id-name { font-size: clamp(44px, min(7.6vw, 9vh), 110px); }
          .id-contact { gap: 8px; }
          .id-label { margin-bottom: 3px; }
        }
        /* phones: one screen is not possible, so everything stacks and the page scrolls */
        @media (max-width: 760px) {
          .id { --s: min(calc(100vw - 2 * var(--px)), 420px); }
          .id-row { flex-direction: column; max-width: none; }
          .id-row--bottom { flex: none; }
          .id-contact { width: auto; }
          .id-map { flex: none; margin-left: 0; min-height: 220px; }
          .id-spacer { display: none; }
          .id-content { gap: var(--gap-y); }
        }
      ` }} />
    </main>
  );
}
