import type { LogLevel, LogRecord } from '@logtape/logtape';
import { configure, getConsoleSink, getLogger } from '@logtape/logtape';
import { bold, cyan, dim, green, magenta, red, yellow } from '@std/fmt/colors';

export const formatter = (record: LogRecord) => {
  const time = new Date(record.timestamp).toLocaleString('en', {
    hour12: false,
    timeZone: 'Asia/Seoul',
    timeZoneName: 'short',
  });

  const msg = colorLog(
    record.level,
    `${dim(time)} [${record.level.toUpperCase()}] ${
      formatMsg(
        record.message[0] ? record.message : '',
        record.properties,
      )
    }`,
  );

  return msg;
};

await configure({
  sinks: { console: getConsoleSink({ formatter }) },
  loggers: [
    {
      category: ['unface', 'server'],
      lowestLevel: 'debug',
      sinks: ['console'],
    },
    {
      category: ['unface', 'client'],
      lowestLevel: 'info',
      sinks: ['console'],
    },
    {
      category: ['logtape', 'meta'],
      lowestLevel: 'warning',
      sinks: ['console'],
    },
  ],
});

export const serverLogger = getLogger(['unface', 'server']);
export const clientLogger = getLogger(['unface', 'server']);

export const colorLog = (level: LogLevel, message: string) => {
  const out: Record<LogLevel, string> = {
    trace: dim(message),
    debug: message,
    info: cyan(message),
    warning: yellow(message),
    error: red(message),
    fatal: bold(red(message)),
  };

  return out[level] || message;
};

export const formatMsg = (msg: string, options: unknown): string => {
  if (isMsgOptions(options)) {
    const { start } = options;
    const elapsed = time(start);
    const message = [msg, '-', elapsed].filter(Boolean).join(' ');
    if (isRouteMsgOptions(options)) {
      const { method, path, status } = options;
      return [method, path, colorStatus(status), message].join(' ');
    }
    return message;
  }
  return msg;
};

export function time(start: number) {
  return (Date.now() - start) + 'ms';
}

export const colorStatus = (status: number) => {
  const out: { [key: string]: string } = {
    7: magenta(`${status}`),
    5: red(`${status}`),
    4: yellow(`${status}`),
    3: cyan(`${status}`),
    2: green(`${status}`),
    1: green(`${status}`),
    0: yellow(`${status}`),
  };

  const calculateStatus = (status / 100) | 0;

  return out[calculateStatus];
};

type MsgOptions = {
  start: number;
};

type RouteMsgOptions = {
  method: string;
  path: string;
  status: number;
  start: number;
};

function isMsgOptions(options: unknown): options is MsgOptions {
  return typeof (options as RouteMsgOptions).start === 'number';
}

function isRouteMsgOptions(options: unknown): options is RouteMsgOptions {
  return isMsgOptions(options) &&
    typeof (options as RouteMsgOptions).method === 'string' &&
    typeof (options as RouteMsgOptions).path === 'string' &&
    typeof (options as RouteMsgOptions).status === 'number';
}
