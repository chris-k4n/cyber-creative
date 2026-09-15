import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import WebGLProjectSlider from '../components/portfolio/WebGLProjectSlider';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';

export default function Portfolio() {
  return (
    <div className="portfolio-page">
      {/* 1. PAGE HEADER */}
      <PageHeader
        title="Our Portfolio"
        breadcrumb={[{ label: 'Portfolio' }]}
      />

      {/* 2. WEBGL 3D INTERACTIVE GALLERY */}
      <WebGLProjectSlider projects={PORTFOLIO_PROJECTS} />
    </div>
  );
}
