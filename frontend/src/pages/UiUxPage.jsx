import React from 'react';
import { PenTool, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const UiUxPage = () => {
  return (
    <div className="animate-fade-in">
      <SEO 
        title="UI/UX Design Services | AryChitra" 
        description="Crafting intuitive and stunning interfaces. AryChitra's UI/UX design services blend behavioral psychology with modern aesthetics for maximum engagement."
        keywords="UI/UX design services, web design, app design, user experience design, wireframing, prototyping"
        canonicalUrl="https://arychitra.com/services/ui-ux"
      />
      <section className="section" style={{ background: 'var(--bg-secondary)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', color: 'var(--accent-primary)', marginBottom: '2rem' }}>
            <PenTool size={40} />
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>UI/UX <span className="text-gradient">Design</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
            We design intuitive and visually stunning interfaces that prioritize user satisfaction, reduce friction, and increase engagement.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>User Research</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We dive deep into your target audience's behavior, needs, and pain points to inform our design decisions.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Wireframing & Prototyping</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Rapidly visualizing concepts and user flows to test and iterate before writing a single line of code.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Visual Design</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Creating a cohesive, modern, and attractive visual language that aligns perfectly with your brand identity.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Start a Design Project <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UiUxPage;
