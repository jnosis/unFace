import type { HandlerByMethod } from 'fresh';
import type { WorkData } from '~/types.ts';
import { getWorks } from '~/services/works.ts';

export const handler: HandlerByMethod<WorkData[], undefined> = {
  async GET() {
    const works = await getWorks();
    return new Response(JSON.stringify(works));
  },
};
