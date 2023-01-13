export type MenuItem = 'home' | 'works' | 'contact';

export type AuthorOptions = {
  email: string;
  github: string;
};

export type CloudinaryOptions = {
  uploadPreset: string;
  cloudId: string;
};

export type DatabaseOptions = {
  url: string;
};

export type OpenStatus = {
  signup: boolean;
};

export type Config = {
  author: AuthorOptions;
  cloudinary: CloudinaryOptions;
  database: DatabaseOptions;
  openStatus: OpenStatus;
};
