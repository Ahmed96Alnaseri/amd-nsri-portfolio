import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { newsletterMode, newsletterEnabled } from '@/lib/newsletter/config';
import NewsletterResult from '@/components/NewsletterResult';

/** Confirms a newsletter sign-up from the emailed link. 404 while the newsletter is off. */
export const metadata: Metadata = { title: 'Updates', robots: { index: false, follow: false } };

export default function NewsletterConfirmPage() {
  if (!newsletterEnabled()) notFound();
  return <NewsletterResult kind="confirm" preview={newsletterMode() === 'preview'} />;
}
