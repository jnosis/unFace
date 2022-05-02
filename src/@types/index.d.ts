declare module '*.module.css';

declare type AuthProvider = 'Google' | 'Github';

declare type MenuItem = 'home' | 'works' | 'contact';

declare type WorkData = {
  id: number;
  url: string;
  branch: string;
  title: string;
  description: string;
  thumbnail: FileData | null;
};

type WorksDatabase = { [id: string]: WorkData };

declare type FileData = {
  fileName: string | null;
  fileURL: string | null;
};

declare type CloudinaryData = {
  original_filename: string;
  url: string;
};
