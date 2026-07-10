import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPricing } from '../utils/api';


const PricingCard = ({ tier, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass-card ${tier.highlighted ? 'highlighted-card' : ''}`}
      style={{
        position: 'relative',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        border: tier.highlighted ? `2px solid ${tier.color}` : '1px solid var(--border-color)',
        transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)',
        zIndex: tier.highlighted ? 2 : 1,
        background: tier.highlighted ? 'var(--card-bg-highlight)' : 'var(--card-bg)',
      }}
    >
      {tier.highlighted && (
        <div 
          style={{
            position: 'absolute',
            top: '-15px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: tier.color,
            color: '#fff',
            padding: '4px 16px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            boxShadow: `0 4px 15px ${tier.color}66`
          }}
        >
          Most Popular
        </div>
      )}

      <h3 style={{ fontSize: '1.5rem', color: tier.highlighted ? tier.color : 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
        {tier.name}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', minHeight: '40px' }}>
        {tier.description}
      </p>

      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{tier.price}</span>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{tier.duration}</span>
      </div>

      <div style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {tier.features.map((feature, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              <Check size={18} color={tier.color} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link 
        to="/order"
        className={`btn ${tier.highlighted ? 'btn-primary' : 'btn-secondary'}`}
        style={{ 
          marginTop: '2.5rem', 
          width: '100%', 
          textAlign: 'center',
          background: tier.highlighted ? tier.color : undefined,
          borderColor: tier.highlighted ? tier.color : undefined,
          boxShadow: tier.highlighted ? `0 8px 25px ${tier.color}40` : undefined
        }}
      >
        Get Started
      </Link>
    </motion.div>
  );
};

const PricingSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [pricingTiers, setPricingTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPricing()
      .then(setPricingTiers)
      .catch(err => console.error("Failed to fetch pricing:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="section" style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)', paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Background Orbs */}
      <div className="glow-orb glow-orb-blue" style={{ width: '400px', height: '400px', top: '10%', right: '-10%', opacity: 0.4 }} />
      <div className="glow-orb glow-orb-purple" style={{ width: '500px', height: '500px', bottom: '-20%', left: '-10%', opacity: 0.3 }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <span className="section-badge">Pricing Plans</span>
          <h2 className="section-title">
            Transparent Pricing for <span className="text-gradient">Every Scale</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Whether you are a startup validating an idea or an enterprise scaling globally, 
            we have a plan tailored to your technical needs.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center', position: 'relative', zIndex: 1, padding: '1rem 0' }}>
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>
        
        {/* Contact Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}
        >
          <p>Need a custom solution tailored specifically to your workflow? <Link to="/contact" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: 'bold' }}>Contact our team</Link></p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .highlighted-card {
            transform: scale(1) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PricingSection;
