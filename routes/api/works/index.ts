import type { WorkData } from '~/types.ts';
import { getWorks } from '~/services/works.ts';
import { Handlers } from 'fresh/compat';

export const handler: Handlers<WorkData[]> = {
  async GET() {
    const works = await getWorks();
    return new Response(JSON.stringify(works));
  },
};
