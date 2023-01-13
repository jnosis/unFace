import { Head } from '$fresh/runtime.ts';

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
    </main>
  );
}
