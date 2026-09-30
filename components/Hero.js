'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';

const phrases = [
  'Intelligent AI Apps',
  'Autonomous AI Agents',
  'Scalable Cloud Systems',
  'Next-Gen Platforms',
  'Enterprise Software',
];

export default function Hero() {
  const canvasRef = useRef(null);
  const particleRef = useRef(null);
  const [typed, setTyped] = useState('Intelligent AI Apps');
  const [statNums, setStatNums] = useState({ s1: 0, s2: 0, s3: 0 });

  // Interactive 3D Neural Synapse Network with Mouse Repulsion
  useEffect(() => {
    let THREE, renderer, scene, camera, points, lineSegments, animId;

    import('three').then((mod) => {
      THREE = mod;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
      camera.position.z = 110;

      const isMobile = window.innerWidth < 768;
      const particleCount = isMobile ? 55 : 120;
      const particlesData = [];
      const particlePositions = new Float32Array(particleCount * 3);
      const particleColors = new Float32Array(particleCount * 3);

      const r = isMobile ? 120 : 180;
      const rHalf = r / 2;

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * r - rHalf;
        const y = Math.random() * (r * 0.7) - (r * 0.35);
        const z = Math.random() * (r * 0.5) - (r * 0.25);

        particlePositions[i * 3]     = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        const baseVx = (Math.random() - 0.5) * 0.18;
        const baseVy = (Math.random() - 0.5) * 0.18;
        const baseVz = (Math.random() - 0.5) * 0.12;

        particlesData.push({
          velocity: new THREE.Vector3(baseVx, baseVy, baseVz),
          baseVel: new THREE.Vector3(baseVx, baseVy, baseVz),
          numConnections: 0,
        });

        // Vibrant Violet & Electric Cyan nodes
        if (i % 2 === 0) {
          particleColors[i * 3]     = 0.43; // R
          particleColors[i * 3 + 1] = 0.16; // G
          particleColors[i * 3 + 2] = 0.85; // B (Purple)
        } else {
          particleColors[i * 3]     = 0.01; // R
          particleColors[i * 3 + 1] = 0.65; // G
          particleColors[i * 3 + 2] = 0.88; // B (Cyan)
        }
      }

      // Points Geometry
      const pointGeo = new THREE.BufferGeometry();
      pointGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));
      pointGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

      // Circular glowing particle texture
      const canvasTexture = document.createElement('canvas');
      canvasTexture.width = 48;
      canvasTexture.height = 48;
      const ctx = canvasTexture.getContext('2d');
      const grad = ctx.createRadialGradient(24, 24, 0, 24, 24, 24);
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.25, 'rgba(255,255,255,0.9)');
      grad.addColorStop(0.65, 'rgba(255,255,255,0.3)');
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 48, 48);
      const pTexture = new THREE.CanvasTexture(canvasTexture);

      const pMaterial = new THREE.PointsMaterial({
        size: 3.2,
        map: pTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });

      points = new THREE.Points(pointGeo, pMaterial);
      scene.add(points);

      // Synaptic Connection Lines
      const maxLines = particleCount * particleCount;
      const linePositions = new Float32Array(maxLines * 6);
      const lineColors = new Float32Array(maxLines * 6);

      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
      lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.22,
        blending: THREE.NormalBlending,
      });

      lineSegments = new THREE.LineSegments(lineGeo, lineMaterial);
      scene.add(lineSegments);

      // Mouse State for Repulsion Physics
      let mouseScreenX = 0;
      let mouseScreenY = 0;
      let mouseActive = false;
      let targetCamX = 0;
      let targetCamY = 0;
      let curCamX = 0;
      let curCamY = 0;

      const onMouseMove = (e) => {
        mouseActive = true;
        // Normalized device coordinates (-1 to +1)
        mouseScreenX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseScreenY = -(e.clientY / window.innerHeight) * 2 + 1;

        targetCamX = mouseScreenX * 16;
        targetCamY = mouseScreenY * 10;
      };

      const onMouseLeave = () => {
        mouseActive = false;
        targetCamX = 0;
        targetCamY = 0;
      };

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      document.addEventListener('mouseleave', onMouseLeave);

      const maxConnectDistance = isMobile ? 22 : 32;
      const repelRadius = isMobile ? 32 : 42; // Radius around mouse within which particles flee
      const repelStrength = 3.2; // Force magnitude

      const animate = () => {
        animId = requestAnimationFrame(animate);

        // Smooth camera parallax
        curCamX += (targetCamX - curCamX) * 0.05;
        curCamY += (targetCamY - curCamY) * 0.05;
        camera.position.x = curCamX;
        camera.position.y = curCamY;
        camera.lookAt(0, 0, 0);

        // Calculate 3D Mouse World Position at z=0 plane
        const vFOV = THREE.MathUtils.degToRad(camera.fov);
        const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
        const visibleWidth = visibleHeight * camera.aspect;
        const mouseWorldX = camera.position.x + (mouseScreenX * visibleWidth) / 2;
        const mouseWorldY = camera.position.y + (mouseScreenY * visibleHeight) / 2;

        let vertexPos = 0;
        let colorPos = 0;
        let numConnected = 0;

        for (let i = 0; i < particleCount; i++) {
          particlesData[i].numConnections = 0;
        }

        for (let i = 0; i < particleCount; i++) {
          const pData = particlesData[i];
          const px = particlePositions[i * 3];
          const py = particlePositions[i * 3 + 1];
          const pz = particlePositions[i * 3 + 2];

          // ---- MOUSE REPULSION PHYSICS (Particles flee from mouse) ----
          if (mouseActive) {
            const mdx = px - mouseWorldX;
            const mdy = py - mouseWorldY;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

            if (mDist < repelRadius && mDist > 0.001) {
              const repelFactor = (1 - mDist / repelRadius) * repelStrength;
              const angle = Math.atan2(mdy, mdx);

              // Strongly push particle away from mouse
              pData.velocity.x += Math.cos(angle) * repelFactor * 0.55;
              pData.velocity.y += Math.sin(angle) * repelFactor * 0.55;
            }
          }

          // Damping & returning to natural ambient velocity
          pData.velocity.x = pData.velocity.x * 0.92 + pData.baseVel.x * 0.08;
          pData.velocity.y = pData.velocity.y * 0.92 + pData.baseVel.y * 0.08;
          pData.velocity.z = pData.velocity.z * 0.92 + pData.baseVel.z * 0.08;

          // Update position
          particlePositions[i * 3]     += pData.velocity.x;
          particlePositions[i * 3 + 1] += pData.velocity.y;
          particlePositions[i * 3 + 2] += pData.velocity.z;

          // Boundary bounce with soft wrap
          if (particlePositions[i * 3] < -rHalf) {
            particlePositions[i * 3] = -rHalf;
            pData.velocity.x = Math.abs(pData.velocity.x) * 1.2;
          } else if (particlePositions[i * 3] > rHalf) {
            particlePositions[i * 3] = rHalf;
            pData.velocity.x = -Math.abs(pData.velocity.x) * 1.2;
          }

          if (particlePositions[i * 3 + 1] < -rHalf * 0.45) {
            particlePositions[i * 3 + 1] = -rHalf * 0.45;
            pData.velocity.y = Math.abs(pData.velocity.y) * 1.2;
          } else if (particlePositions[i * 3 + 1] > rHalf * 0.45) {
            particlePositions[i * 3 + 1] = rHalf * 0.45;
            pData.velocity.y = -Math.abs(pData.velocity.y) * 1.2;
          }

          if (particlePositions[i * 3 + 2] < -rHalf * 0.35 || particlePositions[i * 3 + 2] > rHalf * 0.35) {
            pData.velocity.z = -pData.velocity.z;
          }

          // ---- SYNAPTIC CONNECTIONS ----
          for (let j = i + 1; j < particleCount; j++) {
            const dx = particlePositions[i * 3]     - particlePositions[j * 3];
            const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
            const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxConnectDistance) {
              pData.numConnections++;
              particlesData[j].numConnections++;

              const alpha = 1.0 - dist / maxConnectDistance;

              linePositions[vertexPos++] = particlePositions[i * 3];
              linePositions[vertexPos++] = particlePositions[i * 3 + 1];
              linePositions[vertexPos++] = particlePositions[i * 3 + 2];

              linePositions[vertexPos++] = particlePositions[j * 3];
              linePositions[vertexPos++] = particlePositions[j * 3 + 1];
              linePositions[vertexPos++] = particlePositions[j * 3 + 2];

              // Gradient line color between purple & cyan
              lineColors[colorPos++] = 0.43 * alpha + 0.08;
              lineColors[colorPos++] = 0.22 * alpha + 0.15;
              lineColors[colorPos++] = 0.85 * alpha;

              lineColors[colorPos++] = 0.01 * alpha + 0.08;
              lineColors[colorPos++] = 0.65 * alpha + 0.15;
              lineColors[colorPos++] = 0.88 * alpha;

              numConnected++;
            }
          }
        }

        lineGeo.setDrawRange(0, numConnected * 2);
        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.attributes.color.needsUpdate = true;
        pointGeo.attributes.position.needsUpdate = true;

        points.rotation.y += 0.0004;
        lineSegments.rotation.y += 0.0004;

        renderer.render(scene, camera);
      };

      animate();

      const onResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animId);
        pTexture.dispose();
        pointGeo.dispose();
        lineGeo.dispose();
        pMaterial.dispose();
        lineMaterial.dispose();
        renderer.dispose();
      };
    });
  }, []);

  // CSS Ambient Floating Particles
  useEffect(() => {
    const container = particleRef.current;
    if (!container) return;
    const particles = [];
    for (let i = 0; i < 15; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 4 + 2;
      Object.assign(p.style, {
        position: 'absolute',
        width: size + 'px',
        height: size + 'px',
        borderRadius: '50%',
        background: Math.random() > 0.5 ? 'rgba(109,40,217,0.45)' : 'rgba(2,132,199,0.45)',
        left: Math.random() * 100 + '%',
        top: '100%',
        animation: `particleRise ${Math.random() * 10 + 8}s ${Math.random() * 8}s linear infinite`,
        boxShadow: `0 0 ${size * 2}px rgba(109,40,217,0.4)`,
        pointerEvents: 'none',
      });
      container.appendChild(p);
      particles.push(p);
    }
    return () => particles.forEach(p => p.remove());
  }, []);

  // Typewriter
  useEffect(() => {
    let pIdx = 0, cIdx = 0, deleting = false;
    let timeout;
    const type = () => {
      const cur = phrases[pIdx];
      if (!deleting) {
        setTyped(cur.slice(0, ++cIdx));
        if (cIdx === cur.length) { deleting = true; timeout = setTimeout(type, 2200); return; }
      } else {
        setTyped(cur.slice(0, cIdx--));
        if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; timeout = setTimeout(type, 400); return; }
      }
      timeout = setTimeout(type, deleting ? 50 : 100);
    };
    timeout = setTimeout(type, 800);
    return () => clearTimeout(timeout);
  }, []);

  // Counter animation
  useEffect(() => {
    const targets = { s1: 150, s2: 99, s3: 50 };
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
    const t = setTimeout(() => requestAnimationFrame(tick), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div ref={particleRef} className={styles.particles} />
      <div className={styles.ambientGlow1} />
      <div className={styles.ambientGlow2} />

      <div className={styles.heroInner}>
        {/* Left Column: Content */}
        <div className={styles.content}>
          <div className={`${styles.badge} reveal-up`}>
            <span className={styles.dot} />
            <span className={styles.badgeText}>India&apos;s Premier AI Software Studio</span>
            <span className={styles.badgePill}>ISO 9001</span>
          </div>

          <h1 className={`${styles.title} reveal-up`}>
            <span className={styles.titlePrefix}>Building The Future Of</span>
            <span className={styles.titleHighlight}>
              <span className={`gradient-text ${styles.typed}`}>{typed}</span>
              <span className={styles.cursor}>|</span>
            </span>
          </h1>

          <p className={`${styles.desc} reveal-up`}>
            <strong>AI APPS PRIVATE LIMITED</strong> pioneers enterprise-grade intelligent software,
            custom AI agent ecosystems, and ultra-scalable web platforms designed for high growth.
          </p>

          {/* Quick Feature Tags */}
          <div className={`${styles.featureChips} reveal-up`}>
            <span className={styles.chip}>⚡ Custom LLMs</span>
            <span className={styles.chip}>🤖 Autonomous Agents</span>
            <span className={styles.chip}>☁️ Cloud Scale</span>
            <span className={styles.chip}>🔒 SOC2 Ready</span>
          </div>

          {/* Action Buttons */}
          <div className={`${styles.btns} reveal-up`}>
            <a href="#services" className="btn-primary">
              <span>Explore Services</span>
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#projects" className="btn-ghost">
              <span>View Portfolio</span>
            </a>
          </div>

          {/* Enhanced Stats Cards */}
          <div className={`${styles.stats} reveal-up`}>
            <div className={styles.statCard}>
              <div className={styles.statTop}>
                <span className={`${styles.statNum} gradient-text`}>{statNums.s1}</span>
                <span className={styles.statPlus}>+</span>
              </div>
              <span className={styles.statLabel}>Projects Delivered</span>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statTop}>
                <span className={`${styles.statNum} gradient-text`}>{statNums.s2}</span>
                <span className={styles.statPlus}>%</span>
              </div>
              <span className={styles.statLabel}>Client Satisfaction</span>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statTop}>
                <span className={`${styles.statNum} gradient-text`}>{statNums.s3}</span>
                <span className={styles.statPlus}>+</span>
              </div>
              <span className={styles.statLabel}>AI Engineers</span>
            </div>
          </div>
        </div>

        {/* Right Column / Mobile Top: Interactive AI Studio Showcase */}
        <div className={styles.visualColumn}>
          <div className={styles.visualCard}>
            {/* Top Status Header */}
            <div className={styles.cardHeader}>
              <div className={styles.sysStatus}>
                <span className={styles.livePulse} />
                <span>AI APPS STUDIO • 30+ LIVE</span>
              </div>
              <span className={styles.latencyTag}>Google Play & Web</span>
            </div>

            {/* Central Hologram Orb & Robot */}
            <div className={styles.hologram}>
              <div className={`${styles.ring} ${styles.ring1}`} />
              <div className={`${styles.ring} ${styles.ring2}`} />
              <div className={`${styles.ring} ${styles.ring3}`} />
              <div className={styles.glow} />
              
              <div className={styles.robotWrap}>
                <Image
                  src="/ai_robot.jpg"
                  alt="AI Apps Studio Innovation"
                  fill
                  sizes="(max-width: 768px) 240px, 420px"
                  className={styles.robotImg}
                  priority
                />
              </div>
              <div className={styles.scan} />
            </div>

            {/* Clean Integrated Live Badges Row */}
            <div className={styles.cardPillsRow}>
              <div className={styles.cardPill}>
                <span className={styles.pillIcon}>📱</span>
                <span>30+ Live Apps</span>
              </div>
              <div className={styles.cardPill}>
                <span className={styles.pillIcon}>⚡</span>
                <span>Next.js • Flutter</span>
              </div>
              <div className={styles.cardPill}>
                <span className={styles.pillIcon}>🛡️</span>
                <span>99% Success</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollInd}>
        <div className={styles.mouse}>
          <div className={styles.wheel} />
        </div>
        <span>Scroll To Explore</span>
      </div>
    </section>
  );
}
