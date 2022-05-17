import React, { forwardRef, useEffect, useState } from 'react';
import { IFileInput } from '../..';
import WorkRepository from '../../service/work_repository';
import AddWorkForm from '../add_work_form/add_work_form';
import Work from '../work/work';
import styles from './works.module.css';

type WorksProps = {
  isAdmin: boolean;
  FileInput: typeof IFileInput;
  onWorkClick(work: WorkData): void;
  workRepository: WorkRepository;
};

const Works = forwardRef<HTMLElement, WorksProps>(
  ({ isAdmin, FileInput, onWorkClick, workRepository }, scrollRef) => {
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
    }, []);

    const addWork = (work: WorkData) => {
      setWorks((works) => {
        return { ...works, [work.id]: work };
      });
      workRepository.saveWork(work);
      setIsAdd(false);
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
      <section ref={scrollRef} className={styles.container} id='works'>
        <div className={styles.content}>
          <h1 className={styles.title}>Works</h1>
          <ul className={styles.list}>
            {Object.keys(works).map((key) => (
              <li className={styles.card}>
                <Work
                  key={key}
                  work={works[key]}
                  onWorkClick={onWorkClick}
                  onDelete={deleteWork}
                />
              </li>
            ))}
            {isAdmin && (
              <li className={styles.card}>
                {!isAdd ? (
                  <button //
                    className={styles.add}
                    onClick={() => setIsAdd(true)}
                  >
                    +
                  </button>
                ) : (
                  <button
                    className={styles.close}
                    onClick={() => setIsAdd(false)}
                  >
                    x
                  </button>
                )}
                {isAdd && <AddWorkForm FileInput={FileInput} onAdd={addWork} />}
              </li>
            )}
          </ul>
        </div>
      </section>
    );
  }
);

export default Works;
