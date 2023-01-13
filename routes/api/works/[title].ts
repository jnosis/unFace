import { Handlers } from '$fresh/server.ts';
import type { WorkMarkDown } from '~/types.ts';
import { convertMarkdownToHtml, convertUrls } from '~/utils/converter.ts';
import { works } from '~/routes/api/works/index.ts';

export const handler: Handlers = {
  async GET(_, ctx) {
    const { title } = ctx.params;
    const work = works.filter((work) => work.title === title)[0];

    if (work === null) {
      return new Response(null, { status: 404 });
    }

    const {
      repoUrl,
      projectUrl,
      repoContentUrl,
      contentUrl,
    } = convertUrls(work);

    const raw = await fetch(`${contentUrl}/README.md`, { method: 'GET' });
    const markdown = await raw.text();
    const html = convertMarkdownToHtml(markdown, repoContentUrl, contentUrl);
    const data: WorkMarkDown = { title, repoUrl, projectUrl, markdown: html };

    return new Response(JSON.stringify(data));
  },
};
