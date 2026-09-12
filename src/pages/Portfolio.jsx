import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import ProjectModal from '../components/portfolio/ProjectModal';

const PORTFOLIO_ITEMS = [
  {
    num: '01',
    title: 'Medical Application Design',
    category: 'UI/UX Design',
    image: '/assets/img/images/cs-img-1.png',
    client: 'HealthTech Global',
    description: 'A comprehensive medical dashboard and tele-consultation platform built for certified practitioners and clinical trials.',
    timeline: '10 Weeks',
    metric: '+210% Consult Efficiency',
    stack: 'React 19, TypeScript, WebRTC'
  },
  {
    num: '02',
    title: 'Dashboard App Design',
    category: 'Application Design',
    image: '/assets/img/images/cs-img-2.png',
    client: 'Apex Analytics',
    description: 'Enterprise data visualization suite rendering real-time streaming financial metrics across international markets.',
    timeline: '8 Weeks',
    metric: 'Sub-second Data Feeds',
    stack: 'React, Tailwind, Highcharts'
  },
  {
    num: '03',
    title: 'Business Task Management',
    category: 'Productivity SaaS',
    image: '/assets/img/images/cs-img-3.png',
    client: 'Syncro Workspaces',
    description: 'Collaborative task planner with drag-and-drop Kanban boards, team velocity telemetry, and seamless Slack integrations.',
    timeline: '6 Weeks',
    metric: '4.9/5 App Store Rating',
    stack: 'React, Node, GraphQL'
  },
  {
    num: '04',
    title: 'NFT Landing Page Design',
    category: 'Web3 & Motion',
    image: '/assets/img/images/cs-img-4.png',
    client: 'Ethereal Studios',
    description: 'High-aesthetic digital boutique with WebGL 3D asset displays, smart contract integration, and editorial layouts.',
    timeline: '5 Weeks',
    metric: '$3.8M Mint Volume',
    stack: 'Three.js, WebGL, React'
  },
  {
    num: '05',
    title: 'Universe Landing Page Design',
    category: 'Creative Technology',
    image: '/assets/img/images/cs-img-5.png',
    client: 'Cosmos AI Labs',
    description: 'Cinematic scrollytelling universe showcasing artificial intelligence foundational models and interactive neural pathways.',
    timeline: '7 Weeks',
    metric: 'Awwwards Site of the Day',
    stack: 'React, GSAP, WebGL'
  },
  {
    num: '06',
    title: 'Payment App Design',
    category: 'Fintech Mobile',
    image: '/assets/img/images/cs-img-6.png',
    client: 'NovaPay Checkout',
    description: 'Modern cross-border checkout experience with biometric authentication, dynamic multi-currency converter, and zero-fee transfers.',
    timeline: '9 Weeks',
    metric: '+48% Conversion Lift',
    stack: 'React Native, Node.js'
  }
];

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="portfolio-page">
      {/* 1. PAGE HEADER (Matches project.html) */}
      <PageHeader
        title="Portfolio Grid"
        breadcrumb={[{ label: 'Portfolio' }]}
      />

      {/* 2. CASE STUDY SECTION (Exact template markup and classes) */}
      <section className="case-study pt-130 pb-130 fade-wrapper">
        <div className="container">
          {/* Optional Filter Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '60px' }}>
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'design', label: 'UI/UX Design' },
              { id: 'application', label: 'App Design' },
              { id: 'creative', label: 'Creative Tech' },
              { id: 'fintech', label: 'Fintech' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '30px',
                  backgroundColor: activeFilter === tab.id ? 'var(--rr-color-theme-primary)' : 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  border: '1px solid',
                  borderColor: activeFilter === tab.id ? 'var(--rr-color-theme-primary)' : 'rgba(255,255,255,0.12)',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="row gy-4">
            {filteredItems.map((item) => (
              <div className="col-md-6" key={item.num}>
                <div 
                  className="cs-item fade-top"
                  onClick={() => setSelectedProject(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="cs-thumb">
                    <img src={item.image} alt={item.title} className="portfolio-thumb-img" />
                    <button 
                      className="cs-btn" 
                      aria-label={`View ${item.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(item);
                      }}
                      style={{ border: 'none', background: 'transparent' }}
                    >
                      <i className="fa-light fa-arrow-right-long"></i>
                    </button>
                  </div>
                  <div className="cs-content">
                    <span className="number">{item.num}</span>
                    <h3 className="title">
                      <a 
                        href="#detail" 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedProject(item);
                        }}
                      >
                        {item.title}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
