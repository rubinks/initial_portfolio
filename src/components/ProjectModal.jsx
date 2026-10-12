import React, { useEffect } from 'react';
import { X, CheckCircle2, ExternalLink, Sparkles, Layers, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="modal-category-tag">
              <Sparkles size={14} />
              <span>{project.category}</span>
            </div>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close Modal"
            data-cursor-text="CLOSE"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">{project.detailedDescription}</p>

          <div className="modal-section-block">
            <h4 className="modal-section-title">
              <Layers size={16} />
              <span>Technology Stack</span>
            </h4>
            <div className="modal-tech-grid">
              {project.technologies.map((t) => (
                <div key={t} className="modal-tech-item">
                  <span className="tech-dot" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section-block">
            <h4 className="modal-section-title">
              <Cpu size={16} />
              <span>Comprehensive Feature Matrix</span>
            </h4>
            <div className="modal-features-grid">
              {project.features.map((feat, i) => (
                <div key={i} className="modal-feature-card">
                  <CheckCircle2 size={16} className="modal-feat-icon" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-actions-row">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              data-cursor-text="CODE"
            >
              <GithubIcon size={16} />
              <span>Source Repository Placeholder</span>
            </a>
            <button
              onClick={onClose}
              className="btn-outline"
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
