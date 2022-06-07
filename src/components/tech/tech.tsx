import React from 'react';
import styles from './tech.module.css';

type TechProps = {
  tech: string;
  selected: boolean;
  onTechClick?(tech: string): void;
};

const Tech = ({ tech, selected, onTechClick }: TechProps) => {
  return (
    <div
      className={`${styles.chip}${selected ? ` ${styles.selected}` : ''}${
        !!onTechClick ? ` ${styles.clickable}` : ''
      }`}
      onClick={onTechClick && (() => onTechClick(tech))}
    >
      {tech}
    </div>
  );
};

export default Tech;
