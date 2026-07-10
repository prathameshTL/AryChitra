import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import SEO from '../components/SEO';
import { getBlogs } from '../utils/api';

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
      <section style={{ padding: '8rem 0 4rem', background: 'var(--bg-tertiary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Insights & <span className="text-gradient">Articles</span>
            </h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              Deep technical dives, design philosophy, and industry insights directly from the engineering minds at AryChitra.
            </p>
          </motion.div>
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
