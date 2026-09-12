import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import { Link } from 'react-router-dom';

const TESTI_CLIENTS = [
  {
    author: 'Daniel Joseph',
    role: 'Creative Director, Apex Global',
    avatar: '/assets/img/testi/testi-author-1.png',
    quote: 'CyberCreative elevated our digital footprint beyond expectation. The craftsmanship and performance of our web platform are lauded by our partners.'
  },
  {
    author: 'Victoria Madison',
    role: 'Lead Developer, NovaPay',
    avatar: '/assets/img/testi/testi-author-2.png',
    quote: 'Their engineering discipline is remarkable. They took complex fintech workflows and produced an effortless, sub-second checkout experience.'
  },
  {
    author: 'Nicholas Thomas',
    role: 'VP Design, Hyperion Systems',
    avatar: '/assets/img/testi/testi-author-3.png',
    quote: 'The animations and smooth scroll interactions are buttery and elegant. They set a new benchmark for what modern web applications can feel like.'
  },
  {
    author: 'James Hallagher',
    role: 'CMO, Solstice Brands',
    avatar: '/assets/img/testi/testi-author-5.png',
    quote: 'Direct conversions surged 42% in the first quarter post-launch. The return on investment has been monumental.'
  }
];

export default function Clients() {
  const [activeTesti, setActiveTesti] = useState(0);

  return (
    <div className="clients-page">
      {/* 1. PAGE HEADER */}
      <PageHeader
        title="Our Clients & Partners"
        breadcrumb={[{ label: 'Clients' }]}
      />

      {/* 2. SPONSOR MARQUEE (Exact template sponsor assets) */}
      <section className="sponsor-section pt-100 pb-100">
        <div className="container">
          <div className="sponsor-wrap">
            <div className="sponsor-item item-1">
              <h3 className="title">
                WORKED WITH <br />GLOBAL LARGEST <br /> BRANDS
              </h3>
            </div>
            <div className="sponsor-item">
              <a href="#"><img src="/assets/img/sponsor/sponsor-1.png" alt="sponsor" /></a>
            </div>
            <div className="sponsor-item">
              <a href="#"><img src="/assets/img/sponsor/sponsor-2.png" alt="sponsor" /></a>
            </div>
            <div className="sponsor-item">
              <a href="#"><img src="/assets/img/sponsor/sponsor-3.png" alt="sponsor" /></a>
            </div>
            <div className="sponsor-item">
              <a href="#"><img src="/assets/img/sponsor/sponsor-4.png" alt="sponsor" /></a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CLIENT CASE HIGHLIGHTS (With template cs-img images) */}
      <section className="case-study pb-130 fade-wrapper">
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              Partnership Success
            </h4>
            <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
              Real Impact Delivered For Category Leaders
            </h2>
          </div>
          <div className="row gy-4">
            <div className="col-md-6">
              <div className="cs-item fade-top">
                <div className="cs-thumb">
                  <img src="/assets/img/images/cs-img-1.png" alt="Medical Application" />
                  <Link className="cs-btn" to="/portfolio"><i className="fa-light fa-arrow-right-long"></i></Link>
                </div>
                <div className="cs-content">
                  <span className="number">01</span>
                  <h3 className="title"><Link to="/portfolio">HealthTech Global Portal (+210% User Retention)</Link></h3>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="cs-item fade-top">
                <div className="cs-thumb">
                  <img src="/assets/img/images/cs-img-2.png" alt="Dashboard App" />
                  <Link className="cs-btn" to="/portfolio"><i className="fa-light fa-arrow-right-long"></i></Link>
                </div>
                <div className="cs-content">
                  <span className="number">02</span>
                  <h3 className="title"><Link to="/portfolio">Apex Enterprise Cloud Telemetry (Sub-Second Latency)</Link></h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLIENT TESTIMONIALS (With template testi-author assets) */}
      <section className="testimonial-section pt-100 pb-130 overflow-hidden" style={{ backgroundColor: '#070b13' }}>
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              Client Feedback
            </h4>
            <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
              What Founders & Leaders Say About Us
            </h2>
          </div>
          <div className="testi-carousel" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="testi-item text-center">
              <div className="testi-thumb" style={{ marginBottom: '24px' }}>
                <img 
                  src={TESTI_CLIENTS[activeTesti].avatar} 
                  alt={TESTI_CLIENTS[activeTesti].author}
                  style={{ width: '85px', height: '85px', borderRadius: '50%', objectFit: 'cover', display: 'inline-block' }}
                />
              </div>
              <div className="testi-content">
                <h3 className="author">
                  {TESTI_CLIENTS[activeTesti].author} <span>{TESTI_CLIENTS[activeTesti].role}</span>
                </h3>
                <p style={{ fontSize: '20px', lineHeight: '1.7', marginTop: '16px' }}>
                  "{TESTI_CLIENTS[activeTesti].quote}"
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
              {TESTI_CLIENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTesti(i)}
                  style={{
                    width: activeTesti === i ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor: activeTesti === i ? 'var(--rr-color-theme-primary)' : 'rgba(255,255,255,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="faq-section pb-130 pt-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="section-heading mb-0">
                <h4 className="sub-heading after-none" data-text-animation="fade-in">Ready To Build Something Iconic?</h4>
                <h2 className="section-title" data-text-animation data-split="word">Let's Create Your Next Big Digital Triumph</h2>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <Link to="/about" className="rr-primary-btn" style={{ padding: '16px 36px', fontSize: '16px' }}>
                Contact Our Team <i className="fa-regular fa-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
