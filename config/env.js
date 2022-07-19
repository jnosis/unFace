function required(key, defaultValue = undefined) {
  const value = ENV[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

export const env = {
  database: {
    url: required('DATABASE_URL'),
  },
  cloudinary: {
    uploadPreset: required('CLOUDINARY_UPLOAD_PRESET'),
    cloudId: required('CLOUDINARY_CLOUD_ID'),
  },
};
