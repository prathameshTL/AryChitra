import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, XCircle } from 'lucide-react';
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
    <div ref={ref} style={{ textAlign: 'center', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
      <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
        {count}{suffix}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {label}
      </div>
    </div>
  );
};

const WhyChooseUsPage = () => {
  const { ref: pointsRef, inView: pointsInView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const reasons = [
    { title: "Proven Industry Experience", icon: "🏆", desc: "With over a decade of navigating complex digital transformations, our team brings battle-tested strategies to your project. We've successfully delivered high-stakes platforms across finance, healthcare, and e-commerce." },
    { title: "Skilled & Certified Experts", icon: "🧠", desc: "Our talent pool isn't outsourced to the lowest bidder. We employ top-tier, certified architects, full-stack developers, and UI/UX designers who are masters of their specific technology stacks." },
    { title: "Cutting-Edge Innovation", icon: "🚀", desc: "We don't build legacy software. By leveraging modern frameworks, serverless architectures, and AI integrations, we ensure your product is future-proof and miles ahead of the competition." },
    { title: "Radical Transparency", icon: "🔍", desc: "No black boxes. You get complete visibility into our sprint cycles, daily standups, and codebase. We communicate proactively so you never have to ask for a status update." },
    { title: "On-Time Delivery", icon: "⏱️", desc: "We utilize rigorous Agile methodologies and CI/CD pipelines to ensure rapid, predictable deployment cycles. We respect your deadlines because time-to-market is critical." },
    { title: "Scalable Architecture", icon: "📈", desc: "We design systems that handle 10 users just as elegantly as 10 million. Our cloud-native architectures are built to scale elastically, saving you money on infrastructure as you grow." },
    { title: "24/7 Dedicated Support", icon: "🛡️", desc: "Our relationship doesn't end at launch. We provide round-the-clock monitoring, security patching, and dedicated support channels to ensure your platform never experiences downtime." },
    { title: "Result-Driven Approach", icon: "🎯", desc: "We don't just write code; we solve business problems. Every technical decision we make is evaluated against its potential to increase your ROI, conversion rates, and operational efficiency." },
  ];

  return (
    <>
      <SEO 
        title="Why Choose Us | The AryChitra Advantage" 
        description="Discover why startups and enterprises choose AryChitra for their digital transformation. We deliver scalable, secure, and innovative software solutions."
        keywords="why choose AryChitra, software development partner, IT consulting firm, digital transformation experts"
        canonicalUrl="https://arychitra.com/why-choose-us"
      />
      {/* Hero */}
      <section style={{ padding: '8rem 0 4rem', background: 'var(--bg-tertiary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Why Choose <span className="text-gradient">AryChitra</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.8 }}>
              In a sea of generic development agencies, AryChitra stands apart as a true technology partner. We combine deep engineering pedigree with stunning design sensibilities to deliver digital products that don't just function—they dominate their markets. We are the choice for businesses that refuse to compromise on quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8 Points Grid */}
      <section className="section" ref={pointsRef}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={pointsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card cursor-hover-target"
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'rgba(108, 99, 255, 0.1)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px' }}>
                  {reason.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>{reason.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>{reason.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">AryChitra vs <span style={{ color: 'var(--text-muted)' }}>Traditional Agencies</span></h2>
          </div>
          
          <div style={{ maxWidth: '900px', margin: '0 auto', background: 'var(--bg-primary)', borderRadius: '24px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1.5rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)', fontWeight: 600, fontSize: '1.1rem' }}>
              <div>Feature</div>
              <div style={{ color: 'var(--accent-blue)' }}>AryChitra</div>
              <div style={{ color: 'var(--text-muted)' }}>Traditional Agencies</div>
            </div>
            
            {[
              { feat: 'Architecture', ary: 'Cloud-native, Serverless, Microservices', trad: 'Monolithic legacy systems' },
              { feat: 'Design Approach', ary: 'User-first, Custom Glassmorphism UI', trad: 'Generic templates & themes' },
              { feat: 'Communication', ary: 'Daily Slack updates, direct Dev access', trad: 'Slow email chains via account managers' },
              { feat: 'Code Quality', ary: 'Strict linting, automated CI/CD testing', trad: 'Manual testing, spaghetti code' },
              { feat: 'Post-Launch', ary: '24/7 proactive monitoring & scaling', trad: 'Billed hourly for critical bug fixes' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '1.5rem', borderBottom: i !== 4 ? '1px solid var(--border-color)' : 'none', alignItems: 'center' }}>
                <div style={{ fontWeight: 500 }}>{row.feat}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={18} color="var(--accent-blue)" /> {row.ary}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                  <XCircle size={18} /> {row.trad}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            <AnimatedCounter end={98} suffix="%" label="Client Retention Rate" />
            <AnimatedCounter end={99} suffix="%" label="On-Time Delivery" />
            <AnimatedCounter end={4.9} suffix="/5" label="Client Satisfaction Score" />
            <AnimatedCounter end={15} suffix=" Min" label="Avg Support Response Time" />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default WhyChooseUsPage;
