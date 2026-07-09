import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    num: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your business requirements, target audience, and project goals to build a comprehensive roadmap.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'UI/UX Design',
    description: 'Our design team crafts intuitive, pixel-perfect interfaces that prioritize user experience and modern aesthetics.',
    icon: '🎨',
  },
  {
    num: '03',
    title: 'Development',
    description: 'Using cutting-edge tech stacks, we engineer robust, scalable, and secure applications with clean code architecture.',
    icon: '💻',
  },
  {
    num: '04',
    title: 'Testing & QA',
    description: 'Rigorous testing protocols ensure your product is bug-free, performant, and secure before it goes live.',
    icon: '🧪',
  },
  {
    num: '05',
    title: 'Deployment & Support',
    description: 'Smooth launch followed by 24/7 monitoring, maintenance, and continuous optimization for long-term success.',
    icon: '🚀',
  },
];

const ProcessSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="process" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span className="section-badge">How We Work</span>
          <h2 className="section-title">
            Our Proven <span className="text-gradient">Process</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A systematic, transparent approach from concept to deployment.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Connecting Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              left: '24px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent-purple), var(--accent-blue))',
              zIndex: 0,
            }}
            className="timeline-line"
          />
          <style>{`@media (min-width: 768px) { .timeline-line { left: 50% !important; transform: translateX(-50%); } }`}</style>

          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  marginBottom: index === steps.length - 1 ? 0 : '4rem',
                }}
                className="timeline-item"
              >
                <style>{`
                  @media (min-width: 768px) {
                    .timeline-item { flex-direction: row !important; justify-content: space-between; align-items: center; }
                    .timeline-content-left { width: 45%; text-align: right; padding-right: 3rem; }
                    .timeline-content-right { width: 45%; text-align: left; padding-left: 3rem; }
                    .timeline-empty { width: 45%; }
                  }
                `}</style>

                {/* Left Side (Empty for odd, Content for even on Desktop) */}
                <div className={`desktop-only ${isEven ? 'timeline-content-left' : 'timeline-empty'}`}>
                  {isEven && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{step.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Center Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.4, delay: 0.2, type: 'spring' }}
                  style={{
                    position: 'absolute',
                    left: '0',
                    width: '50px',
                    height: '50px',
                    background: 'var(--bg-primary)',
                    border: '2px solid var(--accent-purple)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    zIndex: 1,
                    boxShadow: '0 0 20px rgba(108, 99, 255, 0.3)',
                  }}
                  className="timeline-node"
                >
                  <span style={{ position: 'absolute', top: '-25px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{step.num}</span>
                  {step.icon}
                </motion.div>
                <style>{`@media (min-width: 768px) { .timeline-node { left: 50% !important; transform: translateX(-50%) !important; } }`}</style>

                {/* Right Side (Content for all on Mobile, Content for odd on Desktop) */}
                <div
                  className={!isEven ? 'timeline-content-right' : 'timeline-content-right mobile-only-content'}
                  style={{ paddingLeft: '4rem' }}
                >
                  <style>{`@media (min-width: 768px) { .mobile-only-content { display: none; } }`}</style>
                  {(!isEven || true) && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.6 }}
                      style={{ paddingBottom: '1rem' }}
                    >
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{step.title}</h3>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.description}</p>
                    </motion.div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
