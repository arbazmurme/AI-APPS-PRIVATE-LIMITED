'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './About.module.css';

const pillars = [
  {
    icon: '🧠',
    title: 'Cognitive AI & Neural Core',
    desc: 'Custom LLMs, vision algorithms, and intelligent automation built for scalable real-world workflows.',
    tag: 'Enterprise AI'
  },
  {
    icon: '⚡',
    title: 'High-Velocity Full-Stack',
    desc: 'Blazing fast web apps & cross-platform Flutter/React Native solutions engineered for peak performance.',
    tag: 'Scalable Architecture'
  },
  {
    icon: '☁️',
    title: 'Cloud Native & 99.99% Uptime',
    desc: 'Robust AWS infrastructure, Docker containerization, and microservices built for zero downtime.',
    tag: 'DevOps & Cloud'
  },
  {
    icon: '🛡️',
    title: 'Bank-Grade Security Standards',
    desc: 'End-to-end encryption, strict compliance, and rigorous QA benchmarking across every build.',
    tag: 'Security & QA'
  }
];

const techStack = [
  'Next.js 16', 'React.js', 'Flutter', 'Node.js', 'Python AI',
  'TensorFlow', 'PostgreSQL', 'MongoDB', 'AWS Cloud', 'Docker', 'Firebase', 'GraphQL'
];

const stats = [
  { num: '2019', label: 'Founded In Hyderabad', icon: '🏛️' },
  { num: '150+', label: 'Products & Apps Deployed', icon: '🚀' },
  { num: '99.9%', label: 'Uptime & Reliability SLA', icon: '⚡' },
  { num: '10+', label: 'Global Client Regions', icon: '🌐' }
];

export default function About() {
  const canvasRef = useRef(null);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    let animId;
    import('three').then((THREE) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const parent = canvas.parentElement;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      const resize = () => {
        if (!parent || !canvas) return;
        renderer.setSize(parent.offsetWidth, parent.offsetHeight);
        camera.aspect = parent.offsetWidth / parent.offsetHeight;
        camera.updateProjectionMatrix();
      };

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 4.8;

      // Outer Wireframe Polyhedron
      const geom = new THREE.IcosahedronGeometry(1.6, 1);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.28
      });
      const mesh = new THREE.Mesh(geom, wireMat);
      scene.add(mesh);

      // Inner Glowing Core
      const innerGeom = new THREE.OctahedronGeometry(0.9, 0);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.55
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      scene.add(innerMesh);

      // Orbital Particle Ring
      const particleCount = 180;
      const particleGeom = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const theta = Math.random() * Math.PI * 2;
        const radius = 2.0 + Math.random() * 0.7;
        posArray[i] = Math.cos(theta) * radius;
        posArray[i + 1] = (Math.random() - 0.5) * 1.2;
        posArray[i + 2] = Math.sin(theta) * radius;
      }
      particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.04,
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.65
      });
      const particleSystem = new THREE.Points(particleGeom, particleMat);
      scene.add(particleSystem);

      resize();
      window.addEventListener('resize', resize);

      const animate = () => {
        animId = requestAnimationFrame(animate);
        mesh.rotation.x += 0.004;
        mesh.rotation.y += 0.007;
        innerMesh.rotation.x -= 0.009;
        innerMesh.rotation.z += 0.006;
        particleSystem.rotation.y += 0.003;
        renderer.render(scene, camera);
      };
      animate();
    });

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        {/* Top Header Badge */}
        <div className="section-header reveal-up" style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span className="section-tag">ENGINEERING EXCELLENCE & VISION</span>
          <h2 className="section-title">
            We Are The <span className="gradient-text">Architects</span> Of Digital Future
          </h2>
          <p className="section-sub" style={{ maxWidth: '780px', margin: '0 auto' }}>
            Empowering modern enterprises, hyper-growth startups, and visionary leaders with robust software architecture, AI intelligence, and ready-to-launch digital solutions.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className={styles.grid}>
          {/* Left Column: Visual 3D Showcase & Live Glass Cards */}
          <div className={`${styles.visualCol} reveal-up`}>
            <div className={styles.showcaseCard}>
              <canvas ref={canvasRef} className={styles.canvas3d} />
              
              <div className={styles.imageBox}>
                <Image
                  src="/share_img.png"
                  alt="AI APPS Architecture & Digital Engineering"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className={styles.heroImg}
                />
                <div className={styles.imgGlowGrad} />
              </div>

              {/* Floating Live Metric Overlay Chips */}
              <div className={styles.floatingTagTop}>
                <span className={styles.pulseDot} />
                <span>AI Core v5.2 Active</span>
              </div>

              <div className={styles.floatingTagBottom}>
                <span className={styles.tagIcon}>🛡️</span>
                <div>
                  <strong>ISO 9001 Certified</strong>
                  <p>Enterprise Grade Security</p>
                </div>
              </div>
            </div>

            {/* Live Stats Row */}
            <div className={styles.statsRow}>
              {stats.map((s, idx) => (
                <div key={idx} className={styles.statItem}>
                  <div className={styles.statIcon}>{s.icon}</div>
                  <strong className={`${styles.statNum} gradient-text`}>{s.num}</strong>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative & Interactive Core Pillars */}
          <div className={`${styles.contentCol} reveal-up`}>
            <div className={styles.narrativeBox}>
              <h3 className={styles.narrativeTitle}>
                Crafting Scalable, Intelligent & Impactful Software Since 2019
              </h3>
              <p className={styles.narrativeDesc}>
                Headquartered in <strong>Hyderabad, India</strong>, AI APPS PRIVATE LIMITED bridges the gap between deep AI research and enterprise execution. We engineer high-availability web systems, cross-platform mobile platforms, and customized neural models designed to accelerate business growth.
              </p>
            </div>

            {/* 4 Interactive Strategic Pillars */}
            <div className={styles.pillarsGrid}>
              {pillars.map((p, i) => {
                const isActive = activePillar === i;
                return (
                  <div
                    key={p.title}
                    className={`${styles.pillarCard} ${isActive ? styles.pillarCardActive : ''}`}
                    onMouseEnter={() => setActivePillar(i)}
                  >
                    <div className={styles.pillarHeader}>
                      <span className={styles.pillarIcon}>{p.icon}</span>
                      <span className={styles.pillarTag}>{p.tag}</span>
                    </div>
                    <h4 className={styles.pillarHeading}>{p.title}</h4>
                    <p className={styles.pillarText}>{p.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Tech Stack Pills */}
            <div className={styles.techStackArea}>
              <div className={styles.stackLabelRow}>
                <span className={styles.techTitle}>🛠️ Core Technology Stack:</span>
                <span className={styles.techSub}>Cross-platform • AI Native • Cloud Ready</span>
              </div>
              <div className={styles.tagsContainer}>
                {techStack.map(t => (
                  <span key={t} className={styles.techPill}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Consult Action */}
            <div className={styles.aboutActions}>
              <a
                href="#projects"
                className="btn-primary"
                style={{ padding: '10px 22px' }}
              >
                <span>Explore Solutions</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=919908516950&text=Hi%20AI%20APPS%20Architects,%20I%20want%20to%20discuss%20our%20tech%20architecture%20and%20project%20needs."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
                style={{ padding: '10px 20px', borderColor: '#10b981', color: '#10b981' }}
              >
                <span>💬 Talk To Our Architects</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
