import React from 'react';
import { IFileInput } from '../..';
import WorkRepository from '../../service/work_repository';
import About from '../about/about';
import Contact from '../contact/contact';
import Works from '../works/works';
import styles from './main.module.css';

type ScrollRef = {
  aboutRef: React.RefObject<HTMLElement>;
  worksRef: React.RefObject<HTMLElement>;
  contactRef: React.RefObject<HTMLElement>;
};

type MainProps = {
  scrollRef: ScrollRef;
  FileInput: typeof IFileInput;
  onWorkClick(work: WorkData): void;
  workRepository: WorkRepository;
};

const Main = ({
  scrollRef,
  FileInput,
  onWorkClick,
  workRepository,
}: MainProps) => {
  return (
    <div className={styles.container}>
      <About ref={scrollRef.aboutRef} />
      <Works
        ref={scrollRef.worksRef}
        FileInput={FileInput}
        onWorkClick={onWorkClick}
        workRepository={workRepository}
      />
      <Contact ref={scrollRef.contactRef} />
    </div>
  );
};

export default Main;
