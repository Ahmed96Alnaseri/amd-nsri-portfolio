import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Journal',
  path: '/journal',
  description:
    'Articles and process notes on computational design, facade engineering, and fabrication intelligence.',
});

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
