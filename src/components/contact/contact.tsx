import React, { forwardRef } from 'react';
import styles from './contact.module.css';

const Contact = forwardRef<HTMLElement>((_, scrollRef) => {
  return (
    <section ref={scrollRef} className={styles.container} id='contact'>
      <div className={styles.card}>
        <h1 className={styles.title}>Contact</h1>
        <ul className={styles.links}>
          <li>
            <a
              className={styles.link}
              href='mailto:jnosis1546@gmail.com'
              aria-label='Email'
            >
              <i className='fa-solid fa-envelope'></i>
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              href='https://github.com/jnosis'
              aria-label='Github'
              target='_blank'
            >
              <i className='fa-brands fa-github'></i>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
});

export default Contact;
