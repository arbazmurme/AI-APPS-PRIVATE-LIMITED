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
    window.addEventListener('resize', onResize);

    /* Particle nodes */
    const COUNT = Math.min(Math.floor((W * H) / 12000), 80);
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2.5 + 1,
      hue: Math.random() > 0.5 ? 262 : 199, // purple or cyan
    }));

    const MAX_DIST = 140;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      /* Move & bounce */
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      /* Connection lines */
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `hsla(${nodes[i].hue}, 80%, 65%, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      /* Nodes */
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 80%, 70%, 0.7)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsla(${n.hue}, 90%, 60%, 0.6)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ─── Progress bar ─── */
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
        }, 400);
      }
    }, 45);

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
            src="/logo.png"
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
