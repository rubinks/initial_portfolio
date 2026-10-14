import React from 'react';
import { Award, CheckCircle, ShieldCheck, Calendar } from 'lucide-react';
import { certifications } from '../data/portfolioData';

export default function Certifications() {
  return (
    <section className="section" id="certifications">
      <div className="section-header">
        <div className="section-tag">
          <span className="section-tag-dot" />
          <span>Verified Credentials</span>
        </div>
        <h2 className="section-title">
          Professional <span className="accent-text">Certifications</span>
        </h2>
        <p className="section-subtitle">
          Industry-recognized certifications in Python fundamentals, modern web standards, and ServiceNow enterprise cloud development.
        </p>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert) => (
          <div
            key={cert.title}
            className="cert-card glass-card interactive-card"
            data-cursor-text="CERT"
          >
            <div className="cert-card-top">
              <div
                className="cert-badge-icon"
                style={{
                  background: `${cert.accent}15`,
                  borderColor: `${cert.accent}40`,
                  color: cert.accent
                }}
              >
                <Award size={22} />
              </div>
              <div className="cert-year-tag">
                <Calendar size={13} />
                <span>{cert.year}</span>
              </div>
            </div>

            <div className="cert-body">
              <span className="cert-domain-badge">{cert.badge}</span>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-issuer">
                <ShieldCheck size={16} className="text-blue" />
                <span>{cert.issuer}</span>
              </div>
            </div>

            <div className="cert-card-footer">
              <div className="cert-status">
                <CheckCircle size={14} className="text-green" />
                <span>Verified Credential</span>
              </div>
              <span className="cert-id-tag">{cert.credentialId}</span>
            </div>

            <div
              className="cert-card-aura"
              style={{
                background: `radial-gradient(circle at top right, ${cert.accent}18 0%, transparent 70%)`
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
