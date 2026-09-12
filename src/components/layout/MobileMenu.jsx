import React from 'react';
import { NavLink } from 'react-router-dom';
import CyberCreativeLogo from '../common/CyberCreativeLogo';

export default function MobileMenu({ isOpen, onClose }) {
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Services', path: '/services' },
    { label: 'Clients', path: '/clients' },
    { label: 'Careers', path: '/careers' },
  ];

  return (
    <>
      <div 
        className={`mobile-side-menu ${isOpen ? 'is-open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: isOpen ? 0 : '-320px',
          width: '300px',
          height: '100%',
          backgroundColor: '#0c0f16',
          zIndex: 9999,
          padding: '30px 24px',
          transition: 'all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1)',
          boxShadow: isOpen ? '10px 0 30px rgba(0,0,0,0.6)' : 'none',
          overflowY: 'auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px' }}>
          <CyberCreativeLogo height={32} />
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              fontSize: '22px',
              cursor: 'pointer'
            }}
          >
            <i className="fa-sharp fa-regular fa-xmark"></i>
          </button>
        </div>

        <nav>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {navItems.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '14px' }}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) => (isActive ? 'active-nav-link' : '')}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '12px 16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: isActive ? 'var(--cc-primary)' : '#E0E2EC',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'var(--cc-primary-light)' : 'transparent',
                    transition: 'all 0.2s ease'
                  })}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ marginTop: '40px', borderTop: '1px solid #1E2228', paddingTop: '25px' }}>
          <p style={{ color: '#888F9E', fontSize: '13px', marginBottom: '15px' }}>Ready to launch your project?</p>
          <NavLink
            to="/careers"
            onClick={onClose}
            className="rr-primary-btn"
            style={{ display: 'block', textAlign: 'center', padding: '12px 20px', fontSize: '14px' }}
          >
            Join Our Team <i className="fa-sharp fa-regular fa-arrow-right"></i>
          </NavLink>
        </div>
      </div>

      {isOpen && (
        <div 
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9998
          }}
        />
      )}
    </>
  );
}
