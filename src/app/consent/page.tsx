import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { newsletterEnabled } from '@/lib/newsletter/config';
import { CONSENT } from '@/lib/consent-content';
import LegalDocument from '@/components/LegalDocument';

/**
 * DRAFT explicit consent statement for the newsletter, linked from the sign-up checkbox: never indexed, and only
 * reachable while the newsletter is in preview or live mode. Text: src/lib/consent-content.ts.
 */
export const metadata: Metadata = {
  title: 'Explicit consent statement (draft)',
  robots: { index: false, follow: false },
};

export default function ConsentPage() {
  if (!newsletterEnabled()) notFound();
  return <LegalDocument content={CONSENT} />;
}
