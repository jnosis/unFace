import React from 'react';
import { Link } from 'react-router-dom';
import { useMenuContext } from '../../context/menu_context';
import ThemeToggler from '../theme_toggler/theme_toggler';
import NavItem from '../nav_item/nav_item';
import styles from './header.module.css';

type HeaderProps = {
  menus: MenuItem[];
  active: MenuItem;
  onMenuClick(name: MenuItem): void;
};

function Header({ menus, active, onMenuClick }: HeaderProps) {
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
          <li>
            <ThemeToggler />
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
