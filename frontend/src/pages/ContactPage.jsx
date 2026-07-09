import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Plus, Minus } from 'lucide-react';
import { API_BASE } from '../utils/api';
import SEO from '../components/SEO';

const faqs = [
  { question: "What is your typical project timeline?", answer: "Project timelines vary based on complexity. A standard corporate website might take 4-6 weeks, while a complex enterprise SaaS platform can take 3-6 months. We provide a detailed sprint schedule during the discovery phase." },
  { question: "Do you provide post-launch support?", answer: "Absolutely. We offer comprehensive SLA-backed maintenance packages that include 24/7 monitoring, security patching, server scaling, and dedicated bug-fix hours." },
  { question: "What technology stack do you use?", answer: "We are technology agnostic but specialize in modern, scalable stacks. Our primary tools include React, Next.js, Node.js, Python, AWS, and Flutter for mobile development." },
  { question: "How do you handle project pricing?", answer: "We offer both Time & Material (T&M) and Fixed Price models. After an initial discovery call, we provide a transparent, itemized proposal detailing the scope, timeline, and exact costs." },
  { question: "Can you sign an NDA before we discuss my idea?", answer: "Yes, we standardly execute Mutual Non-Disclosure Agreements (NDAs) before any proprietary information is shared. Client confidentiality is our top priority." }
];

const FaqItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'transparent',
          border: 'none',
          padding: '1.5rem 0',
          color: isOpen ? 'var(--accent-blue)' : 'var(--text-primary)',
          fontSize: '1.1rem',
          fontWeight: 600,
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'color 0.3s'
        }}
      >
        {faq.question}
        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ color: 'var(--text-secondary)', paddingBottom: '1.5rem', lineHeight: 1.7 }}>
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ContactPage = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
    <>
      <SEO 
        title="Contact Us | Start Your Digital Project" 
        description="Get in touch with AryChitra to discuss your next software project. We offer expert consulting, web development, and digital transformation services."
        keywords="contact AryChitra, software project inquiry, hire developers, tech consulting, IT agency contact"
        canonicalUrl="https://arychitra.com/contact"
      />
      <section style={{ padding: '8rem 0 4rem', background: 'var(--bg-tertiary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Let's <span className="text-gradient">Talk</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              Ready to engineer your digital future? Reach out to our team to discuss your project, request a quote, or simply say hello.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section" ref={ref}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }} className="contact-grid">
            <style>{`@media (min-width: 992px) { .contact-grid { grid-template-columns: 1fr 1.5fr !important; } }`}</style>
            
            {/* Left: Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {[
                  { icon: <Mail size={24} />, title: 'Email Us', desc: 'hello@arychitra.com' },
                  { icon: <Phone size={24} />, title: 'Call Us', desc: '+1 (555) 123-4567' },
                  { icon: <MapPin size={24} />, title: 'Visit HQ', desc: '123 Tech Avenue, Suite 400\nSan Francisco, CA 94105' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(108, 99, 255, 0.1)', border: '1px solid rgba(108, 99, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Placeholder */}
              <div style={{ width: '100%', height: '250px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', position: 'relative' }}>
                 <iframe 
                    title="office-map"
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=San%20Francisco+(AryChitra)&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    style={{ filter: 'grayscale(1) invert(1) contrast(1.2)' }}
                 ></iframe>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="glass-card" style={{ padding: '3rem' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Send a Message</h3>
                {status.message && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '1rem', marginBottom: '2rem', borderRadius: '12px', background: status.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 72, 153, 0.1)', color: status.type === 'success' ? '#10B981' : '#EC4899' }}>
                    {status.message}
                  </motion.div>
                )}
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                     <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Subject</label>
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="form-control" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Project Details</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows="5" required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Transmitting...' : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Frequently Asked <span className="text-gradient">Questions</span></h2>
            <div>
              {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
