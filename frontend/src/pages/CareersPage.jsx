import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE } from '../utils/api';
import SEO from '../components/SEO';
import { Briefcase, MapPin, Clock } from 'lucide-react';

function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE}/jobs`);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="section" style={{ minHeight: '80vh', backgroundColor: 'var(--bg-secondary)' }}>
      <SEO 
        title="Careers | Join AryChitra" 
        description="Explore exciting career opportunities at AryChitra. We are looking for talented individuals to join our team."
      />
      
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="section-title">Join Our Team</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We're always looking for passionate people to help us build the future.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading jobs...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '2rem' }}>{error}</div>
        ) : jobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--card-bg)', borderRadius: '16px' }}>
            <Briefcase size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
            <h3>No open positions right now</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Check back later or follow us on LinkedIn for updates.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {jobs.map(job => (
              <div key={job._id} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', transition: 'transform 0.3s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h3 style={{ margin: '0 0 0.5rem 0' }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Briefcase size={16} /> {job.department}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={16} /> {job.location}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={16} /> {job.type}</span>
                    </div>
                  </div>
                  <Link to={`/careers/${job._id}`} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', textDecoration: 'none' }}>
                    View Details
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

export default CareersPage;
