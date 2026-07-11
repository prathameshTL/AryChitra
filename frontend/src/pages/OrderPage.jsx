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

    const loadRazorpay = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };

    try {
      // 1. Load Razorpay script
      const resLoad = await loadRazorpay();
      if (!resLoad) {
        throw new Error('Razorpay SDK failed to load. Are you online?');
      }

      // 2. Submit the order to our backend first
      const token = localStorage.getItem('clientToken');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const resOrder = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!resOrder.ok) throw new Error('Failed to submit order');
      const savedOrder = await resOrder.json();

      // 3. Create payment order in backend
      const resPayment = await fetch(`${API_BASE}/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }) // Flat 1000 INR fee
      });
      if (!resPayment.ok) throw new Error('Payment initialization failed');
      const paymentOrder = await resPayment.json();

      // 4. Open Razorpay Checkout or handle Mock Payment
      if (paymentOrder.id.startsWith('mock_order_')) {
        // Skip Razorpay widget, go straight to verify
        const resVerify = await fetch(`${API_BASE}/payments/verify-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            razorpay_order_id: paymentOrder.id,
            razorpay_payment_id: 'mock_payment_123',
            razorpay_signature: 'mock_signature'
          })
        });

        if (resVerify.ok) {
          alert('Payment successful! Your project request has been received.');
          setFormData({ name: '', email: '', phone: '', company: '', service: 'web', budget: '', description: '' });
        } else {
          alert('Payment verification failed.');
        }
        return;
      }

      const options = {
        key: 'rzp_test_fallback', // Typically comes from env or backend
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: 'AryChitra',
        description: 'Consulting Fee',
        order_id: paymentOrder.id,
        handler: async function (response) {
          try {
            // Verify payment
            const resVerify = await fetch(`${API_BASE}/payments/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (resVerify.ok) {
              alert('Payment successful! Your project request has been received.');
              setFormData({ name: '', email: '', phone: '', company: '', service: 'web', budget: '', description: '' });
              
              // Optional: Update order status to 'In Progress' via backend
              // await fetch(`${API_BASE}/orders/${savedOrder.order._id}`, { method: 'PUT', headers, body: JSON.stringify({ status: 'In Progress' }) });
            } else {
              alert('Payment verification failed.');
            }
          } catch (err) {
            console.error(err);
            alert('Error verifying payment.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#6c63ff'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert('Payment Failed: ' + response.error.description);
      });
      rzp.open();

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
              {loading ? 'Processing...' : 'Pay Consulting Fee & Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
