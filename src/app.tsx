import React from 'react';
import styles from './app.module.css';

type Props = {};

const App = (props: Props) => {
  console.log(props);

  return <div className={styles.container}>App</div>;
};

export default App;
