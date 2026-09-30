'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  const canvasRef = useRef(null);
  const [count,   setCount]   = useState(404);
  const [glitch,  setGlitch]  = useState(false);

  /* ── Particle Canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize, { passive: true });

    const count = Math.min(Math.floor((W * H) / 9000), 100);
    const pts   = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r:  Math.random() * 3 + 1.2,
      hue: [262, 197, 320][Math.floor(Math.random() * 3)],
      pulse: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.035;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      });

      // Lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 150) {
            const a = (1 - d / 150) * 0.65;
            const g = ctx.createLinearGradient(pts[i].x, pts[i].y, pts[j].x, pts[j].y);
            g.addColorStop(0, `hsla(${pts[i].hue}, 90%, 70%, ${a})`);
            g.addColorStop(1, `hsla(${pts[j].hue}, 90%, 70%, ${a})`);
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = g;
            ctx.lineWidth   = 1.1;
            ctx.stroke();
          }
        }
      }

      // Dots
      pts.forEach(p => {
        const glow = 14 + Math.sin(p.pulse) * 7;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle   = `hsla(${p.hue}, 90%, 72%, 0.85)`;
        ctx.shadowBlur  = glow;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 65%, 0.95)`;
        ctx.fill();
        ctx.shadowBlur  = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  /* ── Periodic glitch trigger ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 500);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      {/* Canvas BG */}
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Ambient orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      {/* Spinning rings */}
      <div className={styles.ring1} />
      <div className={styles.ring2} />
      <div className={styles.ring3} />

      {/* Main Content */}
      <div className={styles.content}>
        {/* Big glitch 404 */}
        <div className={`${styles.code} ${glitch ? styles.glitch : ''}`} data-text="404">
          404
        </div>

        <div className={styles.divider} />

        <h1 className={styles.title}>
          Page <span className={styles.grad}>Not Found</span>
        </h1>

        <p className={styles.sub}>
          The page you&apos;re looking for has drifted into the digital void.<br />
          Let&apos;s get you back to mission control.
        </p>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <Link href="/" className={styles.btnPrimary}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 12L12 3l9 9M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Back to Home</span>
          </Link>

          <a
            href="https://api.whatsapp.com/send?phone=919908516950"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnGhost}
          >
            <span>💬 Contact Support</span>
          </a>
        </div>

        {/* Floating status chip */}
        <div className={styles.statusChip}>
          <span className={styles.statusDot} />
          <span>System Online · All services operational</span>
        </div>
      </div>

      {/* Bottom decorative grid */}
      <div className={styles.gridFloor} />
    </div>
  );
}
