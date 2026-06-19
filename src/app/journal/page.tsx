'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import posts, {
  JOURNAL_FILTERS,
  type JournalPost,
  type JournalFilter,
} from '@/data/journal-posts';

/* ── small card ─────────────────────────────────────────────────────── */
function PostCard({ post }: { post: JournalPost }) {
  const { t, tv } = useLanguage();

  return (
    <Link href={`/journal/${post.slug}`} className="jc" aria-label={`${post.title} — read article`}>
      <span className="jc-top">
        <span className="jc-date">{post.year} · {post.month}</span>
        <span className="jc-cat">{tv(post.category)}</span>
      </span>

      <span className="jc-body">
        <span className="jc-title">{tv(post.title)}</span>
        <span className="jc-excerpt">{tv(post.excerpt)}</span>
      </span>

      <span className="jc-foot">
        <span className="jc-read">— {post.readingMins} {t('journal.minRead')}</span>
        <span className="jc-arrow" aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

/* ── featured banner ────────────────────────────────────────────────── */
function FeaturedCard({ post }: { post: JournalPost }) {
  const { t, tv } = useLanguage();

  return (
    <Link href={`/journal/${post.slug}`} className="jf" aria-label={`${post.title} — read featured article`}>
      <span className="jf-text">
        <span className="jf-top">
          <span className="jf-flag">{t('journal.featured')}</span>
          <span className="jf-date">{post.year} · {post.month}</span>
          <span className="jf-cat">{tv(post.category)}</span>
        </span>

        <span className="jf-title">{tv(post.title)}</span>
        <span className="jf-excerpt">{tv(post.excerpt)}</span>

        <span className="jf-foot">
          <span className="jf-read">— {post.readingMins} {t('journal.minRead')}</span>
          <span className="jf-arrow" aria-hidden="true">→</span>
        </span>
      </span>

      <span className="jf-media" aria-hidden="true">
        <span className="jf-diamond">◆</span>
      </span>
    </Link>
  );
}

/* ── page ───────────────────────────────────────────────────────────── */
export default function JournalPage() {
  const { t, tv } = useLanguage();
  const [active, setActive] = useState<JournalFilter>('All');

  const featured = posts.find(p => p.featured);
  const showFeatured = active === 'All' && Boolean(featured);
  const gridPosts = active === 'All'
    ? posts.filter(p => !p.featured)
    : posts.filter(p => p.category === active);

  return (
    <>
      <style>{`
        /* ── page ──────────────────────────────────────────────── */
        .jp {
          background: var(--color-bg);
          color: var(--color-text-primary);
          font-family: var(--font-body);
          padding: clamp(96px, 12vh, 140px) 24px clamp(32px, 4vh, 56px);
          min-height: 100vh;
        }
        .jp-rule { height: 1px; background: var(--color-border); margin-bottom: clamp(40px,6vh,72px); }
        .jp-eyebrow {
          display: flex; align-items: center; gap: 12px;
          font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--color-accent); margin-bottom: 28px;
        }
        .jp-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px; background: var(--color-accent); opacity: .7;
        }
        .jp-title {
          font-family: var(--font-title);
          font-size: clamp(48px,8vw,116px);
          letter-spacing: -0.03em; line-height: .98;
          color: var(--color-text-primary); margin: 0 0 28px; max-width: 14ch;
        }
        .jp-desc {
          font-size: clamp(14px,1.4vw,17px); font-weight: 300;
          letter-spacing: .02em; line-height: 1.7;
          color: var(--color-text-secondary); max-width: 58ch;
          margin: 0 0 clamp(40px,6vh,64px);
        }

        /* ── filters ───────────────────────────────────────────── */
        .jp-filters {
          display: flex; align-items: center; gap: clamp(20px,3vw,44px);
          flex-wrap: wrap;
          border-top: 1px solid var(--color-line);
          border-bottom: 1px solid var(--color-line);
          padding: 22px 0; margin-bottom: clamp(48px,7vh,80px);
        }
        .jp-f {
          background: none; border: none; cursor: pointer;
          font-family: var(--font-body); font-size: 12px;
          letter-spacing: .16em; text-transform: uppercase;
          color: rgba(255,255,255,.35); padding: 0;
          transition: color 300ms ease;
        }
        .jp-f:hover { color: rgba(255,255,255,.7); }
        .jp-f.on   { color: var(--color-accent); }
        .jp-f:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 6px; }
        .jp-fn { font-size: 9px; color: var(--color-text-meta); margin-left: 6px; }
        .jp-f.on .jp-fn { color: var(--color-accent-dim); }

        /* ── featured ──────────────────────────────────────────── */
        .jf {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          min-height: 340px;
          border: 1px solid var(--color-border);
          text-decoration: none;
          margin-bottom: clamp(40px, 6vh, 64px);
          overflow: hidden;
          transition: border-color 400ms cubic-bezier(.16,1,.3,1), transform 400ms cubic-bezier(.16,1,.3,1);
        }
        .jf:hover { border-color: var(--color-accent); transform: translateY(-3px); }
        .jf:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }
        .jf-text {
          display: flex; flex-direction: column;
          padding: clamp(32px, 4vw, 56px);
        }
        .jf-top {
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
          margin-bottom: clamp(24px, 3vw, 40px);
        }
        .jf-flag {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .2em; text-transform: uppercase;
          color: var(--color-accent);
          border: 1px solid rgba(184,149,106,.38); padding: 5px 11px;
        }
        .jf-date {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .12em; color: var(--color-text-meta);
        }
        .jf-cat {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .16em; text-transform: uppercase; color: var(--color-text-secondary);
        }
        .jf-title {
          font-family: var(--font-title); font-weight: 400;
          font-size: clamp(26px, 3.4vw, 32px);
          letter-spacing: -.02em; line-height: 1.12;
          color: var(--color-text-primary); margin: 0 0 18px; max-width: 20ch;
        }
        .jf:hover .jf-title { color: #fff; }
        .jf-excerpt {
          font-family: var(--font-body); font-size: 13px; font-weight: 300;
          letter-spacing: .01em; line-height: 1.75;
          color: var(--color-text-secondary); margin: 0; max-width: 46ch;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .jf-foot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: auto; padding-top: clamp(28px, 3vw, 40px);
        }
        .jf-read { font-family: var(--font-body); font-size: 12px; letter-spacing: .04em; color: var(--color-accent); }
        .jf-arrow {
          font-family: var(--font-body); font-size: 22px; line-height: 1; color: var(--color-accent);
          transition: transform 400ms cubic-bezier(.16,1,.3,1);
        }
        .jf:hover .jf-arrow { transform: translateX(6px); }
        .jf-media {
          position: relative;
          border-left: 1px solid var(--color-border);
          background: var(--color-surface);
          overflow: hidden;
        }
        .jf-diamond {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          font-size: 110px; line-height: 1;
          color: rgba(184,149,106,0.08);
          pointer-events: none; user-select: none;
        }

        /* ── grid ──────────────────────────────────────────────── */
        .jp-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          align-content: start;
        }
        .jp-empty {
          grid-column: 1/-1; padding: 80px 0; text-align: center;
          font-size: 13px; letter-spacing: .08em; color: var(--color-text-meta);
        }

        /* ── card ──────────────────────────────────────────────── */
        .jc {
          display: flex; flex-direction: column;
          min-height: 230px;
          padding: clamp(28px, 3vw, 40px);
          background: var(--color-bg);
          border: 1px solid var(--color-border);
          text-decoration: none;
          transition: border-color 400ms cubic-bezier(.16,1,.3,1), transform 400ms cubic-bezier(.16,1,.3,1);
        }
        .jc:hover { border-color: var(--color-accent); transform: translateY(-3px); }
        .jc:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }
        .jc-top {
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: clamp(22px, 2.6vw, 32px);
        }
        .jc-date {
          font-family: var(--font-body); font-size: 11px;
          letter-spacing: .12em; color: var(--color-text-meta);
        }
        .jc-cat {
          font-family: var(--font-body); font-size: 10px;
          letter-spacing: .16em; text-transform: uppercase; color: var(--color-accent);
          border: 1px solid rgba(184,149,106,.3); padding: 4px 10px; white-space: nowrap;
        }
        .jc-body { flex: 1; display: flex; flex-direction: column; gap: 12px; }
        .jc-title {
          font-family: var(--font-title); font-weight: 400;
          font-size: 20px;
          letter-spacing: -.01em; line-height: 1.18;
          color: var(--color-text-primary); margin: 0; max-width: 22ch;
        }
        .jc:hover .jc-title { color: #fff; }
        .jc-excerpt {
          font-family: var(--font-body); font-size: 12px; font-weight: 300;
          letter-spacing: .01em; line-height: 1.7;
          color: var(--color-text-secondary); margin: 0; max-width: 40ch;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .jc-foot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: clamp(22px, 2.6vw, 32px);
        }
        .jc-read { font-family: var(--font-body); font-size: 11px; letter-spacing: .04em; color: var(--color-accent); }
        .jc-arrow {
          font-family: var(--font-body); font-size: 19px; line-height: 1; color: var(--color-accent);
          transition: transform 400ms cubic-bezier(.16,1,.3,1);
        }
        .jc:hover .jc-arrow { transform: translateX(5px); }

        /* ── bottom strip ──────────────────────────────────────── */
        .jp-strip {
          display: flex; align-items: stretch;
          border-top: 1px solid var(--color-line);
          margin-top: clamp(56px,8vh,96px);
          font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--color-text-meta);
        }
        .jp-strip > span {
          display: flex; align-items: center;
          padding: 14px clamp(14px,2.5vw,36px);
          border-right: 1px solid var(--color-line); white-space: nowrap;
        }
        .jp-strip > span:first-child { padding-left: 0; }
        .jp-strip-fill { flex: 1; border-right: none !important; }

        /* ── reduced motion ────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .jf, .jc, .jf-arrow, .jc-arrow, .jp-f { transition: none !important; }
          .jf:hover, .jc:hover { transform: none; }
          .jf:hover .jf-arrow, .jc:hover .jc-arrow { transform: none; }
        }

        /* ── responsive ────────────────────────────────────────── */
        @media (max-width: 860px) {
          .jf { grid-template-columns: 1fr; min-height: 0; }
          .jf-media { display: none; }
        }
        @media (max-width: 767px) {
          .jp-grid { grid-template-columns: 1fr; gap: 16px; }
          .jc { min-height: 0; }
        }
      `}</style>

      <div className="jp">
        <div className="jp-rule" />

        <p className="jp-eyebrow">{t('journal.eyebrow')}</p>
        <h1 className="jp-title">{t('journal.title')}</h1>
        <p className="jp-desc">{t('journal.desc')}</p>

        <div className="jp-filters" role="group" aria-label="Filter articles by category">
          {JOURNAL_FILTERS.map(f => {
            const n = f === 'All'
              ? posts.length
              : posts.filter(p => p.category === f).length;
            return (
              <button
                key={f}
                aria-pressed={active === f}
                className={`jp-f${active === f ? ' on' : ''}`}
                onClick={() => setActive(f)}
              >
                {f === 'All' ? t('common.all') : tv(f)}
                <span className="jp-fn">{String(n).padStart(2, '0')}</span>
              </button>
            );
          })}
        </div>

        {showFeatured && featured && <FeaturedCard post={featured} />}

        <div className="jp-grid">
          {gridPosts.length === 0
            ? <p className="jp-empty">{t('common.noProjects')}</p>
            : gridPosts.map(p => <PostCard key={p.slug} post={p} />)}
        </div>

        <div className="jp-strip" aria-hidden="true">
          <span>AMD NSRI</span>
          <span>{t('journal.eyebrow')}</span>
          <span>{t('common.est2026')}</span>
          <span className="jp-strip-fill" />
        </div>
      </div>
    </>
  );
}
