import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/layout/PageHeader';

export default function About() {
  const [activeTab, setActiveTab] = useState('mission');

  const teamMembers = [
    {
      name: 'Charlotte Amitina',
      role: 'Ui/Ux Designer',
      image: '/assets/img/team/team-1.png'
    },
    {
      name: 'William Edward',
      role: 'Project Manager',
      image: '/assets/img/team/team-2.png'
    },
    {
      name: 'Sophia Martinez',
      role: 'Full Stack Engineer',
      image: '/assets/img/team/team-3.png'
    },
    {
      name: 'Alexander Lee',
      role: 'Creative Art Director',
      image: '/assets/img/team/team-4.png'
    }
  ];

  return (
    <div className="about-page">
      {/* 1. PAGE HEADER (Matches about.html) */}
      <PageHeader
        title="About Our Company"
        breadcrumb={[{ label: 'About Us' }]}
      />

      {/* 2. ABOUT SECTION 2 (Matches about.html) */}
      <section className="about-section-2 pt-130 pb-130">
        <div className="container">
          <div className="row about-wrap-2 gy-lg-0 gy-4 align-items-center">
            <div className="col-lg-5 col-md-12">
              <div className="about-img-box">
                <div className="shapes">
                  <img className="shape shape-1" src="/assets/img/shapes/about-shape-1.png" alt="about" />
                  <img className="shape shape-2" src="/assets/img/shapes/about-shape-2.png" alt="about" />
                </div>
                <div className="img-1 reveal">
                  <img src="/assets/img/images/about-img-2.jpg" alt="about" />
                </div>
                <div className="img-2 reveal">
                  <img src="/assets/img/images/about-img-3.jpg" alt="about" />
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="about-content-2">
                <div className="section-heading">
                  <h4 className="sub-heading after-none" data-text-animation="fade-in" data-duration="1.5">
                    About Our Company
                  </h4>
                  <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                    We design and develop outstanding Digital Products and digital-first Brands.
                  </h2>
                  <p>
                    Platea vehicula rutrum curae magna taciti acut malesuada inceptos phasellus massa, eget ultrices tempor lacinia dictumst tincidunt leo mollis luctus varius gravida eleifend cursus litora consequat. We combine creative instinct with technical precision.
                  </p>
                </div>
                <div className="about-items">
                  <div className="about-item">
                    <div className="icon">
                      <img src="/assets/img/icon/about-1.png" alt="icon" />
                    </div>
                    <div className="content">
                      <h4 className="title">Professional Creative <br />Team Members</h4>
                    </div>
                  </div>
                  <div className="about-item">
                    <div className="icon">
                      <img src="/assets/img/icon/about-2.png" alt="icon" />
                    </div>
                    <div className="content">
                      <h4 className="title">Provide Market Standard <br />Service to Client’s</h4>
                    </div>
                  </div>
                </div>
                <Link to="/services" className="rr-primary-btn">
                  Get Started Now <i className="fa-sharp fa-regular fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORK PROCESS 2 (Matches about.html) */}
      <section className="process-section-2 fade-wrapper">
        <div className="container">
          <div className="section-heading text-center">
            <span className="bg-text">Studio</span>
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              Work Process
            </h4>
            <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
              Quality Service For Growth <br />Your Branding Identity
            </h2>
          </div>
          <div className="row gy-lg-0 gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="process-box fade-top">
                <span className="number">01</span>
                <h3 className="title">Client Consultation</h3>
                <p>Autem vel eum repreh enderit eui in ea velit esse quame nihil molestiae.</p>
                <Link to="/services" className="read-more">
                  Read More<i className="fa-sharp fa-regular fa-chevrons-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="process-box fade-top">
                <span className="number">02</span>
                <h3 className="title">Research and Analysis</h3>
                <p>Autem vel eum repreh enderit eui in ea velit esse quame nihil molestiae.</p>
                <Link to="/services" className="read-more">
                  Read More<i className="fa-sharp fa-regular fa-chevrons-right"></i>
                </Link>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="process-box fade-top">
                <span className="number">03</span>
                <h3 className="title">Project Revisions Launch</h3>
                <p>Autem vel eum repreh enderit eui in ea velit esse quame nihil molestiae.</p>
                <Link to="/services" className="read-more">
                  Read More<i className="fa-sharp fa-regular fa-chevrons-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COUNTER SECTION (Matches about.html) */}
      <section className="counter-section counter-2 pt-100 pb-100">
        <div className="container">
          <div className="row gy-lg-0 gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="counter-item">
                <h3 className="title"><span>10</span>+</h3>
                <p>Years of <br />Experience</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="counter-item">
                <h3 className="title"><span>18</span>k</h3>
                <p>Skilled <br />Performance</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="counter-item">
                <h3 className="title"><span>32</span></h3>
                <p>Visited <br />Conference</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="counter-item">
                <h3 className="title"><span>1</span>k+</h3>
                <p>Successful <br />Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RUNNING TICKER */}
      <div className="running-text running-3">
        <div className="carouselTicker carouselTicker-nav" data-speed="fast" style={{ overflow: 'hidden' }}>
          <ul className="text-anim carouselTicker__list" style={{ display: 'flex', width: 'max-content', animation: 'marqueeScroll 22s linear infinite' }}>
            <li>Latest Projects</li>
            <li className="stroke-text">Web Development</li>
            <li>Interactive Design</li>
            <li className="stroke-text">Creative Computing</li>
            <li>Brand Strategy</li>
            <li className="stroke-text">Digital Products</li>
            <li>Latest Projects</li>
            <li className="stroke-text">Web Development</li>
          </ul>
        </div>
      </div>

      {/* 6. ABOUT SECTION 5 (Interactive Mission/Vision/Goal Tabs with reveal images) */}
      <section className="about-section-5 pt-130 pb-130">
        <div className="container">
          <div className="row gy-lg-0 gy-4 align-items-center">
            <div className="col-lg-6">
              <div className="about-content-5">
                <div className="section-heading">
                  <h4 className="sub-heading after-none" data-text-animation="fade-in" data-duration="1.5">
                    About Company
                  </h4>
                  <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
                    Our Main Goal to Satisfy local & Global Clients
                  </h2>
                </div>
                <div className="about-tab">
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        className={`nav-link ${activeTab === 'mission' ? 'active' : ''}`}
                        type="button"
                        onClick={() => setActiveTab('mission')}
                      >
                        Our Mission
                      </button>
                      <button
                        className={`nav-link ${activeTab === 'vision' ? 'active' : ''}`}
                        type="button"
                        onClick={() => setActiveTab('vision')}
                      >
                        Our Vision
                      </button>
                      <button
                        className={`nav-link ${activeTab === 'goal' ? 'active' : ''}`}
                        type="button"
                        onClick={() => setActiveTab('goal')}
                      >
                        Our Goal
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent" style={{ marginTop: '24px' }}>
                    {activeTab === 'mission' && (
                      <div className="tab-pane fade show active">
                        <h3 className="title">Digital Web Design Agency</h3>
                        <p className="mb-20">
                          A web design agency is a multifaceted entity that plays a pivotal role in shaping the digital presence of businesses and individuals alike. These agencies are dynamic hubs of creativity, technical expertise, and strategic thinking.
                        </p>
                        <p className="mb-0">
                          At the core of a web design agency's essence lies the artistry of visual storytelling and user experience creation.
                        </p>
                      </div>
                    )}
                    {activeTab === 'vision' && (
                      <div className="tab-pane fade show active">
                        <h3 className="title">Architecting Next-Gen Web Frontiers</h3>
                        <p className="mb-20">
                          We envision an internet where speed, aesthetics, and user-empowerment intersect seamlessly. Our engineering frameworks are tailored for high-scale applications that push standard boundaries.
                        </p>
                        <p className="mb-0">
                          Every line of code and every keyframe is sculpted to forge memorable digital identity for forward-thinking enterprises.
                        </p>
                      </div>
                    )}
                    {activeTab === 'goal' && (
                      <div className="tab-pane fade show active">
                        <h3 className="title">Measurable Impact & Client Growth</h3>
                        <p className="mb-20">
                          Our paramount metric of success is client transformation. From enterprise SaaS platforms to modern e-commerce boutiques, we deliver products that accelerate adoption and maximize retention.
                        </p>
                        <p className="mb-0">
                          Enduring partnerships built upon clarity, technical honesty, and relentless design craftsmanship.
                        </p>
                      </div>
                    )}
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

      {/* 7. TEAM SECTION (Matches about.html) */}
      <section className="team-section fade-wrapper pt-100 pb-130">
        <div className="container">
          <div className="section-heading text-center">
            <h4 className="sub-heading" data-text-animation="fade-in" data-duration="1.5">
              Team Members
            </h4>
            <h2 className="section-title" data-text-animation data-split="word" data-duration="1">
              Our Expert Team Would Like <br />To Hear From You!
            </h2>
          </div>
          <div className="row gy-lg-0 gy-5">
            {teamMembers.map((member, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="team-item fade-top">
                  <div className="team-thumb">
                    <div className="gradient-color"></div>
                    <img src={member.image} alt={member.name} />
                    <ul className="team-social-2">
                      <li className="facebook"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      <li className="twitter"><a href="#"><i className="fab fa-twitter"></i></a></li>
                      <li className="instagram"><a href="#"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                  </div>
                  <div className="team-content">
                    <h3 className="title">{member.name}</h3>
                    <span>{member.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SPONSOR SECTION */}
      <section className="sponsor-section pb-130">
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
    </div>
  );
}
