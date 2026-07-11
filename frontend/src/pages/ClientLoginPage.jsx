import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE } from '../utils/api';
import SEO from '../components/SEO';

function ClientLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', companyName: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/client/auth/login' : '/client/auth/register';
    
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Authentication failed');

      localStorage.setItem('clientToken', data.token);
      navigate('/client/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)' }}>
      <SEO title="Client Login | AryChitra" description="Client portal login" />
      
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>{isLogin ? 'Client Login' : 'Create Account'}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{isLogin ? 'Welcome back to your client portal' : 'Sign up to track your projects'}</p>
        </div>

        {error && <div style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem', padding: '0.5rem', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '8px' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {!isLogin && (
            <input type="text" name="name" placeholder="Full Name" className="form-control" required value={formData.name} onChange={handleInputChange} />
          )}
          
          <input type="email" name="email" placeholder="Email Address" className="form-control" required value={formData.email} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" className="form-control" required value={formData.password} onChange={handleInputChange} />
          
          {!isLogin && (
            <>
              <input type="text" name="companyName" placeholder="Company Name (Optional)" className="form-control" value={formData.companyName} onChange={handleInputChange} />
              <input type="tel" name="phone" placeholder="Phone Number (Optional)" className="form-control" value={formData.phone} onChange={handleInputChange} />
            </>
          )}
          
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '0.8rem', marginTop: '1rem' }}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLogin ? 'Sign up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClientLoginPage;
