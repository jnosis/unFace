import React, { useState } from 'react';
import Work from '../work/work';
import styles from './works.module.css';

type WorksProps = {
  onWorkClick(work: WorkData): void;
};

const Works = ({ onWorkClick }: WorksProps) => {
  const [works, _setWorks] = useState<WorkData[]>([
    {
      id: 1,
      url: 'https://raw.githubusercontent.com/jnosis/unMute/MV2/README.md',
      title: '1',
      description: 'example',
      thumbnail: null,
    },
    {
      id: 2,
      url: 'https://raw.githubusercontent.com/jnosis/unMute/MV2/README.md',
      title: '2',
      description: 'example',
      thumbnail: null,
    },
    {
      id: 3,
      url: 'https://raw.githubusercontent.com/jnosis/unMute/MV2/README.md',
      title: '3',
      description: 'example',
      thumbnail: null,
    },
  ]);

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Works</h1>
      <ul className={styles.list}>
        {works.map((work) => (
          <Work key={work.id} work={work} onWorkClick={onWorkClick} />
        ))}
      </ul>
    </section>
  );
};

export default Works;
