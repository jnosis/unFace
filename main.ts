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
import { serverLogger } from '~/utils/logger.ts';

await initData();

Deno.cron('Update works', '0 0 * * *', async () => {
  const start = new Date();
  serverLogger.info('fetching work data at 00:00 on every day');
  const commitResult = await fetchData();
  serverLogger.info(`fetched ${commitResult.length} data`, { start });
});

export const app = new App<State>()
  .use(staticFiles())
  .use(logger)
  .fsRoutes();
