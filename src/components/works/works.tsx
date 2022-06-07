import React, { forwardRef, useEffect, useState } from 'react';
import { IFileInput } from '../..';
import WorkRepository from '../../service/work_repository';
import AddWorkForm from '../add_work_form/add_work_form';
import Tech from '../tech/tech';
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
    const [techs, setTechs] = useState<Techs>({});
    const [selected, setSelected] = useState<string>('');
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

    useEffect(() => {
      let techsArray: string[] = [];
      Object.keys(works).forEach((key) => {
        const temp = works[key].techs;
        Object.keys(temp).forEach((key) => {
          if (!techsArray.includes(temp[key])) {
            techsArray = [...techsArray, temp[key]];
          }
        });
      });

      let temp = { ...techs };
      temp = techsArray.reduce((obj, tech, index) => {
        obj[index] = tech;
        return obj;
      }, temp);

      setTechs(temp);
    }, [works]);

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

    const onCancel = () => {
      setIsAdd(false);
    };

    const selectTech = (tech: string) => {
      tech === selected ? setSelected('') : setSelected(tech);
    };

    return (
      <section ref={scrollRef} className={styles.container} id='works'>
        <div className={styles.content}>
          <h1 className={styles.title}>Works</h1>
          <ul className={styles.techs}>
            {Object.keys(techs).map((key) => (
              <li key={key} className={styles.tech}>
                <Tech
                  tech={techs[key]}
                  selected={selected === techs[key]}
                  onTechClick={selectTech}
                />
              </li>
            ))}
          </ul>
          <ul className={styles.list}>
            {Object.keys(works)
              .filter((key) =>
                selected === ''
                  ? true
                  : Object.keys(works[key].techs)
                      .map((k) => works[key].techs[k])
                      .includes(selected)
              )
              .map((key) => (
                <li key={key} className={styles.card}>
                  <Work
                    work={works[key]}
                    isAdmin={isAdmin}
                    deleteWork={deleteWork}
                    onWorkClick={onWorkClick}
                  />
                </li>
              ))}
            {isAdmin && (
              <li
                className={
                  isAdd ? `${styles.card} ${styles.form}` : styles.card
                }
              >
                {!isAdd && (
                  <button //
                    className={styles.add}
                    onClick={() => setIsAdd(true)}
                  >
                    +
                  </button>
                )}
                {isAdd && (
                  <AddWorkForm
                    FileInput={FileInput}
                    onAdd={addWork}
                    onCancel={onCancel}
                  />
                )}
              </li>
            )}
          </ul>
        </div>
      </section>
    );
  }
);

export default Works;
