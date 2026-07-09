import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { getBanner, updateBanner } from '../../utils/api';

const EMPTY = {
  tag: '', titleLine1: '', titleHighlight: '', subtitle: '',
  primaryBtnText: '', primaryBtnLink: '', secondaryBtnText: '', secondaryBtnLink: '',
  stats: [],
};

function BannerManager() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getBanner()
      .then((data) => setForm({ ...EMPTY, ...data }))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleStatChange = (index, field, value) => {
    const stats = [...form.stats];
    stats[index] = { ...stats[index], [field]: value };
    setForm((prev) => ({ ...prev, stats }));
  };

  const addStat = () => setForm((prev) => ({ ...prev, stats: [...prev.stats, { value: '', label: '' }] }));
  const removeStat = (index) => setForm((prev) => ({ ...prev, stats: prev.stats.filter((_, i) => i !== index) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await updateBanner(form);
      setMessage('Banner saved successfully.');
    } catch (err) {
      setMessage(err.message || 'Failed to save banner.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading banner...</p>;

  return (
    <form onSubmit={handleSave}>
      <h3 style={{ marginBottom: '1.5rem' }}>Homepage Banner / Hero Section</h3>
      {message && <div style={{ marginBottom: '1rem', color: message.includes('success') ? '#22c55e' : '#ef4444' }}>{message}</div>}

      <div className="form-group">
        <label className="form-label">Tag (small text above heading)</label>
        <input className="form-control" value={form.tag} onChange={(e) => handleChange('tag', e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Title Line 1</label>
          <input className="form-control" value={form.titleLine1} onChange={(e) => handleChange('titleLine1', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Title Highlight (accent word/phrase)</label>
          <input className="form-control" value={form.titleHighlight} onChange={(e) => handleChange('titleHighlight', e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Subtitle</label>
        <textarea className="form-control" value={form.subtitle} onChange={(e) => handleChange('subtitle', e.target.value)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Primary Button Text</label>
          <input className="form-control" value={form.primaryBtnText} onChange={(e) => handleChange('primaryBtnText', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Primary Button Link</label>
          <input className="form-control" value={form.primaryBtnLink} onChange={(e) => handleChange('primaryBtnLink', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Secondary Button Text</label>
          <input className="form-control" value={form.secondaryBtnText} onChange={(e) => handleChange('secondaryBtnText', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Secondary Button Link</label>
          <input className="form-control" value={form.secondaryBtnLink} onChange={(e) => handleChange('secondaryBtnLink', e.target.value)} />
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <label className="form-label" style={{ margin: 0 }}>Stats Bar</label>
          <button type="button" className="btn btn-secondary" onClick={addStat} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Plus size={16} /> Add Stat
          </button>
        </div>
        {form.stats.map((stat, index) => (
          <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input className="form-control" placeholder="Value (e.g. 50+)" value={stat.value} onChange={(e) => handleStatChange(index, 'value', e.target.value)} />
            <input className="form-control" placeholder="Label (e.g. Projects Delivered)" value={stat.label} onChange={(e) => handleStatChange(index, 'label', e.target.value)} />
            <button type="button" className="btn btn-secondary" onClick={() => removeStat(index)} style={{ color: '#ef4444' }}>
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className="btn btn-primary" disabled={saving} style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Save size={18} /> {saving ? 'Saving...' : 'Save Banner'}
      </button>
    </form>
  );
}

export default BannerManager;
