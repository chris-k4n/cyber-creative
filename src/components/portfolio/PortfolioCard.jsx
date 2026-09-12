import React from 'react';

export default function PortfolioCard({ project, onSelect }) {
  return (
    <div className="col-lg-6 col-md-6">
      <div 
        className="cs-item fade-top" 
        data-cursor-text="View"
        style={{
          position: 'relative',
          backgroundColor: '#0d111c',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid #1c2436',
          cursor: 'pointer'
        }}
        onClick={() => onSelect(project)}
      >
        <div 
          className="cs-thumb" 
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '340px'
          }}
        >
          <img 
            src={project.image} 
            alt={project.title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover'
            }} 
            className="portfolio-thumb-img"
          />
          <div 
            className="cs-btn" 
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--cc-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              boxShadow: '0 4px 15px var(--cc-primary-glow)'
            }}
          >
            <i className="fa-light fa-arrow-right-long"></i>
          </div>
        </div>

        <div className="cs-content" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ color: 'var(--cc-primary)', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {project.category}
            </span>
            <span style={{ color: '#555C6D', fontSize: '14px', fontWeight: '700' }}>
              {project.num}
            </span>
          </div>
          <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
