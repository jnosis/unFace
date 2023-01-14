import { Handlers, PageProps } from '$fresh/server.ts';
import { Head } from '$fresh/runtime.ts';
import type { WorkMarkDown } from '~/types.ts';
import { handler as workHandler } from '~/routes/api/works/[title].ts';

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
    <section class='w-full mt-16 mb-16 px-8 overflow-hidden'>
      <Head>
        <title>{`${title} | unFace`}</title>
      </Head>
      {markdown && (
        <>
          <header class='h-16 flex items-center'>
            <h2 class='font-bold'>{title}</h2>
            <div class='flex-auto flex gap-1 ml-2'>
              <a href={repoUrl} target='_blank'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  class='w-4 h-4'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </a>
              {projectUrl && (
                <a href={projectUrl} target='_blank'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    class='w-4 h-4'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z'
                      clip-rule='evenodd'
                    />
                  </svg>
                </a>
              )}
            </div>
            <a href='/#works'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                class='w-6 h-6'
              >
                <path
                  fill-rule='evenodd'
                  d='M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z'
                  clip-rule='evenodd'
                />
              </svg>
            </a>
          </header>
          <article
            class={`mt-2 mb-8 p-6 rounded-2xl ${'markdown-body'}`}
            dangerouslySetInnerHTML={{ __html: markdown }}
          />
        </>
      )}
    </section>
  );
}
