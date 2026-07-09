import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ─── Counter Component ─── */
const AnimatedCounter = ({ end, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, end]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem',
          lineHeight: 1,
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        {label}
      </div>
    </div>
  );
};

/* ─── Fade-in Variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stats = [
  { end: 150, suffix: '+', label: 'Projects Completed' },
  { end: 50, suffix: '+', label: 'Happy Clients' },
  { end: 10, suffix: '+', label: 'Years Experience' },
  { end: 24, suffix: '/7', label: 'Expert Support' },
];

const AboutSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Orbs */}
      <div className="glow-orb glow-orb-purple" style={{ width: '400px', height: '400px', top: '10%', right: '-10%' }} />
      <div className="glow-orb glow-orb-blue" style={{ width: '300px', height: '300px', bottom: '10%', left: '-5%' }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge">Who We Are</span>
          <h2 className="section-title">
            About <span className="text-gradient">AryChitra</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We are a premier IT services and digital transformation agency, bridging
            the gap between complex business requirements and elegant technological solutions.
          </p>
        </motion.div>

        {/* Split Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '5rem',
          }}
          className="about-grid"
        >
          <style>{`@media (min-width: 768px) { .about-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>

          {/* Left: Animated Illustration */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            custom={0}
            style={{ position: 'relative' }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                padding: '3rem',
              }}
            >
              {/* Code Illustration */}
              <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                <span style={{ color: '#C678DD' }}>const</span>{' '}
                <span style={{ color: '#61AFEF' }}>AryChitra</span>{' '}
                <span style={{ color: '#C678DD' }}>=</span>{' '}
                <span style={{ color: '#E5C07B' }}>{'{'}</span><br />
                &nbsp;&nbsp;<span style={{ color: '#E06C75' }}>mission</span>: <span style={{ color: '#98C379' }}>"Craft digital futures"</span>,<br />
                &nbsp;&nbsp;<span style={{ color: '#E06C75' }}>expertise</span>: [<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#98C379' }}>"Full-Stack Dev"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#98C379' }}>"Mobile Apps"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#98C379' }}>"AI/ML"</span>,<br />
                &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#98C379' }}>"Cloud Solutions"</span><br />
                &nbsp;&nbsp;],<br />
                &nbsp;&nbsp;<span style={{ color: '#E06C75' }}>philosophy</span>: <span style={{ color: '#98C379' }}>"Engineering excellence"</span>,<br />
                &nbsp;&nbsp;<span style={{ color: '#61AFEF' }}>build</span>: () <span style={{ color: '#C678DD' }}>=&gt;</span>{' '}
                <span style={{ color: '#98C379' }}>"🚀 Success!"</span><br />
                <span style={{ color: '#E5C07B' }}>{'}'}</span>;
              </div>

              {/* Decorative Glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: 'rgba(108, 99, 255, 0.1)',
                  borderRadius: '50%',
                  filter: 'blur(60px)',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeInUp}
            custom={1}
          >
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-heading)',
              }}
            >
              Engineering the Future, <span className="text-gradient">One Line at a Time</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              Founded with a vision to redefine software development standards, AryChitra
              started as a collective of passionate engineers and designers. We build
              scalable, secure, and robust applications using the MERN stack and cutting-edge
              technologies.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
              Today, we are a trusted technology partner for startups and enterprises
              alike, delivering premium digital products that combine technical
              excellence with stunning design.
            </p>

            {/* Feature Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {['Clean Code', 'Agile Process', 'Scalable Architecture', 'Security First'].map(
                (feat) => (
                  <span
                    key={feat}
                    style={{
                      padding: '0.5rem 1.2rem',
                      background: 'rgba(108, 99, 255, 0.1)',
                      border: '1px solid rgba(108, 99, 255, 0.2)',
                      borderRadius: '50px',
                      fontSize: '0.85rem',
                      color: 'var(--accent-blue)',
                      fontWeight: 500,
                    }}
                  >
                    ✦ {feat}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          custom={2}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '2rem',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '24px',
            padding: '3rem 2rem',
          }}
        >
          {stats.map((stat, i) => (
            <AnimatedCounter
              key={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
