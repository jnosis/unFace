import React from 'react';
import styles from './nav_item.module.css';

type NavItemProps = {
  name: MenuItem;
  activated: boolean;
  onMenuClick(name: MenuItem): void;
};

function NavItem({ name, activated, onMenuClick }: NavItemProps) {
  const handleClick = () => onMenuClick(name);

  const menuClass = activated
    ? `${styles.item} ${styles.active}`
    : `${styles.item} ${styles.inactive}`;

  return (
    <li className={menuClass} onClick={handleClick}>
      {name.toUpperCase()}
    </li>
  );
}

export default NavItem;
