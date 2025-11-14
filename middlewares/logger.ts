import { define } from '~/utils/define.ts';
import { serverLogger } from '~/utils/logger.ts';

export const logger = define.middleware(async (ctx) => {
  const start = Date.now();

  const res = await ctx.next();

  const msg = ctx.state.msg || '';
  const method = ctx.req.method;
  const path = ctx.url.pathname;
  const status = res.status;

  if (status < 400) {
    serverLogger.info(msg, { method, path, status, start });
  } else {
    serverLogger.error(msg, { method, path, status, start });
  }

  return res;
});
