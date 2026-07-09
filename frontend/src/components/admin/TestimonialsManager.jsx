import React, { useState, useEffect } from 'react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../utils/api';

function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    image: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditing) {
        await updateTestimonial(currentId, formData);
      } else {
        await createTestimonial(formData);
      }
      setFormData({ name: '', role: '', content: '', image: '' });
      setIsEditing(false);
      setCurrentId(null);
      await fetchTestimonials();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      role: item.role,
      content: item.content,
      image: item.image
    });
    setIsEditing(true);
    setCurrentId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setLoading(true);
      try {
        await deleteTestimonial(id);
        await fetchTestimonials();
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  const cancelEdit = () => {
    setFormData({ name: '', role: '', content: '', image: '' });
    setIsEditing(false);
    setCurrentId(null);
  };

  return (
    <div>
      <h3>Manage Testimonials</h3>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px' }}>
        <h4>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</h4>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Client Name" 
          className="form-control" 
          required 
        />
        <input 
          type="text" 
          name="role" 
          value={formData.role} 
          onChange={handleChange} 
          placeholder="Client Role / Company" 
          className="form-control" 
          required 
        />
        <input 
          type="text" 
          name="image" 
          value={formData.image} 
          onChange={handleChange} 
          placeholder="Image URL (optional)" 
          className="form-control" 
        />
        <textarea 
          name="content" 
          value={formData.content} 
          onChange={handleChange} 
          placeholder="Testimonial Content" 
          className="form-control" 
          rows="4" 
          required 
        ></textarea>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (isEditing ? 'Update Testimonial' : 'Add Testimonial')}
          </button>
          {isEditing && (
            <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {testimonials.map(item => (
          <div key={item._id} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h5 style={{ margin: 0 }}>{item.name}</h5>
                <small style={{ color: 'var(--text-secondary)' }}>{item.role}</small>
              </div>
            </div>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>"{item.content}"</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" onClick={() => handleEdit(item)} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Edit</button>
              <button className="btn btn-primary" onClick={() => handleDelete(item._id)} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', background: 'red', borderColor: 'red' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsManager;
