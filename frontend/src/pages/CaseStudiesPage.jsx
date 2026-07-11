import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../utils/api';
import SEO from '../components/SEO';
import { ArrowRight, BarChart2 } from 'lucide-react';

function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const res = await fetch(`${API_BASE}/case-studies`);
        if (!res.ok) throw new Error('Failed to fetch case studies');
        const data = await res.json();
        setCaseStudies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  return (
    <div className="section" style={{ minHeight: '80vh', backgroundColor: 'var(--bg-secondary)' }}>
      <SEO 
        title="Case Studies | AryChitra Success Stories" 
        description="Read our case studies to see how AryChitra has helped businesses achieve their digital goals with robust and scalable solutions."
      />
      
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="section-title">Case Studies</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Discover how we've partnered with leading brands to overcome challenges and deliver measurable ROI.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading case studies...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '2rem' }}>{error}</div>
        ) : caseStudies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--card-bg)', borderRadius: '16px' }}>
            <BarChart2 size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
            <h3>No case studies available yet.</h3>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
            {caseStudies.map(study => (
              <div key={study._id} className="card" style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'var(--card-bg)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-color)', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                {study.imageUrl ? (
                  <img src={study.imageUrl} alt={study.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '200px', backgroundColor: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                    <BarChart2 size={48} />
                  </div>
                )}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ color: 'var(--accent-blue)', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{study.clientName} | {study.industry}</div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.4rem' }}>{study.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1 }}>
                    {study.challenge.substring(0, 120)}...
                  </p>
                  
                  {study.metrics && study.metrics.length > 0 && (
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-secondary)', borderRadius: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{study.metrics[0].value}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{study.metrics[0].label}</div>
                      </div>
                    </div>
                  )}

                  <Link to={`/case-studies/${study._id}`} className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: 0, background: 'none', color: 'var(--accent-purple)', fontWeight: 'bold' }}>
                    Read Full Case Study <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CaseStudiesPage;
