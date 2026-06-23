'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Lang, LANGS, LS_KEY, translate, translateValue } from './translations';

interface LanguageCtx {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Translate a keyed UI string, e.g. t('hero.tagline'). */
  t: (key: string) => string;
  /** Translate a data-file value by its English string, e.g. tv(project.status). */
  tv: (value: string) => string;
}

const LanguageContext = createContext<LanguageCtx>({
  lang: 'EN',
  setLang: () => {},
  t: (key) => translate('EN', key),
  tv: (value) => value,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('EN');

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY) as Lang | null;
    if (saved && LANGS.includes(saved)) {
      setLangState(saved);
      applyLang(saved);
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem(LS_KEY, next);
    applyLang(next);
  };

  // Memoized per-language so effects that depend on `t`/`tv` only re-run on change.
  const t  = useCallback((key: string) => translate(lang, key), [lang]);
  const tv = useCallback((value: string) => translateValue(lang, value), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tv }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Update the document language for accessibility/SEO, but keep direction LTR in
 * every language — the layout is intentionally never mirrored for Arabic.
 */
function applyLang(lang: Lang) {
  const html = document.documentElement;
  const isAR = lang === 'AR';
  // `lang` attribute drives the [lang="ar"] CSS rules; layout stays LTR.
  html.setAttribute('lang', isAR ? 'ar' : lang === 'TR' ? 'tr' : 'en');
  html.dir = 'ltr';
  // Styling hooks: a class + custom properties, both consumed in globals.css.
  html.classList.toggle('lang-ar', isAR);
  html.style.setProperty('--text-direction', isAR ? 'rtl' : 'ltr');
  html.style.setProperty('--text-align', isAR ? 'right' : 'left');
}

export const useLanguage = () => useContext(LanguageContext);
