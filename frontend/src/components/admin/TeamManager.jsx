import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Save } from 'lucide-react';
import { getTeam, createTeamMember, updateTeamMember, deleteTeamMember } from '../../utils/api';

const EMPTY_FORM = { name: '', role: '', image: '', github: '', twitter: '', linkedin: '', order: 0 };

function TeamManager() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState('');

  const load = () => {
    setLoading(true);
    getTeam().then(setTeam).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNewForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (member) => {
    setForm({
      name: member.name, role: member.role, image: member.image,
      github: member.github, twitter: member.twitter, linkedin: member.linkedin, order: member.order,
    });
    setEditingId(member._id);
    setShowForm(true);
  };

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editingId) {
        await updateTeamMember(editingId, payload);
        setMessage('Team member updated.');
      } else {
        await createTeamMember(payload);
        setMessage('Team member created.');
      }
      setShowForm(false);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to save team member.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      await deleteTeamMember(id);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to delete team member.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Team ({team.length})</h3>
        {!showForm && (
          <button className="btn btn-primary" onClick={openNewForm} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add Member
          </button>
        )}
      </div>

      {message && <div style={{ marginBottom: '1rem', color: message.toLowerCase().includes('fail') ? '#ef4444' : '#22c55e' }}>{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0 }}>{editingId ? 'Edit Team Member' : 'New Team Member'}</h4>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}><X size={16} /></button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input className="form-control" required value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <input className="form-control" required value={form.role} onChange={(e) => handleChange('role', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input className="form-control" required value={form.image} onChange={(e) => handleChange('image', e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Github (optional)</label>
              <input className="form-control" value={form.github} onChange={(e) => handleChange('github', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Twitter (optional)</label>
              <input className="form-control" value={form.twitter} onChange={(e) => handleChange('twitter', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn (optional)</label>
              <input className="form-control" value={form.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} />
            </div>
          </div>
          
          <div className="form-group" style={{ width: '150px' }}>
            <label className="form-label">Order</label>
            <input className="form-control" type="number" value={form.order} onChange={(e) => handleChange('order', e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={18} /> {editingId ? 'Update Member' : 'Create Member'}
          </button>
        </form>
      )}

      {loading ? <p>Loading team members...</p> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {team.map((member) => (
            <div key={member._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem 1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={member.image} alt={member.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <strong>{member.name}</strong>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{member.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={() => openEditForm(member)}><Edit2 size={16} /></button>
                <button className="btn btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDelete(member._id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {team.length === 0 && <p>No team members yet. Add one above.</p>}
        </div>
      )}
    </div>
  );
}

export default TeamManager;
