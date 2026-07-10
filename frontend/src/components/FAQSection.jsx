import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is your typical process for a new project?",
    answer: "We start with a thorough discovery phase to understand your requirements, followed by UI/UX design, architecture planning, agile development, rigorous testing, and finally deployment. We maintain clear communication throughout every sprint."
  },
  {
    question: "Do you offer post-launch support and maintenance?",
    answer: "Yes, all our projects come with a standard post-launch support period (1-3 months). We also offer extended maintenance contracts to ensure your application remains secure, up-to-date, and fully functional as your business grows."
  },
  {
    question: "How long does it take to build a custom web application?",
    answer: "The timeline varies greatly depending on complexity. A basic informational website might take 2-4 weeks, while a complex custom SaaS platform could take 3-6 months. We provide accurate timelines during the initial consultation."
  },
  {
    question: "Will I own the source code after the project is completed?",
    answer: "Absolutely. Once the project is fully paid for and completed, all intellectual property rights and the complete source code are transferred to you."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in modern, scalable stacks. Our primary technologies include React, Next.js, Node.js, Python, React Native, and Flutter, deployed on AWS or Google Cloud architectures."
  }
];

const FAQItem = ({ faq, index, isOpen, toggleOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ marginBottom: '1rem' }}
    >
      <div 
        className="glass-card"
        onClick={toggleOpen}
        style={{ 
          padding: '1.5rem', 
          cursor: 'pointer',
          border: isOpen ? '1px solid var(--accent-purple)' : '1px solid var(--border-color)',
          transition: 'all 0.3s ease',
          background: isOpen ? 'var(--card-bg-highlight)' : 'var(--card-bg)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, color: isOpen ? 'var(--accent-purple)' : 'var(--text-primary)' }}>
            {faq.question}
          </h4>
          <div style={{ 
            color: isOpen ? 'var(--accent-purple)' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '24px'
          }}>
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: 'hidden' }}
            >
              <p style={{ margin: 0, marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const FAQSection = () => {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section" style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
      <div className="container" ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Left Side: Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ position: 'sticky', top: '100px' }}
          >
            <span className="section-badge">F.A.Q</span>
            <h2 className="section-title">
              Common <span className="text-gradient">Questions</span>
            </h2>
            <p className="section-subtitle">
              Everything you need to know about our services, pricing, and project lifecycle. Can't find the answer you're looking for? Feel free to reach out to our team.
            </p>
          </motion.div>

          {/* Right Side: Accordion */}
          <div style={{ width: '100%' }}>
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                index={index} 
                isOpen={openIndex === index} 
                toggleOpen={() => handleToggle(index)} 
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
