import React, { useState, useEffect } from 'react';

const TESTIMONIALS = [
  {
    quote: "CyberCreative completely transformed our enterprise SaaS platform. Their user research, UI/UX polish, and lightning-fast React architecture boosted our conversion rate by 240% within 90 days.",
    author: "Elena Rostova",
    position: "Chief Product Officer",
    company: "ApexCloud Systems",
    rating: 5,
    avatar: "/assets/img/team/team-1.png"
  },
  {
    quote: "Working with CyberCreative felt like an extension of our internal team. They don't just write code; they understand business velocity, design elegance, and customer retention at a profound level.",
    author: "Marcus Sterling",
    position: "Founder & CEO",
    company: "VenturePulse Media",
    rating: 5,
    avatar: "/assets/img/team/team-2.png"
  },
  {
    quote: "The design systems and brand identity they built for our fintech launch received praise across TechCrunch and Product Hunt. We closed our Series A shortly after launching with their site!",
    author: "Sarah Jenkins",
    position: "VP of Marketing",
    company: "NovaPay Global",
    rating: 5,
    avatar: "/assets/img/team/team-3.png"
  }
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrent(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[current];

  return (
    <section 
      className="testimonials-section"
      style={{
        padding: '110px 0',
        backgroundColor: '#05080E',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div className="section-heading text-center" style={{ marginBottom: '50px' }}>
          <span 
            style={{ 
              color: 'var(--cc-primary)', 
              textTransform: 'uppercase', 
              fontSize: '13px', 
              letterSpacing: '2px', 
              fontWeight: '700' 
            }}
          >
            Client Endorsements
          </span>
          <h2 style={{ fontSize: '40px', fontWeight: '800', color: '#fff', marginTop: '10px' }}>
            Trusted by Visionaries Across Industries
          </h2>
        </div>

        <div 
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            backgroundColor: '#0c101a',
            border: '1px solid #1f2738',
            borderRadius: '20px',
            padding: '50px 40px',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          {/* Star rating */}
          <div style={{ color: '#ffc226', fontSize: '18px', marginBottom: '20px' }}>
            {[...Array(item.rating)].map((_, i) => (
              <i key={i} className="fa-solid fa-star" style={{ marginRight: '4px' }}></i>
            ))}
          </div>

          <p 
            style={{
              fontSize: '22px',
              lineHeight: '1.7',
              color: '#E0E3EB',
              fontStyle: 'italic',
              marginBottom: '35px',
              minHeight: '100px'
            }}
          >
            "{item.quote}"
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img 
                src={item.avatar} 
                alt={item.author} 
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  border: '2px solid var(--cc-primary)' 
                }} 
              />
              <div>
                <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', margin: '0 0 4px' }}>
                  {item.author}
                </h4>
                <p style={{ color: '#7E8696', fontSize: '14px', margin: 0 }}>
                  {item.position} · <span style={{ color: 'var(--cc-primary)' }}>{item.company}</span>
                </p>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handlePrev} 
                aria-label="Previous testimonial"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#161c2b',
                  border: '1px solid #283347',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className="fa-sharp fa-regular fa-arrow-left"></i>
              </button>
              <button 
                onClick={handleNext} 
                aria-label="Next testimonial"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--cc-primary)',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <i className="fa-sharp fa-regular fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
