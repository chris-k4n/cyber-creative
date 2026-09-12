import React from 'react';

export default function SponsorMarquee({ title = "Trusted by High-Growth Companies & Global Innovators" }) {
  const sponsors = [
    { name: 'Partner 1', img: '/assets/img/sponsor/sponsor-1.png' },
    { name: 'Partner 2', img: '/assets/img/sponsor/sponsor-2.png' },
    { name: 'Partner 3', img: '/assets/img/sponsor/sponsor-3.png' },
    { name: 'Partner 4', img: '/assets/img/sponsor/sponsor-4.png' },
    { name: 'Partner 5', img: '/assets/img/sponsor/sponsor-5.png' },
  ];

  return (
    <section 
      className="sponsor-section"
      style={{
        padding: '60px 0',
        backgroundColor: '#070a10',
        borderTop: '1px solid #141a26',
        borderBottom: '1px solid #141a26'
      }}
    >
      <div className="container">
        {title && (
          <p 
            style={{ 
              textAlign: 'center', 
              color: '#6F7684', 
              fontSize: '14px', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              fontWeight: '600',
              marginBottom: '35px' 
            }}
          >
            {title}
          </p>
        )}
        <div 
          className="d-flex flex-wrap justify-content-center align-items-center"
          style={{ gap: '45px' }}
        >
          {sponsors.map((sponsor, idx) => (
            <div 
              key={idx} 
              style={{
                opacity: 0.65,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                filter: 'grayscale(100%) brightness(120%)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.filter = 'grayscale(0%) brightness(100%)';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.65';
                e.currentTarget.style.filter = 'grayscale(100%) brightness(120%)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img src={sponsor.img} alt={sponsor.name} style={{ height: '36px', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
