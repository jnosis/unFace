import React from 'react';
import Actions from '../actions/actions';
import Tech from '../tech/tech';
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
        <p className={styles.description}>{work.description}</p>
        <ul
          className={`
            ${styles.techs}
            ${isAdmin ? ` ${styles.admin}` : ''}
          `}
        >
          {Object.keys(work.techs)
            .filter((key) => work.techs[key] !== '')
            .map((key) => (
              <li key={key}>
                <Tech tech={work.techs[key]} selected={false} />
              </li>
            ))}
        </ul>
      </div>
      {isAdmin && (
        <Actions
          actions={[
            {
              type: 'button',
              title: 'Delete',
              isDisable: false,
              onClick: onDelete,
            },
          ]}
        />
      )}
    </div>
  );
};

export default Work;
