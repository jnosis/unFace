import type { JSX } from 'preact/jsx-runtime';
import { useEffect, useState } from 'preact/hooks';
import IconAdjustments from 'tabler_icons/adjustments.tsx';
import IconMoon from 'tabler_icons/moon.tsx';
import IconSun from 'tabler_icons/sun.tsx';
import type { ThemeScheme } from '~/types.ts';
import useLocalStorage from '~/hooks/useLocalStorage.ts';
import { color } from '~/utils/style_utils.ts';

export default function ThemeToggler() {
  const [scheme, setScheme] = useLocalStorage<ThemeScheme>('theme', 'system');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const setTheme = (theme: ThemeScheme) => {
    setScheme(theme);
  };

  const handleToggle = () => {
    setScheme(darkMode ? 'light' : 'dark');
  };

  const handleContextMenu = (e: JSX.TargetedMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const isDark = scheme === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : scheme === 'dark';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, [scheme]);

  useEffect(() => {
    document.documentElement.classList[darkMode ? 'add' : 'remove']('dark');
    const href = darkMode
      ? 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css';
    document.getElementById('markdown-styles')?.setAttribute('href', href);
  }, [darkMode]);

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
              onChange={(_e) => setTheme!('light')}
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
              onChange={(_e) => setTheme!('dark')}
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
              onChange={(_e) => setTheme!('system')}
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
