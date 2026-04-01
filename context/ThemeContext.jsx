'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});

const THEME_TRANSITION_CLASS = 'theme-transitioning';
const THEME_TRANSITION_MS = 320;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    setTheme(storedTheme === 'light' ? 'light' : 'dark');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        if (typeof window !== 'undefined') {
          const root = document.documentElement;
          root.classList.add(THEME_TRANSITION_CLASS);

          if (transitionTimeoutRef.current) {
            window.clearTimeout(transitionTimeoutRef.current);
          }

          transitionTimeoutRef.current = window.setTimeout(() => {
            root.classList.remove(THEME_TRANSITION_CLASS);
            transitionTimeoutRef.current = null;
          }, THEME_TRANSITION_MS);
        }

        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
      }
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
