'use client';
import { useEffect, useRef } from 'react';
import styles from './Services.module.css';

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
    ),
    title: 'AI & Machine Learning',
    desc: 'Custom AI models, NLP systems, computer vision, and intelligent automation solutions tailored for your business.',
    features: ['Custom LLM Fine-tuning', 'Computer Vision Systems', 'Predictive Analytics', 'AI Chatbots & Agents'],
    featured: true,
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><rect x="8" y="8" width="32" height="24" rx="3" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 40h16M24 32v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: 'Web Development',
    desc: 'Modern, high-performance web applications built with React, Next.js, and cloud-native architectures.',
    features: ['React & Next.js Apps', 'Progressive Web Apps', 'E-commerce Solutions'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><rect x="12" y="4" width="24" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="24" cy="38" r="2" fill="currentColor"/></svg>
    ),
    title: 'Mobile Development',
    desc: 'Native and cross-platform mobile applications for iOS & Android with intuitive UX and blazing performance.',
    features: ['React Native & Flutter', 'iOS & Android Native', 'App Store Deployment'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M4 24h40M24 4c-5 5-8 12-8 20s3 15 8 20" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
    ),
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure, DevOps pipelines, and serverless architectures for global deployment.',
    features: ['AWS / GCP / Azure', 'Kubernetes & Docker', 'CI/CD Automation'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><path d="M24 4l5 15h15L32 29l5 15-13-9-13 9 5-15L4 19h15z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
    ),
    title: 'UI/UX Design',
    desc: 'Pixel-perfect, user-centric designs that captivate your audience and drive conversion rates sky-high.',
    features: ['Brand Identity Design', 'User Research', 'Prototyping & Testing'],
  },
  {
    icon: (
      <svg viewBox="0 0 48 48"><path d="M8 20h32M8 28h32M20 8v32M28 8v32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><rect x="4" y="4" width="40" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
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
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  };
  const onLeave = () => { if (cardRef.current) cardRef.current.style.transform = ''; };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${service.featured ? styles.featured : ''} reveal-up`}
      style={{ transitionDelay: delay + 'ms' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className={styles.glow} />
      <div className={styles.icon}>{service.icon}</div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <ul className={styles.features}>
        {service.features.map(f => <li key={f}>{f}</li>)}
      </ul>
      <a href="#contact" className={styles.link}>Learn More <span>→</span></a>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <div className={`section-header reveal-up`}>
          <span className="section-tag">What We Do</span>
          <h2 className="section-title">Our <span className="gradient-text">Services</span></h2>
          <p className="section-sub">Comprehensive software solutions crafted with precision, innovation, and cutting-edge technology.</p>
        </div>
        <div className={styles.grid}>
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
