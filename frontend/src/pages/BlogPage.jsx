import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import CtaBanner from '../components/CtaBanner';
import SEO from '../components/SEO';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Serverless Architecture in Enterprise Software',
    excerpt: 'Explore how migrating to serverless architectures can dramatically reduce costs while improving scalability for high-traffic enterprise platforms.',
    category: 'Engineering',
    date: 'Oct 12, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Designing for the Dark Mode: The Glassmorphism Trend',
    excerpt: 'An in-depth look at how UI/UX trends like glassmorphism combined with deep dark mode palettes improve user retention and reduce eye strain.',
    category: 'Design',
    date: 'Oct 05, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Integrating AI/ML into Legacy Systems: A Practical Guide',
    excerpt: 'Learn the step-by-step process of retrofitting legacy applications with modern machine learning algorithms to unlock predictive analytics.',
    category: 'AI & Data',
    date: 'Sep 28, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'React 19 vs Next.js 15: Choosing the Right Framework',
    excerpt: 'A comprehensive technical comparison of the latest features in the React ecosystem and how to choose the right foundation for your next project.',
    category: 'Engineering',
    date: 'Sep 15, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 5,
    title: 'Mastering B2B Technical SEO for Software Agencies',
    excerpt: 'Stop relying solely on paid ads. Discover the technical SEO strategies that actually drive organic, high-intent traffic in the B2B tech space.',
    category: 'Marketing',
    date: 'Sep 02, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Building Resilient Microservices with Go and gRPC',
    excerpt: 'A technical deep dive into replacing slow REST APIs with highly performant, type-safe gRPC microservices using Golang.',
    category: 'Engineering',
    date: 'Aug 24, 2026',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  }
];

const categories = ['All', 'Engineering', 'Design', 'AI & Data', 'Marketing'];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

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
                  key={post.id}
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
                      <button className="read-more" style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
                        Read Article <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <CtaBanner />
    </>
  );
};

export default BlogPage;
