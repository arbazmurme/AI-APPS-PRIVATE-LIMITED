'use client';
import { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

const statusSteps = [
  'INITIALIZING SYSTEM',
  'LOADING 3D ENVIRONMENT',
  'SYNCING SOLUTIONS',
  'READY',
];

export default function Preloader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 8) + 5;
      current = Math.min(current + step, 100);
      setProgress(current);

      if (current > 75) setStatusIndex(3);
      else if (current > 50) setStatusIndex(2);
      else if (current > 20) setStatusIndex(1);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setHidden(true);
          if (onDone) onDone();
        }, 350);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className={`${styles.preloader} ${hidden ? styles.hidden : ''}`}>
      <div className={styles.centerWrap}>
        {/* Sleek Minimal Logo with shimmer & subtle glow */}
        <div className={styles.logo}>
          <span className={styles.ai}>AI</span>
          <span className={styles.apps}>APPS</span>
        </div>

        {/* Minimal Progress Line */}
        <div className={styles.bar}>
          <div 
            className={styles.fill} 
            style={{ width: `${progress}%` }}
          >
            <span className={styles.glowPoint} />
          </div>
        </div>

        {/* Dynamic Status & Percentage */}
        <div className={styles.metaRow}>
          <span className={styles.text}>{statusSteps[statusIndex]}...</span>
          <span className={styles.percent}>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
