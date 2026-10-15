import { createHash, createHmac, randomBytes, timingSafeEqual } from 'crypto';

/** A random confirmation token for the email link. Only its SHA-256 is stored. */
export const newToken = () => randomBytes(32).toString('base64url');

export const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

const hmac = (secret: string, value: string) => createHmac('sha256', secret).update(value).digest('base64url');

/** Signature of an unsubscribe link: proves the link came from us without any login. */
export const unsubscribeSignature = (secret: string, id: string) => hmac(secret, `unsubscribe:${id}`);

export function validUnsubscribeSignature(secret: string, id: string, sig: string): boolean {
  const expected = Buffer.from(unsubscribeSignature(secret, id));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Key of a rate-limit counter: a keyed one-way hash, so neither the IP address nor the email is stored. */
export const rateLimitKey = (secret: string, kind: 'ip' | 'email', value: string) =>
  `${kind}:${hmac(secret, `rate:${kind}:${value}`).slice(0, 32)}`;

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
