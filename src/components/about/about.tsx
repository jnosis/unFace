import React from 'react';
import styles from './about.module.css';

function About() {
  return (
    <section className={styles.container}>
      <article className={styles.card}>
        <div className={styles.content}>
          <h1 className={styles.title}></h1>
          <div className={styles.description}></div>
        </div>
      </article>
    </section>
  );
}

export default About;
