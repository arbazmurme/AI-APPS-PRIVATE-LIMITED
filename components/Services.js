'use client';
import { useRef } from 'react';
import styles from './Services.module.css';

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="3"/>
        <rect x="9" y="9" width="6" height="6" rx="1"/>
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
      </svg>
    ),
    title: 'AI & Machine Learning',
    desc: 'Custom AI models, NLP systems, computer vision, and intelligent automation solutions tailored for your business.',
    features: ['Custom LLM Fine-tuning', 'Computer Vision Systems', 'Predictive Analytics', 'AI Chatbots & Agents'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: 'Web Development',
    desc: 'Modern, high-performance web applications with great user experiences and scalable architectures.',
    features: ['React & Next.js Apps', 'Progressive Web Apps', 'E-Commerce Solutions'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="3"/>
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5"/>
      </svg>
    ),
    title: 'Mobile Development',
    desc: 'Native and cross-platform mobile applications for iOS & Android with high performance.',
    features: ['React Native & Flutter', 'iOS & Android Native', 'App Store Deployment'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
      </svg>
    ),
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure, DevOps pipelines, and managed services for global deployment.',
    features: ['AWS / GCP / Azure', 'Kubernetes & Docker', 'CI/CD Automation'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'UI/UX Design',
    desc: 'Pixel-perfect, user-centric designs that create engaging experiences across web and mobile platforms.',
    features: ['Brand Identity Design', 'User Research', 'Prototyping & Testing'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="6" height="6" rx="1"/>
        <rect x="15" y="3" width="6" height="6" rx="1"/>
        <rect x="9" y="15" width="6" height="6" rx="1"/>
        <path d="M6 9v3a3 3 0 0 0 3 3h3m6-6v3a3 3 0 0 1-3 3"/>
      </svg>
    ),
    title: 'Blockchain & Web3',
    desc: 'Decentralized applications, smart contracts, NFT platforms, and DeFi solutions on leading blockchains.',
    features: ['Smart Contracts', 'NFT Marketplace', 'DApp Development'],
  },
];

function ServiceCard({ service, delay }) {
  const cardRef = useRef(null);

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-5px)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} reveal-up`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Top right ambient purple glow */}
      <div className={styles.ambientGlow} />

      {/* Top Icon Box */}
      <div className={styles.iconContainer}>
        {service.icon}
      </div>

      {/* Title & Description */}
      <h3 className={styles.cardTitle}>{service.title}</h3>
      <p className={styles.cardDesc}>{service.desc}</p>

      {/* Checklist items */}
      <ul className={styles.featuresList}>
        {service.features.map((feat) => (
          <li key={feat} className={styles.featureItem}>
            <span className={styles.checkIcon}>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      {/* Learn More Link */}
      <a href="#contact" className={styles.learnMoreLink}>
        <span>Learn More</span>
        <span className={styles.arrowIcon}>→</span>
      </a>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className={styles.servicesSection}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerTag}>
            <span>WHAT WE DO</span>
          </div>
          <h2 className={styles.headerTitle}>
            Our <span className={styles.gradientTitle}>Services</span>
          </h2>
          <p className={styles.headerSub}>
            Comprehensive software solutions crafted with precision, innovation, and cutting-edge technology.
          </p>
        </div>

        {/* Services Grid */}
        <div className={styles.servicesGrid}>
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
