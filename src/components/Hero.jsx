import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Mail,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Code2,
  Terminal,
  Download
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ portraitMode, setPortraitMode }) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);
  const [currentSlide, setCurrentSlide] = useState(1);

  // 3D Parallax tilt ref for hero portrait
  const portraitCardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Rotating typing effect
  useEffect(() => {
    const fullText = personalInfo.titles[currentTitleIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === fullText.length) {
          // Pause at full word
          setTimeout(() => setIsDeleting(true), 1800);
          setTypingSpeed(50);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % personalInfo.titles.length);
          setTypingSpeed(110);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTitleIndex, typingSpeed]);

  // Mouse move 3D tilt handler
  const handleMouseMove = (e) => {
    if (!portraitCardRef.current) return;
    const rect = portraitCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rx = -(y / (rect.height / 2)) * 8;
    const ry = (x / (rect.width / 2)) * 8;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const slidesData = [
    {
      title: "Software Developer",
      tagline: "COMPUTER SCIENCE & ENGINEERING",
      highlight: "Passionate about building scalable applications, intelligent systems, and modern web experiences."
    },
    {
      title: "MERN Stack Developer",
      tagline: "FULL STACK WEB ARCHITECTURE",
      highlight: "Hands-on experience in MongoDB, Express.js, React.js, and Node.js with scalable REST APIs."
    },
    {
      title: "Problem Solver & AI Builder",
      tagline: "INTELLIGENT SYSTEMS & OCR",
      highlight: "Engineered AI-powered inventory extraction using Gemini AI and Python predictive forecasting."
    }
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => {
      const next = (prev % 3) + 1;
      setCurrentTitleIndex((next - 1) % personalInfo.titles.length);
      return next;
    });
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => {
      const next = prev === 1 ? 3 : prev - 1;
      setCurrentTitleIndex((next - 1) % personalInfo.titles.length);
      return next;
    });
  };

  const portraitSrc =
    portraitMode === 'cinematic'
      ? '/assets/rubinraj_cinematic.png'
      : '/assets/rubinraj_portrait_nobg.png';

  return (
    <section className="hero-section" id="hero" onMouseMove={handleMouseMove}>
      {/* Decorative dot matrix on the far left, exact reference style */}
      <div className="hero-dot-matrix" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="dot-ring" />
        ))}
      </div>

      <div className="hero-container">
        {/* Left / Center Content */}
        <div className="hero-content">
          {/* Social Links Row in Electric Blue (inspired by reference header) */}
          <div className="hero-socials-row">
            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="social-icon-btn"
              title="Send Email"
              aria-label="Email"
              data-cursor-text="EMAIL"
            >
              <Mail size={18} />
            </a>
            <a
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="LinkedIn Profile"
              aria-label="LinkedIn"
              data-cursor-text="LINKEDIN"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={personalInfo.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="GitHub Profile"
              aria-label="GitHub"
              data-cursor-text="GITHUB"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personalInfo.resumeUrl}
              download="Rubinraj_K_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn hero-resume-icon-btn"
              title="Download Resume (PDF)"
              aria-label="Download Resume"
              data-cursor-text="RESUME"
            >
              <Download size={18} />
            </a>
          </div>

          {/* Small Professional Label */}
          <div className="hero-label-badge">
            <span className="badge-pulse-indicator" />
            <span className="badge-text">{slidesData[currentSlide - 1].tagline}</span>
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            Hi, I'm <span className="hero-name-accent">Rubinraj</span>
          </h1>

          {/* Rotating Text Heading */}
          <div className="hero-typewriter-wrapper">
            <span className="typewriter-prefix">I am a </span>
            <span className="typewriter-text">{displayedText}</span>
            <span className="typewriter-cursor">|</span>
          </div>

          {/* Short Introduction */}
          <p className="hero-description">{slidesData[currentSlide - 1].highlight}</p>

          {/* Three CTA Buttons */}
          <div className="hero-actions-row">
            <a
              href="#projects"
              className="btn-primary hero-btn"
              data-cursor-text="WORK"
            >
              <span>VIEW MY WORK</span>
              <ArrowRight size={17} />
            </a>

            <a
              href={personalInfo.resumeUrl}
              download="Rubinraj_K_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline hero-btn hero-resume-action"
              data-cursor-text="RESUME"
              title="Download Rubinraj's Resume"
            >
              <Download size={16} />
              <span>DOWNLOAD RESUME</span>
            </a>

            <a
              href="#contact"
              className="btn-secondary hero-btn"
              data-cursor-text="CONNECT"
            >
              <span>LET'S CONNECT</span>
            </a>
          </div>

          {/* Bottom slide pagination indicator inspired by reference design */}
          <div className="hero-slide-nav">
            <button
              onClick={handlePrevSlide}
              className="slide-arrow-btn"
              aria-label="Previous Slide"
              data-cursor-text="PREV"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="slide-counter">
              0{currentSlide} <span className="counter-sep">/</span> 03
            </span>
            <button
              onClick={handleNextSlide}
              className="slide-arrow-btn"
              aria-label="Next Slide"
              data-cursor-text="NEXT"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Right Side: Professional Portrait Integration with 3D Depth */}
        <div
          className="hero-portrait-col"
          ref={portraitCardRef}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
          }}
        >
          <div className="portrait-composition">
            {/* Soft electric blue rim glow & backdrop aura */}
            <div className="portrait-backdrop-aura" />
            <div className="portrait-geometric-frame" />

            {/* Rubinraj's Real Photo */}
            <div className="portrait-img-wrapper">
              <img
                src={portraitSrc}
                alt="Rubinraj K - Computer Science and Engineering Undergraduate & Software Developer"
                className={`hero-portrait-image ${portraitMode}`}
                loading="eager"
              />
              <div className="portrait-bottom-gradient-fade" />
            </div>

            {/* Floating Glass Badge 1: Education & CGPA */}
            <div className="floating-badge badge-top-left">
              <div className="badge-icon-wrap blue">
                <Code2 size={16} />
              </div>
              <div>
                <div className="badge-title">B.E. CSE • 2027</div>
                <div className="badge-sub">CGPA: 7.8 / 10</div>
              </div>
            </div>

            {/* Floating Glass Badge 2: MERN & AI Systems */}
            <div className="floating-badge badge-bottom-right">
              <div className="badge-icon-wrap cyan">
                <Terminal size={16} />
              </div>
              <div>
                <div className="badge-title">MERN & AI Systems</div>
                <div className="badge-sub">Full Stack Engineering</div>
              </div>
            </div>

            {/* Photo mode indicator button */}
            <button
              onClick={() =>
                setPortraitMode((prev) =>
                  prev === 'cinematic' ? 'studio' : 'cinematic'
                )
              }
              className="portrait-style-pill"
              title="Click to toggle portrait filter"
            >
              <Sparkles size={13} />
              <span>{portraitMode === 'cinematic' ? 'Cinematic B&W' : 'Studio Color'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
