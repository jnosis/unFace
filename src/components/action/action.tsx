import React from 'react';
import styles from './action.module.css';

function Action({ type, title, isDisable, onClick }: Action) {
  return (
    <button
      type={type}
      className={`${styles.button}${isDisable ? ` ${styles.disable}` : ''}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Action;
