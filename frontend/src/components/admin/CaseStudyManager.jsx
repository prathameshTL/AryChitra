import React, { useState, useEffect } from 'react';
import { API_BASE } from '../../utils/api';

const CaseStudyManager = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '', clientName: '', industry: '', challenge: '', solution: '', results: '', imageUrl: '', isPublished: true
  });
  const [metrics, setMetrics] = useState([{ label: '', value: '' }]);
  const [tags, setTags] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`${API_BASE}/case-studies?all=true`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setCaseStudies(data);
    } catch (error) {
      console.error('Error fetching case studies', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleMetricChange = (index, field, value) => {
    const newMetrics = [...metrics];
    newMetrics[index][field] = value;
    setMetrics(newMetrics);
  };

  const addMetric = () => setMetrics([...metrics, { label: '', value: '' }]);
  const removeMetric = (index) => setMetrics(metrics.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    
    const payload = {
      ...formData,
      metrics: metrics.filter(m => m.label && m.value),
      tags: tags.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    const url = editingId ? `${API_BASE}/case-studies/${editingId}` : `${API_BASE}/case-studies`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error saving case study', error);
    }
  };

  const handleEdit = (study) => {
    setEditingId(study._id);
    setFormData({
      title: study.title, clientName: study.clientName, industry: study.industry, challenge: study.challenge, solution: study.solution, results: study.results, imageUrl: study.imageUrl || '', isPublished: study.isPublished
    });
    setMetrics(study.metrics?.length ? study.metrics : [{ label: '', value: '' }]);
    setTags(study.tags.join(', '));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this case study?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_BASE}/case-studies/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting case study', error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({ title: '', clientName: '', industry: '', challenge: '', solution: '', results: '', imageUrl: '', isPublished: true });
    setMetrics([{ label: '', value: '' }]);
    setTags('');
  };

  if (loading) return <div>Loading case studies...</div>;

  return (
    <div>
      <h3>{editingId ? 'Edit Case Study' : 'Add New Case Study'}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', marginBottom: '2rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px' }}>
        <input type="text" name="title" placeholder="Project Title" className="form-control" value={formData.title} onChange={handleInputChange} required />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <input type="text" name="clientName" placeholder="Client Name" className="form-control" value={formData.clientName} onChange={handleInputChange} required />
          <input type="text" name="industry" placeholder="Industry" className="form-control" value={formData.industry} onChange={handleInputChange} required />
        </div>

        <textarea name="challenge" placeholder="The Challenge" className="form-control" value={formData.challenge} onChange={handleInputChange} required rows={3} />
        <textarea name="solution" placeholder="The Solution" className="form-control" value={formData.solution} onChange={handleInputChange} required rows={3} />
        <textarea name="results" placeholder="The Results" className="form-control" value={formData.results} onChange={handleInputChange} required rows={3} />
        
        <input type="text" name="imageUrl" placeholder="Image URL (optional)" className="form-control" value={formData.imageUrl} onChange={handleInputChange} />
        <input type="text" placeholder="Tags (comma separated)" className="form-control" value={tags} onChange={(e) => setTags(e.target.value)} />

        <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <h4 style={{ margin: '0 0 1rem 0' }}>Key Metrics</h4>
          {metrics.map((metric, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <input type="text" placeholder="Label (e.g. Sales Increase)" className="form-control" value={metric.label} onChange={(e) => handleMetricChange(idx, 'label', e.target.value)} />
              <input type="text" placeholder="Value (e.g. 150%)" className="form-control" value={metric.value} onChange={(e) => handleMetricChange(idx, 'value', e.target.value)} />
              <button type="button" className="btn btn-secondary" onClick={() => removeMetric(idx)}>-</button>
            </div>
          ))}
          <button type="button" className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }} onClick={addMetric}>+ Add Metric</button>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleInputChange} />
          Is Published
        </label>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary">{editingId ? 'Update Case Study' : 'Add Case Study'}</button>
          {editingId && <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>}
        </div>
      </form>

      <h3>Existing Case Studies</h3>
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
            <th>Title</th>
            <th>Client</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {caseStudies.map(study => (
            <tr key={study._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '1rem 0' }}>{study.title}</td>
              <td style={{ padding: '1rem 0' }}>{study.clientName}</td>
              <td style={{ padding: '1rem 0' }}>{study.isPublished ? 'Published' : 'Draft'}</td>
              <td style={{ padding: '1rem 0' }}>
                <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', marginRight: '0.5rem' }} onClick={() => handleEdit(study)}>Edit</button>
                <button className="btn btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', background: '#ef4444', color: 'white', border: 'none' }} onClick={() => handleDelete(study._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseStudyManager;
