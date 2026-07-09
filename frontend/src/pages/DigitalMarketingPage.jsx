import React from 'react';
import { BarChart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const DigitalMarketingPage = () => {
  return (
    <>
      <SEO 
        title="Digital Marketing & SEO | AryChitra" 
        description="Amplify your brand's digital footprint. AryChitra offers data-driven SEO, content marketing, and growth strategies to reach your target audience."
        keywords="digital marketing, SEO services, content marketing, growth hacking, AryChitra marketing"
        canonicalUrl="https://arychitra.com/services/digital-marketing"
      />
      <div className="animate-fade-in">
        <section className="section" style={{ background: 'var(--bg-secondary)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', color: 'var(--accent-primary)', marginBottom: '2rem' }}>
              <BarChart size={40} />
            </div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Digital <span className="text-gradient">Marketing</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
            Data-driven marketing strategies, SEO, and targeted campaigns designed to boost your online visibility and accelerate growth.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Search Engine Optimization</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Dominate search rankings and drive organic traffic through technical SEO, keyword strategy, and content optimization.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Performance Marketing</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Maximize ROI with highly targeted pay-per-click (PPC) and social media advertising campaigns.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Conversion Rate Optimization</h3>
              <p style={{ color: 'var(--text-secondary)' }}>A/B testing and user journey analysis to turn a higher percentage of your website visitors into paying customers.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Grow Your Business <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default DigitalMarketingPage;
