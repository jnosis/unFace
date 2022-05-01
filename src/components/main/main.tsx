import React from 'react';
import { IFileInput } from '../..';
import WorkRepository from '../../service/work_repository';
import About from '../about/about';
import Contact from '../contact/contact';
import Works from '../works/works';
import styles from './main.module.css';

type MainProps = {
  FileInput: typeof IFileInput;
  onWorkClick(work: WorkData): void;
  workRepository: WorkRepository;
};

const Main = ({ FileInput, onWorkClick, workRepository }: MainProps) => {
  return (
    <div className={styles.container}>
      <About />
      <Works
        FileInput={FileInput}
        onWorkClick={onWorkClick}
        workRepository={workRepository}
      />
      <Contact />
    </div>
  );
};

export default Main;
