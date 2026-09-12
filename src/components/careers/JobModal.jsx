import React, { useState, useEffect } from 'react';

export default function JobModal({ job, onClose }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [portfolio, setPortfolio] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(2, 5, 10, 0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#0d121e',
          border: '1px solid #232c40',
          borderRadius: '16px',
          maxWidth: '650px',
          width: '100%',
          padding: '40px 32px',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close Job Modal"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '22px',
            cursor: 'pointer'
          }}
        >
          <i className="fa-sharp fa-regular fa-xmark"></i>
        </button>

        {isSubmitted ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: '48px', color: '#00E599', marginBottom: '16px' }}>
              <i className="fa-regular fa-circle-check"></i>
            </div>
            <h3 style={{ color: '#fff', fontSize: '26px', marginBottom: '12px' }}>Application Received!</h3>
            <p style={{ color: '#A0A5B5', fontSize: '16px', lineHeight: '1.6' }}>
              Thank you, <strong>{fullName}</strong>. Our recruiting team will review your application for the <strong>{job.title}</strong> role and be in touch within 48 hours.
            </p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ backgroundColor: 'var(--cc-primary-light)', color: 'var(--cc-primary)', fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', textTransform: 'uppercase' }}>
                {job.department}
              </span>
              <h2 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', marginTop: '10px', marginBottom: '6px' }}>
                Apply for {job.title}
              </h2>
              <p style={{ color: '#8E95A5', fontSize: '14px', margin: 0 }}>
                {job.location} · {job.type} · <span style={{ color: '#00E599' }}>{job.salary}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#CBD1DE', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#131928',
                    border: '1px solid #28334a',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '15px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#CBD1DE', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#131928',
                    border: '1px solid #28334a',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '15px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#CBD1DE', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Portfolio / GitHub / LinkedIn URL *
                </label>
                <input
                  type="url"
                  required
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="https://linkedin.com/in/alex"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#131928',
                    border: '1px solid #28334a',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '15px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '25px' }}>
                <label style={{ display: 'block', color: '#CBD1DE', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                  Why CyberCreative? (Brief note)
                </label>
                <textarea
                  rows="3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what drives your work and why this position excites you..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#131928',
                    border: '1px solid #28334a',
                    borderRadius: '8px',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '15px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                className="rr-primary-btn"
                style={{ width: '100%', padding: '14px', fontSize: '15px' }}
              >
                Submit Application <i className="fa-sharp fa-regular fa-paper-plane"></i>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
