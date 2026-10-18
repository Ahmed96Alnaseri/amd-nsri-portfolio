import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata, SITE_NAME, SITE_PREVIEW } from '@/lib/seo';
import { postsBySlug } from '@/data/journal-posts';

const postOf = (slug: string) => postsBySlug[decodeURIComponent(slug)];

/* Each post gets its own title, description and canonical URL; the link preview is the site card.
   The page itself is a client component, so this lives here. */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = postOf(params.slug);
  if (!post) return {};
  return pageMetadata({
    name: post.title,
    // the Journal layout's own title stops the root template, so the suffix is set here
    absoluteTitle: `${post.title} — ${SITE_NAME}`,
    path: `/journal/${post.slug}`,
    description: post.excerpt,
    image: SITE_PREVIEW,
  });
}

// An address that is not a post answers with the 404 page (status 404), not a 200 "missing" page.
export default function JournalPostLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  if (!postOf(params.slug)) notFound();
  return children;
}
