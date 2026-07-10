import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import { getBlog } from '../utils/api';
import SEO from '../components/SEO';
import CtaBanner from '../components/CtaBanner';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getBlog(id)
      .then(data => {
        if (data) setPost(data);
        else setError('Blog post not found.');
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load the blog post.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Loading article...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <p style={{ fontSize: '1.2rem', color: '#ef4444' }}>{error || 'Blog post not found.'}</p>
        <Link to="/blog" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} | AryChitra Blog`} 
        description={post.excerpt}
        canonicalUrl={`https://arychitra.com/blog/${id}`}
      />
      
      {/* Hero Section */}
      <section style={{ 
        padding: '10rem 0 5rem', 
        background: `linear-gradient(to bottom, rgba(10, 14, 39, 0.9), var(--bg-primary)), url(${post.image}) center/cover`,
        position: 'relative'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)', textDecoration: 'none', marginBottom: '2rem', fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Articles
            </Link>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ background: 'var(--accent-purple)', color: '#fff', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600 }}>
                {post.category}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.2, textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              {post.title}
            </h1>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> {post.author || 'AryChitra Team'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> {post.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '800px', margin: '0 auto' }}
          >
            <div className="glass-card" style={{ padding: '3rem', fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
              {/* Note: In a real prod app, use DOMPurify to sanitize HTML. */}
              <div dangerouslySetInnerHTML={{ __html: post.content }} className="blog-content" />
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBanner />

      <style>{`
        .blog-content h2, .blog-content h3 {
          color: var(--text-primary);
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          font-family: var(--font-heading);
        }
        .blog-content p {
          margin-bottom: 1.5rem;
        }
        .blog-content a {
          color: var(--accent-blue);
          text-decoration: underline;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content blockquote {
          border-left: 4px solid var(--accent-purple);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--text-muted);
        }
      `}</style>
    </>
  );
};

export default BlogPostPage;
