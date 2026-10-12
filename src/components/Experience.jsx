import React from 'react';
import { Calendar, MapPin, Briefcase, ChevronRight, CheckCircle } from 'lucide-react';
import { experiences } from '../data/portfolioData';

export default function Experience() {
  return (
    <section className="section" id="experience">
      <div className="section-header">
        <div className="section-tag">
          <span className="section-tag-dot" />
          <span>Work History</span>
        </div>
        <h2 className="section-title">
          Internship <span className="accent-text">Experience</span>
        </h2>
        <p className="section-subtitle">
          Real-world engineering internships applying MERN stack architecture, collaborative debugging, and responsive web systems.
        </p>
      </div>

      <div className="timeline-container">
        {/* Animated Central Glowing Line */}
        <div className="timeline-central-line" />

        <div className="timeline-items-list">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={exp.id}
                className={`timeline-entry ${isEven ? 'left-align' : 'right-align'}`}
              >
                {/* Timeline Center Node */}
                <div className="timeline-node">
                  <div className="timeline-node-outer">
                    <div className="timeline-node-inner" />
                  </div>
                </div>

                {/* Card Content */}
                <div
                  className="timeline-card glass-card interactive-card"
                  data-cursor-text="ROLE"
                >
                  <div className="timeline-card-header">
                    <div>
                      <span className="timeline-badge">{exp.badge}</span>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <div className="timeline-company">{exp.company}</div>
                    </div>
                    <div className="timeline-meta">
                      <span className="timeline-period">
                        <Calendar size={14} />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <ul className="timeline-bullet-list">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="timeline-bullet-item">
                        <span className="bullet-indicator" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="timeline-tech-tags">
                    {exp.tech.map((t) => (
                      <span key={t} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
