import React from 'react';
import styles from './actions.module.css';

type Props = {
  actions: Action[];
};

const Actions = ({ actions }: Props) => (
  <div className={styles.actions}>
    {actions.map(({ type, title, isDisable, onClick }, index) => (
      <button
        key={index}
        type={type}
        className={`${styles.button}${isDisable ? ` ${styles.disable}` : ''}`}
        onClick={onClick}
      >
        {title}
      </button>
    ))}
  </div>
);

export default Actions;
