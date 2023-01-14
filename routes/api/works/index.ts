import { Handlers } from '$fresh/server.ts';
import type { WorkData } from '~/types.ts';
import { getWorks } from '~/services/works.ts';

export const handler: Handlers<WorkData[]> = {
  async GET() {
    const works = await getWorks();
    return new Response(JSON.stringify(works));
  },
};
