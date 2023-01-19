import type { AppProps } from '$fresh/server.ts';
import { asset, Head } from '$fresh/runtime.ts';
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
          href={asset('/github-markdown.css')}
        />
      </Head>
      <Header menus={['home', 'works', 'contact']} />
      <Component />
    </body>
  );
}
