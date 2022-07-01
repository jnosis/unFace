import React, { forwardRef, useEffect, useState } from 'react';
import { IFileInput } from '../..';
import WorkRepository from '../../service/work_repository';
import AddWorkForm from '../add_work_form/add_work_form';
import EditWorkForm from '../edit_work_form/edit_work_form';
import Tech from '../tech/tech';
import Work from '../work/work';
import '../../../public/images/default.jpg';
import styles from './works.module.css';

type WorksProps = {
  isAdmin: boolean;
  FileInput: typeof IFileInput;
  onWorkClick(work: WorkData): void;
  workRepository: WorkRepository;
};

const Works = forwardRef<HTMLElement, WorksProps>(
  ({ isAdmin, FileInput, onWorkClick, workRepository }, scrollRef) => {
    const [works, setWorks] = useState<WorkData[]>([]);
    const [target, setTarget] = useState<WorkData | null>(null);
    const [techs, setTechs] = useState<Techs>([]);
    const [selected, setSelected] = useState<string>('');
    const [isAdd, setIsAdd] = useState<boolean>(false);

    useEffect(() => {
      const stopSync = () =>
        workRepository.syncWorks((works: WorkData[]) => {
          setWorks(works);
        });

      return () => {
        stopSync();
      };
    }, []);

    useEffect(() => {
      let techs: Techs = [];
      works.forEach((work) => {
        work.techs.forEach((tech) => {
          if (!techs.includes(tech)) {
            techs = [...techs, tech];
          }
        });
      });

      setTechs(techs);
    }, [works]);

    const addWork = (work: WorkData) => {
      workRepository
        .addWork(work)
        .then((added) => setWorks((works) => [...works, added]));
      setIsAdd(false);
    };

    const setEditForm = (work: WorkData) => {
      setTarget(work);
    };

    const editWork = (work: WorkData) => {
      workRepository.updateWork(work).then((updated) => {
        setWorks((works) =>
          works.map((work) => (work.id !== updated.id ? work : updated))
        );
      });
      setTarget(null);
    };

    const deleteWork = (work: WorkData) => {
      setWorks((works) => {
        const updated = works.filter((w) => work.title !== w.title);
        return updated;
      });
      workRepository.deleteWork(work);
    };

    const onCancel = () => {
      setIsAdd(false);
      setTarget(null);
    };

    const selectTech = (tech: string) => {
      tech === selected ? setSelected('') : setSelected(tech);
    };

    return (
      <section ref={scrollRef} className={styles.container} id='works'>
        <div className={styles.content}>
          <h1 className={styles.title}>Works</h1>
          <ul className={styles.techs}>
            {techs.map((tech, index) => (
              <li key={index} className={styles.tech}>
                <Tech
                  tech={tech}
                  selected={selected === tech}
                  onTechClick={selectTech}
                />
              </li>
            ))}
          </ul>
          <ul className={styles.list}>
            {works
              .filter((work) =>
                selected === '' ? true : work.techs.includes(selected)
              )
              .map((work) => (
                <li key={work.id} className={styles.card}>
                  {target?.title !== work.title ? (
                    <Work
                      work={work}
                      isAdmin={isAdmin}
                      editWork={setEditForm}
                      deleteWork={deleteWork}
                      onWorkClick={onWorkClick}
                    />
                  ) : (
                    <EditWorkForm
                      work={target}
                      FileInput={FileInput}
                      onEdit={editWork}
                      onCancel={onCancel}
                    />
                  )}
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
