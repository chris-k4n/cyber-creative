import React, { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [scrollValue, setScrollValue] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTopPos = document.documentElement.scrollTop || window.scrollY || 0;
      const calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = calcHeight > 0 ? Math.min(100, Math.round((scrollTopPos / calcHeight) * 100)) : 0;
      
      setScrollValue(progress);
      setIsActive(scrollTopPos > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      id="scroll-percentage" 
      className={`scroll-progress-btn ${isActive ? 'active' : ''}`}
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      title="Scroll to Top"
      style={{
        display: isActive ? 'flex' : 'none',
        position: 'fixed',
        right: '25px',
        bottom: '25px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: `conic-gradient(var(--cc-primary) ${scrollValue}%, rgba(255,255,255,0.15) ${scrollValue}%)`,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 999,
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        transition: 'transform 0.2s ease, opacity 0.3s ease',
        padding: '3px'
      }}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0c101a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: '700'
        }}
      >
        <span id="scroll-percentage-value">
          {scrollValue < 96 ? (
            `${scrollValue}%`
          ) : (
            <i className="fa-sharp fa-regular fa-arrow-up-long" style={{ fontSize: '14px', color: 'var(--cc-primary)' }}></i>
          )}
        </span>
      </div>
    </div>
  );
}
