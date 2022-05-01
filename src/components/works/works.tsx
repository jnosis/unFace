import React, { useEffect, useState } from 'react';
import { IFileInput } from '../..';
import WorkRepository from '../../service/work_repository';
import AddWorkForm from '../add_work_form/add_work_form';
import Work from '../work/work';
import styles from './works.module.css';

type WorksProps = {
  FileInput: typeof IFileInput;
  onWorkClick(work: WorkData): void;
  workRepository: WorkRepository;
};

const Works = ({ FileInput, onWorkClick, workRepository }: WorksProps) => {
  const [works, setWorks] = useState<WorksDatabase>({});
  const [isAdd, setIsAdd] = useState<boolean>(false);

  useEffect(() => {
    const stopSync = () =>
      workRepository.syncWorks((works: WorksDatabase) => {
        setWorks(works);
      });

    return () => {
      stopSync();
    };
  });

  const addWork = (work: WorkData) => {
    setWorks((works) => {
      return { ...works, [work.id]: work };
    });
    workRepository.saveWork(work);
  };

  const deleteWork = (work: WorkData) => {
    setWorks((works) => {
      const updated = { ...works };
      delete updated[work.id];
      return updated;
    });
    workRepository.deleteWork(work);
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Works</h1>
      <ul className={styles.list}>
        {Object.keys(works).map((key) => (
          <Work
            key={key}
            work={works[key]}
            onWorkClick={onWorkClick}
            onDelete={deleteWork}
          />
        ))}
        <li>
          {isAdd || <button onClick={() => setIsAdd(!isAdd)}>+</button>}
          {isAdd && <AddWorkForm FileInput={FileInput} onAdd={addWork} />}
        </li>
      </ul>
    </section>
  );
};

export default Works;
