import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── 3D Particles Background ─── */
const ParticleField = () => {
  const meshRef = useRef();
  const count = 800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#6C63FF'),
      new THREE.Color('#00D9FF'),
      new THREE.Color('#A78BFA'),
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const FloatingGeo = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -2]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial
        color="#6C63FF"
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  );
};

/* ─── Tech Icons ─── */
const techIcons = [
  { name: 'React', icon: '⚛️', x: '85%', y: '15%', delay: 0 },
  { name: 'Node', icon: '🟢', x: '90%', y: '55%', delay: 0.5 },
  { name: 'AWS', icon: '☁️', x: '80%', y: '80%', delay: 1.0 },
  { name: 'Figma', icon: '🎨', x: '10%', y: '70%', delay: 1.5 },
  { name: 'Python', icon: '🐍', x: '5%', y: '30%', delay: 2.0 },
];

/* ─── Container Animation Variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const HeroSection = () => {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'calc(var(--nav-height) + 2rem)',
      }}
    >
      {/* 3D Canvas Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#6C63FF" />
          <pointLight position={[-10, -10, 5]} intensity={0.4} color="#00D9FF" />
          <ParticleField />
          <FloatingGeo />
        </Canvas>
      </div>

      {/* Background Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(108, 99, 255, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0, 217, 255, 0.06) 0%, transparent 50%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '800px' }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} style={{ marginBottom: '0.5rem' }}>
            <span className="section-badge">
              🚀 Crafting Digital Futures
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '1.5rem',
              letterSpacing: '-2px',
            }}
          >
            We Build Digital{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #6C63FF, #00D9FF, #A78BFA)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-shift 4s ease infinite',
              }}
            >
              Experiences
            </span>{' '}
            That Matter
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: 1.7,
              maxWidth: '600px',
              marginBottom: '2.5rem',
            }}
          >
            AryChitra transforms bold ideas into stunning, scalable software solutions. 
            From concept to deployment, we craft premium digital products that drive real business growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <Link to="/contact" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Start Your Project
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/portfolio" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Tech Icons */}
      {techIcons.map((tech, i) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: 1.5 + tech.delay, duration: 0.5 }}
          style={{
            position: 'absolute',
            left: tech.x,
            top: tech.y,
            zIndex: 5,
            fontSize: '2rem',
            animation: `float ${6 + i}s ease-in-out infinite`,
            animationDelay: `${tech.delay}s`,
            display: 'none',
          }}
          className="hero-float-icon"
        >
          <div
            style={{
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(108, 99, 255, 0.15)',
              borderRadius: '16px',
              padding: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>{tech.icon}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {tech.name}
            </span>
          </div>
        </motion.div>
      ))}
      <style>{`@media (min-width: 1024px) { .hero-float-icon { display: block !important; } }`}</style>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '24px',
            height: '40px',
            border: '2px solid rgba(108, 99, 255, 0.3)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8px',
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '4px',
              height: '8px',
              background: 'var(--accent-purple)',
              borderRadius: '2px',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
