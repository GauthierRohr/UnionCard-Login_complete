import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import Benefits from '../components/home/Benefits';
import Partners from '../components/home/Partners';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';

const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'Union | La carte étudiante Suisse';
  }, []);

  return (
    <div>
      <Hero />
      <Benefits />
      <Partners />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;