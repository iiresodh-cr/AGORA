import React, { useEffect } from 'react';
import Campo from './components/Campo';
import Nav from './components/Nav';
import MobileMenu from './components/MobileMenu';
import Cover from './components/Cover';
import Marquee from './components/Marquee';
import Porque from './components/Porque';
import Hacemos from './components/Hacemos';
import Impulsamos from './components/Impulsamos';
import CasaAgora from './components/CasaAgora';
import Circulo from './components/Circulo';
import Agenda from './components/Agenda';
import Paquete from './components/Paquete';
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
        <Hacemos />
        <Impulsamos />
        <CasaAgora />
        <Circulo />
        <Agenda />
        <Paquete />
        <Sumate />
      </main>
      <Footer />
      <CauseDetail />
    </>
  );
}
