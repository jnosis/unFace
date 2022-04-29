import React from 'react';
import styles from './work.module.css';

type WorkProps = {
  work: WorkData;
  onWorkClick(work: WorkData): void;
};

const Work = ({ work, onWorkClick }: WorkProps) => {
  return (
    <li className={styles.work} onClick={() => onWorkClick(work)}>
      <img className={styles.thumbnail} src='' alt='work thumbnail' />
      <h1 className={styles.title}>{work.title}</h1>
      <p className={styles.description}>{work.description}</p>
    </li>
  );
};

export default Work;
