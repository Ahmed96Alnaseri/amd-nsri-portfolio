// Exports confirmed newsletter subscribers with their consent records as CSV, for a manual IYS upload.
// Runs on your own computer with the database credentials; there is no admin page on the website.
//
//   node --env-file=.env.newsletter.local scripts/newsletter/export-confirmed.mjs [output.csv]
//
// .env.newsletter.local holds one line, DATABASE_URL=... (copy it from Neon or Vercel). It is git-ignored, and so
// are the CSV files: they contain personal data, so delete them once uploaded. The CSV lists the exact consent text
// each person agreed to (by version and language) and leaves iys_status as stored: nothing is marked as synced.
import { neon } from '@neondatabase/serverless';
import { readFileSync, writeFileSync } from 'node:fs';

const url = process.env.DATABASE_URL;
if (!url) {
  console.error('DATABASE_URL is not set. Run: node --env-file=.env.newsletter.local scripts/newsletter/export-confirmed.mjs');
  process.exit(1);
}
const consent = JSON.parse(readFileSync(new URL('../../src/lib/newsletter/consent-texts.json', import.meta.url), 'utf8'));
const out = process.argv[2] || `newsletter-confirmed-${new Date().toISOString().slice(0, 10)}.csv`;

const rows = await neon(url).query(
  `select email, name, consent_at, consent_version, consent_lang, source_path, confirmed_at, iys_status
   from newsletter_subscribers where status = 'confirmed' order by confirmed_at`,
);

const cols = ['email', 'name', 'consent_at', 'consent_version', 'consent_lang', 'consent_text', 'source_path', 'confirmed_at', 'iys_status'];
const cell = (v) => {
  const s = v == null ? '' : v instanceof Date ? v.toISOString() : String(v);
  // quote everything; also stop a spreadsheet from reading a cell as a formula
  return `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
};
const lines = rows.map((r) => {
  // the wording as agreed, without the form's [[text|/path]] link markers
  const text = (consent.versions[r.consent_version]?.[r.consent_lang] ?? '').replace(/\[\[([^\]|]+)\|[^\]]+\]\]/g, '$1');
  return cols.map((c) => cell(c === 'consent_text' ? text : r[c])).join(',');
});
// BOM so Excel opens Turkish and Arabic text correctly
writeFileSync(out, '\uFEFF' + [cols.join(','), ...lines].join('\r\n') + '\r\n');
console.log(`${rows.length} confirmed subscriber(s) written to ${out}`);
