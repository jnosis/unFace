declare module '*.module.css';

declare type MenuItem = 'home' | 'works' | 'contact';

declare type WorkData = {
  id: number;
  title: string;
  description: string;
  thumbnail: string | null;
};
