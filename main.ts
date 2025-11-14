/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />
import type { State } from '~/types.ts';
import { App, staticFiles } from 'fresh';
import { logger } from '~/middlewares/logger.ts';
import { fetchData, initData } from '~/services/works.ts';

await initData();

Deno.cron('Update works', '0 0 * * *', async () => {
  console.log('fetching data at 00:00 on every day', new Date());
  await fetchData();
});

export const app = new App<State>()
  .use(staticFiles())
  .use(logger)
  .fsRoutes();
