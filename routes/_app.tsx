import type { PageProps } from '$fresh/server.ts';
import Header from '~/islands/Header.tsx';
import { color } from '~/utils/style_utils.ts';

export default function App({ Component }: PageProps) {
  const code = `function global_dark(change) {
    if (change === 'auto') delete localStorage.theme;
    else if (change === 'on') localStorage.theme = 'dark';
    else if (change === 'off') localStorage.theme = 'light';
    window.isDark = localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[window.isDark ? 'add' : 'remove']("dark");
  }
  global_dark();`;

  return (
    <>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: code,
          }}
        />
      </head>
      <body
        class={`flex flex-col w-full h-full min-h-screen ${
          color('bg-background text-on-background')
        }`}
      >
        <Header menus={['home', 'works', 'contact']} />
        <Component />
      </body>
    </>
  );
}
