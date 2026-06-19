'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { postsBySlug } from '@/data/journal-posts';

export default function JournalArticlePage({ params }: { params: { slug: string } }) {
  const { t, tv } = useLanguage();
  const post = postsBySlug[params.slug];

  if (!post) {
    return (
      <div className="ja ja--missing">
        <p className="ja-eyebrow">{t('journal.eyebrow')}</p>
        <h1 className="ja-title">404</h1>
        <p className="ja-lede">{t('common.noProjects')}</p>
        <Link href="/journal" className="ja-back">← {t('journal.back')}</Link>
        <style>{baseCss}</style>
      </div>
    );
  }

  const related = post.related
    .map(slug => postsBySlug[slug])
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <article className="ja">
      <Link href="/journal" className="ja-back">← {t('journal.back')}</Link>

      <p className="ja-eyebrow">
        {tv(post.category)} · {post.year} · {post.month}
        <span className="ja-eyebrow-read"> — {post.readingMins} {t('journal.minRead')}</span>
      </p>

      <h1 className="ja-title">{tv(post.title)}</h1>
      <p className="ja-lede">{tv(post.excerpt)}</p>

      <div className="ja-rule" />

      <div className="ja-body">
        {post.body.map((block, i) =>
          block.type === 'h2'
            ? <h2 key={i} className="ja-h2">{tv(block.text)}</h2>
            : <p key={i} className="ja-p">{tv(block.text)}</p>
        )}
      </div>

      {related.length > 0 && (
        <section className="ja-related">
          <h2 className="ja-rel-head">{t('journal.related')}</h2>
          <div className="ja-rel-grid">
            {related.map(r => (
              <Link key={r.slug} href={`/journal/${r.slug}`} className="ja-rel">
                <span className="ja-rel-top">
                  <span className="ja-rel-date">{r.year} · {r.month}</span>
                  <span className="ja-rel-cat">{tv(r.category)}</span>
                </span>
                <span className="ja-rel-title">{tv(r.title)}</span>
                <span className="ja-rel-foot">
                  <span className="ja-rel-read">— {r.readingMins} {t('journal.minRead')}</span>
                  <span className="ja-rel-arrow" aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="ja-strip" aria-hidden="true">
        <span>AMD NSRI</span>
        <span>{t('journal.eyebrow')}</span>
        <span>{t('common.est2026')}</span>
        <span className="ja-strip-fill" />
      </div>

      <style>{baseCss}</style>
    </article>
  );
}

const baseCss = `
  .ja {
    background: var(--color-bg);
    color: var(--color-text-primary);
    font-family: var(--font-body);
    padding: clamp(96px, 12vh, 140px) clamp(24px, 6vw, 120px) clamp(32px, 4vh, 56px);
    min-height: 100vh;
  }
  .ja--missing { display: flex; flex-direction: column; gap: 18px; }

  .ja-back {
    display: inline-block;
    font-family: var(--font-body); font-size: 11px;
    letter-spacing: .18em; text-transform: uppercase;
    color: var(--color-text-secondary); text-decoration: none;
    margin-bottom: clamp(32px, 5vh, 56px);
    transition: color 300ms ease;
  }
  .ja-back:hover { color: var(--color-accent); }

  /* article header — centered reading column */
  .ja-eyebrow {
    max-width: 72ch; margin: 0 auto 22px;
    display: flex; align-items: center; flex-wrap: wrap; gap: 4px;
    font-family: var(--font-body); font-size: 11px;
    letter-spacing: 0.18em; text-transform: uppercase; color: var(--color-accent);
  }
  .ja-eyebrow-read { color: var(--color-text-meta); }
  .ja-title {
    max-width: 60ch; margin: 0 auto 24px;
    font-family: var(--font-title);
    font-size: clamp(34px, 5.4vw, 68px);
    letter-spacing: -0.03em; line-height: 1.04;
    color: var(--color-text-primary);
  }
  .ja-lede {
    max-width: 64ch; margin: 0 auto clamp(36px, 5vh, 52px);
    font-size: clamp(16px, 1.7vw, 21px); font-weight: 300;
    letter-spacing: .01em; line-height: 1.7; color: var(--color-text-secondary);
  }
  .ja-rule {
    max-width: 72ch; margin: 0 auto clamp(36px, 5vh, 52px);
    height: 1px; background: var(--color-border);
  }

  /* article body */
  .ja-body { max-width: 68ch; margin: 0 auto; }
  .ja-h2 {
    font-family: var(--font-title); font-weight: 400;
    font-size: clamp(24px, 2.8vw, 32px);
    letter-spacing: -.01em; line-height: 1.2;
    color: var(--color-text-primary);
    margin: clamp(40px, 5vh, 60px) 0 18px;
  }
  .ja-p {
    font-family: var(--font-body); font-size: clamp(15px, 1.5vw, 17px); font-weight: 300;
    letter-spacing: .01em; line-height: 1.85;
    color: var(--color-text-secondary); margin: 0 0 22px;
  }

  /* related */
  .ja-related { max-width: 72ch; margin: clamp(64px, 9vh, 110px) auto 0; }
  .ja-rel-head {
    font-family: var(--font-title); font-weight: 400;
    font-size: clamp(22px, 2.6vw, 30px);
    letter-spacing: -.01em; color: var(--color-text-primary); margin: 0 0 28px;
  }
  .ja-rel-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
  .ja-rel {
    display: flex; flex-direction: column; min-height: 160px;
    padding: clamp(22px, 2.4vw, 30px);
    border: 1px solid var(--color-border); text-decoration: none;
    transition: border-color 400ms cubic-bezier(.16,1,.3,1), transform 400ms cubic-bezier(.16,1,.3,1);
  }
  .ja-rel:hover { border-color: var(--color-accent); transform: translateY(-3px); }
  .ja-rel:focus-visible { outline: 1px solid var(--color-accent); outline-offset: 3px; }
  .ja-rel-top {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    margin-bottom: 16px;
  }
  .ja-rel-date { font-family: var(--font-body); font-size: 10px; letter-spacing: .12em; color: var(--color-text-meta); }
  .ja-rel-cat {
    font-family: var(--font-body); font-size: 9px;
    letter-spacing: .18em; text-transform: uppercase; color: var(--color-accent);
  }
  .ja-rel-title {
    font-family: var(--font-title); font-weight: 400; font-size: 18px;
    line-height: 1.18; letter-spacing: -.01em; color: var(--color-text-primary);
    margin: 0; flex: 1;
  }
  .ja-rel:hover .ja-rel-title { color: #fff; }
  .ja-rel-foot { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; }
  .ja-rel-read { font-family: var(--font-body); font-size: 10px; letter-spacing: .04em; color: var(--color-accent); }
  .ja-rel-arrow {
    font-family: var(--font-body); font-size: 16px; color: var(--color-accent);
    transition: transform 400ms cubic-bezier(.16,1,.3,1);
  }
  .ja-rel:hover .ja-rel-arrow { transform: translateX(4px); }

  /* bottom strip */
  .ja-strip {
    display: flex; align-items: stretch;
    border-top: 1px solid var(--color-line);
    margin-top: clamp(56px,8vh,96px);
    font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
    color: var(--color-text-meta);
  }
  .ja-strip > span {
    display: flex; align-items: center;
    padding: 14px clamp(14px,2.5vw,36px);
    border-right: 1px solid var(--color-line); white-space: nowrap;
  }
  .ja-strip > span:first-child { padding-left: 0; }
  .ja-strip-fill { flex: 1; border-right: none !important; }

  @media (prefers-reduced-motion: reduce) {
    .ja-back, .ja-rel, .ja-rel-arrow { transition: none !important; }
    .ja-rel:hover { transform: none; }
    .ja-rel:hover .ja-rel-arrow { transform: none; }
  }
  @media (max-width: 680px) {
    .ja-rel-grid { grid-template-columns: 1fr; }
  }
`;
