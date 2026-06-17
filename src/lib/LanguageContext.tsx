'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Lang, LANGS, LS_KEY, translations, NavT } from './translations';

interface LanguageCtx {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: NavT;
}

const LanguageContext = createContext<LanguageCtx>({
  lang: 'EN',
  setLang: () => {},
  t: translations.EN.nav,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('EN');

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY) as Lang | null;
    if (saved && LANGS.includes(saved)) {
      setLangState(saved);
      applyDir(saved);
    }
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    localStorage.setItem(LS_KEY, next);
    applyDir(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang].nav }}>
      {children}
    </LanguageContext.Provider>
  );
}

function applyDir(lang: Lang) {
  const html = document.documentElement;
  html.dir  = lang === 'AR' ? 'rtl' : 'ltr';
  html.lang = lang === 'EN' ? 'en' : lang === 'TR' ? 'tr' : 'ar';
}

export const useLanguage = () => useContext(LanguageContext);
