import React from 'react';
import { Github, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleScrollTop = (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)', paddingTop: '5rem', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative gradient line at top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--gradient-primary)' }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>

          {/* Column 1: Brand */}
          <div>
            <Link to="/" onClick={handleScrollTop} style={{ display: 'inline-block', marginBottom: '1.5rem', textDecoration: 'none' }}>
              <img
                src="/arychitralogo.png"
                alt="AryChitra Logo"
                style={{ height: '45px', objectFit: 'contain', transform: 'scale(4)', transformOrigin: 'left center', marginBottom: '3rem', marginTop: '1rem' }}
              />
            </Link>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Crafting premium digital futures through innovative software engineering and stunning user experiences. We transform bold ideas into scalable realities.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="cursor-hover-target"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(108, 99, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.3s',
                    border: '1px solid rgba(108, 99, 255, 0.2)',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'var(--gradient-primary)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'transparent'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(108, 99, 255, 0.1)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'rgba(108, 99, 255, 0.2)'; }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0, listStyle: 'none' }}>
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Why Choose Us', path: '/why-choose-us' },
                { name: 'Portfolio', path: '/portfolio' },
                { name: 'Latest Blog', path: '/blog' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={handleScrollTop}
                    style={{
                      color: 'var(--text-secondary)',
                      transition: 'color 0.3s, transform 0.3s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    <ArrowUpRight size={14} /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Our Services</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0, margin: 0, listStyle: 'none' }}>
              {[
                { name: 'Web Development', path: '/services#web' },
                { name: 'Mobile App Development', path: '/services#app' },
                { name: 'UI/UX Design', path: '/services/ui-ux' },
                { name: 'Cloud & DevOps', path: '/services/cloud' },
                { name: 'AI/ML Solutions', path: '/services/ai-ml' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={handleScrollTop}
                    style={{
                      color: 'var(--text-secondary)',
                      transition: 'color 0.3s, transform 0.3s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.color = 'var(--accent-purple)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                  >
                    <ArrowUpRight size={14} /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--text-secondary)', padding: 0, margin: '0 0 2rem 0', listStyle: 'none' }}>
              <li>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</span>
                <a href="mailto:arychitra26@gmail.com" style={{ color: 'var(--text-primary)', transition: 'color 0.3s', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = 'var(--accent-blue)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-primary)'}>arychitra26@gmail.com</a>
              </li>
              <li>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</span>
                <span style={{ color: 'var(--text-primary)' }}>+91 73879 64277</span>
              </li>
            </ul>

            <h4 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Newsletter</h4>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  padding: '0.8rem 1rem',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontSize: '0.9rem'
                }}
              />
              <button
                className="btn btn-primary"
                style={{ padding: '0.8rem 1.2rem', borderRadius: '8px', flexShrink: 0, whiteSpace: 'nowrap' }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(148, 163, 184, 0.1)', padding: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }} className="footer-bottom">
          <style>{`@media (min-width: 768px) { .footer-bottom { flex-direction: row !important; } }`}</style>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            AryChitra &copy; {new Date().getFullYear()} All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.3s', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>Privacy Policy</a>
            <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.3s', textDecoration: 'none' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
