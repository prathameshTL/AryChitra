import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import CtaBanner from '../components/CtaBanner';
import SEO from '../components/SEO';

const teamData = {
  leadership: [
    { name: 'Dr. Arya Chitra', role: 'Founder & CEO', bio: 'Former Principal Architect at FAANG. Drives the technical vision and strategic direction of the company.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sarah Jenkins', role: 'Chief Operations Officer', bio: 'Expert in scaling global delivery operations and ensuring client success across enterprise portfolios.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' }
  ],
  engineering: [
    { name: 'Alex Johnson', role: 'Lead Frontend Engineer', bio: 'React ecosystem expert. Obsessed with web performance and fluid UI animations.', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
    { name: 'Michael Chen', role: 'Cloud Architect', bio: 'AWS certified. Designs highly available serverless infrastructures for complex applications.', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80' },
    { name: 'Emily Davis', role: 'AI Specialist', bio: 'PhD in Machine Learning. Integrates predictive models and NLP into business logic.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
    { name: 'David Kim', role: 'Backend Developer', bio: 'Node.js and Go enthusiast. Builds secure, scalable REST and GraphQL APIs.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' }
  ],
  design: [
    { name: 'Elena Rodriguez', role: 'Head of Design', bio: 'Award-winning UX designer. Champions user-centric methodologies and accessibility.', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Marcus Bell', role: 'UI/Visual Designer', bio: 'Creates stunning visual systems, specializing in dark mode interfaces and glassmorphism.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' }
  ]
};

const TeamCard = ({ member, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ perspective: '1000px' }}
      className="flip-card-container cursor-hover-target"
    >
      <style>{`
        .flip-card-container { height: 400px; }
        .flip-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275); transform-style: preserve-3d; }
        .flip-card-container:hover .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 20px; overflow: hidden; }
        .flip-card-front { background: var(--bg-card); border: 1px solid var(--border-color); display: flex; flex-direction: column; }
        .flip-card-back { background: var(--gradient-primary); color: white; transform: rotateY(180deg); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; }
      `}</style>
      
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front">
          <div style={{ height: '250px', background: `url(${member.image}) center/cover`, borderBottom: '1px solid rgba(255,255,255,0.1)' }} />
          <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{member.name}</h3>
            <p style={{ color: 'var(--accent-purple)', fontSize: '0.95rem', fontWeight: 600, margin: 0 }}>{member.role}</p>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>{member.name}</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.role}</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>"{member.bio}"</p>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
              <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TeamPage = () => {
  return (
    <>
      <SEO 
        title="Our Team | Expert Software Engineers & Designers" 
        description="Meet the brilliant minds behind AryChitra's innovative solutions. Our team of expert software engineers, cloud architects, and UI/UX designers are ready to build your digital future."
        keywords="AryChitra team, software engineers, cloud architects, UI/UX designers, AI specialists, tech experts"
        canonicalUrl="https://arychitra.com/team"
      />
      <section style={{ padding: '8rem 0 4rem', background: 'var(--bg-tertiary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Meet Our <span className="text-gradient">Team</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              We are a diverse group of engineers, designers, and strategists. Together, we translate visionary ideas into robust digital realities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Leadership</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {teamData.leadership.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Engineering */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Engineering Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {teamData.engineering.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Design */}
      <section className="section">
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Design & UX</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            {teamData.design.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default TeamPage;
