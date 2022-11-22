import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useScrolls } from './hooks/use_scroll';
import Header from './components/header/header';
import styles from './app.module.css';

const queryClient = new QueryClient();

export default function App() {
  const menus: MenuItem[] = ['home', 'works', 'contact'];
  const [active, setActive] = useState<MenuItem>('home');
  const {
    home: [aboutRef, scrollToAbout],
    works: [worksRef, scrollToWorks],
    contact: [contactRef, scrollToContact],
  } = useScrolls<MenuItem, HTMLElement>(['home', 'works', 'contact']);
  const scrollRef = { aboutRef, worksRef, contactRef };

  const scrollTo = (name: MenuItem) => {
    switch (name) {
      case 'home':
        scrollToAbout();
        break;
      case 'works':
        scrollToWorks();
        break;
      case 'contact':
        scrollToContact();
        break;
      default:
        throw new Error(`MenuItem(${name}) is undefined`);
    }
  };

  const handleMenuClick = (name: MenuItem) => {
    setActive(name);
    scrollTo(name);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <Header menus={menus} active={active} onMenuClick={handleMenuClick} />
        <Outlet context={scrollRef} />
        <ScrollRestoration
          getKey={(location) =>
            ['/'].includes(location.pathname) && !location.state?.scrollToTop
              ? location.pathname
              : location.key
          }
        />
      </div>
    </QueryClientProvider>
  );
}
