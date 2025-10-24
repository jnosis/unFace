import type { ThemeScheme } from '~/types.ts';
import { IS_BROWSER } from 'fresh/runtime';
import { useCallback } from 'preact/hooks';
import { useSignal, useSignalEffect } from '@preact/signals';

function getScheme(serverScheme: ThemeScheme): ThemeScheme {
  if (!IS_BROWSER) {
    return serverScheme;
  }
  if (localStorage.theme === 'dark') {
    return 'dark';
  }
  if (localStorage.theme === 'light') {
    return 'light';
  }
  return 'system';
}

export function useTheme(initial: ThemeScheme) {
  const scheme = useSignal<ThemeScheme>(getScheme(initial));
  const darkMode = useSignal<boolean>(false);

  const updateTheme = useCallback(() => {
    if (!IS_BROWSER) return;
    const isDark = localStorage.theme === 'dark' ||
      (scheme.value === 'system' &&
        globalThis.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
    darkMode.value = isDark;
  }, [scheme.value]);

  const setScheme = useCallback((value: ThemeScheme) => {
    if (value === 'system') {
      delete localStorage.theme;
    } else {
      localStorage.theme = value;
    }
    scheme.value = value;
    updateTheme();
  }, [updateTheme]);

  useSignalEffect(updateTheme);

  return { scheme, darkMode, setScheme };
}
