import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { SHOP_ENABLED, DESIGN_ENABLED } from '@/lib/features';
import { PROJECTS, slugify } from '@/data/architectureProjects';
import { newsletterEnabled, newsletterMode } from '@/lib/newsletter/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }[] = [
    { path: '/',             changeFrequency: 'monthly', priority: 1 },
    { path: '/architecture', changeFrequency: 'monthly', priority: 0.9 },
    // the Design section is parked for now (src/lib/features.ts)
    ...(DESIGN_ENABLED ? [{ path: '/design', changeFrequency: 'monthly' as const, priority: 0.8 }] : []),
    { path: '/fabrication',  changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tools',        changeFrequency: 'monthly', priority: 0.8 },
    { path: '/catalogue',    changeFrequency: 'monthly', priority: 0.7 },
    // the Shop is parked for now (src/lib/features.ts)
    ...(SHOP_ENABLED ? [{ path: '/shop', changeFrequency: 'weekly' as const, priority: 0.7 }] : []),
    { path: '/journal',      changeFrequency: 'weekly',  priority: 0.7 },
    { path: '/identity',     changeFrequency: 'yearly',  priority: 0.6 },
    { path: '/contact',      changeFrequency: 'yearly',  priority: 0.5 },
    // the newsletter page, once it is live (src/lib/newsletter/config.ts)
    ...(newsletterMode() === 'live' && newsletterEnabled() ? [{ path: '/updates', changeFrequency: 'yearly' as const, priority: 0.4 }] : []),
  ];

  // each project in the Architecture listing has its own page
  for (const p of PROJECTS) {
    routes.push({ path: `/architecture/${p.slug ?? slugify(p.title)}`, changeFrequency: 'yearly', priority: 0.6 });
  }

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
