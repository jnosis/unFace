export type ThemeScheme = 'light' | 'dark' | 'system';

export type MenuItem = 'home' | 'works' | 'contact';

export type Repo = {
  url: string;
  branch: string;
};

export type Techs = string[];

export type FileData = {
  name: string;
  url: string;
};

export type PrevFileData = {
  fileName: string;
  fileUrl: string;
};

export type FileDataLike = FileData | PrevFileData;

export type WorkData = {
  id: string;
  title: string;
  description: string;
  techs: Techs;
  repo: Repo;
  projectUrl?: string;
  thumbnail: FileData | PrevFileData;
};

export type WorkDetail = {
  title: string;
  repoUrl: string;
  projectUrl: string;
  techs: Techs;
  readme: string;
};

export type AuthorOptions = {
  email: string;
  github: string;
};

export type DatabaseOptions = {
  url: string;
};

export type Config = {
  author: AuthorOptions;
  database: DatabaseOptions;
};
