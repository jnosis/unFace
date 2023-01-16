import { AppProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import Header from '~/islands/Header.tsx';
import { color } from '~/utils/style_utils.ts';

export default function App({ Component }: AppProps) {
  return (
    <body
      class={`flex flex-col w-full h-full min-h-screen ${
        color('bg-background text-on-background')
      }`}
    >
      <Head>
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
