export type MenuItem = 'home' | 'works' | 'contact';

export type Repo = {
  url: string;
  branch: string;
};

export type Techs = string[];

export type FileData = {
  fileName: string;
  fileUrl: string;
};

export type WorkData = {
  id: string;
  title: string;
  description: string;
  techs: Techs;
  repo: Repo;
  projectUrl?: string;
  thumbnail: FileData;
};

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
