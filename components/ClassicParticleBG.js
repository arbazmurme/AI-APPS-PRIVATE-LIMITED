'use client';
import { useEffect, useRef } from 'react';

export default function ClassicParticleBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animId;
    let W = 0, H = 0, nodes = [];
    let isHidden = false;

    const buildNodes = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;

      const isMobile = W < 768;
      // High-performance particle count: crisp and vibrant without main thread blocking
      const count = isMobile
        ? Math.min(Math.floor((W * H) / 22000), 24)
        : Math.min(Math.floor((W * H) / 16000), 55);

      nodes = Array.from({ length: count }, () => ({
        x:     Math.random() * W,
        y:     Math.random() * H,
        vx:    (Math.random() - 0.5) * 0.6,
        vy:    (Math.random() - 0.5) * 0.6,
        r:     Math.random() * 2.5 + 2,
        hue:   [262, 197, 280, 220][Math.floor(Math.random() * 4)],
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    buildNodes();

    const isDark = () =>
      document.documentElement.getAttribute('data-theme') === 'dark';

    const MAX_DIST = 145;

    const draw = () => {
      if (isHidden) return;
      ctx.clearRect(0, 0, W, H);

      const darkMode = isDark();

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += 0.03;
      }

      // ── Batched Connection Lines (Single stroke call = 40x faster) ──
      ctx.beginPath();
      ctx.strokeStyle = darkMode
        ? 'rgba(167, 139, 250, 0.35)'
        : 'rgba(109, 40, 217, 0.22)';
      ctx.lineWidth = 1.0;

      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x;
          const dy = ni.y - nj.y;
          if (Math.abs(dx) < MAX_DIST && Math.abs(dy) < MAX_DIST) {
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < MAX_DIST) {
              ctx.moveTo(ni.x, ni.y);
              ctx.lineTo(nj.x, nj.y);
            }
          }
        }
      }
      ctx.stroke();

      // ── GPU-Accelerated Glowing Nodes (No CPU-blocking shadowBlur) ──
      const dotAlpha = darkMode ? 0.9 : 0.8;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulseFactor = 0.8 + Math.sin(n.pulse) * 0.25;

        // Outer glow halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.2 * pulseFactor, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 95%, 70%, ${darkMode ? 0.25 : 0.18})`;
        ctx.fill();

        // Main colored core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 95%, 70%, ${dotAlpha})`;
        ctx.fill();

        // White hot center
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onVisibility = () => {
      isHidden = document.hidden;
      if (!isHidden) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        buildNodes();
      }, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1,   // full opacity — no dimming
      }}
    />
  );
}
