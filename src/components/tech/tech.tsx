import React from 'react';
import styles from './tech.module.css';

type TechProps = {
  name: string;
  selected: boolean;
  onClick?(tech: string): void;
};

function Tech({ name, selected, onClick }: TechProps) {
  return (
    <li
      className={`${styles.chip}${selected ? ` ${styles.selected}` : ''}${
        !!onClick ? ` ${styles.clickable}` : ''
      }`}
      onClick={onClick && (() => onClick(name))}
    >
      {name}
    </li>
  );
}

export default Tech;
