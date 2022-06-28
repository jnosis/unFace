function required(key, defaultValue = undefined) {
  const value = ENV[key] || defaultValue;
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
  database: {
    url: required('DATABASE_URL'),
  },
  cloudinary: {
    uploadPreset: required('CLOUDINARY_UPLOAD_PRESET'),
    cloudId: required('CLOUDINARY_CLOUD_ID'),
  },
};
