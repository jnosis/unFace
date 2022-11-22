import React from 'react';
import { Link } from 'react-router-dom';
import styles from './not_found.module.css';

function NotFound() {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Not Found</h1>
      <Link className={styles.link} to='/' state={{ scrollToTop: true }}>
        Go To Home
      </Link>
    </section>
  );
}

export default NotFound;
