import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';

const ALL_SERVICES = [
  {
    tag: '/Designing',
    image: '/assets/img/service/service-2.jpg',
    title: 'UI/UX & Product Design',
    desc: 'Intuitive, boundary-pushing interfaces that captivate users and elevate brand perception.'
  },
  {
    tag: '/Development',
    image: '/assets/img/service/service-1.jpg',
    title: 'Full-Stack Web Development',
    desc: 'Scalable frontend and backend architectures engineered for blazing performance and accessibility.'
  },
  {
    tag: '/User Experience',
    image: '/assets/img/service/service-3.jpg',
    title: 'User Research & Wireframing',
    desc: 'Data-informed user journey mapping, information architecture, and rigorous usability testing.'
  },
  {
    tag: '/Mobile Solution',
    image: '/assets/img/service/service-4.jpg',
    title: 'Cross-Platform Mobile Apps',
    desc: 'High-fidelity mobile applications with native feel and buttery 60fps animations on iOS & Android.'
  },
  {
    tag: '/Branding',
    image: '/assets/img/service/service-8.jpg',
    title: 'Brand Identity & Guidelines',
    desc: 'Crafting unforgettable visual universes with distinct voice, typography, and logo systems.'
  },
  {
    tag: '/Content Writing',
    image: '/assets/img/service/service-7.jpg',
    title: 'Strategic Editorial & Copy',
    desc: 'High-conversion narrative copywriting tailored for product marketing, campaigns, and investor pitches.'
  },
  {
    tag: '/Illustration',
    image: '/assets/img/service/service-6.jpg',
    title: '3D Art & Custom Iconography',
    desc: 'Cinematic 3D product renders, custom isometric artwork, and vector iconography suites.'
  },
  {
    tag: '/Marketing',
    image: '/assets/img/service/service-5.jpg',
    title: 'Digital Marketing & Growth',
    desc: 'Data-driven performance campaigns, SEO optimization, and holistic multi-channel funnels.'
  }
];

export default function Services() {
  const [activeFaq, setActiveFaq] = useState('q1');

  return (
    <div className="services-page">
      {/* 1. PAGE HEADER (Matches service.html) */}
      <PageHeader
        title="Our Services"
        breadcrumb={[{ label: 'Our Services' }]}
      />

      {/* 2. SERVICES SECTION (Matches service.html) */}
      <section className="service-section pt-130 pb-130 fade-wrapper">
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              What We Offer For You
            </h4>
            <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
              Services We Provide
            </h2>
          </div>
          <div className="row gy-5">
            {ALL_SERVICES.map((srv, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="service-item fade-top">
                  <h4 className="service-text">
                    <Link to="/services">{srv.tag}</Link>
                  </h4>
                  <div className="service-thumb">
                    <div className="overlay-color"></div>
                    <div className="transparent-shape">
                      <img src="/assets/img/shapes/service-shape.png" alt="shape" />
                    </div>
                    <img src={srv.image} alt={srv.title} />
                    <Link to="/about" className="service-btn">
                      Read Details <i className="fa-regular fa-arrow-right"></i>
                    </Link>
                  </div>
                  <div style={{ marginTop: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                      {srv.title}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#9CA2B0', lineHeight: '1.6', margin: 0 }}>
                      {srv.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WORK PROCESS (Matches service.html) */}
      <section className="process-section pb-130 fade-wrapper">
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              Work Process
            </h4>
            <h2 className="section-title overflow-hidden" data-text-animation data-split="word" data-duration="1">
              Follow 4 Easy Work Steps
            </h2>
          </div>
          <div className="row gy-lg-0 gy-5">
            <div className="col-lg-3 col-md-6">
              <div className="process-item fade-top">
                <div className="process-icon">
                  <div className="icon-border"></div>
                  <img className="dark-img" src="/assets/img/icon/process-1.png" alt="icon" />
                  <img className="light-img" src="/assets/img/icon/process-1-light.png" alt="icon" />
                </div>
                <div className="process-content">
                  <h3 className="title">Project Processing</h3>
                  <p>Cursus euismod dictumst a non dis nisi sociosqu mauris.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="process-item fade-top">
                <div className="process-icon">
                  <div className="icon-border"></div>
                  <img className="dark-img" src="/assets/img/icon/process-2.png" alt="icon" />
                  <img className="light-img" src="/assets/img/icon/process-2-light.png" alt="icon" />
                </div>
                <div className="process-content">
                  <h3 className="title">High Quality Products</h3>
                  <p>Cursus euismod dictumst a non dis nisi sociosqu mauris.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="process-item fade-top">
                <div className="process-icon">
                  <div className="icon-border"></div>
                  <img className="dark-img" src="/assets/img/icon/process-3.png" alt="icon" />
                  <img className="light-img" src="/assets/img/icon/process-3-light.png" alt="icon" />
                </div>
                <div className="process-content">
                  <h3 className="title">Huge Choice Products</h3>
                  <p>Cursus euismod dictumst a non dis nisi sociosqu mauris.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="process-item fade-top">
                <div className="process-icon">
                  <div className="icon-border"></div>
                  <img className="dark-img" src="/assets/img/icon/process-4.png" alt="icon" />
                  <img className="light-img" src="/assets/img/icon/process-4-light.png" alt="icon" />
                </div>
                <div className="process-content">
                  <h3 className="title">Quality Finished</h3>
                  <p>Cursus euismod dictumst a non dis nisi sociosqu mauris.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ / CTA SECTION */}
      <section className="faq-section pb-130">
        <div className="container">
          <div className="row gy-lg-0 gy-4 align-items-center">
            <div className="col-xl-6 col-lg-12">
              <div className="faq-content">
                <div className="section-heading">
                  <h4 className="sub-heading after-none" data-text-animation="fade-in" data-duration="1.5">
                    Frequently Asked Questions
                  </h4>
                  <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                    Everything You Need To Know Before Starting
                  </h2>
                </div>
                <div className="accordion fade-wrapper">
                  <div className="accordion-item fade-top">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${activeFaq === 'q1' ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === 'q1' ? '' : 'q1')}
                      >
                        How do we kick off a new engagement?
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${activeFaq === 'q1' ? 'show' : ''}`}>
                      <div className="accordion-body">
                        We begin with an intensive discovery workshop to define technical requirements, architectural benchmarks, user journeys, and project milestones.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item fade-top">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${activeFaq === 'q2' ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === 'q2' ? '' : 'q2')}
                      >
                        What is your typical project turnaround?
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${activeFaq === 'q2' ? 'show' : ''}`}>
                      <div className="accordion-body">
                        Brand sprints and landing sites take 3–4 weeks. Comprehensive web applications, multi-page platforms, and design systems typically require 6–12 weeks.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item fade-top">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${activeFaq === 'q3' ? '' : 'collapsed'}`}
                        type="button"
                        onClick={() => setActiveFaq(activeFaq === 'q3' ? '' : 'q3')}
                      >
                        Do you offer post-launch technical support?
                      </button>
                    </h2>
                    <div className={`accordion-collapse collapse ${activeFaq === 'q3' ? 'show' : ''}`}>
                      <div className="accordion-body">
                        Yes, we offer ongoing maintenance, performance monitoring, infrastructure scaling, and design iterations as an embedded team.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="faq-img reveal text-center">
                <img src="/assets/img/images/faq-img.png" alt="faq" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
