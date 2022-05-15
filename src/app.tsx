import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { IFileInput } from '.';
import styles from './app.module.css';
// import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';
import WorkDetail from './components/work_detail/work_detail';
import AuthService from './service/auth_service';
import WorkRepository from './service/work_repository';
import { isMenuItem } from './util/checker';

type AppProps = {
  FileInput: typeof IFileInput;
  authService: AuthService;
  workRepository: WorkRepository;
};

const scrollOption: ScrollIntoViewOptions = {
  behavior: 'smooth',
};

const App = ({ FileInput, authService, workRepository }: AppProps) => {
  const menus: MenuItem[] = ['home', 'works', 'contact'];
  const [active, setActive] = useState<MenuItem>('home');
  const [isWorkDetail, setIsWorkDetail] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const aboutRef = useRef<HTMLElement>(null);
  const worksRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const scrollRef = { aboutRef, worksRef, contactRef };

  const navigate = useNavigate();

  const scrollTo = (name: MenuItem) => {
    if (isWorkDetail) {
      onWorkDetailClose(false);
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

  const checkAdmin = async (uid: string): Promise<boolean> => {
    const uids = await workRepository.getAdmins();
    if (uids) {
      const admin = uids[uid];
      return admin;
    }
    return false;
  };

  const onSignClick = async (): Promise<boolean> => {
    if (isLogin) {
      await authService.logout();
      setIsLogin(false);
      isAdmin && setIsAdmin(false);
      return isLogin;
    } else {
      const user = (await authService.login('Google')).user;
      setIsAdmin(await checkAdmin(user.uid));
      setIsLogin(true);
      return isLogin;
    }
  };

  const onLogoClick = () => {
    scrollTo('home');
    setActive('home');
    navigate('/');
  };

  const onMenuClick = (name: MenuItem) => {
    scrollTo(name);
    setActive(name);
  };

  const onWorkClick = (work: WorkData) => {
    if (!work) {
      return;
    }
    setIsWorkDetail(true);
    setActive('works');
    navigate(`/works/${work.title}`);
  };

  const onWorkDetailClose = (byClose = true) => {
    setIsWorkDetail(false);
    navigate('/');
    if (byClose) {
      setTimeout(() => {
        setActive('works');
        scrollTo('works');
      }, 0);
    }
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
        const menuItem = entry.target.id;

        if (!isMenuItem(menuItem)) return;
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

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setIsLogin(true);
        checkAdmin(user.uid).then(setIsAdmin);
      }
    });
  }, [authService]);

  return (
    <div className={styles.container}>
      <Header
        active={active}
        menus={menus}
        isLogin={isLogin}
        onSignClick={onSignClick}
        onLogoClick={onLogoClick}
        onMenuClick={onMenuClick}
      />
      <div className={styles.content}>
        <Routes>
          <Route
            path='/'
            element={
              <Main
                scrollRef={scrollRef}
                isAdmin={isAdmin}
                FileInput={FileInput}
                onWorkClick={onWorkClick}
                workRepository={workRepository}
              />
            }
          />
          <Route
            path='/works/:workTitle'
            element={
              <WorkDetail
                workRepository={workRepository}
                onClose={onWorkDetailClose}
              />
            }
          />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
