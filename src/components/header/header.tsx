import React from 'react';
import NavItem from '../nav_item/nav_item';
import styles from './header.module.css';

type HeaderProps = {
  active: string;
  menus: MenuItem[];
  isLogin: boolean;
  onSignClick(): Promise<boolean>;
  onLogoClick(): void;
  onMenuClick(name: MenuItem): void;
};

const Header = ({
  active,
  menus,
  isLogin,
  onSignClick,
  onLogoClick,
  onMenuClick,
}: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={onLogoClick}>
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
      {false && (
        <button onClick={onSignClick}>
          {isLogin ? 'sign out' : 'sign in'}
        </button>
      )}
    </header>
  );
};

export default Header;
