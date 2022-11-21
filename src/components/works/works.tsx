import React from 'react';
import styles from './works.module.css';

type WorksProps = {};

function Works({}: WorksProps) {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Works</h1>
      <ul className={styles.techs}>Techs</ul>
      <ul className={styles.list}>WorkCards</ul>
    </section>
  );
}

export default Works;
