/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import PortfolioGrid from './components/PortfolioGrid';
import ProjectDetail from './components/ProjectDetail';
import StudioInfo from './components/StudioInfo';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { Project } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track active section via Intersection Observer
  useEffect(() => {
    const sections = ['hero', 'works', 'studio', 'contact'];
    
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Trigger when section occupies 30% of the viewport height
          threshold: 0.15,
          rootMargin: '-20% 0px -40% 0px',
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-[#1a1a1a] overflow-x-hidden antialiased font-sans">
      
      {/* Editorial Watermark background lines for print-journal feel */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.02] select-none">
        <div className="max-w-7xl mx-auto h-full px-6 md:px-12 grid grid-cols-4 md:grid-cols-12 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-gray-900" />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Header */}
        <Header activeSection={activeSection} scrollToSection={scrollToSection} />

        {/* Hero Landing Page */}
        <Hero onExploreClick={() => scrollToSection('works')} />

        {/* Selected Works Portfolio Grid */}
        <PortfolioGrid onSelectProject={(project) => setSelectedProject(project)} />

        {/* Studio Details / About / Testimonials */}
        <StudioInfo />

        {/* Interactive Contact / Inquiry form */}
        <ContactSection />

        {/* Footer */}
        <Footer scrollToSection={scrollToSection} />
      </div>

      {/* Cinematic Project Case Study Overlay */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNextProject={(nextProj) => setSelectedProject(nextProj)}
            onPrevProject={(prevProj) => setSelectedProject(prevProj)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

