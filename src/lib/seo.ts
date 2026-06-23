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
export const SITE_URL = 'https://amd-nsri-portfolio-alpha.vercel.app';

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
}

export function pageMetadata({ name, path, description, absoluteTitle }: PageMetaOptions): Metadata {
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
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
