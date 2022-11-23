import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type MenuContextType = {
  isScrolled: boolean;
  active: MenuItem;
  setActive: React.Dispatch<React.SetStateAction<MenuItem>>;
  switchActiveWhenScrolled(menu: MenuItem, isUp: boolean): void;
};

const MenuContext = createContext<MenuContextType>({
  isScrolled: false,
  active: 'home',
  setActive: () => {},
  switchActiveWhenScrolled: () => {},
});

export function MenuContextProvider({ children }: PropsWithChildren) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [active, setActive] = useState<MenuItem>('home');

  const switchActiveWhenScrolled = (menu: MenuItem, isUp: boolean) => {
    switch (menu) {
      case 'home':
        if (isUp) {
          setActive('home');
        } else {
          setActive('works');
        }
        break;
      case 'works':
        if (isUp) {
          setActive('home');
        } else {
          setActive('contact');
        }
        break;
      case 'contact':
        if (isUp) {
          setActive('works');
        } else {
          setActive('contact');
        }
        break;

      default:
        throw new Error(`MenuItem(${menu}) is undefined`);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      const {
        location: { pathname },
      } = e.target as Document;
      const bottom =
        Math.ceil(window.scrollY + window.innerHeight) >=
        document.body.clientHeight;
      const top = Math.ceil(window.scrollY) === 0;

      if (pathname === '/' && bottom) {
        setActive('contact');
      } else if (pathname === '/' && top) {
        setActive('home');
      }
    });
  }, []);

  return (
    <MenuContext.Provider
      value={{ isScrolled, active, setActive, switchActiveWhenScrolled }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  return useContext(MenuContext);
}
