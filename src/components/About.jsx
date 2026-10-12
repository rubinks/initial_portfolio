import React, { useState, useEffect, useRef } from 'react';
import {
  GraduationCap,
  Award,
  Briefcase,
  FolderGit2,
  Cpu,
  CheckCircle2,
  Terminal,
  UserCheck
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="section-header">
        <div className="section-tag">
          <span className="section-tag-dot" />
          <span>Profile & Highlights</span>
        </div>
        <h2 className="section-title">
          About <span className="accent-text">Me</span>
        </h2>
        <p className="section-subtitle">
          Driven by curiosity, scalable system architecture, and modern full-stack web applications.
        </p>
      </div>

      <div className="about-split-layout">
        {/* Left: Professional Story */}
        <div className="about-narrative-col glass-card">
          <div className="card-ambient-light" />
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <div className="terminal-title">developer_profile.sh</div>
            <div className="terminal-badge">BE CSE</div>
          </div>

          <div className="about-text-content">
            <h3 className="about-greeting">
              Architecting dependable solutions with modern web & intelligent workflows.
            </h3>

            <p className="about-paragraph">
              {personalInfo.careerObjective}
            </p>

            <div className="about-pillars">
              <div className="pillar-item">
                <CheckCircle2 size={18} className="pillar-icon" />
                <span>Undergraduate at <strong>Karpagam Academy of Higher Education</strong> (2023–2027)</span>
              </div>
              <div className="pillar-item">
                <CheckCircle2 size={18} className="pillar-icon" />
                <span>Hands-on in <strong>Java, C++, MERN Stack, MySQL & MongoDB</strong></span>
              </div>
              <div className="pillar-item">
                <CheckCircle2 size={18} className="pillar-icon" />
                <span>Proven project experience combining <strong>Full-Stack APIs & Gemini AI</strong></span>
              </div>
            </div>

            <div className="about-cta-footer">
              <a
                href="#experience"
                className="btn-outline"
                data-cursor-text="EXP"
              >
                <span>View Internship Journey</span>
              </a>
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="about-email-link"
                data-cursor-text="WRITE"
              >
                {personalInfo.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Right: Exact Statistics Cards with Entry Animation */}
        <div className="about-stats-grid">
          {personalInfo.stats.map((stat, idx) => {
            const icons = [
              <GraduationCap key="grad" size={24} className="stat-card-icon" />,
              <Award key="award" size={24} className="stat-card-icon" />,
              <Briefcase key="case" size={24} className="stat-card-icon" />,
              <FolderGit2 key="git" size={24} className="stat-card-icon" />
            ];

            return (
              <div
                key={stat.label}
                className={`stat-card glass-card interactive-card ${
                  hasAnimated ? 'animated-in' : ''
                }`}
                style={{ animationDelay: `${idx * 150}ms` }}
                data-cursor-text="STAT"
              >
                <div className="stat-card-top">
                  <div className="stat-icon-wrapper">
                    {icons[idx]}
                  </div>
                  <span className="stat-index">0{idx + 1}</span>
                </div>

                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-sub">{stat.sub}</div>

                <div className="stat-card-glow" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
