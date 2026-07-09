import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import CtaBanner from '../components/CtaBanner';
import SEO from '../components/SEO';

const projects = [
  {
    name: 'Hotel Shiv Shambhoo',
    category: 'Web',
    description: 'A premium digital experience for a luxury hotel featuring an elegant UI, responsive room galleries, fine dining menus, and an integrated seamless booking engine.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    link: 'https://shivshambhoo.com/',
    color: '#6C63FF',
    tags: ['React', 'Node.js', 'MongoDB', 'Framer Motion'],
  },
  {
    name: 'FinancesBazar Admin',
    category: 'App',
    description: 'A highly secure, complex enterprise admin dashboard designed to manage financial loans, track employee performance metrics, and automate high-volume invoicing processes.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    link: 'https://umbarkarcs.com/',
    color: '#00D9FF',
    tags: ['React', 'Express', 'MySQL', 'Tailwind CSS'],
  },
  {
    name: 'Nexus Fintech Analytics',
    category: 'Cloud',
    description: 'Real-time financial analytics platform processing massive datasets to render interactive, predictive modeling charts for hedge fund managers.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    color: '#A78BFA',
    tags: ['Python', 'AWS', 'D3.js', 'React'],
  },
  {
    name: 'EduCore ERP System',
    category: 'Web',
    description: 'Comprehensive, cloud-based management system streamlining operations for a network of educational institutions, covering admissions, academics, and HR.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    color: '#10B981',
    tags: ['MERN Stack', 'AWS', 'Redux'],
  },
  {
    name: 'Aura Banking Platform',
    category: 'App',
    description: 'Scalable, cross-platform core banking application allowing users to manage secure transactions, track accounts, and access crypto investment portfolios.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=800&q=80',
    color: '#EC4899',
    tags: ['React Native', 'Node.js', 'Docker'],
  },
  {
    name: 'MediBill SaaS Platform',
    category: 'UI-UX',
    description: 'Complete UI/UX overhaul of an automated medical billing solution, focusing on reducing cognitive load for healthcare professionals and simplifying the claims process.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    color: '#F59E0B',
    tags: ['Figma', 'Prototyping', 'User Research'],
  },
];

const filters = ['All', 'Web', 'App', 'UI-UX', 'Cloud'];

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <>
      <SEO 
        title="Portfolio & Case Studies | Our Work" 
        description="View AryChitra's portfolio of successful digital projects. We have delivered premium web apps, mobile applications, and enterprise systems for clients worldwide."
        keywords="AryChitra portfolio, software development case studies, web development projects, app development portfolio, client success stories"
        canonicalUrl="https://arychitra.com/portfolio"
      />
      <section style={{ padding: '8rem 0 4rem', background: 'var(--bg-tertiary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              A curated selection of our finest engineering and design work. We transform complex problems into beautiful, intuitive, and highly functional digital products.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          
          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '0.6rem 1.5rem',
                  borderRadius: '50px',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  background: activeFilter === filter ? 'var(--gradient-primary)' : 'rgba(148, 163, 184, 0.1)',
                  color: activeFilter === filter ? '#fff' : 'var(--text-secondary)',
                  border: activeFilter === filter ? 'none' : '1px solid rgba(148, 163, 184, 0.2)',
                  boxShadow: activeFilter === filter ? '0 4px 20px rgba(108, 99, 255, 0.3)' : 'none',
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="glass-card cursor-hover-target project-card"
                  style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}
                >
                  <style>{`
                    .project-card:hover .project-image { transform: scale(1.05); }
                  `}</style>
                  
                  {/* Image Header */}
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <div className="project-image" style={{ width: '100%', height: '100%', background: `url(${project.image}) center/cover`, transition: 'transform 0.5s ease' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 14, 39, 1), transparent)' }} />
                    
                    <span style={{ position: 'absolute', top: '1rem', left: '1rem', padding: '0.4rem 1rem', background: project.color, color: '#fff', fontSize: '0.75rem', fontWeight: 600, borderRadius: '50px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>{project.name}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>{project.description}</p>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                      {project.tags.map(tag => (
                        <span key={tag} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>{tag}</span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-blue)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-primary)'}>
                        View Case Study <ArrowRight size={16} />
                      </button>
                      
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-blue)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default PortfolioPage;
