import { Head } from '$fresh/runtime.ts';
import Contact from '~/components/Contact.tsx';
import config from '~/config.ts';

export default function Home() {
  return (
    <main class='flex flex-col h-full mt-16 mx-0 md:mx-20 lg:mx-40'>
      <Head>
        <title>unFace</title>
      </Head>
      <section class='w-full px-4 mt-0 sm:mt-6'>
        <article
          class={`px-16 py-36 rounded-[4rem] bg-cover bg-no-repeat ${('text-on-primary bg-profile')}`}
          id='home'
        >
          <h1 class='text-4xl font-bold'></h1>
          <div class='mt-12 text-3xl'></div>
        </article>
      </section>
      <section
        class='w-full mt-10 mb-4 sm:my-16 px-4 sm:px-10 text-center'
        id='contact'
      >
        <Contact email={config.author.email} github={config.author.github} />
      </section>
    </main>
  );
}
