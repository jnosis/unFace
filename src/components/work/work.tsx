import React from 'react';
import styles from './work.module.css';

type WorkProps = {
  work: WorkData;
  onWorkClick(work: WorkData): void;
  onDelete(work: WorkData): void;
};

const Work = ({ work, onWorkClick, onDelete }: WorkProps) => {
  return (
    <li className={styles.work}>
      <div onClick={() => onWorkClick(work)}>
        <img className={styles.thumbnail} src='' alt='work thumbnail' />
        <h1 className={styles.title}>{work.title}</h1>
        <p className={styles.description}>{work.description}</p>
      </div>
      <button onClick={() => onDelete(work)}>X</button>
    </li>
  );
};

export default Work;
