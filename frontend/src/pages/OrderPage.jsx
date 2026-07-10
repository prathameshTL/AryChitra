import React, { useState } from 'react';
import { API_BASE } from '../utils/api';
import SEO from '../components/SEO';

function OrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'web',
    budget: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      websiteType: formData.service,
      budget: formData.budget,
      details: formData.company ? `Company: ${formData.company}\n\n${formData.description}` : formData.description
    };

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Failed to submit order');
      }

      alert('Thank you for reaching out! Your project request has been received. We will get back to you shortly.');
      setFormData({ name: '', email: '', phone: '', company: '', service: 'web', budget: '', description: '' });
    } catch (err) {
      console.error(err);
      setError('An error occurred while submitting your request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '6rem 0', minHeight: '80vh', backgroundColor: 'var(--bg-secondary)' }}>
      <SEO 
        title="Order Project | Request IT Services & Custom Software" 
        description="Ready to build your next big idea? Request a quote or start a project with AryChitra's expert development and design team."
        keywords="order project, hire developers, request software quote, start digital project, AryChitra"
        canonicalUrl="https://arychitra.com/order"
      />
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="section-title">Start Your Project</h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Tell us about your requirements, and our team of experts will craft the perfect digital solution for you.
          </p>
        </div>

        <div className="card" style={{ padding: '3rem', backgroundColor: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px', boxShadow: 'var(--shadow-md)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="name">Full Name *</label>
                <input type="text" id="name" name="name" className="form-control" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input type="email" id="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="form-control" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="company">Company Name (Optional)</label>
                <input type="text" id="company" name="company" className="form-control" value={formData.company} onChange={handleChange} placeholder="Your Company Ltd." />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" htmlFor="service">Service Required *</label>
                <select id="service" name="service" className="form-control" required value={formData.service} onChange={handleChange}>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="cloud">Cloud Architecture</option>
                  <option value="ai">AI / Machine Learning</option>
                  <option value="digital">Digital Marketing</option>
                  <option value="consulting">IT Consulting</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" htmlFor="budget">Estimated Budget *</label>
                  <select id="budget" name="budget" className="form-control" required value={formData.budget} onChange={handleChange}>
                    <option value="">Select Budget Range</option>
                    <option value="<50k">Less than ₹50,000</option>
                    <option value="50k-1L">₹50,000 - ₹1,00,000</option>
                    <option value="1L-5L">₹1,00,000 - ₹5,00,000</option>
                    <option value="5L-10L">₹5,00,000 - ₹10,00,000</option>
                    <option value=">10L">More than ₹10,00,000</option>
                  </select>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <label className="form-label" htmlFor="description">Project Description *</label>
              <textarea id="description" name="description" className="form-control" required value={formData.description} onChange={handleChange} placeholder="Tell us about your project goals, timelines, and any specific requirements..."></textarea>
            </div>
            {error && <div style={{ color: 'red', marginTop: '1rem', textAlign: 'center' }}>{error}</div>}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem', marginTop: '1.5rem', fontSize: '1.1rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
