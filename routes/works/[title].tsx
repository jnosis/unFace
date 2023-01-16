import type { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import IconBrandGithub from 'tabler_icons/brand-github.tsx';
import IconExternalLink from 'tabler_icons/external-link.tsx';
import IconX from 'tabler_icons/x.tsx';
import type { WorkMarkDown } from '~/types.ts';
import { handler as workHandler } from '~/routes/api/works/[title].ts';
import { color } from '~/utils/style_utils.ts';

export const handler: Handlers<WorkMarkDown | null> = {
  async GET(req, ctx) {
    const res = await workHandler.GET!(req, ctx);
    const data = await res.json();

    if (res.status === 404) return ctx.renderNotFound();

    return ctx.render(data);
  },
};

export default function WorkDetailPage({ data }: PageProps<WorkMarkDown>) {
  const { title, repoUrl, projectUrl, markdown } = data;

  return (
    <main
      class={`w-full min-h-screen pt-16 pb-24 sm:pb-16 px-0 md:px-20 lg:px-40 overflow-hidden ${
        color('bg-surface-variant text-on-surface-variant')
      }`}
    >
      <Head>
        <title>{`${title} | unFace`}</title>
      </Head>
      {markdown && (
        <section class='px-4 sm:px-10'>
          <header class='h-16 flex items-center px-4'>
            <h2 class='font-bold'>{title}</h2>
            <div class='flex-auto flex gap-1 ml-2'>
              <a href={repoUrl} target='_blank'>
                <IconBrandGithub class='w-4 h-4' />
              </a>
              {projectUrl && (
                <a href={projectUrl} target='_blank'>
                  <IconExternalLink class='w-4 h-4' />
                </a>
              )}
            </div>
            <a href='/#works'>
              <IconX class='w-6 h-6' />
            </a>
          </header>
          <article
            class={`mt-2 mb-8 p-6 rounded-2xl ${'markdown-body'}`}
            dangerouslySetInnerHTML={{ __html: markdown }}
          />
        </section>
      )}
    </main>
  );
}
