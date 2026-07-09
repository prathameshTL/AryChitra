import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Why Choose Us', href: '/why-choose-us' },
  { 
    name: 'Services', 
    href: '/services',
    dropdown: [
      { name: 'Web Development', href: '/services#web' },
      { name: 'Mobile App Dev', href: '/services#app' },
      { name: 'UI/UX Design', href: '/services/ui-ux' },
      { name: 'Cloud Solutions', href: '/services/cloud' },
      { name: 'AI/ML Solutions', href: '/services/ai-ml' },
      { name: 'Digital Marketing', href: '/services/digital-marketing' },
    ]
  },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
          background: isScrolled ? 'var(--nav-scrolled-bg)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(108, 99, 255, 0.1)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            <img 
              src="/arychitralogo.png" 
              alt="AryChitra Logo" 
              style={{ height: '40px', objectFit: 'contain', transform: 'scale(2.2)', transformOrigin: 'left center' }} 
            />
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links" style={{ gap: '1.5rem', alignItems: 'center', listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link) => (
              <li 
                key={link.name} 
                style={{ position: 'relative' }}
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  style={{
                    color: isActive(link.href) ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                    fontFamily: 'var(--font-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem',
                    textDecoration: 'none',
                    padding: '0.5rem 0'
                  }}
                  onMouseOver={(e) => (e.target.style.color = 'var(--accent-blue)')}
                  onMouseOut={(e) => (e.target.style.color = isActive(link.href) ? 'var(--accent-blue)' : 'var(--text-secondary)')}
                >
                  {link.name}
                  {link.dropdown && <ChevronDown size={14} style={{ marginTop: '2px' }} />}
                </Link>

                {/* Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'var(--nav-dropdown-bg)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(108, 99, 255, 0.15)',
                          borderRadius: '12px',
                          padding: '1rem',
                          minWidth: '220px',
                          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem',
                        }}
                      >
                        {link.dropdown.map(sublink => (
                          <Link
                            key={sublink.name}
                            to={sublink.href}
                            style={{
                              color: 'var(--text-secondary)',
                              fontSize: '0.85rem',
                              textDecoration: 'none',
                              padding: '0.5rem 1rem',
                              borderRadius: '8px',
                              transition: 'all 0.2s',
                              display: 'block'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(108, 99, 255, 0.2)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
                          >
                            {sublink.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ThemeToggle size={18} />
            <Link
              to="/contact"
              className="btn btn-glow"
              style={{
                padding: '0.5rem 1.2rem',
                fontSize: '0.8rem',
                display: 'none',
                textDecoration: 'none',
              }}
              id="nav-cta-desktop"
            >
              Get a Quote
            </Link>
            <style>{`@media (min-width: 992px) { #nav-cta-desktop { display: inline-flex !important; } .nav-links { display: flex !important; } } @media (max-width: 991px) { .nav-links { display: none !important; } }`}</style>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                color: 'var(--text-primary)',
                zIndex: 1001,
              }}
              className="nav-links-mobile-toggle"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <style>{`@media (min-width: 992px) { .nav-links-mobile-toggle { display: none !important; } }`}</style>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.6)',
                zIndex: 998,
                backdropFilter: 'blur(4px)',
              }}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '300px',
                maxWidth: '80vw',
                background: 'var(--nav-dropdown-bg)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(108, 99, 255, 0.15)',
                zIndex: 999,
                padding: '6rem 2rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                <ThemeToggle size={18} />
              </div>
              {navLinks.map((link, i) => (
                <div key={link.name}>
                  <Link
                    to={link.href}
                    style={{
                      color: isActive(link.href) ? 'var(--accent-blue)' : 'var(--text-secondary)',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      padding: '0.8rem 0',
                      borderBottom: '1px solid rgba(148, 163, 184, 0.08)',
                      fontFamily: 'var(--font-accent)',
                      transition: 'color 0.3s',
                      display: 'block',
                      textDecoration: 'none'
                    }}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div style={{ paddingLeft: '1rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {link.dropdown.map(sublink => (
                         <Link
                          key={sublink.name}
                          to={sublink.href}
                          style={{
                            color: 'var(--text-muted)',
                            fontSize: '0.95rem',
                            textDecoration: 'none',
                            padding: '0.3rem 0',
                          }}
                         >
                           {sublink.name}
                         </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="btn btn-primary"
                style={{ marginTop: '1.5rem', textAlign: 'center', textDecoration: 'none' }}
              >
                Get a Quote
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
