import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Save } from 'lucide-react';
import { getProjects, createProject, updateProject, deleteProject } from '../../utils/api';

const EMPTY_FORM = { name: '', category: '', description: '', link: '', status: 'completed', order: 0 };

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState('');

  const load = () => {
    setLoading(true);
    getProjects().then(setProjects).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNewForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (project) => {
    setForm({
      name: project.name, category: project.category, description: project.description,
      link: project.link, status: project.status, order: project.order,
    });
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editingId) {
        await updateProject(editingId, payload);
        setMessage('Project updated.');
      } else {
        await createProject(payload);
        setMessage('Project created.');
      }
      setShowForm(false);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to save project.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to delete project.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Projects / Portfolio ({projects.length})</h3>
        {!showForm && (
          <button className="btn btn-primary" onClick={openNewForm} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add Project
          </button>
        )}
      </div>

      {message && <div style={{ marginBottom: '1rem', color: message.toLowerCase().includes('fail') ? '#ef4444' : '#22c55e' }}>{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0 }}>{editingId ? 'Edit Project' : 'New Project'}</h4>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}><X size={16} /></button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input className="form-control" required value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input className="form-control" required value={form.category} onChange={(e) => handleChange('category', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Link (optional, live URL)</label>
              <input className="form-control" value={form.link} onChange={(e) => handleChange('link', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-control" value={form.status} onChange={(e) => handleChange('status', e.target.value)}>
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Order</label>
              <input className="form-control" type="number" value={form.order} onChange={(e) => handleChange('order', e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={18} /> {editingId ? 'Update Project' : 'Create Project'}
          </button>
        </form>
      )}

      {loading ? <p>Loading projects...</p> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {projects.map((project) => (
            <div key={project._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem 1.5rem' }}>
              <div>
                <strong>{project.name}</strong>
                <span style={{ marginLeft: '0.75rem', fontSize: '0.75rem', color: project.status === 'ongoing' ? '#f59e0b' : '#22c55e', border: `1px solid ${project.status === 'ongoing' ? '#f59e0b' : '#22c55e'}`, padding: '0.1rem 0.5rem', borderRadius: '10px', textTransform: 'uppercase' }}>
                  {project.status}
                </span>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{project.category}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={() => openEditForm(project)}><Edit2 size={16} /></button>
                <button className="btn btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDelete(project._id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p>No projects yet. Add one above.</p>}
        </div>
      )}
    </div>
  );
}

export default ProjectsManager;
