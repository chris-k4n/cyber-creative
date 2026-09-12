import React from 'react';
import { Link } from 'react-router-dom';
import CyberCreativeLogo from '../common/CyberCreativeLogo';

export default function SidebarDrawer({ isOpen, onClose }) {
  return (
    <>
      <div 
        id="sidebar-area" 
        className={`sidebar-area ${isOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-450px',
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          backgroundColor: '#070B13',
          zIndex: 99999,
          padding: '40px 30px',
          boxShadow: isOpen ? '-10px 0 40px rgba(0, 0, 0, 0.7)' : 'none',
          transition: 'right 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
          overflowY: 'auto',
          borderLeft: '1px solid #161D2B'
        }}
      >
        <button 
          id="sidebar-close"
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '25px',
            right: '25px',
            background: 'none',
            border: 'none',
            color: '#A5A9B4',
            cursor: 'pointer',
            fontSize: '24px'
          }}
          aria-label="Close Sidebar"
        >
          <i className="fa-sharp fa-regular fa-xmark"></i>
        </button>

        <div className="side-menu-content" style={{ marginTop: '20px' }}>
          <div className="side-menu-logo" style={{ marginBottom: '30px' }}>
            <Link to="/" onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
              <CyberCreativeLogo height={36} />
            </Link>
          </div>

          <div className="side-menu-about" style={{ marginBottom: '35px' }}>
            <div className="side-menu-header">
              <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '12px' }}>About CyberCreative</h3>
            </div>
            <p style={{ color: '#A5A9B4', fontSize: '14px', lineHeight: '1.7' }}>
              We are a next-generation digital agency engineering high-converting web apps, futuristic brand identities, and immersive UI/UX experiences for ambitious global brands.
            </p>
            <Link 
              to="/about" 
              onClick={onClose} 
              className="rr-primary-btn" 
              style={{ marginTop: '15px', display: 'inline-block', padding: '10px 24px', fontSize: '14px' }}
            >
              Explore Agency <i className="fa-sharp fa-regular fa-arrow-right"></i>
            </Link>
          </div>

          <div className="side-menu-contact" style={{ marginBottom: '35px' }}>
            <div className="side-menu-header">
              <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '16px' }}>Get In Touch</h3>
            </div>
            <ul className="side-menu-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginBottom: '16px' }}>
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--cc-primary)', marginTop: '5px' }}></i>
                <p style={{ color: '#A5A9B4', fontSize: '14px', margin: 0 }}>742 Evergreen Terrace, Tech District, San Francisco, CA</p>
              </li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '16px' }}>
                <i className="fas fa-phone" style={{ color: 'var(--cc-primary)' }}></i>
                <a href="tel:+14155552671" style={{ color: '#A5A9B4', fontSize: '14px', textDecoration: 'none' }}>+1 (415) 555-2671</a>
              </li>
              <li style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '16px' }}>
                <i className="fas fa-envelope-open-text" style={{ color: 'var(--cc-primary)' }}></i>
                <a href="mailto:hello@cybercreative.agency" style={{ color: '#A5A9B4', fontSize: '14px', textDecoration: 'none' }}>hello@cybercreative.agency</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '14px' }}>Connect With Us</h4>
            <ul className="side-menu-social" style={{ display: 'flex', gap: '12px', listStyle: 'none', padding: 0, margin: 0 }}>
              <li className="facebook">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1E2228', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="twitter">
                <a href="https://x.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1E2228', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                  <i className="fab fa-x-twitter"></i>
                </a>
              </li>
              <li className="instagram">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1E2228', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li className="linkedin">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#1E2228', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
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
            backdropFilter: 'blur(4px)',
            zIndex: 9997,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
    </>
  );
}
