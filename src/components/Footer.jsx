import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="brand-name">RUBINRAJ</span>
            <span className="brand-dot" />
          </div>
          <p className="footer-tagline">
            Computer Science & Engineering • Scalable Systems • Full Stack Engineering
          </p>
        </div>

        <div className="footer-social-links">
          <a
            href={`mailto:${personalInfo.contact.email}`}
            className="footer-social-btn"
            title="Email"
            aria-label="Email"
            data-cursor-text="MAIL"
          >
            <Mail size={16} />
          </a>
          <a
            href={personalInfo.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            title="LinkedIn"
            aria-label="LinkedIn"
            data-cursor-text="LINKEDIN"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={personalInfo.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            title="GitHub"
            aria-label="GitHub"
            data-cursor-text="GITHUB"
          >
            <GithubIcon size={16} />
          </a>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copyright">
            © 2026 Rubinraj K. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
            aria-label="Back to top"
            data-cursor-text="TOP"
          >
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
