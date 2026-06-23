import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'About',
  path: '/identity',
  description:
    'The practice of Ahmed Alnaseri — an Istanbul-based architect working across computational design, facade engineering, and fabrication intelligence.',
});

export default function IdentityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
