import React, { forwardRef } from 'react';
import styles from './contact.module.css';

const Contact = forwardRef<HTMLElement>((_, scrollRef) => {
  return (
    <section ref={scrollRef} className={styles.contact} id='contact'>
      <h1>Contact</h1>
    </section>
  );
});

export default Contact;
