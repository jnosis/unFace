import React, { useState } from 'react';
import styles from './app.module.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';
import WorkDetail from './components/work_detail/work_detail';

type AppProps = {};

const App = (props: AppProps) => {
  console.log(props);

  const menus: MenuItem[] = ['home', 'works', 'contact'];
  const [active, setActive] = useState<MenuItem>('home');
  const [isWorkDetail, setIsWorkDetail] = useState<boolean>(false);
  const [work, setWork] = useState<WorkData | null>(null);

  const scrollTo = (name: MenuItem) => {
    console.log(name);
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
    console.log(work);
    if (!work) {
      return;
    }
    setWork(work);
    setIsWorkDetail(true);
  };
  const onWorkDetailClose = () => {
    setWork(null);
    setIsWorkDetail(false);
  };

  return (
    <div className={styles.container}>
      <Header
        active={active}
        menus={menus}
        onLogoClick={onLogoClick}
        onMenuClick={onMenuClick}
      />
      {isWorkDetail || <Main onWorkClick={onWorkClick} />}
      {isWorkDetail && !!work && (
        <WorkDetail work={work} onClose={onWorkDetailClose} />
      )}
      <Footer />
    </div>
  );
};

export default App;
