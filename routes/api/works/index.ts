import type { HandlerByMethod } from 'fresh';
import type { State, WorkData } from '~/types.ts';
import { getWorks } from '~/services/works.ts';

export const handler: HandlerByMethod<WorkData[], State> = {
  async GET() {
    const works = await getWorks();
    return new Response(JSON.stringify(works));
  },
};
