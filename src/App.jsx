import React, { useEffect } from 'react';
import Campo from './components/Campo';
import Nav from './components/Nav';
import MobileMenu from './components/MobileMenu';
import Cover from './components/Cover';
import Marquee from './components/Marquee';
import Porque from './components/Porque';
import CasaAgora from './components/CasaAgora';
import Circulo from './components/Circulo';
import Transmision from './components/Transmision';
import Agenda from './components/Agenda';
import Sumate from './components/Sumate';
import Footer from './components/Footer';
import CauseDetail from './components/CauseDetail';
import { boot } from './lib/app.js';

export default function App() {
  useEffect(() => {
    boot();
  }, []);

  return (
    <>
      <a className="skip" href="#main">Saltar al contenido</a>
      <Campo />
      <Nav />
      <MobileMenu />
      <main id="main">
        <Cover />
        <Marquee />
        <Porque />
        <CasaAgora />
        <Circulo />
        <Transmision />
        <Agenda />
        <Sumate />
      </main>
      <Footer />
      <CauseDetail />
    </>
  );
}
