import '$std/dotenv/load.ts';
import type {
  AuthorOptions,
  CloudinaryOptions,
  Config,
  DatabaseOptions,
  OpenStatus,
} from '~/types.ts';

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

const cloudinary: CloudinaryOptions = {
  uploadPreset: required('CLOUDINARY_UPLOAD_PRESET'),
  cloudId: required('CLOUDINARY_CLOUD_ID'),
};

const database: DatabaseOptions = {
  url: required('DATABASE_URL'),
};

const openStatus: OpenStatus = {
  signup: !!parseInt(required('SIGNUP_OPEN_STATUS', '0')),
};

const config: Config = {
  author,
  cloudinary,
  database,
  openStatus,
};

export default config;
