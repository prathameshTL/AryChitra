import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../utils/api';
import BannerManager from '../components/admin/BannerManager';
import ServicesManager from '../components/admin/ServicesManager';
import ProjectsManager from '../components/admin/ProjectsManager';
import TestimonialsManager from '../components/admin/TestimonialsManager';

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('banner');
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordersRes, messagesRes] = await Promise.all([
          fetch(`${API_BASE}/orders`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch(`${API_BASE}/contact`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (ordersRes.status === 401 || messagesRes.status === 401) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
          return;
        }

        const ordersData = await ordersRes.json();
        const messagesData = await messagesRes.json();

        setOrders(ordersData);
        setMessages(messagesData);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) return <div className="section container" style={{ textAlign: 'center' }}>Loading dashboard...</div>;

  const tabs = [
    { key: 'banner', label: 'Banner' },
    { key: 'services', label: 'Services' },
    { key: 'projects', label: 'Projects' },
    { key: 'testimonials', label: 'Testimonials' },
    { key: 'orders', label: `Orders (${orders.length})` },
    { key: 'messages', label: `Messages (${messages.length})` },
  ];

  return (
    <div className="section container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Admin Dashboard</h2>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`btn ${activeTab === tab.key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass" style={{ padding: '2rem', background: 'var(--card-bg)' }}>
        {activeTab === 'banner' && <BannerManager />}
        {activeTab === 'services' && <ServicesManager />}
        {activeTab === 'projects' && <ProjectsManager />}
        {activeTab === 'testimonials' && <TestimonialsManager />}

        {activeTab === 'orders' && (
          <div>
            <h3>Recent Orders</h3>
            {orders.length === 0 ? <p>No orders yet.</p> : (
              <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <th style={{ padding: '1rem 0' }}>Date</th>
                    <th style={{ padding: '1rem 0' }}>Name</th>
                    <th style={{ padding: '1rem 0' }}>Type</th>
                    <th style={{ padding: '1rem 0' }}>Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order._id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '1rem 0' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: '1rem 0' }}>{order.name} <br/><small style={{color:'var(--text-secondary)'}}>{order.email}</small></td>
                      <td style={{ padding: '1rem 0' }}>{order.websiteType}</td>
                      <td style={{ padding: '1rem 0' }}>{order.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h3>Contact Messages</h3>
            {messages.length === 0 ? <p>No messages yet.</p> : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map(msg => (
                  <div key={msg._id} style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <strong>{msg.name} ({msg.email})</strong>
                      <small style={{ color: 'var(--text-secondary)' }}>{new Date(msg.createdAt).toLocaleString()}</small>
                    </div>
                    {msg.phone && (
                      <div style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                        <strong>Phone:</strong> {msg.phone}
                      </div>
                    )}
                    <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboardPage;
