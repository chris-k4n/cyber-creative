import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import JobModal from '../components/careers/JobModal';
import { Link } from 'react-router-dom';

const OPEN_ROLES = [
  {
    id: 'role-1',
    title: 'Senior Frontend Engineer (React / Vite)',
    department: 'Engineering',
    location: 'Remote (Global)',
    type: 'Full-time',
    experience: '5+ Years',
    salary: '$140k – $175k + Equity',
    description: 'Lead the development of cutting-edge client web platforms, high-performance design systems, and micro-interactions using React 19 and GSAP.'
  },
  {
    id: 'role-2',
    title: 'Lead Product Designer (UI/UX)',
    department: 'Design',
    location: 'Remote / New York',
    type: 'Full-time',
    experience: '6+ Years',
    salary: '$145k – $180k + Equity',
    description: 'Direct the creation of iconic web applications, design systems, and interaction patterns for hyper-growth technology companies.'
  },
  {
    id: 'role-3',
    title: '3D Artist & Creative Technologist',
    department: 'Creative Tech',
    location: 'Remote (Global)',
    type: 'Full-time',
    experience: '4+ Years',
    salary: '$120k – $155k + Equity',
    description: 'Craft mesmerizing WebGL / Three.js interactive environments, 3D asset pipelines, and motion systems that define the future of the web.'
  },
  {
    id: 'role-4',
    title: 'Technical Delivery Manager',
    department: 'Operations',
    location: 'Remote (US / EU)',
    type: 'Full-time',
    experience: '5+ Years',
    salary: '$135k – $165k + Equity',
    description: 'Orchestrate client sprint roadmaps, technical discovery, scope definition, and cross-functional engineering deliverables with precision.'
  }
];

export default function Careers() {
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="careers-page">
      {/* 1. PAGE HEADER */}
      <PageHeader
        title="Join Our Team"
        breadcrumb={[{ label: 'Careers' }]}
      />

      {/* 2. CULTURE & ENVIRONMENT (With exact template reveal images and shapes) */}
      <section className="about-section-5 pt-130 pb-130">
        <div className="container">
          <div className="row gy-lg-0 gy-4 align-items-center">
            <div className="col-lg-6">
              <div className="about-content-5">
                <div className="section-heading">
                  <h4 className="sub-heading after-none" data-text-animation="fade-in" data-duration="1.5">
                    Our Culture
                  </h4>
                  <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                    Where Creative Freedom Meets Engineering Precision
                  </h2>
                </div>
                <p style={{ color: '#A0A5B5', fontSize: '17px', lineHeight: '1.7', marginBottom: '20px' }}>
                  We are an international collective of designers, creative technologists, and software architects who believe the web should be expressive, tactile, and uncompromisingly fast.
                </p>
                <p style={{ color: '#A0A5B5', fontSize: '17px', lineHeight: '1.7', marginBottom: '32px' }}>
                  We operate remote-first with flexible working hours, annual global offsites, comprehensive health coverage, and dedicated budgets for your personal research and hardware setup.
                </p>
                <div className="about-items">
                  <div className="about-item">
                    <div className="icon">
                      <img src="/assets/img/icon/about-1.png" alt="icon" />
                    </div>
                    <div className="content">
                      <h4 className="title">Autonomous & Remote First</h4>
                    </div>
                  </div>
                  <div className="about-item">
                    <div className="icon">
                      <img src="/assets/img/icon/about-2.png" alt="icon" />
                    </div>
                    <div className="content">
                      <h4 className="title">Generous Equity & Hardware Stipends</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-img-wrap-5">
                <div className="shapes">
                  <div className="shape shape-1">
                    <img src="/assets/img/shapes/about-shape-4.png" alt="shape" />
                  </div>
                  <div className="shape shape-2">
                    <img src="/assets/img/shapes/about-shape-5.png" alt="shape" />
                  </div>
                </div>
                <div className="about-img reveal">
                  <img className="img-1" src="/assets/img/images/about-img-8.png" alt="img" />
                </div>
                <div className="about-img-2 reveal">
                  <img className="img-2" src="/assets/img/images/about-img-9.png" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPEN POSITIONS (With fade-wrapper and fade-top) */}
      <section className="case-study pb-130 fade-wrapper">
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              Current Openings
            </h4>
            <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
              Explore Available Career Opportunities
            </h2>
          </div>
          <div className="row gy-4">
            {OPEN_ROLES.map((role) => (
              <div className="col-lg-6" key={role.id}>
                <div 
                  className="fade-top"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '32px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--rr-color-theme-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      {role.department} • {role.type}
                    </span>
                    <span style={{ fontSize: '14px', color: '#00E599', fontWeight: '600' }}>
                      {role.salary}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
                    {role.title}
                  </h3>
                  <p style={{ color: '#9CA2B0', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
                    {role.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <span style={{ fontSize: '14px', color: '#888F9E' }}>
                      <i className="fa-regular fa-location-dot" style={{ marginRight: '6px' }}></i>
                      {role.location}
                    </span>
                    <button
                      className="rr-primary-btn"
                      style={{ padding: '10px 22px', fontSize: '14px' }}
                      onClick={() => setSelectedRole(role)}
                    >
                      Apply Now <i className="fa-regular fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Application Modal */}
      {selectedRole && (
        <JobModal
          job={selectedRole}
          onClose={() => setSelectedRole(null)}
        />
      )}
    </div>
  );
}
