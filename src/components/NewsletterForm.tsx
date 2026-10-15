'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { consentText } from '@/lib/newsletter/consent';

type FieldError = { email?: string; name?: string; consent?: string };
type Preview = { subject?: string; text?: string; confirmUrl?: string; note?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Email (required), name (optional) and a separate, unticked consent box, with the privacy notice linked beside the
 * form rather than inside the consent. Errors are announced (role="alert") and focus moves to the first invalid field;
 * success replaces the form and takes focus. Text, labels and the name field follow Arabic right-to-left; the email
 * field keeps left-to-right typing (addresses are Latin) but aligns right. In preview mode the confirmation email
 * comes back from the API and is shown below the success message instead of being sent.
 */
export default function NewsletterForm({ variant, preview }: { variant: 'section' | 'page'; preview: boolean }) {
  const { t, lang } = useLanguage();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});
  const [formError, setFormError] = useState('');
  const [done, setDone] = useState(false);
  const [previewMail, setPreviewMail] = useState<Preview | null>(null);
  const openedAt = useRef(0);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => { openedAt.current = Date.now(); }, []);
  useEffect(() => { if (done) successRef.current?.focus(); }, [done]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const trimmed = email.trim();
    const next: FieldError = {};
    if (!trimmed) next.email = 'newsletter.errEmailRequired';
    else if (trimmed.length > 254 || !EMAIL_RE.test(trimmed)) next.email = 'newsletter.errEmail';
    if (name.trim().length > 100) next.name = 'newsletter.errName';
    if (!consent) next.consent = 'newsletter.errConsent';
    setErrors(next);
    setFormError('');
    if (next.email) return emailRef.current?.focus();
    if (next.name) return nameRef.current?.focus();
    if (next.consent) return consentRef.current?.focus();

    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          name: name.trim(),
          consent,
          website,
          elapsed: Date.now() - openedAt.current,
          lang,
          path: window.location.pathname,
          from: new URLSearchParams(window.location.search).get('from'),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setPreviewMail(data.preview ?? null);
        setDone(true);
      } else if (data.error === 'email') {
        setErrors({ email: 'newsletter.errEmail' });
        emailRef.current?.focus();
      } else if (data.error === 'consent') {
        setErrors({ consent: 'newsletter.errConsent' });
        consentRef.current?.focus();
      } else {
        setFormError(res.status === 429 ? 'newsletter.errRate' : 'newsletter.errGeneric');
      }
    } catch {
      setFormError('newsletter.errGeneric');
    } finally {
      setSubmitting(false);
    }
  }

  const describedBy = (field: keyof FieldError) => (errors[field] ? `nl-${field}-error` : undefined);

  return (
    <section className={`nl-section${variant === 'page' ? ' nl-section--page' : ''}`} aria-labelledby="nl-heading">
      <div className="nl-grid">
        <div className="nl-intro">
          <span className="nl-eyebrow">{t('newsletter.eyebrow')}</span>
          {variant === 'page'
            ? <h1 id="nl-heading" className="nl-heading">{t('newsletter.heading')}</h1>
            : <h2 id="nl-heading" className="nl-heading">{t('newsletter.heading')}</h2>}
          <p className="nl-desc">{t('newsletter.desc')}</p>
          <p className="nl-privacy">
            {t('newsletter.privacyLead')} <Link href="/privacy" className="nl-privacy-link">{t('newsletter.privacyLink')}</Link>
          </p>
        </div>

        {done ? (
          <div className="nl-done" ref={successRef} tabIndex={-1} role="status" aria-live="polite">
            <p className="nl-done-title">{t('newsletter.success')}</p>
            <p className="nl-done-note">{t('newsletter.successNote')}</p>
            {preview && previewMail && (
              <div className="nl-preview">
                {previewMail.note === 'already_confirmed' ? (
                  <p className="nl-preview-title">{t('newsletter.previewAlready')}</p>
                ) : (
                  <>
                    <p className="nl-preview-title">{t('newsletter.previewTitle')}</p>
                    <p className="nl-preview-subject">{previewMail.subject}</p>
                    <pre className="nl-preview-text">{previewMail.text}</pre>
                    {previewMail.confirmUrl && (
                      <a className="nl-preview-link" href={previewMail.confirmUrl}>{t('newsletter.previewOpen')} →</a>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <form className="nl-form" onSubmit={submit} noValidate>
            {/* honeypot: clipped to nothing, skipped by keyboard and screen readers, ignored by autofill */}
            <div aria-hidden="true" className="nl-honeypot">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </label>
            </div>

            <div className="nl-fields">
              <div className="nl-field">
                <label htmlFor="nl-email" className="nl-label">{t('newsletter.emailLabel')}</label>
                <input
                  ref={emailRef}
                  id="nl-email"
                  className={`nl-input nl-input--email${errors.email ? ' nl-input--error' : ''}`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy('email')}
                  placeholder={t('newsletter.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span id="nl-email-error" className="nl-error" role="alert">{t(errors.email)}</span>}
              </div>
              <div className="nl-field">
                <label htmlFor="nl-name" className="nl-label">
                  {t('newsletter.nameLabel')} <span className="nl-optional">({t('newsletter.optional')})</span>
                </label>
                <input
                  ref={nameRef}
                  id="nl-name"
                  className={`nl-input${errors.name ? ' nl-input--error' : ''}`}
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy('name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span id="nl-name-error" className="nl-error" role="alert">{t(errors.name)}</span>}
              </div>
            </div>

            <div className="nl-consent-wrap">
              <input
                ref={consentRef}
                id="nl-consent"
                className="nl-checkbox"
                type="checkbox"
                checked={consent}
                aria-required="true"
                aria-invalid={!!errors.consent}
                aria-describedby={describedBy('consent')}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="nl-consent" className="nl-consent">{consentText(lang)}</label>
            </div>
            {errors.consent && <span id="nl-consent-error" className="nl-error nl-error--consent" role="alert">{t(errors.consent)}</span>}

            <button type="submit" className="nl-submit" disabled={submitting} aria-busy={submitting}>
              {submitting ? t('newsletter.submitting') : t('newsletter.submit')}
            </button>
            {formError && <p className="nl-form-error" role="alert">{t(formError)}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
