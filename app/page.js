'use client';
import { useEffect, useState } from 'react';
import Preloader          from '@/components/Preloader';
import Cursor             from '@/components/Cursor';
import SmoothScroll       from '@/components/SmoothScroll';
import Navbar             from '@/components/Navbar';
import ClassicParticleBG  from '@/components/ClassicParticleBG';
import Hero               from '@/components/Hero';
import Ticker             from '@/components/Ticker';
import StatsBanner        from '@/components/StatsBanner';
import Services           from '@/components/Services';
import About              from '@/components/About';
import Projects           from '@/components/Projects';
import Team               from '@/components/Team';
import Testimonials       from '@/components/Testimonials';
import Contact            from '@/components/Contact';
import Footer             from '@/components/Footer';

export default function Home() {
  const [ready, setReady] = useState(false);

  // Scroll reveal — handles all .reveal-* variants
  useEffect(() => {
    document.body.classList.add('js-reveal');

    const SELECTORS = '.reveal-up, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fade';

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const observe = () => {
      document.querySelectorAll(SELECTORS).forEach((el) => io.observe(el));
    };

    observe();
    const t1 = setTimeout(observe, 200);
    const t2 = setTimeout(observe, 800);

    return () => {
      io.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [ready]);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <SmoothScroll />
      <Cursor />

      {/* Classic full-page floating particle network — behind everything */}
      <ClassicParticleBG />

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <Ticker />
        {/* Classic animated stats strip */}
        <StatsBanner />
        <Services />
        <About />
        <Projects />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
