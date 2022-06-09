import React, { forwardRef } from 'react';
import styles from './about.module.css';

const About = forwardRef<HTMLElement>((_, scrollRef) => {
  return (
    <section ref={scrollRef} className={styles.container} id='home'>
      <article className={styles.card}>
        <div className={styles.content}>
          <h1 className={styles.title}>About</h1>
          <div className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </article>
    </section>
  );
});

export default About;
