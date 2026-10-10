import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { SHOP_ENABLED } from '@/lib/features';

// While the Shop is parked (src/lib/features.ts) it has no search metadata and every /shop URL is a 404.
export const metadata: Metadata = SHOP_ENABLED
  ? pageMetadata({
      name: 'Shop',
      path: '/shop',
      description:
        'Digital tools and resources — downloadable definitions, components, and computational design products.',
    })
  : {};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  if (!SHOP_ENABLED) notFound();
  return children;
}
