import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Save } from 'lucide-react';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../utils/api';

const EMPTY_FORM = { 
  title: '', 
  category: 'Engineering', 
  readTime: '5 min read', 
  author: 'AryChitra Team',
  date: '',
  image: '', 
  excerpt: '', 
  content: '' 
};

function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [message, setMessage] = useState('');

  const load = () => {
    setLoading(true);
    getBlogs().then(setBlogs).catch(err => {
      console.error(err);
      setMessage('Failed to load blogs');
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNewForm = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (blog) => {
    setForm({
      title: blog.title,
      category: blog.category,
      readTime: blog.readTime,
      author: blog.author || 'AryChitra Team',
      date: blog.date || '',
      image: blog.image,
      excerpt: blog.excerpt,
      content: blog.content
    });
    setEditingId(blog._id);
    setShowForm(true);
  };

  const handleChange = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (editingId) {
        await updateBlog(editingId, form);
        setMessage('Blog post updated.');
      } else {
        await createBlog(form);
        setMessage('Blog post created.');
      }
      setShowForm(false);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to save blog post.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await deleteBlog(id);
      load();
    } catch (err) {
      setMessage(err.message || 'Failed to delete blog post.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0 }}>Blogs ({blogs.length})</h3>
        {!showForm && (
          <button className="btn btn-primary" onClick={openNewForm} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Add Blog
          </button>
        )}
      </div>

      {message && <div style={{ marginBottom: '1rem', color: message.toLowerCase().includes('fail') ? '#ef4444' : '#22c55e' }}>{message}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h4 style={{ margin: 0 }}>{editingId ? 'Edit Blog' : 'New Blog'}</h4>
            <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}><X size={16} /></button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input className="form-control" required value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input className="form-control" required value={form.category} onChange={(e) => handleChange('category', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <input className="form-control" required value={form.image} onChange={(e) => handleChange('image', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Read Time</label>
              <input className="form-control" required value={form.readTime} onChange={(e) => handleChange('readTime', e.target.value)} placeholder="e.g. 5 min read" />
            </div>
            <div className="form-group">
              <label className="form-label">Author</label>
              <input className="form-control" value={form.author} onChange={(e) => handleChange('author', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Excerpt (Short description)</label>
            <textarea className="form-control" required value={form.excerpt} onChange={(e) => handleChange('excerpt', e.target.value)} rows={2} />
          </div>

          <div className="form-group">
            <label className="form-label">Content (Supports HTML or Plain Text)</label>
            <textarea className="form-control" required value={form.content} onChange={(e) => handleChange('content', e.target.value)} rows={6} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Save size={18} /> {editingId ? 'Update Blog' : 'Create Blog'}
          </button>
        </form>
      )}

      {loading ? <p>Loading blogs...</p> : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {blogs.map((blog) => (
            <div key={blog._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1rem 1.5rem' }}>
              <div>
                <strong>{blog.title}</strong>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{blog.category} - {blog.date}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={() => openEditForm(blog)}><Edit2 size={16} /></button>
                <button className="btn btn-secondary" style={{ color: '#ef4444' }} onClick={() => handleDelete(blog._id)}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          {blogs.length === 0 && <p>No blogs yet. Add one above.</p>}
        </div>
      )}
    </div>
  );
}

export default BlogManager;
