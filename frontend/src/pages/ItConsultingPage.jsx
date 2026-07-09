import React from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const ItConsultingPage = () => {
  return (
    <>
      <SEO 
        title="IT Consulting Services | AryChitra" 
        description="Strategic IT consulting to drive digital transformation. AryChitra helps enterprises align their technology strategy with business goals for sustainable growth."
        keywords="IT consulting, digital transformation strategy, technology consulting, enterprise IT solutions, AryChitra"
        canonicalUrl="https://arychitra.com/services/it-consulting"
      />
      <div className="animate-fade-in">
        <section className="section" style={{ background: 'var(--bg-secondary)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', color: 'var(--accent-primary)', marginBottom: '2rem' }}>
              <Briefcase size={40} />
            </div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>IT <span className="text-gradient">Consulting</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
            Expert guidance on technology strategy, digital transformation, and optimizing your IT infrastructure for maximum efficiency.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Digital Transformation</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Modernize your business operations by integrating the right digital technologies across all areas of your enterprise.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Technology Strategy</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Align your IT investments with your business goals to ensure long-term scalability and competitive advantage.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Security & Compliance</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Audit and upgrade your cybersecurity posture while ensuring compliance with industry standards and regulations.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Schedule a Consultation <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default ItConsultingPage;
