import React from 'react';
import styles from './work.module.css';

type WorkProps = {
  work: WorkData;
  isAdmin: boolean;
  onWorkClick(work: WorkData): void;
  onDelete(work: WorkData): void;
};

const Work = ({ work, isAdmin, onWorkClick, onDelete }: WorkProps) => {
  const { thumbnail } = work;
  const fileURL = thumbnail?.fileURL;
  return (
    <>
      <div onClick={() => onWorkClick(work)}>
        <img
          className={styles.thumbnail}
          src={fileURL ? fileURL : './images/profile.jpg'}
          alt='work thumbnail'
        />
        <h1 className={styles.title}>{work.title}</h1>
        <p className={styles.description}>{work.description}</p>
      </div>
      {isAdmin && (
        <button className={styles.delete} onClick={() => onDelete(work)}>
          X
        </button>
      )}
    </>
  );
};

export default Work;
