declare module '*.module.css';

declare type AuthProvider = 'Google' | 'Github';

declare type MenuItem = 'home' | 'works' | 'contact';

declare type WorkData = {
  id: number;
  repo: string;
  branch: string;
  title: string;
  description: string;
  thumbnail: FileData;
};

type WorksDatabase = { [id: string]: WorkData };

declare type FileData = {
  fileName: string;
  fileURL: string;
};

declare type CloudinaryData = {
  original_filename: string;
  url: string;
};

declare type Action = {
  type: 'button' | 'submit' | 'reset';
  title: string;
  isDisable: boolean;
  onClick(event: any): void;
};
