import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Architecture',
  path: '/architecture',
  description:
    'Architectural projects and spatial concepts — facade systems and computational design carried from concept to built reality.',
});

export default function ArchitectureLayout({ children }: { children: React.ReactNode }) {
  return children;
}
