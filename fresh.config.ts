import { defineConfig } from '$fresh/server.ts';
import freshwind from 'freshwind/plugin.ts';
import twindConfig, { configUrl } from '~/twind.config.ts';

export default defineConfig({
  plugins: [freshwind(twindConfig, configUrl)],
});
