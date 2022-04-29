import React from 'react';
import styles from './app.module.css';
import Footer from './components/footer/footer';
import Header from './components/header/header';
import Main from './components/main/main';

type Props = {};

const App = (props: Props) => {
  console.log(props);

  return (
    <div className={styles.container}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
