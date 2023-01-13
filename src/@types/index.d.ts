declare module '*.module.css';

declare interface IHttpClient {
  fetch<Data>(url: string, options: RequestInit): Promise<Data>;
}

declare type UserInfo = {
  username: string;
  password: string;
  name: string;
  email: string;
};

declare type LoginInfo = Pick<UserInfo, 'username' | 'password'>;

declare type UserToken = {
  token: string;
  username: string;
};

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

declare type WorkInputData = Omit<WorkData, 'id'>;

type WorksDatabase = Record<string, WorkData>;

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
  onClick?(event: any): void;
};
