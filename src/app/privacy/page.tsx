import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { newsletterEnabled } from '@/lib/newsletter/config';
import { toolGateEnabled } from '@/lib/tool-gate/config';
import { PRIVACY } from '@/lib/privacy-content';
import { GATE_PRIVACY } from '@/lib/tool-gate/legal-content';
import LegalDocument from '@/components/LegalDocument';

/**
 * Privacy notice (KVKK Art. 10): never indexed. Only reachable while one of the forms that link it is on:
 *   - the email gate on the free tools (TOOL_GATE_MODE): the gate's version, src/lib/tool-gate/legal-content.ts
 *   - otherwise the newsletter (NEWSLETTER_MODE): the newsletter's version, src/lib/privacy-content.ts
 * With both off it answers 404.
 */
export const metadata: Metadata = {
  title: 'Privacy notice',
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  if (toolGateEnabled()) return <LegalDocument content={GATE_PRIVACY} />;
  if (newsletterEnabled()) return <LegalDocument content={PRIVACY} />;
  notFound();
}
