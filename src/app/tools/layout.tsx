import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Tools',
  path: '/tools',
  description:
    'Computational design tools — Grasshopper definitions, parametric systems, and automation for facade and fabrication workflows.',
});

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
