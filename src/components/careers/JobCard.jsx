import React from 'react';

export default function JobCard({ job, onApply }) {
  return (
    <div 
      className="job-card fade-top"
      data-cursor-text="Apply"
      style={{
        backgroundColor: '#0c101a',
        border: '1px solid #1a2233',
        borderRadius: '16px',
        padding: '30px 28px',
        marginBottom: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
      }}
    >
      <div style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ backgroundColor: 'var(--cc-primary-light)', color: 'var(--cc-primary)', fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '15px' }}>
            {job.department}
          </span>
          <span style={{ color: '#00E599', fontSize: '13px', fontWeight: '600' }}>
            {job.salary}
          </span>
        </div>
        <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: '800', margin: '0 0 10px' }}>
          {job.title}
        </h3>
        <p style={{ color: '#9097A6', fontSize: '14px', lineHeight: '1.6', margin: '0 0 14px' }}>
          {job.description}
        </p>
        <div style={{ display: 'flex', gap: '16px', color: '#6A7282', fontSize: '13px', flexWrap: 'wrap' }}>
          <span><i className="fa-regular fa-location-dot" style={{ color: 'var(--cc-primary)', marginRight: '6px' }}></i>{job.location}</span>
          <span><i className="fa-regular fa-clock" style={{ color: 'var(--cc-primary)', marginRight: '6px' }}></i>{job.type}</span>
          <span><i className="fa-regular fa-briefcase" style={{ color: 'var(--cc-primary)', marginRight: '6px' }}></i>{job.experience}</span>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => onApply(job)}
          className="rr-primary-btn"
          style={{ padding: '12px 28px', fontSize: '14px' }}
        >
          Apply Now <i className="fa-sharp fa-regular fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}
