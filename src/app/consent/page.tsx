import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { newsletterEnabled } from '@/lib/newsletter/config';
import { toolGateEnabled } from '@/lib/tool-gate/config';
import { CONSENT } from '@/lib/consent-content';
import { GATE_CONSENT } from '@/lib/tool-gate/legal-content';
import LegalDocument from '@/components/LegalDocument';

/**
 * Explicit consent statement: never indexed. Only reachable while one of the forms that link it is on:
 *   - the email gate on the free tools (TOOL_GATE_MODE): the gate's version, src/lib/tool-gate/legal-content.ts
 *   - otherwise the newsletter (NEWSLETTER_MODE): the newsletter's version, src/lib/consent-content.ts
 * With both off it answers 404.
 */
export const metadata: Metadata = {
  title: 'Explicit consent statement',
  robots: { index: false, follow: false },
};

export default function ConsentPage() {
  if (toolGateEnabled()) return <LegalDocument content={GATE_CONSENT} />;
  if (newsletterEnabled()) return <LegalDocument content={CONSENT} />;
  notFound();
}
