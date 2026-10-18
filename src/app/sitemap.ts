import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';
import { SHOP_ENABLED, DESIGN_ENABLED } from '@/lib/features';
import { PROJECTS, slugify } from '@/data/architectureProjects';
import { newsletterEnabled, newsletterMode } from '@/lib/newsletter/config';
import tools from '@/data/tools';
import posts from '@/data/journal-posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
    /** When the page last changed, if known; otherwise the build date. */
    modified?: Date;
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

  // each tool page, once the tool is out: "Coming Soon" tools stay out until they are live
  for (const tool of tools) {
    if (tool.status === 'Coming Soon') continue;
    routes.push({ path: `/tools/${tool.slug}`, changeFrequency: 'monthly', priority: 0.7 });
    // the tool itself, when it is a page of its own on this site (/ipunch.html, /nestri.html, …)
    if (tool.ctaLink?.startsWith('/') && tool.ctaLink.endsWith('.html')) {
      routes.push({ path: tool.ctaLink, changeFrequency: 'monthly', priority: 0.7 });
    }
  }

  // each journal post, dated by its publication date
  for (const post of posts) {
    routes.push({
      path: `/journal/${post.slug}`,
      changeFrequency: 'yearly',
      priority: 0.6,
      modified: new Date(`${post.year}-${post.month.padStart(2, '0')}-${post.day.padStart(2, '0')}T00:00:00Z`),
    });
  }

  return routes.map(({ path, changeFrequency, priority, modified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: modified ?? lastModified,
    changeFrequency,
    priority,
  }));
}
