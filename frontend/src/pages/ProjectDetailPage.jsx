import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Tag } from 'lucide-react';
import { getProject } from '../utils/api';
import SEO from '../components/SEO';
import CtaBanner from '../components/CtaBanner';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getProject(id)
      .then(data => {
        if (data) setProject(data);
        else setError('Project not found.');
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load project details.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Loading case study...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <p style={{ fontSize: '1.2rem', color: '#ef4444' }}>{error || 'Project not found.'}</p>
        <Link to="/portfolio" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${project.name} | AryChitra Portfolio`} 
        description={project.description}
        canonicalUrl={`https://arychitra.com/portfolio/${id}`}
      />
      
      {/* Hero Section */}
      <section style={{ 
        padding: '10rem 0 5rem', 
        background: `linear-gradient(to bottom, rgba(10, 14, 39, 0.9), var(--bg-primary)), url(${project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'}) center/cover`,
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ background: project.color || 'var(--accent-purple)', color: '#fff', padding: '0.4rem 1.2rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                {project.category}
              </span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.1, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              {project.name}
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 2rem' }}>
              {project.description}
            </p>

            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                Visit Live Site <ExternalLink size={18} />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="glass-card" style={{ padding: '3rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Project Overview</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  {project.description} 
                  {/* Ideally, we would have a full HTML 'content' field for projects too. For now, we expand on description */}
                </p>

                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>Technologies Used</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '2rem' }}>
                  {project.tags && project.tags.length > 0 ? (
                    project.tags.map(tag => (
                      <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.9rem', color: 'var(--text-primary)', background: 'var(--bg-tertiary)', padding: '0.4rem 1rem', borderRadius: '50px', border: '1px solid var(--border-color)' }}>
                        <Tag size={14} /> {tag}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-muted)' }}>Not specified</span>
                  )}
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
                  <div>
                    <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Client</h4>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{project.name} Organization</p>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Status</h4>
                    <p style={{ fontSize: '1.1rem', fontWeight: 600, textTransform: 'capitalize' }}>{project.status || 'Completed'}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default ProjectDetailPage;
