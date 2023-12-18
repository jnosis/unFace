import type { JSX } from 'preact/jsx-runtime';
import type { ThemeScheme } from '~/types.ts';
import { IS_BROWSER } from '$fresh/runtime.ts';
import { useSignal, useSignalEffect } from '@preact/signals';
import { IconAdjustments, IconMoon, IconSun } from '~/components/Icons.tsx';
import Panel from '~/components/Panel.tsx';

type ThemeTogglerProps = {
  prev: ThemeScheme;
};

export default function ThemeToggler({ prev }: ThemeTogglerProps) {
  function getScheme(): ThemeScheme {
    if (!IS_BROWSER) {
      return prev;
    }
    if (localStorage.theme === 'dark') {
      return 'dark';
    }
    if (localStorage.theme) {
      return 'light';
    }
    return 'system';
  }

  function updateThemeMode() {
    const w = window as unknown as { isDark: boolean };
    w.isDark = localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', w.isDark);
    darkMode.value = w.isDark;
  }

  const scheme = useSignal<ThemeScheme>(getScheme());
  const darkMode = useSignal<boolean>(false);
  const panelOpened = useSignal<boolean>(false);

  const setScheme = (value: ThemeScheme) => {
    if (value === 'system') delete localStorage.theme;
    else localStorage.theme = value;
    updateThemeMode();
    scheme.value = value;
  };

  const handleToggle = () => {
    const w = window as unknown as { isDark: boolean };
    w.isDark = localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    setScheme(w.isDark ? 'light' : 'dark');
  };

  const handleContextMenu = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    panelOpened.value = true;
  };

  const handleMouseLeave = () => {
    panelOpened.value = false;
  };

  useSignalEffect(() => {
    updateThemeMode();
  });

  return (
    <div
      class='relative px-4 py-2'
      onContextMenu={handleContextMenu}
      onMouseLeave={handleMouseLeave}
    >
      <div class='cursor-pointer' onClick={handleToggle}>
        {darkMode.value ? <IconMoon /> : <IconSun />}
      </div>
      {panelOpened.value && (
        <Panel<ThemeScheme>
          name='theme'
          items={[
            { id: 'light', Icon: IconSun },
            { id: 'dark', Icon: IconMoon },
            { id: 'system', Icon: IconAdjustments },
          ]}
          checked={scheme.value}
          onChange={setScheme}
        />
      )}
    </div>
  );
}
