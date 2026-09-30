'use client';
import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const dotRef     = useRef(null);
  const ringRef    = useRef(null);
  const trailsRef  = useRef([]);
  const stateRef   = useRef({ mx: 0, my: 0, fx: 0, fy: 0, hovered: false, clicked: false });

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return;
    document.body.classList.add('custom-cursor-active');

    const dot  = dotRef.current;
    const ring = ringRef.current;
    const s    = stateRef.current;
    if (!dot || !ring) return;

    /* ── Mouse position ── */
    const onMove = (e) => {
      s.mx = e.clientX;
      s.my = e.clientY;
    };

    /* ── Click burst ── */
    const onClick = () => {
      s.clicked = true;
      ring.classList.add(styles.clicked);
      setTimeout(() => {
        s.clicked = false;
        ring.classList.remove(styles.clicked);
      }, 450);
    };

    /* ── Hover state ── */
    const onEnter = () => {
      s.hovered = true;
      dot.classList.add(styles.dotHover);
      ring.classList.add(styles.ringHover);
    };
    const onLeave = () => {
      s.hovered = false;
      dot.classList.remove(styles.dotHover);
      ring.classList.remove(styles.ringHover);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('click', onClick);

    // Observe DOM for interactive elements
    const attach = () => {
      document.querySelectorAll(
        'a, button, input, textarea, select, [data-hover], .card'
      ).forEach(el => {
        if (!el._cursorBound) {
          el._cursorBound = true;
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        }
      });
    };
    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    /* ── Trail points ── */
    const TRAIL = 10;
    const pts   = Array.from({ length: TRAIL }, () => ({ x: 0, y: 0 }));

    /* ── RAF loop ── */
    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      // Ring smoothly follows mouse (magnetic feel)
      s.fx = lerp(s.fx, s.mx, 0.11);
      s.fy = lerp(s.fy, s.my, 0.11);

      dot.style.left = s.mx + 'px';
      dot.style.top  = s.my + 'px';
      ring.style.left = s.fx + 'px';
      ring.style.top  = s.fy + 'px';

      // Rotate ring slightly based on direction
      const dx = s.fx - s.mx;
      const dy = s.fy - s.my;
      const speed = Math.sqrt(dx * dx + dy * dy);
      ring.style.transform = `translate(-50%, -50%) scale(${1 + Math.min(speed * 0.008, 0.35)})`;

      // Shift trail
      pts.unshift({ x: s.mx, y: s.my });
      pts.pop();

      // Draw trail
      trailsRef.current.forEach((el, i) => {
        if (!el) return;
        const p = pts[i] || pts[pts.length - 1];
        const progress = 1 - i / TRAIL;
        el.style.left    = p.x + 'px';
        el.style.top     = p.y + 'px';
        el.style.opacity = (s.hovered ? 0 : progress * 0.22).toString();
        el.style.transform = `translate(-50%,-50%) scale(${progress * 0.6})`;
      });

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      document.body.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps to cursor immediately */}
      <div ref={dotRef} className={styles.dot} />

      {/* Ring — lags behind (magnetic) */}
      <div ref={ringRef} className={styles.ring}>
        <span className={styles.ringInner} />
      </div>

      {/* Trail particles */}
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          ref={el => trailsRef.current[i] = el}
          className={styles.trail}
        />
      ))}
    </>
  );
}
