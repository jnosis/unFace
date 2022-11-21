import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import styles from './app.module.css';

export default function App() {
  const menus: MenuItem[] = ['home', 'works', 'contact'];
  const [active, setActive] = useState<MenuItem>('home');

  const handleMenuClick = (name: MenuItem) => {
    setActive(name);
  };

  return (
    <div className={styles.container}>
      <Header menus={menus} active={active} onMenuClick={handleMenuClick} />
      <Outlet />
    </div>
  );
}
