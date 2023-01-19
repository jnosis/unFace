import type { AppProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import Header from '~/islands/Header.tsx';
import { color } from '~/utils/style_utils.ts';

export default function App({ Component }: AppProps) {
  const code = `function global_dark(change) {
    if (change === 'auto') delete localStorage.theme;
    else if (change === 'on') localStorage.theme = 'dark';
    else if (change === 'off') localStorage.theme = 'light';
    window.isDark = localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle('dark', window.isDark);
    const href = window.isDark
      ? 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css';
    document.getElementById('markdown-styles')?.setAttribute('href', href);
  }
  global_dark();`;

  return (
    <body
      class={`flex flex-col w-full h-full min-h-screen ${
        color('bg-background text-on-background')
      }`}
    >
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: code,
          }}
        />
        <link
          id='markdown-styles'
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css'
        />
      </Head>
      <Header menus={['home', 'works', 'contact']} />
      <Component />
    </body>
  );
}
