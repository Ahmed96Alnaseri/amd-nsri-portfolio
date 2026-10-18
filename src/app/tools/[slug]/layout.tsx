import type { Metadata } from 'next';
import { pageMetadata, previewImage, SITE_NAME } from '@/lib/seo';
import { toolsBySlug } from '@/data/tools';

/* Each tool page gets its own title, description, canonical URL and link-preview image (scripts/og-images),
   instead of inheriting the Tools listing's. The page itself is a client component, so this lives here.
   Unknown slugs keep the parent metadata; the page answers them with the 404 page. */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = toolsBySlug[decodeURIComponent(params.slug)];
  if (!tool) return {};
  return pageMetadata({
    name: tool.name,
    // the Tools layout's own title stops the root template, so the suffix is set here
    absoluteTitle: `${tool.name} — ${SITE_NAME}`,
    // an alias slug (the contact form's "sheet-metal-unfolding") points at the tool's own address
    path: `/tools/${tool.slug}`,
    description: tool.description,
    image: previewImage(`tools/${tool.slug}`, `${tool.name} — ${tool.description}`),
  });
}

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return children;
}
