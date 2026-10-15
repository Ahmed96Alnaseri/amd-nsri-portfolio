import { newsletterConfig, newsletterEnabled } from '@/lib/newsletter/config';
import NewsletterForm from './NewsletterForm';

/**
 * The newsletter sign-up, used on the homepage above the footer and on /updates. Renders nothing while
 * NEWSLETTER_MODE is off or not fully configured (src/lib/newsletter/config.ts), so the form is not in the page at all.
 */
export default function NewsletterSection({ variant = 'section' }: { variant?: 'section' | 'page' }) {
  if (!newsletterEnabled()) return null;
  return <NewsletterForm variant={variant} preview={newsletterConfig().mode === 'preview'} />;
}
