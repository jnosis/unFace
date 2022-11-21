import React from 'react';
import { env } from '../../../config/env';
import styles from './contact.module.css';

function Contact() {
  return (
    <section className={styles.container}>
      <article className={styles.card}>
        <h1 className={styles.title}>Contact</h1>
        <ul className={styles.links}>
          <li>
            <a
              className={styles.link}
              href={`mailto:${env.user.email}`}
              aria-label='Email'
            >
              <i className='fa-solid fa-envelope' />
            </a>
          </li>
          <li>
            <a
              className={styles.link}
              href={env.user.github}
              aria-label=''
              target='_blank'
            >
              <i className='fa-brands fa-github' />
            </a>
          </li>
        </ul>
      </article>
    </section>
  );
}

export default Contact;
