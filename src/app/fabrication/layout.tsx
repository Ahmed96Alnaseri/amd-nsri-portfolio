import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Fabrication',
  path: '/fabrication',
  description:
    'Fabrication intelligence — shop drawings, production geometry, unfolding, and panel systems carried from design to the workshop floor.',
});

export default function FabricationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
