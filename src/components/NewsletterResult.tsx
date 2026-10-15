'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { LANGS, type Lang } from '@/lib/translations';

type State = 'working' | 'confirmed' | 'expired' | 'invalid' | 'unsubscribed' | 'error';

/**
 * /updates/confirm and /updates/unsubscribe. The link from the email does the work on arrival with a POST from
 * the page (one click for the person, while link scanners that only fetch the page change nothing). The token,
 * id and signature are then removed from the address bar. ?lang= picks the page language.
 */
export default function NewsletterResult({ kind, preview }: { kind: 'confirm' | 'unsubscribe'; preview: boolean }) {
  const { t, setLang } = useLanguage();
  const [state, setState] = useState<State>('working');
  const [unsubscribeUrl, setUnsubscribeUrl] = useState('');
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang')?.toUpperCase() as Lang | undefined;
    if (lang && LANGS.includes(lang)) setLang(lang);
    window.history.replaceState(null, '', window.location.pathname);

    const request = kind === 'confirm'
      ? fetch('/api/newsletter/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: params.get('token') ?? '' }),
        })
      : fetch(`/api/newsletter/unsubscribe?${new URLSearchParams({ id: params.get('id') ?? '', sig: params.get('sig') ?? '' })}`, { method: 'POST' });

    request
      .then((res) => res.json().catch(() => ({})))
      .then((data) => {
        const s = data.status as State | undefined;
        setState(s && ['confirmed', 'expired', 'invalid', 'unsubscribed'].includes(s) ? s : 'error');
        if (data.preview?.unsubscribeUrl) setUnsubscribeUrl(data.preview.unsubscribeUrl);
      })
      .catch(() => setState('error'));
  }, [kind, setLang]);

  const copy: Record<State, [string, string?]> = {
    working: [kind === 'confirm' ? 'newsletter.confirming' : 'newsletter.unsubscribing'],
    confirmed: ['newsletter.confirmed', 'newsletter.confirmedNote'],
    expired: ['newsletter.expired', 'newsletter.expiredNote'],
    invalid: kind === 'confirm' ? ['newsletter.invalid', 'newsletter.invalidNote'] : ['newsletter.unsubInvalid', 'newsletter.unsubInvalidNote'],
    unsubscribed: ['newsletter.unsubscribed', 'newsletter.unsubscribedNote'],
    error: ['newsletter.errGeneric'],
  };
  const [title, note] = copy[state];
  const signUpAgain = state === 'expired' || (kind === 'confirm' && state === 'invalid');

  return (
    <section className="nl-section nl-section--page" aria-labelledby="nl-result-heading">
      <div className="nl-result" role="status" aria-live="polite">
        <span className="nl-eyebrow">{t(kind === 'confirm' ? 'newsletter.confirmEyebrow' : 'newsletter.eyebrow')}</span>
        <h1 id="nl-result-heading" className="nl-heading">{t(title)}</h1>
        {note && <p className="nl-desc">{t(note)}</p>}
        <p className="nl-result-links">
          {signUpAgain && <Link href="/updates">{t('newsletter.signUpAgain')} →</Link>}
          {state === 'unsubscribed' && <Link href="/updates">{t('newsletter.resubscribe')} →</Link>}
          {state !== 'working' && <Link href="/">{t('newsletter.backHome')}</Link>}
        </p>
        {preview && unsubscribeUrl && (
          <div className="nl-preview">
            <p className="nl-preview-title">{t('newsletter.previewUnsub')}</p>
            <a className="nl-preview-link" href={unsubscribeUrl}>{unsubscribeUrl}</a>
          </div>
        )}
      </div>
    </section>
  );
}
