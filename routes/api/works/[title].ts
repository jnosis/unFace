import type { Handlers } from '$fresh/server.ts';
import type { WorkDetail } from '~/types.ts';
import { getWorkByTitle } from '~/services/works.ts';
import { convertMarkdownToHtml, convertUrls } from '~/utils/converter.ts';

export const handler: Handlers = {
  async GET(_, ctx) {
    const { title } = ctx.params;
    try {
      const work = await getWorkByTitle(title);

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
      const readme = await raw.text();
      const html = convertMarkdownToHtml(readme, repoContentUrl, contentUrl);
      const data: WorkDetail = {
        title,
        repoUrl,
        projectUrl,
        techs: [...work.techs],
        readme: html,
      };

      return new Response(JSON.stringify(data));
    } catch (error) {
      throw error;
    }
  },
};
