import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Image } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ portraitMode, setPortraitMode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect current section in viewport
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'certifications', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}
        id="main-navbar"
      >
        <div className="navbar-container">
          {/* Logo inspired by reference image */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e, '#hero')}
            className="navbar-brand"
            data-cursor-text="HOME"
          >
            <span className="brand-name">RUBINRAJ</span>
            <span className="brand-dot" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="navbar-links" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  data-cursor-text={link.name.toUpperCase()}
                >
                  {link.name}
                  {isActive && <span className="active-pill" />}
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="navbar-actions">
            {/* Download Resume Button on Top Header */}
            <a
              href={personalInfo.resumeUrl}
              download="Rubinraj_K_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-resume-btn"
              title="Download Rubinraj's Resume (PDF)"
              aria-label="Download Resume"
              data-cursor-text="RESUME"
            >
              <Download size={14} />
              <span>Resume</span>
            </a>

            {/* Quick Portrait Filter Toggle */}
            <button
              onClick={() => setPortraitMode(prev => prev === 'studio' ? 'cinematic' : 'studio')}
              className="portrait-toggle-btn"
              title="Toggle Portrait Style (Studio Color / Cinematic B&W)"
              aria-label="Toggle Portrait Style"
            >
              <Image size={15} />
              <span className="toggle-label">{portraitMode === 'studio' ? 'Studio Color' : 'Cinematic'}</span>
            </button>

            {/* Connect Button */}
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="navbar-cta-btn"
              data-cursor-text="HIRE"
            >
              <span>Connect</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <div className="mobile-brand-row">
            <span className="brand-name">RUBINRAJ</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="close-drawer-btn"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-links-list">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="mobile-active-tag">Current</span>}
                </a>
              );
            })}
          </div>

          <div className="mobile-drawer-footer">
            <a
              href={personalInfo.resumeUrl}
              download="Rubinraj_K_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mobile-resume-btn"
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Download size={16} />
              <span>Download Resume (PDF)</span>
            </a>

            <button
              onClick={() => {
                setPortraitMode(prev => prev === 'studio' ? 'cinematic' : 'studio');
                setMobileMenuOpen(false);
              }}
              className="mobile-toggle-style-btn"
            >
              <Image size={16} />
              <span>Portrait Style: {portraitMode === 'studio' ? 'Studio Color' : 'Cinematic B&W'}</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              Let's Connect
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
