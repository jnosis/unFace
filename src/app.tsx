import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { useScrolls } from './hooks/use_scroll';
import useIntersectionObserver from './hooks/use_intersection_observer';
import { isMenuItem } from './util/checker';
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

  const switchActive = (menu: MenuItem, isUp: boolean) => {
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

  const handleMenuClick = (name: MenuItem) => {
    setActive(name);
    scrollTo(name);
  };

  Object.values(scrollRef).map((ref) =>
    useIntersectionObserver(ref, {
      threshold: 0.4,
      root: null,
      onChange: (entry) => {
        const menu = entry.target.id;
        console.log(menu, entry.isIntersecting, entry.intersectionRatio);
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
          console.log(menu, entry.isIntersecting, entry.intersectionRatio);
          if (!isMenuItem(menu)) return;
          if (entry.boundingClientRect.y < 0) {
            switchActive(menu, false);
          } else {
            switchActive(menu, true);
          }
        }
      },
    })
  );

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const bottom =
        Math.ceil(window.scrollY + window.innerHeight) >=
        document.body.clientHeight;

      if (bottom) {
        setActive('contact');
      }
    });
  }, []);

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
