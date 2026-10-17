import type { Metadata } from 'next';

/**
 * Central SEO config + a small helper that builds a per-page `Metadata`
 * object (title, description, Open Graph, Twitter) in one consistent shape.
 *
 * The document <title> is left as a bare string so the root layout's title
 * template ("%s — AMD NSRI") is applied automatically. Open Graph / Twitter
 * titles do NOT inherit that template, so we set the full "Name — AMD NSRI"
 * string on them explicitly.
 */
export const SITE_NAME = 'AMD NSRI';
// The site's first address (amd-nsri-portfolio-alpha.vercel.app) is redirected here in next.config.mjs.
export const SITE_URL = 'https://amdnsri.com';
/** Link previews and search engines read the pages in English (TR and AR are switched in the browser). */
export const OG_LOCALE = 'en_US';

export interface PageMetaOptions {
  /** Page name used in the title, e.g. "Architecture" → "Architecture — AMD NSRI". */
  name: string;
  /** Route path beginning with a slash, e.g. "/architecture". */
  path: string;
  /** One-line page description for search + social previews. */
  description: string;
  /**
   * Absolute title that bypasses the root title template. Used for the home
   * page so it doesn't render as "AMD NSRI — AMD NSRI".
   */
  absoluteTitle?: string;
  /** Link-preview image (path under public/, ideally 1200×630). Without it the site's default preview is used. */
  image?: { url: string; width: number; height: number; alt: string };
}

export function pageMetadata({ name, path, description, absoluteTitle, image }: PageMetaOptions): Metadata {
  const fullTitle = absoluteTitle ?? `${name} — ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : name,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      url,
      siteName: SITE_NAME,
      locale: OG_LOCALE,
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(image ? { images: [image.url] } : {}),
    },
  };
}
