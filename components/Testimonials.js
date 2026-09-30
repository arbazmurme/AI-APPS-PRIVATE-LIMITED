'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    stars: '★★★★★',
    text: '"AI APPS transformed our entire supply chain with their ML solution. We saw a 40% reduction in costs within 3 months. Absolutely mind-blowing results!"',
    av: 'VP',
    name: 'Vikram Patel',
    role: 'CTO, LogiTech India',
  },
  {
    stars: '★★★★★',
    text: '"The team at AI APPS didn\'t just build our app — they redefined our product vision. The quality, speed, and attention to detail is unmatched in the industry."',
    av: 'AS',
    name: 'Ananya Singh',
    role: 'Founder, EduBridge',
  },
  {
    stars: '★★★★★',
    text: '"Working with AI APPS felt like having a world-class product team in-house. They delivered our fintech platform in record time with zero compromises on quality."',
    av: 'MK',
    name: 'Mohan Kumar',
    role: 'CEO, FinEdge Solutions',
  },
  {
    stars: '★★★★★',
    text: '"Their blockchain expertise saved us months of development time. The smart contracts are airtight and the NFT platform exceeded all our expectations."',
    av: 'RD',
    name: 'Rohan Das',
    role: 'Co-Founder, MetaArt Studio',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  const visible = () => typeof window !== 'undefined'
    ? window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1
    : 3;

  const goTo = (idx) => {
    const max = Math.max(0, testimonials.length - visible());
    setCurrent(Math.max(0, Math.min(idx, max)));
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => {
        const max = Math.max(0, testimonials.length - visible());
        return c >= max ? 0 : c + 1;
      });
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const updateSlider = () => {
      if (!trackRef.current) return;
      const cards = trackRef.current.querySelectorAll('.' + styles.card);
      if (!cards.length) return;
      const cardW = cards[0].offsetWidth + 16;
      trackRef.current.style.transform = `translateX(-${current * cardW}px)`;
    };

    updateSlider();
    window.addEventListener('resize', updateSlider);
    return () => window.removeEventListener('resize', updateSlider);
  }, [current]);

  return (
    <section id="testimonials" className={styles.section}>
      <div className="container">
        <div className="section-header reveal-up">
          <span className="section-tag">Client Love</span>
          <h2 className="section-title">What Our <span className="gradient-text">Clients Say</span></h2>
        </div>

        <div className={styles.slider}>
          <div ref={trackRef} className={styles.track}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.stars}>{t.stars}</div>
                <p>{t.text}</p>
                <div className={styles.author}>
                  <div className={styles.av}>{t.av}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.controls}>
            <button className={styles.btn} onClick={() => goTo(current - 1)}>‹</button>
            <div className={styles.dots}>
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button className={styles.btn} onClick={() => goTo(current + 1)}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}
