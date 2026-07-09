import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Save } from 'lucide-react';
import { getServices, createService, updateService, deleteService } from '../../utils/api';
import { ICON_NAMES, getIcon } from '../../utils/iconMap';

const EMPTY_FORM = {
  title: '', description: '', icon: 'Code', iconColor: '#3b82f6',
  colorTheme: 'rgba(59, 130, 246, 0.1)', bullets: '', image: '', link: '',
  featured: false, order: 0,
};

function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState('');

  const load = () => {
    setLoading(true);
    getServices().then(setServices).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNewForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (service) => {
    setForm({
      title: service.title, description: service.description, icon: service.icon,
      iconColor: service.iconColor, colorTheme: service.colorTheme,
      bullets: (service.bullets || []).join(', '), image: service.image, link: service.link,
      featured: service.featured, order: service.order,
    });
    setEditingId(service._id);
    setShowForm(true);
  };

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const payload = {
      ...form,
      bullets: form.bullets.split(',').map((b) => b.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };
    try {
      if (editingId) {
        await updateService(editingId, payload);
        setMessage('Service updated.');
      } else {
        await createService(payload);
        setMessage('Service created.');
      }
      setShowForm(false);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to save service.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to delete service.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Services ({services.length})</h3>
        {!showForm && (
          <button className="btn btn-primary" onClick={openNewForm} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add Service
          </button>
        )}
      </div>

      {message && <div style={{ marginBottom: '1rem', color: message.toLowerCase().includes('fail') ? '#ef4444' : '#22c55e' }}>{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0 }}>{editingId ? 'Edit Service' : 'New Service'}</h4>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}><X size={16} /></button>
          </div>

          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-control" required value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-control" required value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Icon</label>
              <select className="form-control" value={form.icon} onChange={(e) => handleChange('icon', e.target.value)}>
                {ICON_NAMES.map((name) => <option key={name} value={name}>{name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Icon Color</label>
              <input className="form-control" type="text" placeholder="#3b82f6" value={form.iconColor} onChange={(e) => handleChange('iconColor', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Icon Background</label>
              <input className="form-control" type="text" placeholder="rgba(59,130,246,0.1)" value={form.colorTheme} onChange={(e) => handleChange('colorTheme', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Bullets (comma separated)</label>
            <input className="form-control" placeholder="Full-Stack Web Apps, SaaS Platforms, ..." value={form.bullets} onChange={(e) => handleChange('bullets', e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Image URL (used on full Services page)</label>
              <input className="form-control" value={form.image} onChange={(e) => handleChange('image', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Learn More Link (optional)</label>
              <input className="form-control" value={form.link} onChange={(e) => handleChange('link', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={form.featured} onChange={(e) => handleChange('featured', e.target.checked)} />
              Show on homepage (featured)
            </label>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Order</label>
              <input className="form-control" type="number" value={form.order} onChange={(e) => handleChange('order', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Preview icon:</span>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: form.colorTheme, color: form.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {getIcon(form.icon, 22)}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={18} /> {editingId ? 'Update Service' : 'Create Service'}
          </button>
        </form>
      )}

      {loading ? <p>Loading services...</p> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {services.map((service) => (
            <div key={service._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: service.colorTheme, color: service.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getIcon(service.icon, 20)}
                </div>
                <div>
                  <strong>{service.title}</strong>
                  {service.featured && <span style={{ marginLeft: '0.75rem', fontSize: '0.75rem', color: 'var(--accent-primary)', border: '1px solid var(--accent-primary)', padding: '0.1rem 0.5rem', borderRadius: '10px' }}>Featured</span>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={() => openEditForm(service)}><Edit2 size={16} /></button>
                <button className="btn btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDelete(service._id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {services.length === 0 && <p>No services yet. Add one above.</p>}
        </div>
      )}
    </div>
  );
}

export default ServicesManager;
