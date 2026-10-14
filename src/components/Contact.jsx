import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Send,
  CheckCircle,
  Copy,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please include a brief message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#0077ff', '#00f0ff', '#38bdf8', '#ffffff']
      });
    } catch {
      // fallback
    }

    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section className="section" id="contact">
      <div className="section-header">
        <div className="section-tag">
          <span className="section-tag-dot" />
          <span>Get In Touch</span>
        </div>
        <h2 className="section-title">
          Let's Build Something <span className="accent-text">Together</span>
        </h2>
        <p className="section-subtitle">
          Have an idea, opportunity, or project in mind? Let's connect.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left: Contact Info Channels */}
        <div className="contact-channels-card glass-card">
          <div className="channels-inner">
            <h3 className="channels-heading">Direct Reach</h3>
            <p className="channels-desc">
              I am open to software development roles, internships, and impactful engineering opportunities.
            </p>

            <div className="contact-methods-list">
              {/* Email */}
              <div className="contact-method-item">
                <div className="method-icon-wrap">
                  <Mail size={18} />
                </div>
                <div className="method-content">
                  <span className="method-label">Official Email</span>
                  <a
                    href={`mailto:${personalInfo.contact.email}`}
                    className="method-link"
                    data-cursor-text="MAIL"
                  >
                    {personalInfo.contact.email}
                  </a>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="copy-method-btn"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check size={14} className="text-green" /> : <Copy size={14} />}
                </button>
              </div>

              {/* Phone */}
              <div className="contact-method-item">
                <div className="method-icon-wrap">
                  <Phone size={18} />
                </div>
                <div className="method-content">
                  <span className="method-label">Phone</span>
                  <a
                    href={`tel:${personalInfo.contact.phone}`}
                    className="method-link"
                    data-cursor-text="CALL"
                  >
                    {personalInfo.contact.phone}
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="contact-method-item">
                <div className="method-icon-wrap">
                  <LinkedinIcon size={18} />
                </div>
                <div className="method-content">
                  <span className="method-label">LinkedIn Profile</span>
                  <a
                    href={personalInfo.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="method-link placeholder-link"
                    data-cursor-text="LINKEDIN"
                  >
                    <span>LinkedIn / Rubinraj K</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-method-item">
                <div className="method-icon-wrap">
                  <GithubIcon size={18} />
                </div>
                <div className="method-content">
                  <span className="method-label">GitHub Repositories</span>
                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="method-link placeholder-link"
                    data-cursor-text="GITHUB"
                  >
                    <span>GitHub / Rubinraj K</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>

            <div className="availability-status-box">
              <span className="status-indicator-dot" />
              <div>
                <div className="status-title">Undergraduate (2023–2027)</div>
                <div className="status-sub">Actively seeking high-impact opportunities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Modern Contact Form */}
        <div className="contact-form-card glass-card">
          {submitted ? (
            <div className="form-success-state">
              <div className="success-icon-bubble">
                <CheckCircle size={44} />
              </div>
              <h3 className="success-title">Message Sent Successfully</h3>
              <p className="success-sub">
                Thank you for reaching out! I've received your note and will get back to you promptly at{' '}
                <strong>{formData.email}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', message: '' });
                }}
                className="btn-outline"
                style={{ marginTop: 20 }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <h3 className="form-heading">Send a Message</h3>

              <div className="form-field">
                <label htmlFor="contact-name" className="field-label">
                  Your Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`field-input ${errors.name ? 'has-error' : ''}`}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-email" className="field-label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`field-input ${errors.email ? 'has-error' : ''}`}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>

              <div className="form-field">
                <label htmlFor="contact-message" className="field-label">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Tell me about your project, team opportunity, or discussion topic..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`field-textarea ${errors.message ? 'has-error' : ''}`}
                />
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className="btn-primary form-submit-btn"
                data-cursor-text="SEND"
              >
                <span>SEND MESSAGE</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
