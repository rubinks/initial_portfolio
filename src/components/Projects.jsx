import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Bot,
  Link2,
  CheckCircle2,
  Activity,
  Cpu,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolioData';

// Individual 3D Perspective Project Card
function ProjectCard({ project, onSelectProject }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rx = -(y / (rect.height / 2)) * 6;
    const ry = (x / (rect.width / 2)) * 6;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const isAIProject = project.id === 'inventory-management';

  return (
    <div
      className="project-3d-wrapper"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
      }}
    >
      <div className="project-card glass-card">
        {/* Top Header Row with Project Number */}
        <div className="project-card-header">
          <div className="project-index-pill">
            <span className="index-label">PROJECT</span>
            <span className="index-number">{project.number}</span>
          </div>

          <div className="project-category-badge">
            <Sparkles size={14} className="accent-sparkle" />
            <span>{project.featuredBadge}</span>
          </div>
        </div>

        {/* Visual Preview / System Architecture Display */}
        <div className="project-visual-preview">
          {isAIProject ? (
            /* AI Inventory System Visual Preview */
            <div className="ai-system-preview-canvas">
              <div className="preview-mesh-glow" />
              <div className="ai-pipeline-diagram">
                <div className="pipeline-node node-input">
                  <div className="node-icon-box">
                    <Database size={16} />
                  </div>
                  <span className="node-title">Invoice OCR</span>
                  <span className="node-caption">Raw Bill Data</span>
                </div>

                <div className="pipeline-connector">
                  <span className="connector-pulse" />
                </div>

                <div className="pipeline-node node-core">
                  <div className="node-icon-box ai-pulse">
                    <Bot size={18} />
                  </div>
                  <span className="node-title">Gemini AI Model</span>
                  <span className="node-caption">Structured Extraction</span>
                </div>

                <div className="pipeline-connector">
                  <span className="connector-pulse delay" />
                </div>

                <div className="pipeline-node node-output">
                  <div className="node-icon-box">
                    <Activity size={16} />
                  </div>
                  <span className="node-title">Python Forecasting</span>
                  <span className="node-caption">Stock Predictions</span>
                </div>
              </div>

              {/* Status Ticker */}
              <div className="preview-status-strip">
                <span className="status-live-dot" />
                <span>Real-Time Inventory Stream & JWT Protected REST API</span>
              </div>
            </div>
          ) : (
            /* URL Shortener Visual System Pipeline (matching inventory architecture) */
            <div className="url-system-preview-canvas">
              <div className="preview-mesh-glow blue" />
              <div className="ai-pipeline-diagram">
                <div className="pipeline-node node-input">
                  <div className="node-icon-box">
                    <Link2 size={16} />
                  </div>
                  <span className="node-title">Target URL</span>
                  <span className="node-caption">Validation & Regex</span>
                </div>

                <div className="pipeline-connector">
                  <span className="connector-pulse" />
                </div>

                <div className="pipeline-node node-core">
                  <div className="node-icon-box ai-pulse">
                    <Cpu size={18} />
                  </div>
                  <span className="node-title">Redirection Engine</span>
                  <span className="node-caption">Base62 Hash Mapping</span>
                </div>

                <div className="pipeline-connector">
                  <span className="connector-pulse delay" />
                </div>

                <div className="pipeline-node node-output">
                  <div className="node-icon-box">
                    <Database size={16} />
                  </div>
                  <span className="node-title">MySQL & Metrics</span>
                  <span className="node-caption">Click Analytics</span>
                </div>
              </div>

              {/* Status Ticker */}
              <div className="preview-status-strip">
                <span className="status-live-dot" />
                <span>MySQL Relational Storage • &lt;50ms Redirect • Real-Time Analytics</span>
              </div>
            </div>
          )}
        </div>

        {/* Project Content Body */}
        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>

          {/* Technology Badges */}
          <div className="project-tech-badges">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          {/* Features Highlights Grid */}
          <div className="project-features-list">
            {project.features.slice(0, 6).map((feat, fIdx) => (
              <div key={fIdx} className="feature-item">
                <CheckCircle2 size={15} className="feature-check" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Card Action Buttons */}
          <div className="project-actions-footer">
            <button
              onClick={() => onSelectProject(project)}
              className="btn-primary project-btn"
              data-cursor-text="EXPAND"
            >
              <span>Explore Features</span>
              <ArrowUpRight size={16} />
            </button>

            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline project-btn"
              data-cursor-text="GITHUB"
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ onSelectProject }) {
  return (
    <section className="section" id="projects">
      <div className="section-header">
        <div className="section-tag">
          <span className="section-tag-dot" />
          <span>Engineered Systems</span>
        </div>
        <h2 className="section-title">
          Featured <span className="accent-text">Projects</span>
        </h2>
        <p className="section-subtitle">
          Intelligent backend pipelines, machine learning predictions, and modern reactive client applications.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </section>
  );
}
