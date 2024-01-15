/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />
/// <reference lib="deno.unstable" />

import { start } from '$fresh/server.ts';
import manifest from '~/fresh.gen.ts';

import freshwind from 'freshwind/plugin.ts';
import { fetchData, initData } from '~/services/works.ts';
import twindConfig, { configUrl } from '~/twind.config.ts';

await initData();

Deno.cron('Update works', '0 0 * * *', async () => {
  console.log('fetching data at 00:00 on every day', new Date());
  await fetchData();
});

await start(manifest, { plugins: [freshwind(twindConfig, configUrl)] });
