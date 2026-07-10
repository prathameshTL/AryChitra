import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import PortfolioSection from '../components/PortfolioSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TechnologiesSection from '../components/TechnologiesSection';
import CtaBanner from '../components/CtaBanner';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Target, Zap, Shield, HeartHandshake, ArrowRight } from 'lucide-react';

/* ─── Mini About Preview ─── */
const AboutPreview = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', paddingBottom: '3rem' }} ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
        >
          <span className="section-badge">About AryChitra</span>
          <h2 className="section-title">Engineering the <span className="text-gradient">Future</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            We are a premier IT services and digital transformation agency, bridging the gap between complex business requirements and elegant technological solutions. From startups to global enterprises, we engineer scalable, high-performance software that drives real business growth.
          </p>
          <Link to="/about" className="btn btn-secondary cursor-hover-target" style={{ textDecoration: 'none' }}>
            Learn More About Us <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── Mini Why Choose Us Preview ─── */
const WhyUsPreview = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const points = [
    { title: "Expert Team", icon: <Target size={24} />, color: "#3b82f6" },
    { title: "Agile Process", icon: <Zap size={24} />, color: "#f59e0b" },
    { title: "Scalable Architecture", icon: <Shield size={24} />, color: "#10b981" },
    { title: "Client-Centric", icon: <HeartHandshake size={24} />, color: "#ec4899" }
  ];

  return (
    <section className="section" ref={ref}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="why-preview-grid">
          <style>{`@media (min-width: 992px) { .why-preview-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-title">The AryChitra <span className="text-gradient">Advantage</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              We don't just write code; we deliver strategic digital solutions. Our commitment to excellence, transparency, and innovation ensures that your project isn't just completed—it's perfected.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {points.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${p.color}15`, color: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.icon}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{p.title}</span>
                </div>
              ))}
            </div>
            <Link to="/why-choose-us" className="btn btn-glow cursor-hover-target" style={{ textDecoration: 'none' }}>
              Read More
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ position: 'relative' }}
          >
             <div className="glass-card" style={{ padding: '1rem', position: 'relative', zIndex: 2 }}>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                  alt="AryChitra Expert Team Collaborating"
                  style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block', objectFit: 'cover' }}
                  loading="lazy"
                />
             </div>
             <div className="glow-orb glow-orb-purple" style={{ width: '300px', height: '300px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <SEO 
        title="Custom Software Development & IT Solutions" 
        description="AryChitra is a leading IT agency specializing in custom web development, mobile apps, AI solutions, and UI/UX design. We transform bold ideas into scalable digital experiences."
        keywords="custom software development, web development company, mobile app development, UI/UX design agency, AI/ML solutions, AryChitra"
        canonicalUrl="https://arychitra.com/"
      />
      <HeroSection />
      <AboutPreview />
      
      {/* Services Preview */}
      <div style={{ position: 'relative' }}>
        <ServicesSection />
        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <Link to="/services" className="btn btn-secondary cursor-hover-target" style={{ textDecoration: 'none', background: 'var(--bg-primary)' }}>
            View All Services
          </Link>
        </div>
      </div>

      <WhyUsPreview />
      
      {/* Portfolio Preview */}
      <div style={{ position: 'relative' }}>
        <PortfolioSection />
        <div style={{ position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
          <Link to="/portfolio" className="btn btn-secondary cursor-hover-target" style={{ textDecoration: 'none', background: 'var(--bg-primary)' }}>
            View Full Portfolio
          </Link>
        </div>
      </div>

      <TestimonialsSection />
      <TechnologiesSection />
      <CtaBanner />
    </>
  );
}

export default HomePage;
