import React, { useState, useEffect } from 'react';
import { API_BASE } from '../../utils/api';

const CareersManager = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('jobs'); // 'jobs' or 'applications'
  
  // Job Form state
  const [formData, setFormData] = useState({
    title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', isActive: true
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetch(`${API_BASE}/jobs?all=true`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API_BASE}/jobs/applications/all`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const jobsData = await jobsRes.json();
      const appsData = await appsRes.json();
      setJobs(jobsData);
      setApplications(appsData);
    } catch (error) {
      console.error('Error fetching careers data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    // Convert requirements from string to array
    const payload = {
      ...formData,
      requirements: typeof formData.requirements === 'string' ? formData.requirements.split('\n').filter(r => r.trim() !== '') : formData.requirements
    };

    const url = editingId ? `${API_BASE}/jobs/${editingId}` : `${API_BASE}/jobs`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      setFormData({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', isActive: true });
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error saving job', error);
    }
  };

  const handleEdit = (job) => {
    setEditingId(job._id);
    setFormData({
      ...job,
      requirements: job.requirements.join('\n')
    });
    setView('jobs');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_BASE}/jobs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting job', error);
    }
  };

  const handleStatusChange = async (appId, newStatus) => {
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_BASE}/jobs/applications/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      fetchData();
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  if (loading) return <div>Loading careers data...</div>;

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className={`btn ${view === 'jobs' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('jobs')}>Manage Jobs</button>
        <button className={`btn ${view === 'applications' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setView('applications')}>View Applications ({applications.length})</button>
      </div>

      {view === 'jobs' && (
        <div>
          <h3>{editingId ? 'Edit Job' : 'Add New Job'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginBottom: '2rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" name="title" placeholder="Job Title" className="form-control" value={formData.title} onChange={handleInputChange} required />
              <input type="text" name="department" placeholder="Department" className="form-control" value={formData.department} onChange={handleInputChange} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <input type="text" name="location" placeholder="Location" className="form-control" value={formData.location} onChange={handleInputChange} required />
              <select name="type" className="form-control" value={formData.type} onChange={handleInputChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <textarea name="description" placeholder="Job Description" className="form-control" value={formData.description} onChange={handleInputChange} required rows={3} />
            <textarea name="requirements" placeholder="Requirements (one per line)" className="form-control" value={formData.requirements} onChange={handleInputChange} required rows={3} />
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} />
              Is Active (Visible to public)
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-primary">{editingId ? 'Update Job' : 'Add Job'}</button>
              {editingId && <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); setFormData({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '', isActive: true }); }}>Cancel</button>}
            </div>
          </form>

          <h3>Existing Jobs</h3>
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th>Title</th>
                <th>Department</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 0' }}>{job.title}</td>
                  <td style={{ padding: '1rem 0' }}>{job.department}</td>
                  <td style={{ padding: '1rem 0' }}>{job.isActive ? 'Active' : 'Inactive'}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', marginRight: '0.5rem' }} onClick={() => handleEdit(job)}>Edit</button>
                    <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', background: '#ef4444', color: 'white', border: 'none' }} onClick={() => handleDelete(job._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'applications' && (
        <div>
          <h3>Job Applications</h3>
          {applications.length === 0 ? <p>No applications yet.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {applications.map(app => (
                <div key={app._id} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0' }}>{app.name} - <span style={{ color: 'var(--text-secondary)' }}>{app.jobId?.title} ({app.jobId?.department})</span></h4>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{app.email} | {app.phone}</p>
                    </div>
                    <div>
                      <select 
                        value={app.status} 
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        style={{ padding: '0.4rem', borderRadius: '4px', background: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Interviewing">Interviewing</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Hired">Hired</option>
                      </select>
                    </div>
                  </div>
                  {app.coverLetter && (
                    <div style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--card-bg)', borderRadius: '4px', fontSize: '0.9rem' }}>
                      <strong>Cover Letter:</strong>
                      <p style={{ margin: '0.5rem 0 0 0', whiteSpace: 'pre-wrap' }}>{app.coverLetter}</p>
                    </div>
                  )}
                  <a href={`${API_BASE.replace('/api', '')}${app.resumeUrl}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-block', padding: '0.4rem 0.8rem', fontSize: '0.9rem', textDecoration: 'none' }}>
                    View Resume
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CareersManager;
