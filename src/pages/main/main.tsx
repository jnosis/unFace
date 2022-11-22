import React from 'react';
import { useOutletContext } from 'react-router-dom';
import About from '../../components/about/about';
import Contact from '../../components/contact/contact';
import Works from '../../components/works/works';
import styles from './main.module.css';

type ContextType = {
  aboutRef: React.RefObject<HTMLElement>;
  worksRef: React.RefObject<HTMLElement>;
  contactRef: React.RefObject<HTMLElement>;
};

function Main() {
  const { aboutRef, worksRef, contactRef } = useOutletContext<ContextType>();
  return (
    <main className={styles.container}>
      <About ref={aboutRef} />
      <Works ref={worksRef} />
      <Contact ref={contactRef} />
    </main>
  );
}

export default Main;
