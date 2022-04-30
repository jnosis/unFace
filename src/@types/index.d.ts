declare module '*.module.css';

declare type AuthProvider = 'Google' | 'Github';

declare type MenuItem = 'home' | 'works' | 'contact';

declare type WorkData = {
  id: number;
  url: string;
  title: string;
  description: string;
  thumbnail: string | null;
};
