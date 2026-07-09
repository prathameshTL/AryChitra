import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CtaBanner = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="section" style={{ padding: '4rem 0', background: 'var(--bg-primary)' }}>
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            background: 'var(--gradient-primary)',
            borderRadius: '30px',
            padding: '5rem 2rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(108, 99, 255, 0.25)',
          }}
        >
          {/* Decorative Blobs */}
          <div className="animate-blob" style={{ position: 'absolute', top: '-20%', left: '-5%', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.15)', filter: 'blur(30px)', zIndex: 0 }} />
          <div className="animate-blob" style={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '400px', height: '400px', background: 'rgba(0, 217, 255, 0.2)', filter: 'blur(30px)', animationDelay: '2s', zIndex: 0 }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', letterSpacing: '-1px', lineHeight: 1.1 }}>
              Ready to Build Your <br /> Digital Future?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
              Join the forward-thinking companies that trust AryChitra to engineer their success. Let's create something extraordinary together.
            </p>
            
            <Link
              to="/contact"
              className="btn cursor-hover-target"
              style={{
                background: '#fff',
                color: 'var(--accent-purple)',
                padding: '1rem 3rem',
                fontSize: '1.1rem',
                borderRadius: '50px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                display: 'inline-block',
                textDecoration: 'none',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Start a Project
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaBanner;
