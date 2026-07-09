import React from 'react';
import { Cloud, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const CloudPage = () => {
  return (
    <div className="animate-fade-in">
      <SEO 
        title="Cloud Solutions & DevOps | AryChitra" 
        description="Secure, scalable cloud infrastructure and DevOps pipelines. We migrate, manage, and scale your applications on AWS, Google Cloud, and Azure."
        keywords="cloud solutions, DevOps services, AWS migration, CI/CD pipelines, cloud architecture, AryChitra"
        canonicalUrl="https://arychitra.com/services/cloud"
      />
      <section className="section" style={{ background: 'var(--bg-secondary)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '20px', color: 'var(--accent-primary)', marginBottom: '2rem' }}>
            <Cloud size={40} />
          </div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Cloud <span className="text-gradient">Solutions</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto' }}>
            Scalable, secure, and high-performance cloud architectures. We handle migration, deployment, and management across AWS, Azure, and Google Cloud.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Cloud Migration</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Seamlessly move your legacy infrastructure to the cloud with zero downtime and improved security.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>DevOps & CI/CD</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Automate your deployment pipelines for faster, more reliable software releases using modern DevOps practices.</p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Serverless Architecture</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Reduce overhead and scale infinitely with cost-effective serverless computing solutions.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              Consult our Cloud Experts <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CloudPage;
