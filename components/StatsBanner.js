'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './StatsBanner.module.css';

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered',   icon: '🚀', desc: 'Across 12+ countries' },
  { value: 30,  suffix: '+', label: 'Global Clients',        icon: '🌍', desc: 'From 4 continents'   },
  { value: 49,  suffix: '+', label: 'AI Engineers',          icon: '🧠', desc: 'Expert developers'   },
  { value: 99,  suffix: '.9%',label: 'Uptime SLA',           icon: '⚡', desc: 'Enterprise reliability' },
  { value: 5,   suffix: '+', label: 'Years Experience',      icon: '🏆', desc: 'Since 2019'           },
];

function CountUp({ target, suffix, running }) {
  const [val, setVal] = useState(0);
  const rafRef = useRef();

  useEffect(() => {
    if (!running) return;
    let start = null;
    const duration = 2200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(ease * target));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else setVal(target);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [running, target]);

  return <>{val}{suffix}</>;
}

export default function StatsBanner() {
  const ref    = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.25 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.banner}>
      {/* Background mesh lines */}
      <div className={styles.mesh} />

      <div className="container">
        <div className={styles.grid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.icon}>{s.icon}</span>
              <div className={styles.numberRow}>
                <span className={styles.number}>
                  <CountUp target={s.value} suffix={s.suffix} running={seen} />
                </span>
              </div>
              <span className={styles.label}>{s.label}</span>
              <span className={styles.desc}>{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
