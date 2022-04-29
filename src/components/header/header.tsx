import React from 'react';
import NavItem from '../nav-item/nav-item';
import styles from './header.module.css';

type HeaderProps = {
  active: string;
  menus: MenuItem[];
  onLogoClick(): void;
  onMenuClick(name: MenuItem): void;
};

const Header = ({ active, menus, onMenuClick }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.img} src='/images/logo.png' alt='logo' />
        <h1 className={styles.title}>unFace</h1>
      </div>
      <ul className={styles.menu}>
        {menus.map((menu) => (
          <NavItem
            key={menu}
            name={menu}
            activated={menu === active}
            onMenuClick={onMenuClick}
          />
        ))}
      </ul>
    </header>
  );
};

export default Header;
