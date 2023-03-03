import type { Handlers, PageProps } from '$fresh/server.ts';
import { asset, Head } from '$fresh/runtime.ts';
import type { WorkMarkDown } from '~/types.ts';
import {
  IconBrandGithub,
  IconExternalLink,
  IconX,
} from '~/components/Icons.tsx';
import { handler as workHandler } from '~/routes/api/works/[title].ts';
import { color } from '~/utils/style_utils.ts';

export const handler: Handlers<WorkMarkDown> = {
  async GET(req, ctx) {
    try {
      const res = await workHandler.GET!(req, ctx);
      const data = await res.json();

      if (!data) return ctx.renderNotFound();

      return ctx.render(data);
    } catch (error) {
      if (error.cause === 404) return ctx.renderNotFound();
      throw error;
    }
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
        <link
          id='markdown-styles'
          rel='stylesheet'
          href={asset('/github-markdown.css')}
        />
      </Head>
      {markdown && (
        <section class='px-4 sm:px-10'>
          <header class='h-16 flex items-center px-4'>
            <h2 class='font-bold'>{title}</h2>
            <div class='flex-auto flex gap-1 ml-2'>
              <a href={repoUrl} aria-label='Github' target='_blank'>
                <IconBrandGithub class='w-4 h-4' />
              </a>
              {projectUrl && (
                <a href={projectUrl} aria-label='Project Url' target='_blank'>
                  <IconExternalLink class='w-4 h-4' />
                </a>
              )}
            </div>
            <a href='/#works' aria-label='close'>
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
