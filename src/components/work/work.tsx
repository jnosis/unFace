import React from 'react';
import Actions from '../actions/actions';
import Tech from '../tech/tech';
import styles from './work.module.css';

type WorkProps = {
  work: WorkData;
  isAdmin: boolean;
  editWork(work: WorkData): void;
  deleteWork(work: WorkData): void;
  onWorkClick(work: WorkData): void;
};

const Work = ({
  work,
  isAdmin,
  editWork,
  deleteWork,
  onWorkClick,
}: WorkProps) => {
  const { thumbnail } = work;
  const fileURL = thumbnail?.fileURL;

  const onEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    editWork(work);
  };

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
          {work.techs
            .filter((tech) => tech !== '')
            .map((tech, index) => (
              <li key={index}>
                <Tech tech={tech} selected={false} />
              </li>
            ))}
        </ul>
      </div>
      {isAdmin && (
        <Actions
          actions={[
            {
              type: 'button',
              title: 'Edit',
              isDisable: false,
              onClick: onEdit,
            },
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
