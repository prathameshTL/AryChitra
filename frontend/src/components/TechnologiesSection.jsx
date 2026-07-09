import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const techs = [
  { name: 'React', icon: '⚛️' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Figma', icon: '🎨' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Tailwind', icon: '🌊' },
];

const TechnologiesSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Double arrays for seamless marquee
  const row1 = [...techs, ...techs];
  const row2 = [...techs].reverse();
  const row2Duplicated = [...row2, ...row2];

  return (
    <section id="technologies" className="section" style={{ background: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container" ref={ref} style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">
            Powered By <span className="text-gradient">Modern Tech</span>
          </h2>
        </motion.div>
      </div>

      {/* Row 1 (Left to Right) */}
      <div className="marquee-container" style={{ marginBottom: '1.5rem' }}>
        <div className="marquee-content cursor-hover-target">
          {row1.map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: 'var(--glass-bg)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                borderRadius: '50px',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'all 0.3s',
                backdropFilter: 'blur(8px)',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
              {tech.name}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 (Right to Left) */}
      <div className="marquee-container">
        <div className="marquee-content reverse cursor-hover-target">
          {row2Duplicated.map((tech, i) => (
            <div
              key={`${tech.name}-r2-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: 'var(--glass-bg)',
                border: '1px solid rgba(148, 163, 184, 0.1)',
                borderRadius: '50px',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'all 0.3s',
                backdropFilter: 'blur(8px)',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.2)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
