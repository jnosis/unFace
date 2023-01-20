import { IS_BROWSER } from '$fresh/runtime.ts';
import type { JSX } from 'preact/jsx-runtime';
import { useEffect, useState } from 'preact/hooks';
import type { ThemeScheme } from '~/types.ts';
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
    setDarkMode(w.isDark);
  }

  const [scheme, setScheme] = useState<ThemeScheme>(getScheme());
  const [darkMode, setDarkMode] = useState<boolean>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setDarkModeAuto = () => {
    delete localStorage.theme;
    updateThemeMode();
    setScheme('system');
  };

  const setDarkModeOn = () => {
    localStorage.theme = 'dark';
    updateThemeMode();
    setScheme('dark');
  };

  const setDarkModeOff = () => {
    localStorage.theme = 'light';
    updateThemeMode();
    setScheme('light');
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
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    updateThemeMode();
  }, []);

  return (
    <div
      class='relative px-4 py-2'
      onContextMenu={handleContextMenu}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleToggle}>{darkMode ? <IconMoon /> : <IconSun />}</div>
      {isOpen && (
        <ul
          class={`absolute flex flex-col justify-between w-36 h-28 mt-1 p-4 rounded-2xl bottom-8 sm:top-8 shadow ${
            color('bg-surface-variant text-on-surface-variant')
          }`}
        >
          <li class='flex gap-1'>
            <input
              type='checkbox'
              id='light'
              checked={scheme === 'light'}
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
              checked={scheme === 'dark'}
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
              checked={scheme === 'system'}
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
