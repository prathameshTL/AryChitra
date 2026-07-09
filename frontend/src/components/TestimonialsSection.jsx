import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCards } from 'swiper/modules';
import { Quote } from 'lucide-react';
import { getTestimonials } from '../utils/api';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';

const FALLBACK_TESTIMONIALS = [
  {
    _id: '1',
    name: 'Sarah Jenkins',
    role: 'CEO, TechStart',
    content: 'AryChitra completely transformed our digital presence. The new platform is not only beautiful but incredibly fast and scalable. Our user engagement has doubled since the launch.',
    image: 'https://i.pravatar.cc/150?img=47',
  },
  {
    _id: '2',
    name: 'David Chen',
    role: 'CTO, FinServe',
    content: 'Their engineering team is top-notch. They handled our complex backend requirements with ease and delivered a secure, robust product ahead of schedule.',
    image: 'https://i.pravatar.cc/150?img=13',
  },
  {
    _id: '3',
    name: 'Amanda Brooks',
    role: 'Founder, EcoShop',
    content: 'Working with AryChitra was a breeze. They truly understood our vision and translated it into a stunning UI that our customers love.',
    image: 'https://i.pravatar.cc/150?img=32',
  },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(() => console.log('Using fallback testimonials'));
  }, []);

  return (
    <section id="testimonials" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="glow-orb glow-orb-purple" style={{ width: '400px', height: '400px', top: '20%', left: '-10%' }} />

      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="section-badge">Client Success</span>
          <h2 className="section-title">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Don't just take our word for it. Here's what our partners have to say.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}
        >
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            style={{ paddingBottom: '3rem' }}
          >
            {testimonials.map((test) => (
              <SwiperSlide key={test._id}>
                <div
                  className="glass-card"
                  style={{
                    padding: '3rem',
                    textAlign: 'center',
                    background: 'var(--bg-card)',
                    border: '1px solid rgba(108, 99, 255, 0.2)',
                  }}
                >
                  <Quote size={40} color="var(--accent-purple)" style={{ margin: '0 auto 1.5rem', opacity: 0.5 }} />
                  <p style={{ fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--text-primary)', fontStyle: 'italic' }}>
                    "{test.content}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    {test.image && test.image !== 'https://via.placeholder.com/150' && (
                      <img
                        src={test.image}
                        alt={test.name}
                        style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-blue)' }}
                      />
                    )}
                    <div style={{ textAlign: 'left' }}>
                      <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{test.name}</h4>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{test.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
