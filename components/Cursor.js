'use client';
import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const wrapperRef = useRef(null);
  let mx = 0, my = 0, fx = 0, fy = 0;

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const wrapper = wrapperRef.current;
    if (!cursor || !follower) return;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    };

    let raf;
    const animate = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      raf = requestAnimationFrame(animate);
    };
    animate();

    const addHover = () => wrapper && wrapper.classList.add(styles.hovered);
    const removeHover = () => wrapper && wrapper.classList.remove(styles.hovered);

    const hoverEls = document.querySelectorAll(
      'a, button, .service-card, .project-card, .team-card, input, textarea, select, .pf-btn, .ts-btn'
    );
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    document.addEventListener('mousemove', onMove);
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.cursorWrapper}>
      <div ref={cursorRef} className={styles.cursor} />
      <div ref={followerRef} className={styles.follower} />
    </div>
  );
}
