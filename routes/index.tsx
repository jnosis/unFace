import type { Handlers, PageProps } from '$fresh/server.ts';
import type { WorkData } from '~/types.ts';
import Contact from '~/components/Contact.tsx';
import WorksSection from '~/islands/WorksSection.tsx';
import { handler as worksHandler } from '~/routes/api/works/index.ts';
import config from '~/config.ts';

export const handler: Handlers<WorkData[]> = {
  async GET(req, ctx) {
    const res = await worksHandler.GET!(req, ctx);
    const data = await res.json();

    return ctx.render(data ? data : []);
  },
};

export default function Home({ data: works }: PageProps<WorkData[]>) {
  return (
    <>
      <head>
        <title>unFace</title>
        <meta name='description' content='Portfolio Site' />
      </head>
      <main class='flex flex-col h-full m-auto pt-16 px-0 pb-16 sm:pb-0 md:px-4 md:max-w-4xl'>
        <section class='w-full px-4 mt-0 sm:mt-6'>
          <article
            class='scroll-mt-24 px-16 py-36 rounded-[4rem] bg-cover bg-no-repeat text-on-primary bg-profile'
            id='home'
          >
            <h1 class='text-4xl font-bold'></h1>
            <div class='mt-12 text-3xl'></div>
          </article>
        </section>
        <WorksSection works={works} />
        <section
          class='w-full mt-10 mb-4 sm:my-16 px-4 sm:px-10 text-center'
          id='contact'
        >
          <Contact email={config.author.email} github={config.author.github} />
        </section>
      </main>
    </>
  );
}
