import React, { useState } from 'react';
import styles from './app.module.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';

type AppProps = {};

const App = (props: AppProps) => {
  console.log(props);

  const menus: MenuItem[] = ['home', 'works', 'contact'];
  const [active, setActive] = useState<MenuItem>('home');

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
  };

  return (
    <div className={styles.container}>
      <Header
        active={active}
        menus={menus}
        onLogoClick={onLogoClick}
        onMenuClick={onMenuClick}
      />
      <Main onWorkClick={onWorkClick} />
      <Footer />
    </div>
  );
};

export default App;
