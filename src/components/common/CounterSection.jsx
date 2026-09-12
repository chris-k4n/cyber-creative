import React from 'react';

export default function CounterSection({ darkBg = false }) {
  const stats = [
    { number: '12', suffix: '+', title: 'Years of Digital Experience' },
    { number: '480', suffix: '+', title: 'Successful Projects Shipped' },
    { number: '99', suffix: '%', title: 'Client Satisfaction Rate' },
    { number: '34', suffix: '+', title: 'Global Design & Tech Awards' },
  ];

  return (
    <section 
      className="counter-section counter-2"
      style={{
        padding: '70px 0',
        backgroundColor: darkBg ? '#06090F' : '#0b0f19',
        borderTop: '1px solid #171d2a',
        borderBottom: '1px solid #171d2a'
      }}
    >
      <div className="container">
        <div className="row gy-4 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-lg-3 col-md-6">
              <div 
                className="counter-item"
                style={{
                  padding: '24px 15px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease'
                }}
              >
                <h3 
                  className="title" 
                  style={{ 
                    fontSize: '52px', 
                    fontWeight: '800', 
                    color: '#ffffff', 
                    marginBottom: '8px',
                    fontFamily: 'var(--rr-ff-heading-2, sans-serif)'
                  }}
                >
                  <span style={{ color: 'var(--cc-primary)' }}>{stat.number}</span>
                  <span style={{ color: '#ffc226' }}>{stat.suffix}</span>
                </h3>
                <p style={{ color: '#A0A5B4', fontSize: '15px', fontWeight: '500', margin: 0 }}>
                  {stat.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
