import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { API_BASE } from '../utils/api';

const ContactSection = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Transmission successful! We will reach out shortly.' });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus({ type: 'error', message: data.error || 'System error. Please try again.' });
      }
    } catch (error) {
      setStatus({ type: 'error', message: 'Network disconnected. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Orbs */}
      <div className="glow-orb glow-orb-purple" style={{ width: '600px', height: '600px', top: '10%', right: '-20%' }} />
      <div className="glow-orb glow-orb-blue" style={{ width: '500px', height: '500px', bottom: '-10%', left: '-10%' }} />

      <div className="container" ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="contact-grid">
          <style>{`@media (min-width: 992px) { .contact-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
          
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-title">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="section-subtitle" style={{ marginBottom: '3rem' }}>
              Whether you have a specific project in mind or just want to explore possibilities, our team is ready to talk.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {[
                { icon: <Mail size={24} />, title: 'Email Us', desc: 'arychitra26@gmail.com' },
                { icon: <Phone size={24} />, title: 'Call Us', desc: '+91 73879 64277' },
                { icon: <MapPin size={24} />, title: 'Visit Us', desc: 'Pimpri, Pune (HQ)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '16px',
                      background: 'rgba(108, 99, 255, 0.1)',
                      border: '1px solid rgba(108, 99, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-blue)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card cursor-hover-target" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
                Send a Message
              </h3>

              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '1rem',
                    marginBottom: '2rem',
                    borderRadius: '12px',
                    background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 72, 153, 0.1)',
                    border: `1px solid ${status.type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(236, 72, 153, 0.3)'}`,
                    color: status.type === 'success' ? '#10B981' : '#EC4899',
                    fontSize: '0.95rem',
                  }}
                >
                  {status.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '1.5rem' }} className="form-row">
                  <style>{`@media (min-width: 640px) { .form-row { grid-template-columns: 1fr 1fr !important; } }`}</style>
                  
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="John Doe" required />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="john@example.com" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="+1 (555) 000-0000" />
                </div>

                <div className="form-group">
                  <label className="form-label">Message Details</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" placeholder="Tell us about your project..." required />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }} disabled={isSubmitting}>
                  {isSubmitting ? (
                    'Transmitting...'
                  ) : (
                    <>
                      Initialize Sequence <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
