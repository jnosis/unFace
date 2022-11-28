import React, { forwardRef, useState } from 'react';
import useWorks from '../../hooks/use_works';
import { useAuthContext } from '../../context/auth_context';
import { useTechContext } from '../../context/tech_context';
import Tech from '../tech/tech';
import WorkCard from '../work_card/work_card';
import EditWorkForm from '../edit_work_form/edit_work_form';
import styles from './works.module.css';

const Works = forwardRef<HTMLElement>((_, scrollRef) => {
  const { userToken } = useAuthContext();
  const {
    worksQuery: { data: works },
  } = useWorks();
  const { selected, setSelected } = useTechContext();

  const [target, setTarget] = useState<WorkData | null>(null);

  const techs = works && [...new Set(works.map((work) => work.techs).flat())];

  const handleTechClick = (tech: string) => {
    tech === selected ? setSelected('') : setSelected(tech);
  };

  const handleEdit = (work: WorkData) => {
    setTarget(work);
  };

  const handleCancel = () => {
    setTarget(null);
  };

  return (
    <section ref={scrollRef} className={styles.container} id='works'>
      <h1 className={styles.title}>Works</h1>
      <ul className={styles.techs}>
        {techs &&
          techs.map((tech, index) => (
            <Tech
              key={index}
              name={tech}
              selected={selected === tech}
              onClick={handleTechClick}
            />
          ))}
      </ul>
      <ul className={styles.list}>
        {works &&
          works
            .filter((work) =>
              !selected ? true : work.techs.includes(selected)
            )
            .map((work) =>
              userToken && target?.title === work.title ? (
                <EditWorkForm
                  key={work.id}
                  work={work}
                  onCancel={handleCancel}
                />
              ) : (
                <WorkCard key={work.id} work={work} onEdit={handleEdit} />
              )
            )}
      </ul>
    </section>
  );
});

export default Works;
