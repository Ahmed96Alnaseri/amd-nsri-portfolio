import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { newsletterMode, newsletterUnsubscribeAvailable } from '@/lib/newsletter/config';
import NewsletterResult from '@/components/NewsletterResult';

/** Unsubscribes from the emailed link. Keeps working after the newsletter is switched off, while a database is configured. */
export const metadata: Metadata = { title: 'Updates', robots: { index: false, follow: false } };

export default function NewsletterUnsubscribePage() {
  if (!newsletterUnsubscribeAvailable()) notFound();
  return <NewsletterResult kind="unsubscribe" preview={newsletterMode() === 'preview'} />;
}
