import { createHmac } from 'crypto';

/*
 * The removed list: addresses whose owners asked to stop emails, so the free tools stay closed to them.
 * Server only. The list holds no address, only an HMAC-SHA256 of each one (trimmed, lowercased), keyed with
 * TOOL_GATE_BLOCK_KEY. Both values live in Vercel's environment variables, never in the repository:
 *   TOOL_GATE_BLOCK_KEY  the secret key (a long random value; never change it, or the list stops matching)
 *   TOOL_GATE_BLOCKED    comma-separated hashes, made with scripts/gate-block-hash.mjs
 * A sign-up gets its own hash back (the browser keeps it instead of the address) and the tool pages send it to
 * /api/tool-gate/check on each visit. Without a key the check is skipped and every address passes (fail open).
 */
const env = (name: string) => process.env[name]?.trim() || '';

/** The form of every hash: base64url of 32 bytes. */
export const HASH = /^[A-Za-z0-9_-]{43}$/;

/** HMAC-SHA256 of the trimmed, lowercased address, as base64url. scripts/gate-block-hash.mjs does the same. */
export function addressHash(email: string, key: string): string {
  return createHmac('sha256', key).update(email.trim().toLowerCase()).digest('base64url');
}

let warned = false;

/** The key and the list, read on every call so a redeploy with new values takes effect. Null without a key. */
export function removedList(): { key: string; hashes: Set<string> } | null {
  const key = env('TOOL_GATE_BLOCK_KEY');
  if (!key) {
    // the variable name only, never a value
    if (!warned) console.warn('[tool-gate] TOOL_GATE_BLOCK_KEY not set: removed-list check skipped');
    warned = true;
    return null;
  }
  const hashes = new Set(env('TOOL_GATE_BLOCKED').split(',').map((h) => h.trim()).filter((h) => HASH.test(h)));
  return { key, hashes };
}
