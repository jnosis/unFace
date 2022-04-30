import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const env = {
  firebase: {
    apiKey: required('FIREBASE_API_KEY'),
    authDomain: required('FIREBASE_AUTH_DOMAIN'),
    databaseURL: required('FIREBASE_DATABASE_URL'),
    projectId: required('FIREBASE_PROJECT_ID'),
  },
};
