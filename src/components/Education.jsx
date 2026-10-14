import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Education() {
  const { education } = personalInfo;

  return (
    <section className="section" id="education">
      <div className="section-header">
        <div className="section-tag">
          <span className="section-tag-dot" />
          <span>Academic Background</span>
        </div>
        <h2 className="section-title">
          Formal <span className="accent-text">Education</span>
        </h2>
        <p className="section-subtitle">
          Undergraduate studies focusing on computer science principles, system architecture, and algorithmic design.
        </p>
      </div>

      <div className="education-card-wrapper">
        <div className="education-card glass-card interactive-card" data-cursor-text="EDU">
          <div className="education-card-inner">
            <div className="education-main-info">
              <div className="edu-icon-shield">
                <GraduationCap size={32} />
              </div>

              <div className="edu-text-group">
                <div className="edu-period-pill">
                  <Calendar size={14} />
                  <span>{education.period}</span>
                </div>
                <h3 className="edu-institution">{education.institution}</h3>
                <div className="edu-degree">
                  {education.degree} in {education.department}
                </div>
                <div className="edu-location">
                  <MapPin size={14} />
                  <span>{education.location}</span>
                </div>
              </div>
            </div>

            {/* CGPA Badge Column */}
            <div className="edu-cgpa-scorebox">
              <span className="cgpa-caption">Cumulative GPA</span>
              <div className="cgpa-number">{education.cgpa}</div>
              <div className="cgpa-scale-label">Consistent Academic Standing</div>
            </div>
          </div>

          <div className="edu-highlights-row">
            <div className="edu-highlights-title">
              <BookOpen size={16} />
              <span>Core Academic Pillars</span>
            </div>
            <div className="edu-highlights-list">
              {education.highlights.map((item, idx) => (
                <div key={idx} className="edu-highlight-pill">
                  <CheckCircle2 size={14} className="text-blue" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="education-card-glow" />
        </div>
      </div>
    </section>
  );
}
