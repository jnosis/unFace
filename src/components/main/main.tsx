import React from 'react';
import About from '../about/about';
import Contact from '../contact/contact';
import Works from '../works/works';
import './main.module.css';

const Main = () => {
  return (
    <>
      <About />
      <Works />
      <Contact />
    </>
  );
};

export default Main;
