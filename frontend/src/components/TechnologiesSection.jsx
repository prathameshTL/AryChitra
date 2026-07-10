import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const techs = [
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
];

const TechnologiesSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Double array for seamless marquee
  const row1 = [...techs, ...techs];

  return (
    <section id="technologies" className="section" style={{ background: 'transparent', overflow: 'hidden' }}>
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
                background: 'transparent',
                border: '1px solid transparent',
                borderRadius: '50px',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '1.1rem',
                transition: 'all 0.3s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-purple)'; e.currentTarget.style.background = 'var(--glass-bg)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(108, 99, 255, 0.1)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <img src={tech.logo} alt={tech.name} style={{ width: '28px', height: '28px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }} />
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
