'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import posts, {
  JOURNAL_FILTERS,
  type JournalPost,
  type JournalFilter,
} from '@/data/journal-posts';

/*
 * Journal list — refined card grid (design reference "Option B").
 * Large title, category filter with counts, one featured card with a big outlined numeral, then bordered cards
 * (number, category tag, title, excerpt, date, read time, arrow). The only hover effect: the border turns copper.
 * Everything comes from src/data/journal-posts.ts; the filter is the page's only interactive script.
 */

/** The featured post: the one marked featured, otherwise the newest (first one on a tie). */
function pickFeatured(list: JournalPost[]): JournalPost | undefined {
  const marked = list.find(p => p.featured);
  if (marked) return marked;
  const key = (p: JournalPost) => `${p.year}-${p.month}-${p.day}`;
  return list.reduce<JournalPost | undefined>((best, p) => (!best || key(p) > key(best) ? p : best), undefined);
}

type Span = 'wide' | 'narrow' | 'third' | 'half' | 'full';

/**
 * Column spans (out of 12) for the cards after the featured one: rows of wide + narrow (7 + 5), then three thirds
 * (4 + 4 + 4), repeated. A short last row is filled instead of leaving a gap: one card → full, two thirds → halves.
 */
function layout(n: number): Span[] {
  const spans: Span[] = [];
  let i = 0;
  while (i < n) {
    if (n - i === 1) { spans.push('full'); break; }
    spans.push('wide', 'narrow'); i += 2;
    const rest = n - i;
    if (rest <= 0) break;
    if (rest === 1) { spans.push('full'); break; }
    if (rest === 2) { spans.push('half', 'half'); break; }
    spans.push('third', 'third', 'third'); i += 3;
  }
  return spans;
}

const pad = (n: number) => String(n).padStart(2, '0');

function Arrow() {
  return (
    <svg className="jr-arrow" viewBox="0 0 18 10" aria-hidden="true">
      <path d="M0 5h17M12.5.5 17 5l-4.5 4.5" />
    </svg>
  );
}

function Meta({ post }: { post: JournalPost }) {
  const { t } = useLanguage();
  return (
    <span className="jr-meta">
      <time className="jr-date" dateTime={`${post.year}-${post.month}-${post.day}`} dir="ltr">
        {post.year} · {post.month} · {post.day}
      </time>
      <span className="jr-meta-sep" aria-hidden="true" />
      <span className="jr-read">{post.readingMins} {t('journal.minRead')}</span>
    </span>
  );
}

/* ── featured card ──────────────────────────────────────────────────── */
function LeadCard({ post, no, hidden }: { post: JournalPost; no: number; hidden: boolean }) {
  const { t, tv } = useLanguage();
  return (
    <article className="jr-card jr-card--lead" data-category={post.category} hidden={hidden}>
      <div className="jr-lead-body">
        <p className="jr-kicker">
          <span className="jr-flag jr-label">{t('journal.featured')}</span>
          <span className="jr-lead-cat jr-label">{tv(post.category)}</span>
        </p>
        <h2 className="jr-title">
          <Link className="jr-stretched" href={`/journal/${post.slug}`}>{tv(post.title)}</Link>
        </h2>
        <p className="jr-excerpt">{tv(post.excerpt)}</p>
        <div className="jr-foot">
          <Meta post={post} />
          <Arrow />
        </div>
      </div>
      <div className="jr-cover" aria-hidden="true">
        <span className="jr-mark jr-mark--ss" />
        <span className="jr-mark jr-mark--se" />
        <span className="jr-mark jr-mark--es" />
        <span className="jr-mark jr-mark--ee" />
        <span className="jr-cover-no">{pad(no)}</span>
        <svg className="jr-ruler" preserveAspectRatio="none">
          <defs>
            <pattern id="jr-ruler-ticks" width="60" height="12" patternUnits="userSpaceOnUse">
              <line x1="0.5" y1="0" x2="0.5" y2="12" />
              <line x1="12.5" y1="7" x2="12.5" y2="12" />
              <line x1="24.5" y1="7" x2="24.5" y2="12" />
              <line x1="36.5" y1="7" x2="36.5" y2="12" />
              <line x1="48.5" y1="7" x2="48.5" y2="12" />
            </pattern>
          </defs>
          <rect width="100%" height="12" fill="url(#jr-ruler-ticks)" />
        </svg>
      </div>
    </article>
  );
}

/* ── regular card ───────────────────────────────────────────────────── */
function PostCard({ post, no, span, hidden, lastOdd }: {
  post: JournalPost; no: number; span: Span; hidden: boolean; lastOdd: boolean;
}) {
  const { tv } = useLanguage();
  return (
    <article
      className={`jr-card jr-card--${span}${lastOdd ? ' jr-card--last-odd' : ''}`}
      data-category={post.category}
      hidden={hidden}
    >
      <div className="jr-top">
        <span className="jr-no" aria-hidden="true">{pad(no)}</span>
        <span className="jr-tag jr-label">{tv(post.category)}</span>
      </div>
      <h3 className="jr-title">
        <Link className="jr-stretched" href={`/journal/${post.slug}`}>{tv(post.title)}</Link>
      </h3>
      <p className="jr-excerpt">{tv(post.excerpt)}</p>
      <div className="jr-foot">
        <Meta post={post} />
        <Arrow />
      </div>
    </article>
  );
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function JournalPage() {
  const { t, tv, lang } = useLanguage();
  const [active, setActive] = useState<JournalFilter>('All');

  const featured = pickFeatured(posts);
  const rest = posts.filter(p => p !== featured);
  const spans = layout(rest.length);
  const shows = (p: JournalPost) => active === 'All' || p.category === active;
  const visible = (featured && shows(featured) ? 1 : 0) + rest.filter(shows).length;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── tokens (site tokens; two in-between greys from the design have none) ── */
        .jr {
          --jr-text-2: #bdb8ad;
          --jr-line-strong: #3b3933;
          --jr-label: 11px;
          --jr-meta: 12px;
          --jr-track-label: 0.14em;
          --jr-track-display: -0.01em;
          --jr-flip: 1;
          --jr-serif: var(--font-title);
          --jr-mono: var(--font-body);
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--jr-mono);
          font-size: 14px;
          line-height: 1.6;
          min-height: 100vh;
          padding: clamp(96px, 12vh, 140px) 0 clamp(32px, 4vh, 56px);
        }
        /* Arabic: mirror the arrows, no letter-spacing (it breaks letter joining), Arabic glyphs from the site's Kufi */
        .jr[dir="rtl"] {
          --jr-flip: -1;
          --jr-track-label: 0;
          --jr-track-display: 0;
          --jr-serif: 'DM Serif Display', 'Noto Kufi Arabic', Georgia, serif;
          --jr-mono: 'IBM Plex Mono', 'Noto Kufi Arabic', 'Courier New', monospace;
        }
        /* the site sets the body font on text elements directly: give them the stack with the Arabic fallback */
        .jr[dir="rtl"] :is(p, button, time, span:not(.jr-no):not(.jr-cover-no)) { font-family: var(--jr-mono); }
        .jr [hidden] { display: none !important; }
        .jr-wrap { max-width: 1520px; margin-inline: auto; padding-inline: clamp(16px, 3vw, 40px); }
        .jr-label { font-size: var(--jr-label); letter-spacing: var(--jr-track-label); text-transform: uppercase; line-height: 1.4; }

        /* ── hero ── */
        .jr-hero { padding-block: clamp(24px, 4vh, 56px) clamp(48px, 6vh, 64px); }
        .jr-eyebrow { display: flex; align-items: center; gap: 12px; color: var(--color-accent); margin: 0; }
        .jr-eyebrow::before { content: ''; width: 24px; height: 1px; background: var(--color-accent); }
        .jr-h1 {
          margin: 28px 0 0; max-width: 12ch;
          font-family: var(--jr-serif); font-weight: 400;
          font-size: clamp(52px, 7vw, 104px); line-height: .95; letter-spacing: var(--jr-track-display);
          color: var(--color-text-primary);
        }
        .jr-intro { margin: 36px 0 0; max-width: 44ch; font-size: 15px; line-height: 1.65; color: var(--color-text-secondary); }

        /* ── filter ── */
        .jr-filter { border-top: 1px solid var(--color-border); }
        .jr-filter-scroll { overflow-x: auto; scrollbar-width: none; overscroll-behavior-x: contain; }
        .jr-filter-scroll::-webkit-scrollbar { display: none; }
        .jr-filter-list {
          display: flex; gap: clamp(24px, 3vw, 44px);
          width: max-content; min-width: 100%;
          margin: 0; padding: 0; list-style: none;
          border-bottom: 1px solid var(--color-border);
        }
        .jr-f {
          position: relative; display: inline-flex; align-items: baseline; gap: 6px;
          min-height: 52px; padding: 18px 0; white-space: nowrap;
          background: none; border: 0; cursor: pointer;
          font-family: var(--jr-mono); color: var(--color-text-secondary);
        }
        .jr-f-count { font-size: 10px; letter-spacing: 0; font-variant-numeric: tabular-nums; color: var(--color-text-secondary); }
        .jr-f[aria-pressed="true"] { color: var(--color-accent); }
        .jr-f[aria-pressed="true"]::after {
          content: ''; position: absolute; inset-inline: 0; bottom: -1px; height: 1px; background: var(--color-accent);
        }
        .jr-f:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 4px; }

        /* ── grid ── */
        .jr-grid {
          display: grid; grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 16px; padding-block: 64px 96px;
        }
        .jr-empty { grid-column: 1 / -1; padding: 80px 0; text-align: center; font-size: 13px; color: var(--color-text-meta); }

        /* ── card ── */
        .jr-card {
          position: relative; display: flex; flex-direction: column; gap: 18px; min-width: 0;
          padding: clamp(24px, 2.4vw, 36px);
          border: 1px solid var(--color-border);
          transition: border-color .15s ease;
        }
        /* the one hover effect: the hairline turns copper */
        .jr-card:hover, .jr-card:focus-within { border-color: var(--color-accent); }
        .jr-card--wide   { grid-column: span 7; }
        .jr-card--narrow { grid-column: span 5; }
        .jr-card--third  { grid-column: span 4; }
        .jr-card--half   { grid-column: span 6; }
        .jr-card--full   { grid-column: 1 / -1; }
        /* while a category is selected: an even two-up grid */
        .jr-grid:not([data-filter="All"]) .jr-card:not(.jr-card--lead) { grid-column: span 6; }

        .jr-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .jr .jr-no { font-family: var(--jr-serif); font-size: 28px; line-height: 1; color: var(--color-accent); direction: ltr; }
        .jr-tag {
          display: inline-block; padding: 4px 8px; white-space: nowrap;
          border: 1px solid var(--jr-line-strong); color: var(--color-accent);
        }
        .jr-title {
          margin: 0; font-family: var(--jr-serif); font-weight: 400;
          font-size: 26px; line-height: 1.15; letter-spacing: var(--jr-track-display);
          text-wrap: balance; overflow-wrap: break-word; color: var(--color-text-primary);
        }
        /* the site gives every link the body font: the title link keeps the title's */
        .jr-title a { color: inherit; text-decoration: none; font: inherit; letter-spacing: inherit; }
        .jr-card--wide .jr-title, .jr-card--full .jr-title { font-size: clamp(28px, 2.4vw, 36px); }
        .jr-excerpt {
          margin: 0; max-width: 52ch; font-size: 13px; line-height: 1.65; color: var(--color-text-secondary);
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
        }
        .jr-foot {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          margin-top: auto; padding-top: 16px; border-top: 1px solid var(--color-border);
        }
        .jr-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; font-size: var(--jr-meta); }
        .jr-meta-sep { width: 1px; height: 12px; background: var(--jr-line-strong); }
        .jr .jr-date { direction: ltr; unicode-bidi: isolate; color: var(--color-text-secondary); font-variant-numeric: tabular-nums; }
        .jr-read { color: var(--jr-text-2); }
        .jr-arrow {
          display: inline-block; flex: none; width: 18px; height: 10px;
          fill: none; stroke: var(--color-accent); stroke-width: 1;
          transform: scaleX(var(--jr-flip));
        }
        /* the whole card opens the post, through its title link */
        .jr-stretched::after { content: ''; position: absolute; inset: 0; }
        .jr-stretched:focus-visible { outline: none; }
        .jr-stretched:focus-visible::after { outline: 1px solid var(--color-accent); outline-offset: -1px; }

        /* ── featured card ── */
        .jr-card--lead {
          grid-column: 1 / -1; display: grid;
          grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 0; padding: 0;
        }
        .jr-lead-body { display: flex; flex-direction: column; gap: 22px; padding: clamp(28px, 4vw, 56px); }
        .jr-kicker { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 16px; margin: 0; }
        .jr-flag { display: inline-block; padding: 4px 8px; border: 1px solid var(--color-accent); color: var(--color-accent); }
        .jr-lead-cat { color: var(--jr-text-2); }
        .jr-card--lead .jr-title { font-size: clamp(36px, 3.6vw, 56px); line-height: 1.04; }
        .jr-card--lead .jr-excerpt { font-size: 15px; color: var(--jr-text-2); max-width: 46ch; -webkit-line-clamp: 4; }

        /* typographic cover: crop marks, outlined numeral, ruler */
        .jr-cover {
          position: relative; display: grid; place-items: center;
          min-height: clamp(240px, 30vw, 420px);
          border-inline-start: 1px solid var(--color-border);
          overflow: hidden; color: var(--color-accent);
        }
        .jr .jr-cover-no {
          font-family: var(--font-title); font-size: clamp(128px, 17vw, 240px);
          line-height: .8; padding-bottom: .08em; color: var(--color-accent); direction: ltr;
        }
        @supports (-webkit-text-stroke: 1px black) {
          .jr .jr-cover-no { color: transparent; -webkit-text-stroke: 1px var(--color-accent); }
        }
        .jr-mark { position: absolute; width: 16px; height: 16px; border: 0 solid var(--color-accent); }
        .jr-mark--ss { top: 20px; inset-inline-start: 20px; border-top-width: 1px; border-inline-start-width: 1px; }
        .jr-mark--se { top: 20px; inset-inline-end: 20px; border-top-width: 1px; border-inline-end-width: 1px; }
        .jr-mark--es { bottom: 20px; inset-inline-start: 20px; border-bottom-width: 1px; border-inline-start-width: 1px; }
        .jr-mark--ee { bottom: 20px; inset-inline-end: 20px; border-bottom-width: 1px; border-inline-end-width: 1px; }
        .jr-ruler {
          position: absolute; inset-inline: 56px; bottom: 44px;
          width: calc(100% - 112px); height: 12px; color: var(--jr-line-strong);
        }
        .jr-ruler line { stroke: currentColor; stroke-width: 1; }

        /* ── bottom strip (as before) ── */
        .jr-strip {
          display: flex; align-items: stretch; border-top: 1px solid var(--color-line);
          font-size: 10px; letter-spacing: var(--jr-track-label); text-transform: uppercase; color: var(--color-text-meta);
        }
        .jr-strip > span {
          display: flex; align-items: center;
          padding: 14px clamp(14px, 2.5vw, 36px);
          border-inline-end: 1px solid var(--color-line); white-space: nowrap;
        }
        .jr-strip > span:first-child { padding-inline-start: 0; }
        .jr-strip-fill { flex: 1; border-inline-end: none !important; }

        @media (prefers-reduced-motion: reduce) { .jr-card { transition: none; } }

        /* ── tablet: two-up; an odd last card spans the row ── */
        @media (max-width: 1079px) {
          .jr-grid { padding-block: 48px 72px; }
          .jr-card--wide, .jr-card--narrow, .jr-card--third, .jr-card--half, .jr-card--full { grid-column: span 6; }
          .jr-grid[data-filter="All"] .jr-card--last-odd { grid-column: 1 / -1; }
        }

        /* ── phone: one column, the featured numeral on top ── */
        @media (max-width: 699px) {
          .jr-hero { padding-block: 24px 48px; }
          .jr-intro { margin-top: 28px; }
          .jr-grid { grid-template-columns: minmax(0, 1fr); padding-block: 40px 56px; }
          .jr-grid .jr-card,
          .jr-grid[data-filter="All"] .jr-card--last-odd,
          .jr-grid:not([data-filter="All"]) .jr-card:not(.jr-card--lead) { grid-column: 1 / -1; }
          .jr-card--lead { grid-template-columns: minmax(0, 1fr); }
          .jr-cover { order: -1; min-height: 200px; border-inline-start: 0; border-bottom: 1px solid var(--color-border); }
          .jr .jr-cover-no { font-size: 120px; }
          .jr-ruler { bottom: 28px; inset-inline: 40px; width: calc(100% - 80px); }
        }
      ` }} />

      <div className="jr" dir={lang === 'AR' ? 'rtl' : 'ltr'}>
        <div className="jr-wrap">
          <section className="jr-hero">
            <p className="jr-eyebrow jr-label">{t('journal.eyebrow')}</p>
            <h1 className="jr-h1">{t('journal.title')}</h1>
            <p className="jr-intro">{t('journal.desc')}</p>
          </section>

          <nav className="jr-filter" aria-label="Filter articles by category">
            <div className="jr-filter-scroll">
              <ul className="jr-filter-list">
                {JOURNAL_FILTERS.map(f => {
                  const n = f === 'All' ? posts.length : posts.filter(p => p.category === f).length;
                  return (
                    <li key={f}>
                      <button
                        type="button"
                        className="jr-f jr-label"
                        aria-pressed={active === f}
                        onClick={() => setActive(f)}
                      >
                        {f === 'All' ? t('common.all') : tv(f)}
                        <span className="jr-f-count">{pad(n)}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <section className="jr-grid" data-filter={active} aria-label={t('journal.eyebrow')}>
            {featured && <LeadCard post={featured} no={1} hidden={!shows(featured)} />}
            {rest.map((p, i) => (
              <PostCard
                key={p.slug}
                post={p}
                no={i + 2}
                span={spans[i]}
                hidden={!shows(p)}
                lastOdd={rest.length % 2 === 1 && i === rest.length - 1}
              />
            ))}
            {visible === 0 && <p className="jr-empty">{t('common.noProjects')}</p>}
          </section>

          <div className="jr-strip" aria-hidden="true">
            <span>AMD NSRI</span>
            <span>{t('journal.eyebrow')}</span>
            <span>{t('common.est2026')}</span>
            <span className="jr-strip-fill" />
          </div>
        </div>
      </div>
    </>
  );
}
