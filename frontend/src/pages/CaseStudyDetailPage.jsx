import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_BASE } from '../utils/api';
import SEO from '../components/SEO';
import { ArrowLeft, Target, Lightbulb, TrendingUp } from 'lucide-react';

function CaseStudyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const res = await fetch(`${API_BASE}/case-studies/${id}`);
        if (!res.ok) throw new Error('Case study not found');
        const data = await res.json();
        setStudy(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudy();
  }, [id]);

  if (loading) return <div className="section container" style={{ textAlign: 'center' }}>Loading case study...</div>;
  if (error) return <div className="section container" style={{ textAlign: 'center', color: '#ef4444' }}>{error}</div>;
  if (!study) return null;

  return (
    <div className="section" style={{ minHeight: '80vh', backgroundColor: 'var(--bg-secondary)' }}>
      <SEO title={`${study.title} | Case Study`} description={study.challenge.substring(0, 150)} />
      
      {/* Hero Section */}
      <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '6rem 0', borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <ArrowLeft size={16} /> Back to Case Studies
          </button>
          
          <div style={{ maxWidth: '800px' }}>
            <div style={{ color: 'var(--accent-blue)', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
              {study.clientName} | {study.industry}
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>{study.title}</h1>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {study.tags.map(tag => (
                <span key={tag} style={{ padding: '0.4rem 1rem', backgroundColor: 'rgba(108, 99, 255, 0.1)', color: 'var(--accent-purple)', borderRadius: '20px', fontSize: '0.9rem' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: '4rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
          <style>{`@media (min-width: 900px) { .study-grid { grid-template-columns: 2fr 1fr !important; } }`}</style>
          
          <div className="study-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
            
            {/* Left Col: Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {study.imageUrl && (
                <img src={study.imageUrl} alt={study.title} style={{ width: '100%', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }} />
              )}
              
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <Target color="var(--accent-blue)" size={32} /> The Challenge
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>{study.challenge}</p>
              </div>

              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <Lightbulb color="var(--accent-purple)" size={32} /> The Solution
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>{study.solution}</p>
              </div>

              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <TrendingUp color="#10b981" size={32} /> The Results
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>{study.results}</p>
              </div>
            </div>

            {/* Right Col: Metrics & CTA */}
            <div>
              <div style={{ position: 'sticky', top: '100px' }}>
                {study.metrics && study.metrics.length > 0 && (
                  <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>Key Impact</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      {study.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>{metric.value}</div>
                          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--gradient-primary)', borderRadius: '16px', color: '#fff', textAlign: 'center' }}>
                  <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Ready for similar results?</h3>
                  <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>Let's discuss how we can transform your business.</p>
                  <Link to="/contact" className="btn" style={{ backgroundColor: '#fff', color: '#000', width: '100%', padding: '1rem', textDecoration: 'none', display: 'inline-block', borderRadius: '8px', fontWeight: 'bold' }}>
                    Start a Project
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseStudyDetailPage;
