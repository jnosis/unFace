import React, { forwardRef } from 'react';
import styles from './about.module.css';

const About = forwardRef<HTMLElement>((_, scrollRef) => {
  return (
    <section ref={scrollRef} className={styles.container} id='home'>
      <article className={styles.card}>
        <div className={styles.content}>
          <h1 className={styles.title}></h1>
          <div className={styles.description}></div>
        </div>
      </article>
    </section>
  );
});

export default About;
