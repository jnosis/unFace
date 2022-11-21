import { env } from '../../config/env';

class ImageUploader {
  async upload(file: File): Promise<CloudinaryData> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', env.cloudinary.uploadPreset);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${env.cloudinary.cloudId}/image/upload`,
      {
        method: 'POST',
        body: data,
      }
    );

    const imageData = await res.json();
    return imageData;
  }
}

export default ImageUploader;
