'use client';
import { useEffect, useState } from 'react';
import Preloader   from '@/components/Preloader';
import Cursor      from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar      from '@/components/Navbar';
import Hero        from '@/components/Hero';
import Ticker      from '@/components/Ticker';
import Services    from '@/components/Services';
import About       from '@/components/About';
import Projects    from '@/components/Projects';
import Team        from '@/components/Team';
import Testimonials from '@/components/Testimonials';
import Contact     from '@/components/Contact';
import Footer      from '@/components/Footer';

export default function Home() {
  const [ready, setReady] = useState(false);

  // Scroll reveal with full fallback
  useEffect(() => {
    document.body.classList.add('js-reveal');
    
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });

    const observeAll = () => {
      document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));
    };

    observeAll();
    const t1 = setTimeout(observeAll, 300);
    const t2 = setTimeout(observeAll, 1200);

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
      <Navbar />
      <main>
        <Hero />
        <Ticker />
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
