import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="section" style={{ padding: '6rem 0' }}>
      <div className="container">
        <div style={{ 
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', 
          borderRadius: '24px', 
          padding: '5rem 2rem', 
          textAlign: 'center',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)'
        }}>
          {/* Decorative background shapes */}
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
          <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-1px', color: '#ffffff' }}>
              Ready to Transform Your Business?
            </h2>
            <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
              Let's build something incredible together. Get in touch with our team of experts today and start your digital journey.
            </p>
            <Link to="/order" className="btn" style={{ background: '#ffffff', color: 'var(--accent-primary)', fontSize: '1.1rem', padding: '1rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
              Start Your Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
