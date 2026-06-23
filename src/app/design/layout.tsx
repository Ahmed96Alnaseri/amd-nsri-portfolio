import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Design',
  path: '/design',
  description:
    'Experimental design and objects — parametric studies, facade explorations, and material-driven design pieces.',
});

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
