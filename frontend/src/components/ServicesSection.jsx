import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ─── Service Data ─── */
const services = [
  {
    icon: '🌐',
    title: 'Web Development',
    description: 'Full-stack web applications built with React, Node.js, and modern architectures. Scalable, fast, and beautifully designed.',
    color: '#6C63FF',
    tags: ['React', 'Node.js', 'Next.js'],
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile apps with React Native and Flutter. Seamless experiences across iOS and Android.',
    color: '#00D9FF',
    tags: ['React Native', 'Flutter', 'iOS'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Intuitive, stunning interfaces designed with user-first principles. From wireframes to pixel-perfect designs.',
    color: '#EC4899',
    tags: ['Figma', 'Prototyping', 'Research'],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'Scalable cloud architecture on AWS, GCP, and Azure. CI/CD pipelines, containerization, and infrastructure as code.',
    color: '#10B981',
    tags: ['AWS', 'Docker', 'Kubernetes'],
  },
  {
    icon: '🤖',
    title: 'AI/ML Solutions',
    description: 'Intelligent automation and data-driven insights powered by machine learning, NLP, and computer vision.',
    color: '#F59E0B',
    tags: ['Python', 'TensorFlow', 'OpenAI'],
  },
  {
    icon: '📈',
    title: 'Digital Marketing & SEO',
    description: 'Data-driven marketing strategies to amplify your digital footprint. SEO, content strategy, and growth hacking.',
    color: '#A78BFA',
    tags: ['SEO', 'Analytics', 'Growth'],
  },
];

/* ─── Tilt Card Component ─── */
const TiltCard = ({ service, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="tilt-card cursor-hover-target"
        style={{
          transition: 'transform 0.15s ease-out, box-shadow 0.4s ease',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: `${service.color}15`,
            border: `1px solid ${service.color}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
          }}
        >
          {service.icon}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.3rem',
            fontWeight: 600,
            marginBottom: '1rem',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
          }}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            flex: 1,
            marginBottom: '1.5rem',
          }}
        >
          {service.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {service.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '0.3rem 0.8rem',
                fontSize: '0.75rem',
                borderRadius: '50px',
                background: `${service.color}10`,
                color: service.color,
                fontWeight: 500,
                border: `1px solid ${service.color}20`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
            opacity: 0,
            transition: 'opacity 0.4s ease',
          }}
          className="card-glow-line"
        />
      </div>
      <style>{`
        .tilt-card:hover .card-glow-line { opacity: 1 !important; }
      `}</style>
    </motion.div>
  );
};

/* ─── Services Section ─── */
const ServicesSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      id="services"
      className="section"
      style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg-secondary)', paddingTop: '3rem' }}
    >
      {/* Background Orbs */}
      <div className="glow-orb glow-orb-purple" style={{ width: '500px', height: '500px', top: '-10%', left: '-10%' }} />
      <div className="glow-orb glow-orb-blue" style={{ width: '400px', height: '400px', bottom: '-10%', right: '-10%' }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge">What We Do</span>
          <h2 className="section-title">
            Services That Drive <span className="text-gradient">Digital Success</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Specializing in high-performance digital solutions that solve complex
            business problems and drive measurable growth.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {services.map((service, index) => (
            <TiltCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
