import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuContext } from '../../context/menu_context';
import Tech from '../tech/tech';
import styles from './work_card.module.css';

type WorkCardProps = {
  work: WorkData;
};

function WorkCard({ work }: WorkCardProps) {
  const { thumbnail, title, description, techs } = work;
  const fileUrl = thumbnail?.fileURL;

  const navigate = useNavigate();
  const { setActive } = useMenuContext();

  const handleClick = () => {
    navigate(`/works/${work.title}`);
    setActive('works');
  };

  return (
    <li className={styles.container} onClick={handleClick}>
      <img
        className={styles.thumbnail}
        src={fileUrl || './images/default.jpg'}
        alt='work thumbnail'
      />
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <ul className={styles.techs}>
          {techs.map((tech, index) => (
            <Tech key={index} name={tech} selected={false} />
          ))}
        </ul>
      </div>
    </li>
  );
}

export default WorkCard;
