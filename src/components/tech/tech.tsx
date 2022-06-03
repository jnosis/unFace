import React from 'react';
import styles from './tech.module.css';

type TechProps = {
  tech: string;
  onTechClick?(tech: string): void;
};

const Tech = ({ tech, onTechClick }: TechProps) => {
  return (
    <div
      className={styles.chip}
      onClick={onTechClick && (() => onTechClick(tech))}
    >
      {tech}
    </div>
  );
};

export default Tech;
