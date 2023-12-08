import type { JSX } from 'preact/jsx-runtime';
import type { ThemeScheme } from '~/types.ts';
import { IS_BROWSER } from '$fresh/runtime.ts';
import { useSignal, useSignalEffect } from '@preact/signals';
import { IconAdjustments, IconMoon, IconSun } from '~/components/Icons.tsx';
import { color } from '~/utils/style_utils.ts';

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

  const setDarkModeAuto = () => {
    delete localStorage.theme;
    updateThemeMode();
    scheme.value = 'system';
  };

  const setDarkModeOn = () => {
    localStorage.theme = 'dark';
    updateThemeMode();
    scheme.value = 'dark';
  };

  const setDarkModeOff = () => {
    localStorage.theme = 'light';
    updateThemeMode();
    scheme.value = 'light';
  };

  const handleToggle = () => {
    const w = window as unknown as { isDark: boolean };
    w.isDark = localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    w.isDark ? setDarkModeOff() : setDarkModeOn();
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
      <div onClick={handleToggle}>
        {darkMode.value ? <IconMoon /> : <IconSun />}
      </div>
      {panelOpened.value && (
        <ul
          class={`absolute flex flex-col justify-between w-36 h-28 mt-1 p-4 rounded-2xl bottom-8 sm:top-8 shadow ${
            color('bg-surface-variant text-on-surface-variant')
          }`}
        >
          <li class='flex gap-1'>
            <input
              type='checkbox'
              id='light'
              checked={scheme.value === 'light'}
              onChange={setDarkModeOff}
            />
            <label class='flex gap-0.5' htmlFor='light'>
              <IconSun />
              <span>Light</span>
            </label>
          </li>
          <li class='flex gap-1'>
            <input
              type='checkbox'
              id='dark'
              checked={scheme.value === 'dark'}
              onChange={setDarkModeOn}
            />
            <label class='flex gap-0.5' htmlFor='dark'>
              <IconMoon />
              <span>Dark</span>
            </label>
          </li>
          <li class='flex gap-1'>
            <input
              type='checkbox'
              id='system'
              checked={scheme.value === 'system'}
              onChange={setDarkModeAuto}
            />
            <label class='flex gap-0.5' htmlFor='system'>
              <IconAdjustments />
              <span>System</span>
            </label>
          </li>
        </ul>
      )}
    </div>
  );
}
