import React from 'react';
import { Link } from 'react-router-dom';

export default function ServiceCard({ service, onSelect }) {
  return (
    <div className="col-lg-4 col-md-6">
      <div 
        className="service-box fade-top"
        data-cursor-text="Explore"
        style={{
          backgroundColor: '#0c101a',
          border: '1px solid #1c2333',
          borderRadius: '16px',
          padding: '40px 30px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div>
          <div 
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              backgroundColor: 'var(--cc-primary-light)',
              border: '1px solid var(--cc-primary-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              color: 'var(--cc-primary)',
              marginBottom: '26px'
            }}
          >
            <i className={service.icon}></i>
          </div>

          <span style={{ color: '#ffc226', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {service.tag}
          </span>
          <h3 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '800', margin: '8px 0 16px' }}>
            {service.title}
          </h3>
          <p style={{ color: '#9DA3B0', fontSize: '15px', lineHeight: '1.65', marginBottom: '25px' }}>
            {service.description}
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px' }}>
            {service.features.map((feat, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#D2D6E0', fontSize: '14px', marginBottom: '10px' }}>
                <span style={{ color: '#00E599', fontSize: '14px' }}><i className="fa-solid fa-circle-check"></i></span>
                {feat}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Link 
            to="/services" 
            onClick={() => onSelect && onSelect(service)}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: 'var(--cc-primary)', 
              fontSize: '15px', 
              fontWeight: '700', 
              textDecoration: 'none' 
            }}
          >
            Explore Solutions <i className="fa-sharp fa-regular fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}
