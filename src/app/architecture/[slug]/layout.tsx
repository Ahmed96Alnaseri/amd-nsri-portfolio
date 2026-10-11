import type { Metadata } from 'next';
import { pageMetadata, SITE_NAME } from '@/lib/seo';
import { PROJECTS, slugify } from '@/data/architectureProjects';

/* Each project page gets its own title, description, canonical URL and (when set) link-preview image,
   instead of inheriting the Architecture listing's. Slugs not in the listing keep the parent metadata. */
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const slug = decodeURIComponent(params.slug);
  const project = PROJECTS.find(p => (p.slug ?? slugify(p.title)) === slug);
  if (!project) return {};
  return pageMetadata({
    name: project.title,
    // the Architecture layout's own title stops the root template, so the suffix is set here
    absoluteTitle: `${project.title} — ${SITE_NAME}`,
    path: `/architecture/${project.slug ?? slugify(project.title)}`,
    description: project.summary ?? `${project.type} — ${project.location}, ${project.year}.`,
    image: project.ogImage
      ? { url: project.ogImage, width: 1200, height: 630, alt: project.images[0]?.alt ?? project.title }
      : undefined,
  });
}

export default function ArchitectureProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
