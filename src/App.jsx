import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import ThemeToggle from './components/common/ThemeToggle';
import MagicCursor from './components/common/MagicCursor';
import SmoothScrollManager from './components/common/SmoothScrollManager';
import PageTransition from './components/common/PageTransition';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Services from './pages/Services';
import Clients from './pages/Clients';
import Careers from './pages/Careers';

// Scroll to top on route change
function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.ScrollSmoother) {
      const smoother = window.ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTop(0);
      }
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* High-Performance Quick & Smooth Page Transition Engine */}
      <PageTransition />
      <ScrollToTopOnNavigate />
      <SmoothScrollManager />
      <MagicCursor />

      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Smooth Scroller Wrapper & Content for GSAP ScrollSmoother */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>

      {/* Floating Utilities */}
      <ScrollToTop />
      <ThemeToggle />
    </BrowserRouter>
  );
}
