import React from 'react';
import About from '../about/about';
import Contact from '../contact/contact';
import Works from '../works/works';
import styles from './main.module.css';

const Main = () => {
  return (
    <div className={styles.container}>
      <About />
      <Works />
      <Contact />
    </div>
  );
};

export default Main;
