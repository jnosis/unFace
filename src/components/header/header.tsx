import React, { useEffect, useState } from 'react';
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
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }, []);

  return (
    <header
      className={`${styles.header}${isScrolled ? ` ${styles.scrolled}` : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.logo} onClick={onLogoClick}>
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
      </div>
    </header>
  );
};

export default Header;
