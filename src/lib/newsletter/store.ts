import type { Lang } from '@/lib/translations';

export interface SubscriptionInput {
  /** Trimmed, lower-case address. */
  email: string;
  name: string | null;
  /** Language the form was shown in; the confirmation email uses it too. */
  lang: Lang;
  /** Page path without query string, e.g. "/" or "/nestri.html". */
  source: string;
  consentVersion: string;
  /** SHA-256 of the emailed token. */
  tokenHash: string;
  expiresAt: Date;
}

export type ConfirmResult =
  | { status: 'confirmed'; id: string; lang: Lang }
  | { status: 'expired' | 'invalid' };

/**
 * Where subscribers live. Postgres (store-postgres.ts) in live mode; preview mode uses Postgres when a database
 * is configured for that environment, otherwise the in-memory store (store-memory.ts).
 *
 * One record per address: status pending → confirmed → unsubscribed, and back to pending on a fresh sign-up.
 * An unsubscribed address is also kept on a suppression list (SHA-256 of the address only), which survives the
 * record being deleted, so the address is never added back without a new confirmation.
 */
export interface NewsletterStore {
  /**
   * Starts (or restarts) a pending sign-up and returns its id, or null when the address is already confirmed:
   * then nothing is stored and no email goes out, but the visitor gets the same answer.
   */
  beginSubscription(input: SubscriptionInput): Promise<{ id: string } | null>;
  /** Confirms the sign-up the token belongs to. Each token works once and only until it expires. */
  confirm(tokenHash: string): Promise<ConfirmResult>;
  /** Unsubscribes a confirmed subscriber and suppresses the address. Repeating it is harmless. */
  unsubscribe(id: string): Promise<void>;
  /** Counts one hit on a rate-limit key within a fixed window and returns the count so far. */
  hit(key: string, windowSeconds: number): Promise<number>;
  /** Deletes expired unconfirmed sign-ups and old rate-limit counters. */
  cleanup(): Promise<{ expiredSignups: number; rateCounters: number }>;
}
