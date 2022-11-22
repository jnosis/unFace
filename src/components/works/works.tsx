import React, { forwardRef } from 'react';
import useWorks from '../../hooks/use_works';
import { useTechContext } from '../../context/tech_Context';
import Tech from '../tech/tech';
import WorkCard from '../work_card/work_card';
import styles from './works.module.css';

const Works = forwardRef<HTMLElement>((_, scrollRef) => {
  const {
    worksQuery: { data: works },
  } = useWorks();
  const { selected, setSelected } = useTechContext();

  const techs = works && [...new Set(works.map((work) => work.techs).flat())];

  const handleTechClick = (tech: string) => {
    tech === selected ? setSelected('') : setSelected(tech);
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
            .map((work) => <WorkCard key={work.id} work={work} />)}
      </ul>
    </section>
  );
});

export default Works;
