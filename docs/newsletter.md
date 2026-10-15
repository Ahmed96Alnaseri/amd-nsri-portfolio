# Newsletter sign-up

An optional email sign-up for new projects, journal articles and updates to the digital tools. The tools work without
it; there is no account or login. It is **off** until you switch it on.

## What it does

- **Form**: on the homepage above the footer, and on `/updates`. It asks for an email (required), a name (optional) and
  a separate, unticked consent box. The privacy notice is linked beside the form, not inside the consent.
- **Tool pages**: NESTRI, NESTRI PRO and IPunch show a small "Get tool updates →" link (desktop only on IPunch) while the
  newsletter is on. It goes to `/updates` and records which tool the person came from.
- **Double opt-in**: the only email ever sent is the confirmation, in the language the form was shown in, with no
  promotional content. The link works once and expires after 7 days. Unconfirmed sign-ups are deleted by a daily job
  (`vercel.json` cron → `/api/newsletter/cleanup`).
- **Same answer for every address**: new, waiting, confirmed or unsubscribed, the visitor sees the same message, so
  nobody can find out whether an address is registered. An unsubscribed address needs a fresh confirmation.
- **Unsubscribe**: a signed link, no login, one click (`/updates/unsubscribe`), plus the `List-Unsubscribe` headers for
  mail apps. The address is suppressed at once and kept on a suppression list. Unsubscribing keeps working even after
  the mode goes back to `off`, as long as the database is configured.
- **Spam protection**: hidden honeypot field, a minimum fill time, and database-backed rate limits (5 sign-ups per hour
  per network address, 3 per day per email address). No Turnstile.

## What is stored (Neon Postgres)

Table `newsletter_subscribers`: email, optional name, status (`pending` / `confirmed` / `unsubscribed`), consent time,
consent text version, language shown, source page (path only), confirmation time, unsubscribe time, `iys_status`
(`not_synced` by default; nothing sets it automatically), and the SHA-256 of the confirmation token while one is pending.

Table `newsletter_suppressions`: SHA-256 of unsubscribed addresses. Table `newsletter_rate_limits`: counters keyed by a
keyed one-way hash of the network address or email, deleted after two days.

**Not stored**: IP address, user agent. Logs carry event names only, never an address, name, IP or token. The tables are
created automatically on first use.

The exact consent wording per version and language is in `src/lib/newsletter/consent-texts.json`. Never edit a version
that has been used: add a new one and point `current` at it. Version `v1-2026-10` deliberately says nothing about
services; add one that does only after moving to Vercel Pro and the lawyer's review.

## Modes (`NEWSLETTER_MODE`)

| Value | Where it works | What happens |
|---|---|---|
| unset / `off` | everywhere (default) | No form, `/updates` `/updates/*` `/privacy` are 404, every newsletter API answers 404 |
| `preview` | `next dev` and Vercel **Preview** deployments only; on Production it counts as `off` | No email is sent: the confirmation email is shown on screen, its link points at the preview itself. Data goes to the Preview `DATABASE_URL` if set, otherwise to a throwaway in-memory store |
| `live` | anywhere it is set explicitly (meant for Production) | Real database, real confirmation emails. If any required variable is missing, it stays off and logs which one |

Pages read the mode when the site is built: **redeploy after changing it**.

## Environment variables (names only)

| Variable | Production (live) | Preview (testing) |
|---|---|---|
| `NEWSLETTER_MODE` | `live` (leave unset until launch) | `preview` |
| `NEWSLETTER_SECRET` | required: 32+ random characters, set once (changing it breaks unsubscribe links already sent) | required: any 32+ random characters, different from Production |
| `DATABASE_URL` | required: Neon connection string (added by the Neon integration) | optional: a Neon **branch** for Preview, never the production database; without it the in-memory store is used |
| `SITE_URL` | required: `https://amdnsri.com` (https, never a vercel.app address) | not used |
| `CRON_SECRET` | required: random string; Vercel's daily cron sends it | not used |
| `RESEND_API_KEY` | already set (contact form) | not needed (preview sends nothing) |
| `CONTACT_FROM_EMAIL` | already set (contact form); the confirmation email uses the same sender | not needed |
| `CONTACT_TO_EMAIL` | already set; used as Reply-To unless `NEWSLETTER_REPLY_TO` is set | not needed |
| `NEWSLETTER_REPLY_TO` | optional: `ahmed@amdnsri.com` to make the Reply-To explicit | not needed |
| `NEWSLETTER_PREVIEW_CONFIRM_TTL_MINUTES` | ignored | optional: e.g. `2`, to test an expired link without waiting 7 days |

Generate a secret, for example: `node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"`.

## Test on a Vercel Preview

1. In Vercel → Settings → Environment Variables, add for the **Preview** environment: `NEWSLETTER_MODE=preview`,
   `NEWSLETTER_SECRET` (new random value) and, to test the expired link quickly, `NEWSLETTER_PREVIEW_CONFIRM_TTL_MINUTES=2`.
   Optional: a Neon branch as `DATABASE_URL` for Preview (otherwise the in-memory store is used; if a link then says it
   is not valid after a pause, the preview server restarted, so sign up again).
2. Push the `newsletter` branch (not main). Vercel builds a Preview deployment; open its URL.
3. **Subscribe**: the form is on the homepage above the footer and on `/updates`. Tick the box and send; the
   confirmation email appears under the success message instead of being sent.
4. **Confirm**: click "Open the confirmation link". The page confirms and shows the unsubscribe link a newsletter would
   carry. Clicking the confirmation link a second time says it is not valid (single use).
5. **Unsubscribe**: click that unsubscribe link: "You are unsubscribed". Sign up again with the same address: a new
   confirmation is needed.
6. **Expired link**: sign up with another address, wait longer than `NEWSLETTER_PREVIEW_CONFIRM_TTL_MINUTES`, then open
   its link: "This confirmation link has expired".
7. **Duplicates**: sign up with an address that is already confirmed: the same success message (preview notes that no
   email would be sent).
8. **Languages**: switch EN / TR / AR in the navigation and repeat; the confirmation email follows the form's language.
9. **Tool pages**: open `/nestri.html`, `/nestri-pro.html`, `/ipunch.html` and find "Get tool updates →".

## Go live (Production)

1. Move Vercel to Pro first if the emails will promote services (Hobby is non-commercial only).
2. Add Neon through Vercel → Storage / Marketplace, region **Frankfurt (eu-central-1)**, connected to Production (and,
   if you like, Preview branches). It sets `DATABASE_URL`.
3. Add `NEWSLETTER_SECRET`, `SITE_URL=https://amdnsri.com`, `CRON_SECRET` for Production. `RESEND_API_KEY`,
   `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` are already there.
4. Have the privacy notice (`src/lib/privacy-content.ts`) reviewed and completed, and remove its DRAFT banner.
5. Set `NEWSLETTER_MODE=live` for Production and redeploy. Subscribe with your own address, confirm, then unsubscribe.

To switch off again: remove `NEWSLETTER_MODE` (or set `off`) and redeploy. Unsubscribe links keep working.

## Export confirmed subscribers (for IYS)

There is no admin page. On your computer, put `DATABASE_URL=...` (from Neon or Vercel) in a file named
`.env.newsletter.local` at the project root (git-ignored), then:

    node --env-file=.env.newsletter.local scripts/newsletter/export-confirmed.mjs

It writes `newsletter-confirmed-<date>.csv` (git-ignored): email, name, consent time, version, language, the exact
consent text, source page, confirmation time, IYS status. It contains personal data: delete it after use.

## IYS (manual)

IYS is tracked separately from email confirmation and marketing consent; double opt-in does not replace it. No
integration is built and nothing is marked as synced automatically. **Questions for your lawyer**: whether IYS
registration applies to a private individual without a company, and whether an email-only consent (no name) is enough.

If it applies: register with IYS, upload the consents from the export through the IYS panel within the required time,
then record it yourself in the Neon SQL editor, for the addresses you uploaded:

    update newsletter_subscribers set iys_status = 'synced', updated_at = now()
    where status = 'confirmed' and email in ('first@example.com', 'second@example.com');

## Delete a subscriber completely (deletion request)

    node --env-file=.env.newsletter.local scripts/newsletter/delete-subscriber.mjs someone@example.com

Removes the record and the suppression entry. Add `--keep-suppression` when the person also asks never to be emailed
again: the record goes, the one-way code of the address stays on the suppression list.

## Sending a newsletter later (not built)

No campaign code exists. When you send one, include `unsubscribeUrl(...)` in the email text and
`listUnsubscribeHeaders(...)` as headers (`src/lib/newsletter/unsubscribe.ts`), and send only to `status = 'confirmed'`
addresses that are not in `newsletter_suppressions`.

## Files

- `src/lib/newsletter/`: config (modes), consent texts, tokens, stores (Postgres and in-memory), confirmation email,
  unsubscribe helpers, request handling
- `src/app/api/newsletter/[action]/route.ts`: `subscribe`, `confirm`, `unsubscribe`, `status`, `cleanup` in one route (one server function, so the preview in-memory store is shared)
- `src/components/NewsletterSection.tsx`, `NewsletterForm.tsx`, `NewsletterResult.tsx`
- `src/app/updates/`, `src/app/privacy/` (draft notice; text in `src/lib/privacy-content.ts`)
- `scripts/newsletter/`: `export-confirmed.mjs`, `delete-subscriber.mjs`
