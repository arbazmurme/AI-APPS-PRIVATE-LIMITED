'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const phrases = [
  'Intelligent Solutions',
  'Autonomous AI Agents',
  'Next-Gen Mobile Apps',
  'Scalable Cloud Systems',
  'Enterprise Software',
];

export default function Hero() {
  const [typed, setTyped] = useState('Intelligent Solutions');
  const [statNums, setStatNums] = useState({ s1: 0, s2: 0, s3: 0 });

  // Typewriter effect for headline
  useEffect(() => {
    let pIdx = 0, cIdx = 0, deleting = false;
    let timeout;
    const type = () => {
      const cur = phrases[pIdx];
      if (!deleting) {
        setTyped(cur.slice(0, ++cIdx));
        if (cIdx === cur.length) { deleting = true; timeout = setTimeout(type, 2400); return; }
      } else {
        setTyped(cur.slice(0, cIdx--));
        if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; timeout = setTimeout(type, 400); return; }
      }
      timeout = setTimeout(type, deleting ? 45 : 95);
    };
    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  // Counter animation
  useEffect(() => {
    const targets = { s1: 148, s2: 30, s3: 49 };
    const duration = 2000;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setStatNums({
        s1: Math.floor(ease * targets.s1),
        s2: Math.floor(ease * targets.s2),
        s3: Math.floor(ease * targets.s3),
      });
      if (p < 1) requestAnimationFrame(tick);
      else setStatNums(targets);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className={styles.heroSection}>
      {/* Background Graphic Layer */}
      <div className={styles.heroBgOverlay} />
      
      {/* Ambient Lighting Orbs */}
      <div className={styles.glowOrb1} />
      <div className={styles.glowOrb2} />

      <div className={styles.heroContainer}>
        {/* Left Column: Hero Text Content */}
        <div className={styles.contentCol}>
          {/* Dual Certification & Studio Badges */}
          <div className={styles.badgesWrapper}>
            <div className={styles.premierBadge}>
              <span className={styles.greenDot} />
              <span>India&apos;s Premier AI Software Studio</span>
            </div>
            <div className={styles.isoBadge}>
              <span>ISO 9001 Certified</span>
            </div>
          </div>

          {/* Main Hero Headline */}
          <h1 className={styles.heroTitle}>
            <span className={styles.titleMain}>Building The Future Of</span>
            <span className={styles.titleGradient}>
              <span className={styles.typedText}>{typed}</span>
              <span className={styles.cursorPill}>|</span>
            </span>
          </h1>

          {/* Description */}
          <p className={styles.heroDesc}>
            <strong>AI APPS PRIVATE LIMITED</strong> pioneers enterprise-grade intelligent software,
            custom AI agent ecosystems, and ultra-scalable web &amp; mobile platforms designed for high growth.
          </p>

          {/* Feature Chips */}
          <div className={styles.featuresRow}>
            <span className={styles.featureChip}>⚡ Custom LLMs</span>
            <span className={styles.featureChip}>🤖 Autonomous Agents</span>
            <span className={styles.featureChip}>☁️ Cloud Scale</span>
            <span className={styles.featureChip}>🔒 SOC2 Ready</span>
          </div>

          {/* Call-to-Action Buttons */}
          <div className={styles.heroActions}>
            <a href="#services" className={styles.btnExplore}>
              <span>Explore Services</span>
              <svg viewBox="0 0 24 24" width="18" height="18" className={styles.btnArrow}>
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#projects" className={styles.btnPortfolio}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className={styles.playIcon}>
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>View Portfolio</span>
            </a>
          </div>

          {/* Bottom Stats Row */}
          <div className={styles.statsGrid}>
            {/* Stat 1 */}
            <div className={styles.statBox}>
              <div className={`${styles.statIconWrap} ${styles.blueIcon}`}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="12" y1="22.08" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statNumber}>
                  {statNums.s1}<span className={styles.statSuffix}>+</span>
                </div>
                <div className={styles.statLabel}>Projects Delivered</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className={styles.statBox}>
              <div className={`${styles.statIconWrap} ${styles.purpleIcon}`}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statNumber}>
                  {statNums.s2}<span className={styles.statSuffix}>+</span>
                </div>
                <div className={styles.statLabel}>Global Clients</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className={styles.statBox}>
              <div className={`${styles.statIconWrap} ${styles.cyanIcon}`}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className={styles.statInfo}>
                <div className={styles.statNumber}>
                  {statNums.s3}<span className={styles.statSuffix}>+</span>
                </div>
                <div className={styles.statLabel}>AI Engineers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Res Composite Hero Illustration */}
        <div className={styles.visualCol}>
          <div className={styles.illustrationWrapper}>
            <Image
              src="/hero_rigth_side_img.webp"
              alt="AI Apps Intelligent Solutions Ecosystem"
              width={1536}
              height={1024}
              priority
              fetchPriority="high"
              className={styles.heroMainImg}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 650px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
