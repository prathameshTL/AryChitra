import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink } from 'lucide-react';

/* ─── Project Data ─── */
const projects = [
  {
    name: 'Hotel Shiv Shambhoo',
    category: 'Web',
    description: 'A premium digital experience for a luxury hotel — elegant rooms, fine dining menus, and event bookings.',
    link: 'https://shivshambhoo.com/',
    color: '#6C63FF',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    name: 'FinancesBazar Admin',
    category: 'Web',
    description: 'Enterprise admin dashboard for managing financial loans, employee tracking, and automated invoicing.',
    link: 'https://umbarkarcs.com/',
    color: '#00D9FF',
    tags: ['React', 'Express', 'MySQL'],
  },
  {
    name: 'Fintech Analytics',
    category: 'App',
    description: 'Real-time analytics platform with interactive charts, predictive modeling for financial data insights.',
    color: '#A78BFA',
    tags: ['Python', 'React', 'D3.js'],
  },
  {
    name: 'College ERP System',
    category: 'Web',
    description: 'Comprehensive management system for educational institutions — admissions, academics, and administration.',
    color: '#10B981',
    tags: ['MERN Stack', 'AWS'],
    status: 'ongoing',
  },
  {
    name: 'Banking Platform',
    category: 'App',
    description: 'Secure and scalable core banking platform for managing transactions, accounts, and financial services.',
    color: '#EC4899',
    tags: ['React Native', 'Node.js'],
    status: 'ongoing',
  },
  {
    name: 'Medical Billing SaaS',
    category: 'Design',
    description: 'Automated billing and invoicing solution designed specifically for healthcare providers and clinics.',
    color: '#F59E0B',
    tags: ['Figma', 'React', 'Stripe'],
    status: 'ongoing',
  },
];

const filters = ['All', 'Web', 'App', 'Design'];

/* ─── Portfolio Section ─── */
const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [apiProjects, setApiProjects] = useState([]);
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  React.useEffect(() => {
    import('../utils/api').then(({ getProjects }) => {
      getProjects().then(data => {
        if (data && data.length > 0) setApiProjects(data);
      }).catch(err => console.error("Failed to load projects", err));
    });
  }, []);

  const displayProjects = apiProjects.length > 0 ? apiProjects : projects;

  const filteredProjects =
    activeFilter === 'All'
      ? displayProjects
      : displayProjects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="section"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="glow-orb glow-orb-pink" style={{ width: '400px', height: '400px', top: '0%', right: '-5%' }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="section-badge">Our Work</span>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A glimpse into some of the digital products we've brought to life.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: '3rem',
            flexWrap: 'wrap',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 500,
                fontFamily: 'var(--font-accent)',
                transition: 'all 0.3s ease',
                background:
                  activeFilter === filter
                    ? 'var(--gradient-primary)'
                    : 'rgba(108, 99, 255, 0.08)',
                color:
                  activeFilter === filter ? '#fff' : 'var(--text-secondary)',
                border:
                  activeFilter === filter
                    ? 'none'
                    : '1px solid rgba(108, 99, 255, 0.15)',
                boxShadow:
                  activeFilter === filter
                    ? '0 4px 20px rgba(108, 99, 255, 0.3)'
                    : 'none',
              }}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div
                  className="glass-card cursor-hover-target"
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Status Badge */}
                  {project.status === 'ongoing' && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        padding: '0.25rem 0.75rem',
                        background: 'rgba(245, 158, 11, 0.15)',
                        border: '1px solid rgba(245, 158, 11, 0.3)',
                        borderRadius: '50px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: '#F59E0B',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      In Progress
                    </div>
                  )}

                  {/* Link Icon */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        color: 'var(--text-muted)',
                        transition: 'color 0.3s',
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
                      onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}

                  {/* Color Accent Line */}
                  <div
                    style={{
                      width: '50px',
                      height: '4px',
                      borderRadius: '2px',
                      background: project.color || '#6C63FF',
                      marginBottom: '1.5rem',
                      boxShadow: `0 0 15px ${project.color || '#6C63FF'}50`,
                    }}
                  />

                  {/* Category */}
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: project.color || '#6C63FF',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontFamily: 'var(--font-heading)',
                      marginBottom: '1rem',
                      paddingRight: '2rem',
                    }}
                  >
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      flex: 1,
                      marginBottom: '1.5rem',
                    }}
                  >
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {(project.tags || []).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          padding: '0.25rem 0.7rem',
                          fontSize: '0.75rem',
                          borderRadius: '50px',
                          background: 'rgba(148, 163, 184, 0.08)',
                          color: 'var(--text-muted)',
                          border: '1px solid rgba(148, 163, 184, 0.1)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
