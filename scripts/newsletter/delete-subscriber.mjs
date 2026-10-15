// Deletes a newsletter subscriber completely, for a deletion request (KVKK Art. 11 / GDPR Art. 17).
//
//   node --env-file=.env.newsletter.local scripts/newsletter/delete-subscriber.mjs someone@example.com
//   node --env-file=.env.newsletter.local scripts/newsletter/delete-subscriber.mjs someone@example.com --keep-suppression
//
// By default both the subscriber record and the suppression entry (a SHA-256 of the address) are removed, so
// nothing about the address remains. With --keep-suppression the record goes but the suppression entry stays, so
// the address can never be emailed again without a fresh sign-up and confirmation: use it when the person asks
// both to be forgotten and never to be contacted again. Rate-limit counters cannot be matched to an address and
// expire on their own within two days.
import { neon } from '@neondatabase/serverless';
import { createHash } from 'node:crypto';

const url = process.env.DATABASE_URL;
const email = (process.argv[2] || '').trim().toLowerCase();
const keepSuppression = process.argv.includes('--keep-suppression');
if (!url || !email || !email.includes('@')) {
  console.error('Usage: node --env-file=.env.newsletter.local scripts/newsletter/delete-subscriber.mjs someone@example.com [--keep-suppression]');
  process.exit(1);
}
const sql = neon(url);
const hash = createHash('sha256').update(email).digest('hex');

const deleted = await sql.query(`delete from newsletter_subscribers where email = $1 returning 1`, [email]);
let suppression;
if (keepSuppression) {
  await sql.query(`insert into newsletter_suppressions (email_sha256) values ($1) on conflict do nothing`, [hash]);
  suppression = 'kept (the address stays on the do-not-email list)';
} else {
  const s = await sql.query(`delete from newsletter_suppressions where email_sha256 = $1 returning 1`, [hash]);
  suppression = `${s.length} entr${s.length === 1 ? 'y' : 'ies'} deleted`;
}
console.log(`subscriber records deleted: ${deleted.length}; suppression: ${suppression}`);
