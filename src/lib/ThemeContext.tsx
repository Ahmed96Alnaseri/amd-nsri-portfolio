'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'grey' | 'white';

const THEME_LS_KEY = 'amd-nsri-theme';
const THEMES: Theme[] = ['dark', 'grey', 'white'];

interface ThemeCtx {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtx>({
  theme: 'dark',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem(THEME_LS_KEY) as Theme | null;
    const initial = saved && THEMES.includes(saved) ? saved : 'dark';
    setThemeState(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    localStorage.setItem(THEME_LS_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
