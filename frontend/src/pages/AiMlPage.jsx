import React from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const AiMlPage = () => {
  return (
    <div className="animate-fade-in">
      <SEO 
        title="AI & Machine Learning Solutions | AryChitra" 
        description="Unlock the power of your data with AryChitra's custom AI and Machine Learning solutions. We build predictive models, NLP tools, and intelligent automation systems."
        keywords="AI solutions, machine learning, predictive analytics, NLP, intelligent automation, AryChitra"
        canonicalUrl="https://arychitra.com/services/ai-ml"
      />
      <section className="section" style={{ background: 'var(--bg-secondary)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', color: 'var(--accent-primary)', marginBottom: '2rem' }}>
            <Brain size={40} />
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>AI & <span className="text-gradient">Machine Learning</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
            Integrate intelligent solutions and predictive models into your business to automate processes, unlock hidden insights, and drive innovation.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Generative AI Integration</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Leverage LLMs and custom AI models to generate content, assist users, and build intelligent chatbots.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Predictive Analytics</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Transform your raw data into actionable forecasts, helping you make data-driven decisions with confidence.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Computer Vision & NLP</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Implement advanced image recognition or natural language processing algorithms tailored to your industry.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/order" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Explore AI Solutions <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiMlPage;
