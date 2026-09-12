import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchModal from './SearchModal';
import SidebarDrawer from './SidebarDrawer';
import MobileMenu from './MobileMenu';
import CyberCreativeLogo from '../common/CyberCreativeLogo';

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Clients', path: '/clients' },
    { label: 'Careers', path: '/careers' },
  ];

  return (
    <>
      <header className={`header sticky-active ${isSticky ? 'fixed' : ''}`} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        transition: 'background-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: isSticky ? 'rgba(2, 5, 10, 0.92)' : 'transparent',
        backdropFilter: isSticky ? 'blur(12px)' : 'none',
        boxShadow: isSticky ? '0 10px 30px rgba(0,0,0,0.3)' : 'none',
      }}>
        <div className="primary-header">
          <div className="primary-header-inner" style={{ padding: isSticky ? '14px 40px' : '22px 40px' }}>
            <div className="header-logo d-flex align-items-center">
              <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <CyberCreativeLogo height={40} />
              </Link>
            </div>

            <div className="header-right-wrap d-flex align-items-center justify-content-end" style={{ gap: '30px' }}>
              {/* Desktop Navigation Links */}
              <div className="header-menu-wrap d-none d-lg-block">
                <ul className="d-flex align-items-center" style={{ listStyle: 'none', gap: '28px', margin: 0, padding: 0 }}>
                  {navLinks.map((item, idx) => (
                    <li key={idx} style={{ position: 'relative' }}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => (isActive ? 'active-header-link' : '')}
                        style={({ isActive }) => ({
                          fontSize: '15px',
                          fontWeight: '600',
                          color: isActive ? 'var(--cc-primary)' : 'inherit',
                          textDecoration: 'none',
                          padding: '6px 0',
                          position: 'relative',
                          transition: 'color 0.2s ease',
                        })}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Icons */}
              <div className="header-right d-flex align-items-center" style={{ gap: '18px' }}>
                {/* Search Button */}
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search site"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    fontSize: '17px',
                    cursor: 'pointer',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Search"
                >
                  <i className="fa-regular fa-magnifying-glass"></i>
                </button>

                {/* Sidebar Offcanvas Trigger */}
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  aria-label="Open sidebar"
                  className="sidebar-trigger open"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Agency Info"
                >
                  <svg width="22" height="22" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.300781 0H5.30078V5H0.300781V0Z" fill="currentColor"/>
                    <path d="M0.300781 9H5.30078V14H0.300781V9Z" fill="currentColor"/>
                    <path d="M0.300781 18H5.30078V23H0.300781V18Z" fill="currentColor"/>
                    <path d="M9.30078 0H14.3008V5H9.30078V0Z" fill="currentColor"/>
                    <path d="M9.30078 9H14.3008V14H9.30078V9Z" fill="currentColor"/>
                    <path d="M9.30078 18H14.3008V23H9.30078V18Z" fill="currentColor"/>
                    <path d="M18.3008 0H23.3008V5H18.3008V0Z" fill="currentColor"/>
                    <path d="M18.3008 9H23.3008V14H18.3008V9Z" fill="currentColor"/>
                    <path d="M18.3008 18H23.3008V23H18.3008V18Z" fill="currentColor"/>
                  </svg>
                </button>

                {/* Mobile Menu Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Toggle mobile menu"
                  className="d-lg-none"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    fontSize: '22px',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <i className="fa-solid fa-bars"></i>
                </button>

                {/* CTA button (desktop) */}
                <Link
                  to="/careers"
                  className="rr-primary-btn d-none d-xl-inline-flex"
                  style={{ padding: '10px 22px', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                >
                  We're Hiring <i className="fa-sharp fa-regular fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <SidebarDrawer isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
