import React from 'react';
import styles from './work.module.css';

type WorkProps = {
  work: WorkData;
  isAdmin: boolean;
  deleteWork(work: WorkData): void;
  onWorkClick(work: WorkData): void;
};

const Work = ({ work, isAdmin, deleteWork, onWorkClick }: WorkProps) => {
  const { thumbnail } = work;
  const fileURL = thumbnail?.fileURL;

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    deleteWork(work);
  };

  return (
    <div className={styles.container} onClick={() => onWorkClick(work)}>
      <img
        className={styles.thumbnail}
        src={fileURL ? fileURL : './images/default.jpg'}
        alt='work thumbnail'
      />
      <div className={styles.content}>
        <h1 className={styles.title}>{work.title}</h1>
        <p
          className={`
            ${styles.description}
            ${isAdmin ? ` ${styles.admin}` : ''}
          `}
        >
          {work.description}
        </p>
      </div>
      {isAdmin && (
        <div className={styles.actions}>
          <button className={styles.delete} onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Work;
