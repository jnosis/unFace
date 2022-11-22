import React, { useState } from 'react';
import useWorks from '../../hooks/use_works';
import Tech from '../tech/tech';
import WorkCard from '../work_card/work_card';
import styles from './works.module.css';

type WorksProps = {};

function Works({}: WorksProps) {
  const {
    worksQuery: { data: works },
  } = useWorks();
  const [selectedTech, setSelectedTech] = useState('');

  const techs = works && [...new Set(works.map((work) => work.techs).flat())];

  const handleTechClick = (tech: string) => {
    tech === selectedTech ? setSelectedTech('') : setSelectedTech(tech);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Works</h1>
      <ul className={styles.techs}>
        {techs &&
          techs.map((tech, index) => (
            <Tech
              key={index}
              name={tech}
              selected={selectedTech === tech}
              onClick={handleTechClick}
            />
          ))}
      </ul>
      <ul className={styles.list}>
        {works &&
          works
            .filter((work) =>
              !selectedTech ? true : work.techs.includes(selectedTech)
            )
            .map((work) => <WorkCard key={work.id} work={work} />)}
      </ul>
    </section>
  );
}

export default Works;
