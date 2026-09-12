import React from 'react';
import { Link } from 'react-router-dom';

export default function CtaBanner({ 
  title = "Ready To Elevate Your Digital Footprint?", 
  subtitle = "Let's discuss how CyberCreative can bring your vision to life with industry-defining design and technology.",
  btnText = "Start A Project",
  btnLink = "/services"
}) {
  return (
    <section 
      className="cta-banner-section"
      style={{
        position: 'relative',
        padding: '100px 0',
        backgroundColor: '#0a0e18',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: '-150px',
          right: '-150px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(63,90,243,0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none'
        }}
      />
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div 
          style={{
            background: 'linear-gradient(135deg, #111624 0%, #151c2e 100%)',
            border: '1px solid #232d42',
            borderRadius: '20px',
            padding: '60px 40px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}
        >
          <span 
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'var(--cc-primary-light)',
              border: '1px solid var(--cc-primary-glow)',
              borderRadius: '30px',
              color: 'var(--cc-primary)',
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '20px'
            }}
          >
            Start Collaboration
          </span>
          <h2 
            style={{ 
              fontSize: '42px', 
              fontWeight: '800', 
              color: '#ffffff', 
              maxWidth: '750px', 
              margin: '0 auto 18px',
              lineHeight: '1.2' 
            }}
          >
            {title}
          </h2>
          <p 
            style={{ 
              color: '#9CA3AF', 
              fontSize: '17px', 
              maxWidth: '620px', 
              margin: '0 auto 35px', 
              lineHeight: '1.6' 
            }}
          >
            {subtitle}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link 
              to={btnLink} 
              className="rr-primary-btn" 
              style={{ padding: '14px 32px', fontSize: '15px' }}
            >
              {btnText} <i className="fa-sharp fa-regular fa-arrow-right"></i>
            </Link>
            <Link 
              to="/careers" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: 'transparent',
                border: '1px solid #333d52',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              Explore Careers <i className="fa-regular fa-user-group"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
