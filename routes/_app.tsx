import { AppProps } from '$fresh/server.ts';
import Header from '~/islands/Header.tsx';
import { color } from '~/utils/style_utils.ts';

export default function App({ Component }: AppProps) {
  return (
    <body
      class={`flex flex-col w-full h-full min-h-screen mb-16 sm:mb-0 ${
        color('bg-background text-on-background')
      }`}
    >
      <Header menus={['home', 'works', 'contact']} />
      <Component />
    </body>
  );
}
