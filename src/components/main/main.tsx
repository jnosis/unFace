import React from 'react';
import About from '../about/about';
import Contact from '../contact/contact';
import Works from '../works/works';
import styles from './main.module.css';

type MainProps = {
  onWorkClick(work: WorkData): void;
};

const Main = ({ onWorkClick }: MainProps) => {
  return (
    <div className={styles.container}>
      <About />
      <Works onWorkClick={onWorkClick} />
      <Contact />
    </div>
  );
};

export default Main;
