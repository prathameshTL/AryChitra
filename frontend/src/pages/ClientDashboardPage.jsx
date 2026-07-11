import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/api';
import SEO from '../components/SEO';
import { LogOut, Package, Clock, CheckCircle } from 'lucide-react';

function ClientDashboardPage() {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('clientToken');
    if (!token) {
      navigate('/client/login');
      return;
    }

    const fetchClientData = async () => {
      setLoading(true);
      try {
        const [profileRes, ordersRes] = await Promise.all([
          fetch(`${API_BASE}/client/auth/profile`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_BASE}/client/orders`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        if (profileRes.status === 401 || ordersRes.status === 401) {
          localStorage.removeItem('clientToken');
          navigate('/client/login');
          return;
        }

        const profileData = await profileRes.json();
        const ordersData = await ordersRes.json();

        setProfile(profileData);
        setOrders(ordersData);
      } catch (err) {
        setError('Failed to fetch dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchClientData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('clientToken');
    navigate('/client/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981'; // Green
      case 'In Progress': return '#3b82f6'; // Blue
      case 'Cancelled': return '#ef4444'; // Red
      default: return '#f59e0b'; // Orange (Pending)
    }
  };

  if (loading) return <div className="section container" style={{ textAlign: 'center' }}>Loading dashboard...</div>;

  return (
    <div className="section" style={{ minHeight: '80vh', backgroundColor: 'var(--bg-secondary)' }}>
      <SEO title="Client Dashboard | AryChitra" />
      
      <div className="container" style={{ maxWidth: '1000px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ marginBottom: '0.5rem' }}>Welcome, {profile?.name}</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{profile?.companyName ? `${profile.companyName} | ` : ''}{profile?.email}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        {error && <div style={{ color: 'red', marginBottom: '2rem' }}>{error}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(108, 99, 255, 0.1)', borderRadius: '50%', color: 'var(--accent-purple)' }}><Package size={24} /></div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{orders.length}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Total Projects</div>
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderRadius: '50%', color: '#f59e0b' }}><Clock size={24} /></div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{orders.filter(o => o.status === 'Pending' || o.status === 'In Progress').length}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Active Projects</div>
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem', backgroundColor: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', color: '#10b981' }}><CheckCircle size={24} /></div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{orders.filter(o => o.status === 'Completed').length}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Completed</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Your Project Requests</h2>
          
          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              You haven't submitted any project requests yet. <br/><br/>
              <a href="/order" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>Start a Project</a>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem 0' }}>Date</th>
                    <th style={{ padding: '1rem 0' }}>Service Type</th>
                    <th style={{ padding: '1rem 0' }}>Budget</th>
                    <th style={{ padding: '1rem 0' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{order.websiteType}</td>
                      <td style={{ padding: '1rem 0', color: 'var(--text-secondary)' }}>{order.budget}</td>
                      <td style={{ padding: '1rem 0' }}>
                        <span style={{ 
                          padding: '0.4rem 0.8rem', 
                          borderRadius: '20px', 
                          fontSize: '0.85rem', 
                          fontWeight: 'bold',
                          backgroundColor: `${getStatusColor(order.status)}20`, // 20% opacity background
                          color: getStatusColor(order.status) 
                        }}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientDashboardPage;
