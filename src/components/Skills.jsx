import React, { useState } from 'react';
import {
  Code,
  Layout,
  Database,
  Wrench,
  Users,
  Coffee,
  Binary,
  Terminal,
  Globe,
  Palette,
  Code2,
  Layers,
  Server,
  Monitor,
  GitBranch,
  Users2,
  Zap
} from 'lucide-react';
import { skillCategories } from '../data/portfolioData';

// Icon Map
const iconMap = {
  Code: Code,
  Layout: Layout,
  Database: Database,
  Wrench: Wrench,
  Users: Users,
  Coffee: Coffee,
  Binary: Binary,
  Terminal: Terminal,
  Globe: Globe,
  Palette: Palette,
  Code2: Code2,
  Layers: Layers,
  Server: Server,
  Monitor: Monitor,
  GitBranch: GitBranch,
  Users2: Users2,
  Zap: Zap
};

// Skill Card with interactive 3D rotation and glow on hover
function SkillCard({ skill }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const IconComponent = iconMap[skill.icon] || Code;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setCoords({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      className="skill-card-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(600px) rotateX(${-coords.y}deg) rotateY(${coords.x}deg) translateY(-4px)`
          : 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px)'
      }}
      data-cursor-text="SKILL"
    >
      <div className="skill-card glass-card">
        <div
          className="skill-icon-bubble"
          style={{
            borderColor: isHovered ? skill.color : 'rgba(255, 255, 255, 0.1)',
            boxShadow: isHovered ? `0 0 20px ${skill.color}55` : 'none'
          }}
        >
          <IconComponent
            size={22}
            style={{ color: isHovered ? skill.color : '#e2e8f0' }}
          />
        </div>

        <div className="skill-info">
          <h4 className="skill-name">{skill.name}</h4>
          <span className="skill-level">{skill.level}</span>
        </div>

        <div
          className="skill-hover-light"
          style={{
            background: `radial-gradient(circle at center, ${skill.color}22 0%, transparent 70%)`
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', ...skillCategories.map((c) => c.category)];

  const filteredCategories =
    activeCategory === 'ALL'
      ? skillCategories
      : skillCategories.filter((c) => c.category === activeCategory);

  return (
    <section className="section" id="skills">
      <div className="section-header">
        <div className="section-tag">
          <span className="section-tag-dot" />
          <span>Technical Proficiencies</span>
        </div>
        <h2 className="section-title">
          Technical <span className="accent-text">Skills</span>
        </h2>
        <p className="section-subtitle">
          Core algorithmic paradigms, full-stack technologies, relational and document databases, and developer tools.
        </p>

        {/* Category Filter Pills */}
        <div className="skills-filter-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
              data-cursor-text="FILTER"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-categories-wrapper">
        {filteredCategories.map((catGroup) => {
          const CategoryIcon = iconMap[catGroup.icon] || Code;
          return (
            <div key={catGroup.category} className="skill-category-block">
              <div className="skill-category-header">
                <div className="category-icon-title">
                  <CategoryIcon size={18} className="text-blue" />
                  <h3 className="category-title">{catGroup.category}</h3>
                </div>
                <span className="category-desc">{catGroup.description}</span>
              </div>

              <div className="skills-items-grid">
                {catGroup.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
