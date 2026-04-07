// deno-lint-ignore-file react-no-danger
import Header from '~/islands/Header.tsx';
import { define } from '~/utils/define.ts';

export default define.page(function App({ Component }) {
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
    <html>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <script
          dangerouslySetInnerHTML={{
            __html: code,
          }}
        />
      </head>
      <body class='flex flex-col w-full h-full min-h-screen bg-background text-on-background dark:bg-background-dark dark:text-on-background-dark'>
        <Header menus={['home', 'works', 'contact']} />
        <Component />
      </body>
    </html>
  );
});
