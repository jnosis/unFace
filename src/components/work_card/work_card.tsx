import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth_context';
import { useMenuContext } from '../../context/menu_context';
import useWorks from '../../hooks/use_works';
import Tech from '../tech/tech';
import Action from '../action/action';
import styles from './work_card.module.css';

type WorkCardProps = {
  work: WorkData;
  onEdit(work: WorkData): void;
};

function WorkCard({ work, onEdit }: WorkCardProps) {
  const { userToken } = useAuthContext();
  const { deleteWork } = useWorks();

  const { thumbnail, title, description, techs } = work;
  const fileUrl = thumbnail?.fileURL;

  const navigate = useNavigate();
  const { setActive } = useMenuContext();

  const handleClick = () => {
    navigate(`/works/${work.title}`);
    setActive('works');
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onEdit(work);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteWork.mutate(work);
  };

  return (
    <li className={styles.container} onClick={handleClick}>
      <img
        className={styles.thumbnail}
        src={fileUrl || './images/default.jpg'}
        alt='work thumbnail'
      />
      <div
        className={`${styles.content}${userToken ? ` ${styles.admin}` : ''}`}
      >
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <ul className={styles.techs}>
          {techs.map((tech, index) => (
            <Tech key={index} name={tech} selected={false} />
          ))}
        </ul>
      </div>
      {userToken && (
        <ul className={styles.actions}>
          <li>
            <Action
              type='button'
              title='Edit'
              isDisable={false}
              onClick={handleEdit}
            />
          </li>
          <li>
            <Action
              type='button'
              title='Delete'
              isDisable={false}
              onClick={handleDelete}
            />
          </li>
        </ul>
      )}
    </li>
  );
}

export default WorkCard;
