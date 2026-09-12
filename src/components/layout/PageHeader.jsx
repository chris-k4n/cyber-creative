import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHeader({ title, subtitle, breadcrumb = [] }) {
  return (
    <section 
      className="page-header" 
      style={{
        position: 'relative',
        padding: '160px 0 100px',
        backgroundImage: 'url(/assets/img/bg-img/page-header-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden'
      }}
    >
      <div 
        className="overlay" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(2, 5, 10, 0.78)',
          zIndex: 1
        }}
      />

      <div className="shapes" style={{ zIndex: 2 }}>
        <div className="shape shape-1" style={{ position: 'absolute', top: '15%', left: '5%', opacity: 0.7 }}>
          <img src="/assets/img/shapes/page-header-shape-1.png" alt="shape" />
        </div>
        <div className="shape shape-2" style={{ position: 'absolute', bottom: '10%', right: '8%', opacity: 0.7 }}>
          <img src="/assets/img/shapes/page-header-shape-2.png" alt="shape" />
        </div>
        <div className="shape shape-3" style={{ position: 'absolute', top: '30%', right: '20%', opacity: 0.5 }}>
          <img src="/assets/img/shapes/page-header-shape-3.png" alt="shape" />
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div className="page-header-content text-center">
          <h1 className="title" style={{ fontSize: '54px', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ color: '#A0A5B5', fontSize: '18px', maxWidth: '650px', margin: '0 auto 20px', lineHeight: '1.6' }}>
              {subtitle}
            </p>
          )}
          <h4 className="sub-title" style={{ fontSize: '15px', color: '#fff', margin: 0 }}>
            <Link className="home" to="/" style={{ color: '#888F9E', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ margin: '0 10px', color: 'var(--cc-primary)' }}>/</span>
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {crumb.link ? (
                  <Link to={crumb.link} style={{ color: '#888F9E', textDecoration: 'none' }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="inner-page" style={{ color: 'var(--cc-primary)', fontWeight: '600' }}>
                    {crumb.label}
                  </span>
                )}
                {idx < breadcrumb.length - 1 && <span style={{ margin: '0 10px', color: 'var(--cc-primary)' }}>/</span>}
              </React.Fragment>
            ))}
          </h4>
        </div>
      </div>
    </section>
  );
}
