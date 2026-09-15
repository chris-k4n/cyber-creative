import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(2, 5, 10, 0.88)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#0c111c',
          border: '1px solid #242f44',
          borderRadius: '16px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close Project Modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            fontSize: '18px',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <i className="fa-sharp fa-regular fa-xmark"></i>
        </button>

        <img 
          src={project.image} 
          alt={project.title} 
          style={{ width: '100%', height: '320px', objectFit: 'cover', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}
        />

        <div style={{ padding: '35px 30px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <span style={{ backgroundColor: 'var(--cc-primary)', color: '#fff', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
              {project.category}
            </span>
            <span style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: '#A0A5B5', fontSize: '12px', padding: '4px 12px', borderRadius: '20px' }}>
              {project.client || 'Confidential Client'}
            </span>
          </div>

          <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: '800', marginBottom: '16px' }}>
            {project.title}
          </h2>

          <p style={{ color: '#A5ABB8', fontSize: '16px', lineHeight: '1.7', marginBottom: '25px' }}>
            {project.description || 'CyberCreative engineered a comprehensive digital overhaul including bespoke branding, a high-performance modular frontend, and automated cloud workflows.'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', padding: '20px', backgroundColor: '#131928', borderRadius: '10px', marginBottom: '30px' }}>
            <div>
              <p style={{ color: '#7E8696', fontSize: '12px', textTransform: 'uppercase', margin: '0 0 4px' }}>Timeline</p>
              <h5 style={{ color: '#fff', fontSize: '15px', margin: 0 }}>{project.timeline || '8 Weeks'}</h5>
            </div>
            <div>
              <p style={{ color: '#7E8696', fontSize: '12px', textTransform: 'uppercase', margin: '0 0 4px' }}>Key Metric</p>
              <h5 style={{ color: '#00E599', fontSize: '15px', margin: 0 }}>{project.metric || '+185% Engagement'}</h5>
            </div>
            <div>
              <p style={{ color: '#7E8696', fontSize: '12px', textTransform: 'uppercase', margin: '0 0 4px' }}>Tech Stack</p>
              <h5 style={{ color: '#fff', fontSize: '15px', margin: 0 }}>{project.stack || 'React, Vite, Three.js'}</h5>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={onClose}
              className="rr-primary-btn" 
              style={{ padding: '12px 28px', fontSize: '14px' }}
            >
              Close Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
