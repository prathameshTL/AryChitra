import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Save } from 'lucide-react';
import { getPricing, createPricingPlan, updatePricingPlan, deletePricingPlan } from '../../utils/api';

const EMPTY_FORM = { name: '', description: '', price: '', duration: '', color: '#0ea5e9', highlighted: false, features: '', order: 0 };

function PricingManager() {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState('');

  const load = () => {
    setLoading(true);
    getPricing().then(setPricing).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNewForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (plan) => {
    setForm({
      name: plan.name, description: plan.description, price: plan.price,
      duration: plan.duration, color: plan.color, highlighted: plan.highlighted, 
      features: plan.features.join('\n'), order: plan.order,
    });
    setEditingId(plan._id);
    setShowForm(true);
  };

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    // Parse features from text area
    const featuresArray = form.features
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const payload = { 
      ...form, 
      features: featuresArray,
      order: Number(form.order) || 0 
    };
    
    try {
      if (editingId) {
        await updatePricingPlan(editingId, payload);
        setMessage('Pricing plan updated.');
      } else {
        await createPricingPlan(payload);
        setMessage('Pricing plan created.');
      }
      setShowForm(false);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to save pricing plan.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this pricing plan?')) return;
    try {
      await deletePricingPlan(id);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to delete pricing plan.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Pricing Plans ({pricing.length})</h3>
        {!showForm && (
          <button className="btn btn-primary" onClick={openNewForm} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add Plan
          </button>
        )}
      </div>

      {message && <div style={{ marginBottom: '1rem', color: message.toLowerCase().includes('fail') ? '#ef4444' : '#22c55e' }}>{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0 }}>{editingId ? 'Edit Pricing Plan' : 'New Pricing Plan'}</h4>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}><X size={16} /></button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Plan Name</label>
              <input className="form-control" required value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Price</label>
              <input className="form-control" required value={form.price} onChange={(e) => handleChange('price', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input className="form-control" required value={form.description} onChange={(e) => handleChange('description', e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Duration/Suffix (e.g., 'starting at')</label>
              <input className="form-control" value={form.duration} onChange={(e) => handleChange('duration', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Color (Hex code)</label>
              <input className="form-control" required value={form.color} onChange={(e) => handleChange('color', e.target.value)} />
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '2rem' }}>
              <input type="checkbox" id="highlighted" checked={form.highlighted} onChange={(e) => handleChange('highlighted', e.target.checked)} />
              <label htmlFor="highlighted" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Highlight (Most Popular)</label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Features (One per line)</label>
            <textarea className="form-control" required rows={5} value={form.features} onChange={(e) => handleChange('features', e.target.value)} placeholder="Responsive Website&#10;Basic SEO Setup&#10;..." />
          </div>
          
          <div className="form-group" style={{ width: '150px' }}>
            <label className="form-label">Order</label>
            <input className="form-control" type="number" value={form.order} onChange={(e) => handleChange('order', e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={18} /> {editingId ? 'Update Plan' : 'Create Plan'}
          </button>
        </form>
      )}

      {loading ? <p>Loading pricing plans...</p> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {pricing.map((plan) => (
            <div key={plan._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: plan.highlighted ? `2px solid ${plan.color}` : '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem 1.5rem' }}>
              <div>
                <strong>{plan.name}</strong>
                <span style={{ marginLeft: '1rem', color: plan.color }}>{plan.price}</span>
                {plan.highlighted && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', background: plan.color, color: '#fff', padding: '0.1rem 0.5rem', borderRadius: '10px' }}>Popular</span>}
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{plan.features.length} features</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={() => openEditForm(plan)}><Edit2 size={16} /></button>
                <button className="btn btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDelete(plan._id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {pricing.length === 0 && <p>No pricing plans yet. Add one above.</p>}
        </div>
      )}
    </div>
  );
}

export default PricingManager;
