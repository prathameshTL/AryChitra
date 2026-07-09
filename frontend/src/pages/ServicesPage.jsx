import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLocation } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import SEO from '../components/SEO';

const ServiceBlock = ({ id, title, description, features, tech, image, index }) => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const isEven = index % 2 === 0;

  return (
    <div id={id} ref={ref} style={{ padding: '6rem 0', borderBottom: '1px solid var(--border-color)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="service-block-grid">
          <style>{`@media (min-width: 992px) { .service-block-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
          
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ order: isEven ? 1 : 2 }}
            className="service-content"
          >
            <style>{`@media (max-width: 991px) { .service-content { order: 2 !important; } }`}</style>
            
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>{title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {description}
            </p>
            
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Key Capabilities</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              {features.map((feat, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-purple)' }}>✓</span> {feat}
                </li>
              ))}
            </ul>

            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Tech Stack</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {tech.map((t, i) => (
                <span key={i} style={{ padding: '0.4rem 1rem', background: 'rgba(108, 99, 255, 0.1)', border: '1px solid rgba(108, 99, 255, 0.2)', borderRadius: '50px', fontSize: '0.85rem', color: 'var(--accent-blue)' }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Visual/Image placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ order: isEven ? 2 : 1 }}
            className="service-visual"
          >
            <style>{`@media (max-width: 991px) { .service-visual { order: 1 !important; } }`}</style>
            <div className="glass-card" style={{ padding: '2rem', height: '400px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ position: 'absolute', inset: 0, background: `url(${image}) center/cover`, opacity: 0.6, mixBlendMode: 'luminosity' }} />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.8), rgba(10, 14, 39, 0.4))' }} />
               <div className="glow-orb glow-orb-purple" style={{ width: '200px', height: '200px', zIndex: 1 }} />
               <h3 style={{ position: 'relative', zIndex: 2, fontSize: '2rem', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{title}</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  const services = [
    {
      id: "web",
      title: "Enterprise Web Development",
      description: "We architect and build scalable, high-performance web applications that serve as the backbone of your digital operations. From complex SaaS platforms to enterprise portals, our solutions are engineered for security, speed, and seamless user experiences across all devices.",
      features: ["Custom SaaS Development", "Progressive Web Apps (PWAs)", "API Development & Integration", "Legacy System Modernization"],
      tech: ["React", "Node.js", "Next.js", "PostgreSQL", "GraphQL"],
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "app",
      title: "Mobile App Development",
      description: "Capture your mobile audience with blazing-fast, intuitive native and cross-platform applications. We handle the entire lifecycle—from conceptualization and UI/UX design to App Store deployment and ongoing maintenance—ensuring your app dominates its category.",
      features: ["iOS Native App Dev", "Android Native App Dev", "Cross-Platform (React Native/Flutter)", "IoT Integration"],
      tech: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "ui-ux",
      title: "UI/UX Design & Prototyping",
      description: "Great engineering deserves great design. Our design philosophy centers on the end-user, combining behavioral psychology with stunning aesthetics (like glassmorphism and modern minimalism) to create interfaces that drive engagement, retention, and conversion.",
      features: ["User Research & Personas", "Wireframing & Prototyping", "High-Fidelity UI Design", "Usability Testing"],
      tech: ["Figma", "Adobe XD", "Framer", "Protopie"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "cloud",
      title: "Cloud Solutions & DevOps",
      description: "Migrate, manage, and scale your infrastructure with confidence. We implement robust DevOps practices and cloud-native architectures that automate your deployment pipelines, reduce server costs, and guarantee 99.99% uptime for mission-critical applications.",
      features: ["Cloud Migration Strategy", "CI/CD Pipeline Automation", "Infrastructure as Code (IaC)", "24/7 Monitoring & Support"],
      tech: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Unlock the hidden value in your data. We integrate intelligent algorithms, natural language processing, and predictive analytics into your software ecosystem to automate routine tasks, personalize user experiences, and provide actionable business intelligence.",
      features: ["Predictive Analytics", "NLP & Chatbots", "Computer Vision", "Recommendation Engines"],
      tech: ["Python", "TensorFlow", "PyTorch", "OpenAI API"],
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing & Growth",
      description: "A great product needs an audience. Our data-driven marketing strategies amplify your brand's digital footprint. Through technical SEO, targeted paid acquisition, and conversion rate optimization, we ensure your software reaches and resonates with your ideal customers.",
      features: ["Technical & On-Page SEO", "PPC Campaign Management", "Conversion Rate Optimization", "Growth Hacking Strategies"],
      tech: ["Google Analytics", "SEMrush", "HubSpot", "Meta Ads"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <>
      <SEO 
        title="IT Services | Web, Mobile, AI & Cloud Solutions" 
        description="Explore AryChitra's comprehensive digital solutions including Enterprise Web Development, Native Mobile Apps, UI/UX Design, Cloud/DevOps, and AI/Machine Learning."
        keywords="enterprise web development, mobile app development, UI/UX design, cloud solutions, DevOps, AI integration, AryChitra services"
        canonicalUrl="https://arychitra.com/services"
      />
      <section style={{ padding: '8rem 0 4rem', background: 'var(--bg-tertiary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Our <span className="text-gradient">Services</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              Comprehensive digital solutions engineered for scale, performance, and aesthetic excellence. Explore how we can transform your business.
            </p>
          </motion.div>
        </div>
      </section>

      <div style={{ background: 'var(--bg-primary)' }}>
        {services.map((service, index) => (
          <ServiceBlock key={service.id} {...service} index={index} />
        ))}
      </div>

      <CtaBanner />
    </>
  );
};

export default ServicesPage;
