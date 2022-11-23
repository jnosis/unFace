import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/use_local_storage';

type ThemeScheme = 'light' | 'dark' | 'system';

type Theme = {
  scheme: ThemeScheme;
  darkMode: boolean;
  setTheme?(theme: ThemeScheme): void;
  toggleDarkMode?(): void;
};

const DarkModeContext = createContext<Theme>({
  scheme: 'system',
  darkMode: false,
});

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [scheme, setScheme] = useLocalStorage<ThemeScheme>('theme', 'system');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const setTheme = (theme: ThemeScheme) => {
    setScheme(theme);
  };

  const toggleDarkMode = () => {
    setScheme(darkMode ? 'light' : 'dark');
  };

  useEffect(() => {
    const isDark =
      scheme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : scheme === 'dark';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, [scheme]);

  return (
    <DarkModeContext.Provider
      value={{ scheme, darkMode, setTheme, toggleDarkMode }}
    >
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
