import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { DESIGN_ENABLED } from '@/lib/features';

// While the Design section is parked (src/lib/features.ts) it has no search metadata and /design is a 404.
export const metadata: Metadata = DESIGN_ENABLED
  ? pageMetadata({
      name: 'Design',
      path: '/design',
      description:
        'Experimental design and objects — parametric studies, facade explorations, and material-driven design pieces.',
    })
  : {};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  if (!DESIGN_ENABLED) notFound();
  return children;
}
