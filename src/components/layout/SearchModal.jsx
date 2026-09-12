import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SEARCHABLE_ITEMS = [
  { title: 'Home Page', category: 'Page', link: '/' },
  { title: 'About Us & Company Story', category: 'Page', link: '/about' },
  { title: 'Portfolio & Case Studies', category: 'Page', link: '/portfolio' },
  { title: 'Services & Solutions', category: 'Page', link: '/services' },
  { title: 'Clients & Partners', category: 'Page', link: '/clients' },
  { title: 'Careers & Open Positions', category: 'Page', link: '/careers' },
  { title: 'Web Design & Interactive Systems', category: 'Service', link: '/services' },
  { title: 'Custom Web & Mobile Development', category: 'Service', link: '/services' },
  { title: 'UI/UX Design & Prototyping', category: 'Service', link: '/services' },
  { title: 'Brand Identity & Visual Systems', category: 'Service', link: '/services' },
  { title: '3D Art & Motion Graphics', category: 'Service', link: '/services' },
  { title: 'Cloud Solutions & Architecture', category: 'Service', link: '/services' },
  { title: 'Senior React Developer', category: 'Career', link: '/careers' },
  { title: 'Product Designer (UI/UX)', category: 'Career', link: '/careers' },
  { title: 'Creative Brand Strategist', category: 'Career', link: '/careers' },
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === '' 
    ? [] 
    : SEARCHABLE_ITEMS.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div 
      id="popup-search-box" 
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(2, 5, 10, 0.95)',
        zIndex: 9999,
        padding: '80px 20px',
        overflowY: 'auto'
      }}
    >
      <div 
        className="search-close" 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '30px',
          right: '40px',
          fontSize: '32px',
          color: '#fff',
          cursor: 'pointer'
        }}
      >
        <i className="fa-sharp fa-regular fa-xmark"></i>
      </div>

      <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#fff', fontSize: '28px', marginBottom: '10px' }}>Search CyberCreative</h2>
          <p style={{ color: '#A5A9B4' }}>Find services, pages, projects, and career openings</p>
        </div>

        <div style={{ position: 'relative', marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="Type keywords (e.g. Design, Services, Careers)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '18px 24px',
              fontSize: '18px',
              backgroundColor: '#11151C',
              color: '#fff',
              border: '1px solid #2D343E',
              borderRadius: '8px',
              outline: 'none',
            }}
          />
          <span style={{ position: 'absolute', right: '20px', top: '20px', color: '#6F7684' }}>
            <i className="fa-regular fa-magnifying-glass"></i>
          </span>
        </div>

        {query.trim() !== '' && (
          <div style={{ backgroundColor: '#11151C', borderRadius: '8px', border: '1px solid #2D343E', padding: '15px' }}>
            <h5 style={{ color: '#6F7684', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Results ({filtered.length})
            </h5>
            {filtered.length === 0 ? (
              <p style={{ color: '#A5A9B4', margin: '15px 0' }}>No matching results found for "{query}".</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {filtered.map((item, idx) => (
                  <li key={idx} style={{ borderBottom: '1px solid #1E2228', padding: '12px 0' }}>
                    <Link 
                      to={item.link} 
                      onClick={onClose}
                      style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        color: '#fff',
                        textDecoration: 'none'
                      }}
                    >
                      <span style={{ fontSize: '16px', fontWeight: '500' }}>{item.title}</span>
                      <span style={{ 
                        fontSize: '12px', 
                        backgroundColor: 'var(--cc-primary)', 
                        padding: '3px 10px', 
                        borderRadius: '20px', 
                        color: '#fff' 
                      }}>
                        {item.category}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
