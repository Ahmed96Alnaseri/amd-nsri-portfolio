import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { newsletterEnabled } from '@/lib/newsletter/config';
import { PRIVACY } from '@/lib/privacy-content';
import LegalDocument from '@/components/LegalDocument';

/**
 * DRAFT privacy notice (KVKK Art. 10), awaiting a lawyer's review: never indexed, and only reachable while the
 * newsletter is in preview or live mode (it is linked from the sign-up form). Text: src/lib/privacy-content.ts.
 */
export const metadata: Metadata = {
  title: 'Privacy notice (draft)',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  if (!newsletterEnabled()) notFound();
  return <LegalDocument content={PRIVACY} />;
}
