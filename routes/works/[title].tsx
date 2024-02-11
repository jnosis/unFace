import type { Handlers, PageProps } from '$fresh/server.ts';
import type { WorkDetail } from '~/types.ts';
import { asset } from '$fresh/runtime.ts';
import {
  IconBrandGithub,
  IconExternalLink,
  IconX,
} from '~/components/Icons.tsx';
import Techs from '~/islands/Techs.tsx';
import { handler as workHandler } from '~/routes/api/works/[title].ts';

export const handler: Handlers<WorkDetail> = {
  async GET(req, ctx) {
    try {
      const res = await workHandler.GET!(req, ctx);
      const data = await res.json();

      if (!data) return ctx.renderNotFound();

      return ctx.render(data);
    } catch (error) {
      throw error;
    }
  },
};

export default function WorkDetailPage({ data }: PageProps<WorkDetail>) {
  const { title, repoUrl, projectUrl, techs, readme } = data;

  return (
    <>
      <head>
        <title>{`${title} | unFace`}</title>
        <meta name='description' content={`${title} project's description`} />
        <link
          id='markdown-styles'
          rel='stylesheet'
          href={asset('/github-markdown.css')}
        />
      </head>
      <main class='w-full min-h-screen py-16 sm:pb-0 px-0 md:px-20 lg:px-40 overflow-hidden bg-surface-variant text-on-surface-variant dark:bg-surface-variant-dark dark:text-on-surface-variant-dark'>
        {readme && (
          <section class='px-4 sm:px-0 sm:max-w-3xl m-auto'>
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
            <div class='mb-4 sm:mb-16 pt-3 rounded-2xl bg-primary-container dark:bg-primary-container'>
              <div class='pb-3 pl-3'>
                <Techs
                  techs={techs}
                  selected='all'
                />
              </div>
              <article
                data-color-mode='auto'
                data-light-theme='light'
                data-dark-theme='dark'
                class='p-6 rounded-2xl markdown-body'
                dangerouslySetInnerHTML={{ __html: readme }}
              />
            </div>
          </section>
        )}
      </main>
    </>
  );
}
