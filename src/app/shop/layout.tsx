import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  name: 'Shop',
  path: '/shop',
  description:
    'Digital tools and resources — downloadable definitions, components, and computational design products.',
});

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
