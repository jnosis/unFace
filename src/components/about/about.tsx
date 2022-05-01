import React, { forwardRef } from 'react';
import './about.module.css';

const About = forwardRef<HTMLElement>((_, scrollRef) => {
  return (
    <section ref={scrollRef} id='home'>
      <h1>About</h1>
    </section>
  );
});

export default About;
