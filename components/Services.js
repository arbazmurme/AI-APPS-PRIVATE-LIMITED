'use client';
import { useRef } from 'react';
import styles from './Services.module.css';

const services = [
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
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/>
        <path d="M2 20h20"/>
      </svg>
    ),
    title: 'Data Analytics & BI',
    desc: 'Transform raw data into powerful insights with real-time dashboards, predictive models, and business intelligence platforms.',
    features: ['Real-Time Dashboards', 'Big Data Pipelines', 'Power BI / Tableau', 'Data Warehousing'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
    title: 'Cybersecurity Solutions',
    desc: 'End-to-end security architecture, penetration testing, and compliance frameworks to protect your digital assets.',
    features: ['Penetration Testing', 'SOC & SIEM Setup', 'ISO 27001 Compliance', 'Threat Intelligence'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M7 8h.01M11 8h5M7 12h3M14 12h3"/>
      </svg>
    ),
    title: 'ERP & CRM Development',
    desc: 'Custom enterprise resource planning and customer relationship management systems built for operational excellence.',
    features: ['Custom ERP Systems', 'Salesforce Integration', 'HRM & Payroll', 'Inventory Automation'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="7" height="10" rx="1"/>
        <rect x="15" y="7" width="7" height="10" rx="1"/>
        <path d="M9 12h6M12 9v6"/>
        <circle cx="12" cy="5" r="2"/>
      </svg>
    ),
    title: 'IoT & Embedded Systems',
    desc: 'Smart device connectivity, real-time sensor dashboards, and end-to-end IoT platforms for industrial and consumer applications.',
    features: ['Firmware Development', 'MQTT / Edge AI', 'Smart Device Dashboards', 'Industrial IoT'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M16 3l5 5-9 9H7v-5z"/>
      </svg>
    ),
    title: 'AR / VR Development',
    desc: 'Immersive augmented and virtual reality experiences for training, retail, gaming, and enterprise simulations.',
    features: ['Unity & Unreal Engine', 'WebXR / WebAR', 'VR Training Modules', 'Product Visualization'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
      </svg>
    ),
    title: 'DevOps & Automation',
    desc: 'CI/CD pipelines, infrastructure as code, and cloud automation to ship faster with zero downtime deployments.',
    features: ['GitHub Actions / Jenkins', 'Terraform & Ansible', 'Monitoring & Alerting', 'Auto-Scaling Setup'],
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18"/>
        <line x1="7" y1="2" x2="7" y2="22"/>
        <line x1="17" y1="2" x2="17" y2="22"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="2" y1="7" x2="7" y2="7"/>
        <line x1="2" y1="17" x2="7" y2="17"/>
        <line x1="17" y1="17" x2="22" y2="17"/>
        <line x1="17" y1="7" x2="22" y2="7"/>
      </svg>
    ),
    title: 'SaaS Product Development',
    desc: 'End-to-end SaaS platforms built with multi-tenancy, subscription billing, and enterprise-grade scalability from day one.',
    features: ['Multi-Tenant Architecture', 'Stripe / Razorpay Billing', 'Role-Based Access', 'White-Label Ready'],
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
