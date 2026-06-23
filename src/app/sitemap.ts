import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }[] = [
    { path: '/',             changeFrequency: 'monthly', priority: 1 },
    { path: '/architecture', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/design',       changeFrequency: 'monthly', priority: 0.8 },
    { path: '/fabrication',  changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tools',        changeFrequency: 'monthly', priority: 0.8 },
    { path: '/shop',         changeFrequency: 'weekly',  priority: 0.7 },
    { path: '/journal',      changeFrequency: 'weekly',  priority: 0.7 },
    { path: '/identity',     changeFrequency: 'yearly',  priority: 0.6 },
    { path: '/contact',      changeFrequency: 'yearly',  priority: 0.5 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
