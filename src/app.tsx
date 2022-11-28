import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import useScrolls from './hooks/use_scrolls';
import { useMenuContext } from './context/menu_context';
import { AuthContextProvider } from './context/auth_context';
import { TechContextProvider } from './context/tech_context';
import { isMenuItem } from './util/checker';
import Header from './components/header/header';
import styles from './app.module.css';

const queryClient = new QueryClient();

export default function App() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const menus: MenuItem[] = ['home', 'works', 'contact'];
  const { active, setActive, switchActiveWhenScrolled } = useMenuContext();
  const {
    home: [aboutRef, scrollIntoAbout],
    works: [worksRef, scrollIntoWorks],
    contact: [contactRef, scrollIntoContact],
  } = useScrolls<MenuItem, HTMLElement>(['home', 'works', 'contact'], {
    threshold: 0.4,
    root: null,
    onChange: (entry) => {
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        const menu = entry.target.id;
        if (!isMenuItem(menu)) return;
        if (entry.boundingClientRect.y < 0) {
          switchActiveWhenScrolled(menu, false);
        } else {
          switchActiveWhenScrolled(menu, true);
        }
      }
    },
  });
  const scrollRef = { aboutRef, worksRef, contactRef };

  const scrollInto = (name: MenuItem) => {
    switch (name) {
      case 'home':
        scrollIntoAbout();
        break;
      case 'works':
        scrollIntoWorks();
        break;
      case 'contact':
        scrollIntoContact();
        break;
      default:
        throw new Error(`MenuItem(${name}) is undefined`);
    }
  };

  const handleMenuClick = (name: MenuItem) => {
    if (pathname !== '/') navigate('/', { state: { scrollInto: name } });
    setActive(name);
    scrollInto(name);
  };

  useEffect(() => {
    if (isMenuItem(state?.scrollInto)) {
      setActive(state.scrollInto);
      scrollInto(state.scrollInto);
    }
  }, [state]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <div className={styles.container}>
          <Header menus={menus} active={active} onMenuClick={handleMenuClick} />
          <TechContextProvider>
            <Outlet context={scrollRef} />
          </TechContextProvider>
          <ScrollRestoration
            getKey={(location) =>
              ['/'].includes(location.pathname) && !location.state?.scrollToTop
                ? location.pathname
                : location.key
            }
          />
        </div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
