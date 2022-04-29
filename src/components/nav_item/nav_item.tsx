import React from 'react';
import styles from './nav_item.module.css';

type NavItemProps = {
  name: MenuItem;
  activated: boolean;
  onMenuClick(name: MenuItem): void;
};

const NavItem = ({ name, activated, onMenuClick }: NavItemProps) => {
  const onClick = () => {
    onMenuClick(name);
  };

  const className = activated ? `${styles.item} ${styles.active}` : styles.item;
  return (
    <li className={className} onClick={onClick}>
      {name.toUpperCase()}
    </li>
  );
};

export default NavItem;
