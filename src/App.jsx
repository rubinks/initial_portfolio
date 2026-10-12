import React, { useState } from 'react';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [portraitMode, setPortraitMode] = useState('cinematic'); // 'cinematic' or 'natural'
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="app-container">
      {/* Dynamic Three.js WebGL Particle & Geometry Universe */}
      <Background3D />

      {/* Fixed Glass Navigation Header */}
      <Navbar
        portraitMode={portraitMode}
        setPortraitMode={setPortraitMode}
      />

      <main id="main-content">
        {/* Hero Section inspired by Reference Design */}
        <Hero
          portraitMode={portraitMode}
          setPortraitMode={setPortraitMode}
        />

        {/* About & Verified Statistics */}
        <About />

        {/* Experience Timeline */}
        <Experience />

        {/* Featured Projects with 3D Tilt & Interactive Demos */}
        <Projects onSelectProject={(project) => setSelectedProject(project)} />

        {/* Technical Skills */}
        <Skills />

        {/* Certifications */}
        <Certifications />

        {/* Formal Education */}
        <Education />

        {/* Contact & Message Form */}
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
