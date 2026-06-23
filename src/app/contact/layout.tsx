import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Contact',
  path: '/contact',
  description:
    'Start a collaboration with AMD NSRI — computational design, facade engineering, and fabrication inquiries. Based in Istanbul.',
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
