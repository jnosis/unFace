import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { IFileInput } from '.';
import styles from './app.module.css';
import Header from './components/header/header';
import Login from './components/login/login';
import Main from './components/main/main';
import WorkDetail from './components/work_detail/work_detail';
import AuthService from './service/auth';
import WorkService from './service/work';
import { isMenuItem } from './util/checker';

type AppProps = {
  FileInput: typeof IFileInput;
  authService: AuthService;
  workRepository: WorkService;
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
  const [userToken, setUserToken] = useState<UserToken | null>(null);
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

  const onSignClick = async (user?: LoginInfo) => {
    if (isLogin) {
      await authService.logout();
      setUserToken(null);
      navigate('/');
      return;
    }
    if (!user) {
      setUserToken(null);
      return;
    }
    const token = await authService.login(user);
    if (!token) {
      setUserToken(null);
      return;
    }
    setUserToken(token);
    navigate('/');
  };

  const onSignup = async (user: UserInfo) => {
    if (isLogin) {
      return;
    }

    const token = await authService.signup(user);

    if (token) {
      setUserToken(token);
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
    navigate(`/works/${work.title}`);
    setTimeout(() => {
      setActive('works');
    }, 0);
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

  const onBottom = () => {
    const bottom =
      Math.ceil(window.scrollY + window.innerHeight) >=
      document.body.clientHeight;

    if (bottom) {
      setActive('contact');
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, observerOption);
    aboutRef.current && observer.observe(aboutRef.current);
    worksRef.current && observer.observe(worksRef.current);
    contactRef.current && observer.observe(contactRef.current);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onBottom);
  }, []);

  useEffect(() => {
    authService
      .me()
      .then((token) => {
        if (token) {
          setUserToken(token);
        }
      })
      .catch(() => setUserToken(null));
  }, [authService]);

  useEffect(() => {
    const isLoginAndAdmin = !!userToken;
    setIsLogin(isLoginAndAdmin);
    setIsAdmin(isLoginAndAdmin);
  }, [userToken]);

  return (
    <div className={styles.container}>
      <Header
        active={active}
        menus={menus}
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
          <Route
            path='/login'
            element={<Login isLogin={isLogin} onSignClick={onSignClick} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
