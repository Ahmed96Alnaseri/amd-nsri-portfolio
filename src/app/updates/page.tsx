import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo';
import { newsletterEnabled, newsletterMode } from '@/lib/newsletter/config';
import NewsletterSection from '@/components/NewsletterSection';

/** The sign-up on its own page: linked from the standalone tool pages ("Get tool updates"). 404 while the newsletter is off. */
export const metadata: Metadata = {
  ...pageMetadata({
    name: 'Updates',
    path: '/updates',
    description: 'Subscribe to AMD NSRI updates: new projects, journal articles and updates to its digital tools.',
  }),
  // only indexed once the newsletter is live
  ...(newsletterMode() === 'live' ? {} : { robots: { index: false, follow: false } }),
};

export default function UpdatesPage() {
  if (!newsletterEnabled()) notFound();
  return <NewsletterSection variant="page" />;
}
