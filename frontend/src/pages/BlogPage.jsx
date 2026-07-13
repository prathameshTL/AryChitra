import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import SEO from '../components/SEO';
import { getBlogs } from '../utils/api';

const AnimatedHeroVisual = () => {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto', height: '500px' }}>
      
      {/* Background Glowing SVG Lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        
        {/* Orange Circuit Line 1 */}
        <motion.path 
          d="M 180 320 L 100 320 L 100 200 L 140 200"
          stroke="#F59E0B" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 8px #F59E0B)' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Orange Circuit Line 2 */}
        <motion.path 
          d="M 180 340 L 120 340 L 120 400 L 250 400"
          stroke="#F59E0B" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: 'drop-shadow(0 0 8px #F59E0B)' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Pink Glow Line */}
        <motion.path 
          d="M 220 280 C 280 280, 300 200, 350 200 C 400 200, 420 250, 450 250"
          stroke="var(--accent-pink)" 
          strokeWidth="4"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 10px var(--accent-pink))' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />

        {/* Green Loop Line */}
        <motion.path 
          d="M 200 350 C 200 450, 300 450, 300 380 C 300 350, 270 350, 250 380"
          stroke="var(--accent-green)" 
          strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 8px var(--accent-green))' }}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </svg>

      {/* Main Original Image */}
      <motion.img
        src="/ChatGPT Image Jul 11, 2026, 01_38_37 PM.png"
        alt="AryChitra Blog"
        style={{ position: 'relative', zIndex: 1, height: '100%', width: '100%', objectFit: 'contain' }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Z's for the Cat */}
      <div style={{ position: 'absolute', bottom: '15%', right: '28%', zIndex: 2 }}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: -40 - (i * 25), 
              x: 10 + (i % 2 === 0 ? 15 : -15),
              scale: 1.2 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 1,
              ease: "easeOut"
            }}
            style={{ 
              position: 'absolute', 
              color: 'var(--text-primary)', 
              fontWeight: 800, 
              fontSize: '1.4rem',
              fontFamily: 'var(--font-heading)',
              textShadow: '0 0 10px rgba(255,255,255,0.8)'
            }}
          >
            Z
          </motion.div>
        ))}
      </div>
      
      {/* Floating Hearts near cat */}
      <motion.div
         initial={{ opacity: 0, y: 0, scale: 0, rotate: -10 }}
         animate={{ opacity: [0, 1, 0], y: -30, scale: 1, rotate: 10 }}
         transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
         style={{ position: 'absolute', bottom: '22%', right: '15%', zIndex: 2, fontSize: '1.2rem', filter: 'drop-shadow(0 0 5px rgba(236,72,153,0.5))' }}
      >
        🤍
      </motion.div>
      <motion.div
         initial={{ opacity: 0, y: 0, scale: 0, rotate: 10 }}
         animate={{ opacity: [0, 1, 0], y: -40, x: -10, scale: 0.8, rotate: -20 }}
         transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
         style={{ position: 'absolute', bottom: '18%', right: '20%', zIndex: 2, fontSize: '1rem', filter: 'drop-shadow(0 0 5px rgba(236,72,153,0.5))' }}
      >
        🤍
      </motion.div>
      
      {/* Decorative Glow Orb to tie it all together */}
      <div className="glow-orb glow-orb-purple" style={{ width: '300px', height: '300px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.4, zIndex: 0 }} />
    </div>
  );
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(data => {
        if (data) setBlogPosts(data);
      })
      .catch(err => console.error("Failed to load blogs:", err))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <>
      <SEO
        title="Blog & Insights | Tech News & Software Trends"
        description="Read the latest insights, tutorials, and tech news from the AryChitra team. Stay updated on web development, AI trends, cloud computing, and more."
        keywords="tech blog, software development insights, AI trends, web dev tutorials, cloud computing news, AryChitra blog"
        canonicalUrl="https://arychitra.com/blog"
      />
      <section style={{ padding: '120px 0 60px', position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }} className="hero-grid">
            <style>{`@media (min-width: 992px) { .hero-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>

            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ marginBottom: '0.25rem' }}>
                <span className="section-badge">
                  🚀 TECH INSIGHTS
                </span>
              </motion.div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', letterSpacing: '-1px', lineHeight: 1.1 }}>
                Shaping the <br /><span className="text-gradient">Digital Future</span>
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                Deep technical dives, design philosophy, and industry insights directly from the engineering minds at AryChitra. Explore our latest thoughts on software architecture, artificial intelligence, and digital transformation strategies that are shaping the future of technology.
              </p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link to="/contact" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                  Subscribe Now
                </Link>
                <button onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })} className="btn btn-secondary">
                  Read Articles
                </button>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div style={{ position: 'relative' }}>
                <AnimatedHeroVisual />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-primary)', minHeight: '80vh' }}>
        <div className="container">

          {/* Category Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.5rem 1.2rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  background: activeCategory === cat ? 'var(--gradient-primary)' : 'rgba(148, 163, 184, 0.1)',
                  color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                  border: activeCategory === cat ? 'none' : '1px solid rgba(148, 163, 184, 0.2)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post._id || post.id || Math.random()}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card cursor-hover-target blog-card"
                  style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                >
                  <style>{`
                    .blog-card:hover .blog-image { transform: scale(1.05); }
                    .blog-card:hover .read-more { color: var(--accent-blue); transform: translateX(5px); }
                  `}</style>

                  {/* Image */}
                  <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                    <div className="blog-image" style={{ width: '100%', height: '100%', background: `url(${post.image}) center/cover`, transition: 'transform 0.5s ease' }} />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--glass-bg)', backdropFilter: 'blur(8px)', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.75rem', color: 'var(--accent-purple)', fontWeight: 600 }}>
                      {post.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Calendar size={14} /> {post.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={14} /> {post.readTime}</span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', lineHeight: 1.4, fontFamily: 'var(--font-heading)' }}>
                      {post.title}
                    </h3>

                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', flex: 1, fontSize: '0.95rem' }}>
                      {post.excerpt}
                    </p>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                      <Link to={`/blog/${post._id || post.id}`} className="read-more" style={{ textDecoration: 'none', background: 'transparent', border: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
                        Read Article <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
              {loading && <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Loading blogs...</div>}
              {!loading && filteredPosts.length === 0 && (
                <div style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-secondary)' }}>No blogs found in this category.</div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default BlogPage;
