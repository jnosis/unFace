declare module '*.module.css';

declare interface IHttpClient {
  fetch(url: string, options: any): Promise<any>;
}

declare type AuthProvider = 'Google' | 'Github';

declare type MenuItem = 'home' | 'works' | 'contact';

declare type Repo = {
  url: string;
  branch: string;
};

declare type Techs = string[];

declare type WorkData = {
  id: string;
  title: string;
  description: string;
  techs: Techs;
  repo: Repo;
  projectURL?: string;
  thumbnail: FileData;
};

declare type WorkInputData = {
  title: string;
  description: string;
  techs: Techs;
  repo: Repo;
  projectURL?: string;
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
