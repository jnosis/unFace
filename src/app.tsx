import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import styles from './app.module.css';

const queryClient = new QueryClient();

export default function App() {
  const menus: MenuItem[] = ['home', 'works', 'contact'];
  const [active, setActive] = useState<MenuItem>('home');

  const handleMenuClick = (name: MenuItem) => {
    setActive(name);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.container}>
        <Header menus={menus} active={active} onMenuClick={handleMenuClick} />
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
