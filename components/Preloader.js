'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
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
  const canvasRef = useRef(null);

  /* ─── Background canvas: floating nodes + connection lines ─── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize, { passive: true });

    /* Particle nodes: lightweight count for smooth first paint */
    const isMobile = W < 768;
    const COUNT = isMobile ? 18 : 36;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1.2,
      hue: Math.random() > 0.5 ? 262 : 199,
    }));

    const MAX_DIST = 120;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Move & bounce */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      /* Batched Connection lines */
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.22)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          if (Math.abs(dx) < MAX_DIST && Math.abs(dy) < MAX_DIST) {
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MAX_DIST) {
              ctx.moveTo(ni.x, ni.y);
              ctx.lineTo(nj.x, nj.y);
            }
          }
        }
      }
      ctx.stroke();

      /* Nodes: hardware accelerated without shadowBlur */
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 85%, 70%, 0.85)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ─── Fast & Snappy Progress Bar (Prevents Lighthouse LCP delay) ─── */
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 12) + 12; // 12-24% per tick
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
        }, 120);
      }
    }, 18);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className={`${styles.preloader} ${hidden ? styles.hidden : ''}`}>
      {/* Animated particle network canvas */}
      <canvas ref={canvasRef} className={styles.bgCanvas} />

      {/* Ambient radial glow orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className={styles.orb3} />

      {/* Spinning ring decoration */}
      <div className={styles.spinRing1} />
      <div className={styles.spinRing2} />

      {/* Center content */}
      <div className={styles.centerWrap}>
        {/* Logo Image */}
        <div className={styles.logoWrap}>
          <Image
            src="/logo.webp"
            alt="AI APPS PRIVATE LIMITED"
            width={220}
            height={55}
            priority
            className={styles.logoImg}
          />
        </div>

        {/* Minimal Progress Line */}
        <div className={styles.bar}>
          <div className={styles.fill} style={{ width: `${progress}%` }}>
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
