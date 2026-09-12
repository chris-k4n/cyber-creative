import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CyberCreativeLogo from '../common/CyberCreativeLogo';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() !== '') {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="footer-section bg-dark-1" style={{ backgroundColor: '#070a10', borderTop: '1px solid #1a1f2c', paddingTop: '80px', paddingBottom: '30px' }}>
      <div className="container">
        <div className="footer-top-wrap pb-60" style={{ borderBottom: '1px solid #171c26', paddingBottom: '50px', marginBottom: '40px' }}>
          <div className="row gy-4 align-items-center">
            <div className="col-lg-6">
              <h2 style={{ color: '#fff', fontSize: '36px', fontWeight: '800', lineHeight: '1.2' }}>
                Let’s Build Something <br />
                <span style={{ color: 'var(--cc-primary)' }}>Extraordinary</span> Together.
              </h2>
            </div>
            <div className="col-lg-6">
              <form onSubmit={handleSubscribe} style={{ position: 'relative', maxWidth: '480px', marginLeft: 'auto' }}>
                <input
                  type="email"
                  placeholder="Enter your business email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '16px 140px 16px 20px',
                    backgroundColor: '#11151C',
                    border: '1px solid #2D343E',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '15px'
                  }}
                />
                <button
                  type="submit"
                  className="rr-primary-btn"
                  style={{
                    position: 'absolute',
                    right: '6px',
                    top: '6px',
                    bottom: '6px',
                    padding: '0 20px',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  Subscribe
                </button>
                {subscribed && (
                  <p style={{ color: '#00E599', fontSize: '13px', marginTop: '8px', position: 'absolute' }}>
                    Thank you! You have subscribed to CyberCreative insights.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <div className="row gy-5">
          {/* Col 1: About Brand */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-widget">
              <div className="footer-logo mb-25">
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <CyberCreativeLogo height={38} />
                </Link>
              </div>
              <p style={{ color: '#8F94A2', fontSize: '15px', lineHeight: '1.7', marginBottom: '25px', maxWidth: '340px' }}>
                Award-winning digital agency crafting futuristic software, intuitive user experiences, and category-defining brand identities worldwide.
              </p>
              <ul className="social-list" style={{ display: 'flex', gap: '10px', listStyle: 'none', padding: 0, margin: 0 }}>
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#131822', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#131822', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                    <i className="fab fa-x-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#131822', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#131822', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none' }}>
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="col-lg-2 col-md-6">
            <div className="footer-widget">
              <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '22px' }}>Explore</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About Agency', path: '/about' },
                  { label: 'Our Portfolio', path: '/portfolio' },
                  { label: 'Services', path: '/services' },
                  { label: 'Our Clients', path: '/clients' },
                  { label: 'Careers', path: '/careers' },
                ].map((item, idx) => (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <Link to={item.path} style={{ color: '#8F94A2', textDecoration: 'none', fontSize: '15px', transition: 'color 0.2s ease' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '22px' }}>Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'Web Design & UI/UX',
                  'Next.js & React Apps',
                  'Enterprise Software',
                  'Brand Strategy & Identity',
                  'Motion Graphics & 3D',
                  'Cloud Architecture',
                ].map((service, idx) => (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <Link to="/services" style={{ color: '#8F94A2', textDecoration: 'none', fontSize: '15px' }}>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-widget">
              <h4 style={{ color: '#fff', fontSize: '18px', fontWeight: '700', marginBottom: '22px' }}>San Francisco HQ</h4>
              <p style={{ color: '#8F94A2', fontSize: '15px', lineHeight: '1.6', marginBottom: '15px' }}>
                742 Evergreen Terrace, Suite 400<br />
                Financial & Tech District, CA 94105
              </p>
              <p style={{ color: '#8F94A2', fontSize: '15px', marginBottom: '8px' }}>
                <strong>Phone:</strong> <a href="tel:+14155552671" style={{ color: 'var(--cc-primary)', textDecoration: 'none' }}>+1 (415) 555-2671</a>
              </p>
              <p style={{ color: '#8F94A2', fontSize: '15px', margin: 0 }}>
                <strong>Email:</strong> <a href="mailto:hello@cybercreative.agency" style={{ color: 'var(--cc-primary)', textDecoration: 'none' }}>hello@cybercreative.agency</a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom" style={{ borderTop: '1px solid #171c26', marginTop: '60px', paddingTop: '25px' }}>
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p style={{ color: '#666C7B', fontSize: '14px', margin: 0 }}>
                © {new Date().getFullYear()} CyberCreative Agency. All rights reserved. Converted with precision.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'inline-flex', gap: '20px' }}>
                <li><Link to="/about" style={{ color: '#666C7B', fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</Link></li>
                <li><Link to="/about" style={{ color: '#666C7B', fontSize: '14px', textDecoration: 'none' }}>Terms of Service</Link></li>
                <li><Link to="/careers" style={{ color: '#666C7B', fontSize: '14px', textDecoration: 'none' }}>Careers Hub</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
