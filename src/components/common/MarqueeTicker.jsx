import React from 'react';

export default function MarqueeTicker({ items = [] }) {
  const defaultItems = [
    { text: 'Digital Innovation', stroke: false },
    { text: 'Web Development', stroke: true },
    { text: 'UI/UX Excellence', stroke: false },
    { text: 'Brand Strategy', stroke: true },
    { text: 'Motion & 3D', stroke: false },
    { text: 'CyberCreative Agency', stroke: true },
  ];

  const displayList = items.length > 0 ? items : defaultItems;

  return (
    <div 
      className="running-text running-3"
      style={{
        position: 'relative',
        padding: '24px 0',
        backgroundColor: '#0a0e17',
        borderTop: '1px solid #1a202c',
        borderBottom: '1px solid #1a202c',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      <div 
        className="marquee-track"
        style={{
          display: 'flex',
          gap: '40px',
          width: 'max-content',
          animation: 'marqueeScroll 25s linear infinite'
        }}
      >
        {/* Render twice for seamless infinite loop */}
        {[...displayList, ...displayList].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <span 
              style={{
                fontSize: '34px',
                fontWeight: '800',
                fontFamily: 'var(--rr-ff-heading-2, sans-serif)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: item.stroke ? 'transparent' : '#ffffff',
                WebkitTextStroke: item.stroke ? '1px var(--cc-primary)' : 'none',
              }}
            >
              {item.text}
            </span>
            <span style={{ color: 'var(--cc-primary)', fontSize: '18px' }}>
              <i className="fa-solid fa-asterisk"></i>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
