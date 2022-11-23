import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../context/dark_mode_context';
import { useMenuContext } from '../../context/menu_context';
import NavItem from '../nav_item/nav_item';
import styles from './header.module.css';

type HeaderProps = {
  menus: MenuItem[];
  active: MenuItem;
  onMenuClick(name: MenuItem): void;
};

function Header({ menus, active, onMenuClick }: HeaderProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { isScrolled } = useMenuContext();

  return (
    <header
      className={`${styles.header}${isScrolled ? ` ${styles.scrolled}` : ''}`}
    >
      <Link to='/' state={{ scrollToTop: true }} className={styles.logo}>
        <h1 className={styles.title}>unFace</h1>
      </Link>
      <nav>
        <ul className={styles.menu}>
          <li className={styles.toggle} onClick={toggleDarkMode}>
            <div style={{ display: darkMode ? 'none' : 'block' }}>
              <i className={'fa-solid fa-sun'} />
            </div>
            <div style={{ display: darkMode ? 'block' : 'none' }}>
              <i className={'fa-solid fa-moon'} />
            </div>
          </li>
          {menus.map((menu, index) => (
            <NavItem
              key={index}
              name={menu}
              activated={menu === active}
              onMenuClick={onMenuClick}
            />
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
