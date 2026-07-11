import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/api';
import SEO from '../components/SEO';
import { Briefcase, MapPin, Clock, ArrowLeft } from 'lucide-react';

function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_BASE}/jobs/${id}`);
        if (!res.ok) throw new Error('Job not found');
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      setSubmitMessage('Please attach a resume.');
      return;
    }

    setSubmitting(true);
    setSubmitMessage('');

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('coverLetter', formData.coverLetter);
    payload.append('resume', resume);

    try {
      const res = await fetch(`${API_BASE}/jobs/${id}/apply`, {
        method: 'POST',
        body: payload, // Browser automatically sets Content-Type to multipart/form-data with correct boundary
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Application failed');

      setSubmitMessage('Application submitted successfully!');
      setFormData({ name: '', email: '', phone: '', coverLetter: '' });
      setResume(null);
      e.target.reset(); // Reset file input
    } catch (err) {
      setSubmitMessage(`Error: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="section container" style={{ textAlign: 'center' }}>Loading job details...</div>;
  if (error) return <div className="section container" style={{ textAlign: 'center', color: '#ef4444' }}>{error}</div>;
  if (!job) return null;

  return (
    <div className="section" style={{ minHeight: '80vh', backgroundColor: 'var(--bg-secondary)' }}>
      <SEO title={`${job.title} | Careers AryChitra`} description={job.description.substring(0, 150)} />
      
      <div className="container" style={{ maxWidth: '1000px' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <ArrowLeft size={16} /> Back
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <style>{`@media (min-width: 900px) { .job-grid { grid-template-columns: 2fr 1fr !important; } }`}</style>
          
          <div className="job-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            
            {/* Left Col: Job Details */}
            <div>
              <div className="card" style={{ padding: '2.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
                <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>{job.title}</h1>
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Briefcase size={18} /> {job.department}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} /> {job.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={18} /> {job.type}</span>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h3>Job Description</h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{job.description}</p>
                </div>

                <div>
                  <h3>Requirements</h3>
                  <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
                    {job.requirements.map((req, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem' }}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Col: Application Form */}
            <div>
              <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', position: 'sticky', top: '100px' }}>
                <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Apply for this position</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="name">Full Name *</label>
                    <input type="text" id="name" name="name" className="form-control" required value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" className="form-control" required value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="phone">Phone *</label>
                    <input type="tel" id="phone" name="phone" className="form-control" required value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="resume">Resume (PDF/DOC) *</label>
                    <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" className="form-control" required onChange={handleFileChange} style={{ padding: '0.6rem' }} />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" htmlFor="coverLetter">Cover Letter (Optional)</label>
                    <textarea id="coverLetter" name="coverLetter" className="form-control" value={formData.coverLetter} onChange={handleInputChange} rows={3}></textarea>
                  </div>
                  
                  {submitMessage && (
                    <div style={{ color: submitMessage.includes('Error') ? '#ef4444' : '#10b981', textAlign: 'center', fontSize: '0.9rem' }}>
                      {submitMessage}
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', padding: '0.8rem', opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
