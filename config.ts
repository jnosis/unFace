import '$std/dotenv/load.ts';
import type { AuthorOptions, Config, DatabaseOptions } from '~/types.ts';

const isTest = Deno.args.includes('test');

function required(key: string, defaultValue?: string): string {
  const value = Deno.env.get(`${key}${isTest ? '_TEST' : ''}`) || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

const author: AuthorOptions = {
  email: required('USER_EMAIL'),
  github: required('USER_GITHUB'),
};

const database: DatabaseOptions = {
  url: required('DATABASE_URL'),
};

const config: Config = {
  author,
  database,
};

export default config;
