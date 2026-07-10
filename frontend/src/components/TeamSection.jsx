import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { getTeam } from '../utils/api';

const TeamSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeam()
      .then(setMembers)
      .catch(err => console.error("Failed to fetch team:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="team" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge">Our Experts</span>
          <h2 className="section-title">
            Meet the <span className="text-gradient">Team</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            The brilliant minds behind our innovative solutions.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
          }}
        >
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="team-card cursor-hover-target"
              style={{
                background: 'var(--bg-primary)',
                borderRadius: '20px',
                padding: '2rem',
                textAlign: 'center',
                border: '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s, border-color 0.3s',
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.3)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
            >
              <div
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem',
                  overflow: 'hidden',
                  border: '3px solid rgba(108, 99, 255, 0.2)',
                  position: 'relative',
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{member.name}</h3>
              <p style={{ color: 'var(--accent-purple)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '1.5rem' }}>
                {member.role}
              </p>

              {/* Social Icons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank" rel="noopener noreferrer"
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(148, 163, 184, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all 0.3s' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'var(--gradient-primary)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <Github size={16} />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank" rel="noopener noreferrer"
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(148, 163, 184, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all 0.3s' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'var(--gradient-primary)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <Twitter size={16} />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank" rel="noopener noreferrer"
                    style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(148, 163, 184, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all 0.3s' }}
                    onMouseOver={(e) => { e.currentTarget.style.background = 'var(--gradient-primary)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(148, 163, 184, 0.1)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    <Linkedin size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
