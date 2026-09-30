'use client';
import { useEffect, useRef } from 'react';

export default function ClassicParticleBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H, nodes;

    const buildNodes = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;

      // More particles — bigger density
      const count = Math.min(Math.floor((W * H) / 8000), 130);
      nodes = Array.from({ length: count }, () => ({
        x:   Math.random() * W,
        y:   Math.random() * H,
        vx:  (Math.random() - 0.5) * 0.7,
        vy:  (Math.random() - 0.5) * 0.7,
        r:   Math.random() * 3.5 + 1.5,   // bigger dots
        hue: [262, 197, 280, 220][Math.floor(Math.random() * 4)], // purple/cyan/violet/blue
        pulse: Math.random() * Math.PI * 2, // phase offset for glow pulse
      }));
    };

    buildNodes();

    const isDark = () =>
      document.documentElement.getAttribute('data-theme') === 'dark';

    const MAX_DIST = 160;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += 0.03;
      });

      const darkMode = isDark();
      // Much higher alpha values — clearly visible
      const lineAlphaMul = darkMode ? 0.75 : 0.55;
      const dotAlpha     = darkMode ? 0.9  : 0.75;

      // Connection lines — thicker, brighter
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * lineAlphaMul;
            const grad = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y
            );
            grad.addColorStop(0, `hsla(${nodes[i].hue}, 90%, 70%, ${a})`);
            grad.addColorStop(1, `hsla(${nodes[j].hue}, 90%, 70%, ${a})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Nodes — glowing with pulsing shadowBlur
      nodes.forEach(n => {
        const glowSize = 12 + Math.sin(n.pulse) * 6; // pulsing glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${n.hue}, 90%, 75%, ${dotAlpha})`;
        ctx.shadowBlur  = glowSize;
        ctx.shadowColor = `hsla(${n.hue}, 100%, 65%, 0.9)`;
        ctx.fill();
        ctx.shadowBlur  = 0;

        // Extra bright core center
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,0.8)`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => buildNodes();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
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
