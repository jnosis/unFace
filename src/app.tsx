import React, { useEffect, useRef, useState } from 'react';
import { IFileInput } from '.';
import styles from './app.module.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';
import WorkDetail from './components/work_detail/work_detail';
import AuthService from './service/auth_service';
import WorkRepository from './service/work_repository';

type AppProps = {
  FileInput: typeof IFileInput;
  authService: AuthService;
  workRepository: WorkRepository;
};

const scrollOption: ScrollIntoViewOptions = {
  behavior: 'smooth',
};

const App = ({
  FileInput,
  authService: _authService,
  workRepository,
}: AppProps) => {
  const menus: MenuItem[] = ['home', 'works', 'contact'];
  const [active, setActive] = useState<MenuItem>('home');
  const [isWorkDetail, setIsWorkDetail] = useState<boolean>(false);
  const [work, setWork] = useState<WorkData | null>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const scrollRef = { aboutRef, worksRef, contactRef };

  const scrollTo = (name: MenuItem) => {
    if (isWorkDetail) {
      onWorkDetailClose();
    }

    switch (name) {
      case 'home':
        aboutRef.current?.scrollIntoView(scrollOption);
        break;
      case 'works':
        worksRef.current?.scrollIntoView(scrollOption);
        break;
      case 'contact':
        contactRef.current?.scrollIntoView(scrollOption);
        break;

      default:
        throw new Error(`MenuItem(${name}) is undefined`);
    }
  };

  const onLogoClick = () => {
    scrollTo('home');
    setActive('home');
  };

  const onMenuClick = (name: MenuItem) => {
    scrollTo(name);
    setActive(name);
  };

  const onWorkClick = (work: WorkData) => {
    if (!work) {
      return;
    }
    setWork(work);
    setActive('works');
    setIsWorkDetail(true);
  };

  const onWorkDetailClose = () => {
    setWork(null);
    setIsWorkDetail(false);
  };

  const observerOption: IntersectionObserverInit = {
    root: null,
    threshold: 0.4,
  };

  const switchActive = (menuItem: MenuItem, isUp: boolean) => {
    switch (menuItem) {
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
        throw new Error(`MenuItem(${menuItem}) is undefined`);
    }
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting && entry.intersectionRatio > 0) {
        const menuItem = entry.target.id as MenuItem;

        if (entry.boundingClientRect.y < 0) {
          switchActive(menuItem, false);
        } else {
          switchActive(menuItem, true);
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, observerOption);
    aboutRef.current && observer.observe(aboutRef.current);
    worksRef.current && observer.observe(worksRef.current);
    contactRef.current && observer.observe(contactRef.current);
  }, []);

  return (
    <div className={styles.container}>
      <Header
        active={active}
        menus={menus}
        onLogoClick={onLogoClick}
        onMenuClick={onMenuClick}
      />
      <div className={styles.content}>
        {isWorkDetail || (
          <Main
            scrollRef={scrollRef}
            FileInput={FileInput}
            onWorkClick={onWorkClick}
            workRepository={workRepository}
          />
        )}
        {isWorkDetail && !!work && (
          <WorkDetail work={work} onClose={onWorkDetailClose} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;
