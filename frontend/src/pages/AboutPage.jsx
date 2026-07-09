import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CtaBanner from '../components/CtaBanner';
import SEO from '../components/SEO';

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
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [inView, end]);

  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>
        {label}
      </div>
    </div>
  );
};

const AboutPage = () => {
  const { ref: storyRef, inView: storyInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { ref: timelineRef, inView: timelineInView } = useInView({ threshold: 0.1, triggerOnce: true });

  const values = [
    { title: 'Innovation', icon: '💡', desc: 'We constantly explore emerging technologies to build solutions that keep our clients ahead of the curve.' },
    { title: 'Integrity', icon: '🤝', desc: 'Honesty and transparency govern every line of code we write and every client relationship we build.' },
    { title: 'Excellence', icon: '⭐', desc: 'We don’t settle for "good enough." Our standard is absolute premium quality in architecture and design.' },
    { title: 'Collaboration', icon: '👥', desc: 'We work as an extension of your team, fostering open communication and shared goals.' },
    { title: 'Client-Centricity', icon: '🎯', desc: 'Your business objectives drive our engineering decisions. Your success is our true metric.' },
    { title: 'Transparency', icon: '🔍', desc: 'No hidden costs, no technical jargon to mask issues. Complete clarity throughout the lifecycle.' },
  ];

  return (
    <>
      <SEO 
        title="About Us | Our Mission, Vision & IT Expertise" 
        description="Learn about AryChitra, our mission to engineer excellence, and how our expert team delivers robust, scalable software solutions for startups and enterprises."
        keywords="about AryChitra, IT agency, software engineering team, digital transformation partner, tech experts"
        canonicalUrl="https://arychitra.com/about"
      />
      {/* Hero Banner */}
      <section style={{ padding: '8rem 0 4rem', background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb glow-orb-purple" style={{ width: '400px', height: '400px', top: '-10%', right: '-10%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              About <span className="text-gradient">AryChitra</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              We are a collective of digital craftsmen, engineers, and visionaries dedicated to building the technology of tomorrow, today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section" ref={storyRef}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="story-grid">
            <style>{`@media (min-width: 992px) { .story-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <h2 className="section-title">Our <span className="text-gradient">Journey</span></h2>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <p>
                  Founded on the principle that enterprise software doesn't have to be clunky, AryChitra began as a small, highly specialized team of engineers and designers. We noticed a distinct gap in the market: businesses were often forced to choose between highly functional but unintuitive legacy systems, or beautiful but structurally weak modern applications.
                </p>
                <p>
                  We set out to bridge that gap. By combining rigorous computer science fundamentals with cutting-edge UI/UX design, we started engineering platforms that were both technical marvels and a joy to use. Our early successes in the Fintech and Healthcare sectors proved that our hybrid approach—valuing aesthetics as much as algorithms—yielded incredible ROI for our clients.
                </p>
                <p>
                  Today, AryChitra has evolved into a premier IT services agency. While our team and capabilities have grown to encompass AI/ML, global cloud deployments, and comprehensive digital marketing, our core philosophy remains unchanged. We don't just write code; we craft premium digital experiences that elevate brands, automate complex workflows, and drive measurable, explosive growth.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={storyInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="glass-card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80) center/cover', opacity: 0.4, mixBlendMode: 'luminosity' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>The AryChitra DNA</h3>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {['Relentless Pursuit of Quality', 'Design-Driven Engineering', 'Scalability from Day One'].map((item, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 500 }}>
                        <span style={{ color: 'var(--accent-blue)' }}>✦</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div className="card" whileHover={{ y: -10 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎯</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                To empower forward-thinking businesses by engineering scalable, high-performance software solutions. We strive to translate complex business logic into streamlined digital tools that automate workflows, drive operational efficiency, and secure a definitive competitive edge for our clients.
              </p>
            </motion.div>
            <motion.div className="card" whileHover={{ y: -10 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👁️</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
                To be globally recognized as the ultimate benchmark for premium digital craftsmanship. We envision a future where all business software is inherently intuitive, visually stunning, and seamlessly integrated, making complex technology an invisible, effortless enabler of human potential.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section" ref={valuesRef}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Our Core <span className="text-gradient">Values</span></h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>The principles that guide our engineering and client partnerships.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card"
                style={{ padding: '2rem' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{val.icon}</div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{val.title}</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem' }}>
            <AnimatedCounter end={10} suffix="+" label="Years Experience" />
            <AnimatedCounter end={150} suffix="+" label="Projects Delivered" />
            <AnimatedCounter end={98} suffix="%" label="Client Satisfaction" />
            <AnimatedCounter end={50} suffix="+" label="Team Members" />
            <AnimatedCounter end={15} suffix="+" label="Countries Served" />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default AboutPage;
