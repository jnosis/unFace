import React from 'react';
import About from '../../components/about/about';
import Contact from '../../components/contact/contact';
import Works from '../../components/works/works';
import styles from './main.module.css';

type MainProps = {};

function Main({}: MainProps) {
  return (
    <main className={styles.container}>
      <About />
      <Works />
      <Contact />
    </main>
  );
}

export default Main;
