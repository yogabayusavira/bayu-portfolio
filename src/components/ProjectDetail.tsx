/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { X, ArrowLeft, ArrowRight, ArrowUpRight, HelpCircle, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
  onNextProject: (nextProj: Project) => void;
  onPrevProject: (prevProj: Project) => void;
}

export default function ProjectDetail({ project, onClose, onNextProject, onPrevProject }: ProjectDetailProps) {
  
  // Back to top on select
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Disable scroll on body while open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project.id]);

  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const prevProject = PROJECTS[currentIndex === 0 ? PROJECTS.length - 1 : currentIndex - 1];
  const nextProject = PROJECTS[currentIndex === PROJECTS.length - 1 ? 0 : currentIndex + 1];

  return (
    <motion.div
      id="project-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      {/* Top Floating Control Bar */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 px-6 md:px-12 flex justify-between items-center z-10">
        <button
          id="detail-close-btn"
          onClick={onClose}
          className="group flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-black cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Works</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            id="detail-prev-nav"
            onClick={() => onPrevProject(prevProject)}
            className="p-2 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 cursor-pointer transition-all"
            title="Previous Project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <span className="text-xs font-mono text-gray-400">
            {currentIndex + 1} / {PROJECTS.length}
          </span>

          <button
            id="detail-next-nav"
            onClick={() => onNextProject(nextProject)}
            className="p-2 border border-gray-200 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 cursor-pointer transition-all"
            title="Next Project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-4 bg-gray-200 mx-1" />

          <button
            id="detail-close-corner-btn"
            onClick={onClose}
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Narrative Area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 space-y-16 md:space-y-24">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <span className="px-3 py-1 text-[10px] font-mono rounded bg-gray-100 uppercase tracking-widest text-gray-500">
              {project.category} Case Study
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-light text-gray-900 tracking-tight leading-none">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-3xl">
              {project.longDescription}
            </p>
          </div>

          {/* Sidebar Metadata Cards */}
          <div className="lg:col-span-4 bg-white border border-gray-200 rounded-lg p-6 space-y-4 shadow-sm font-mono text-xs text-gray-500">
            <h3 className="text-xs font-semibold text-gray-800 border-b border-gray-200 pb-3 uppercase tracking-wider">Project Specification</h3>
            <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Client</span>
              <span className="col-span-2 text-right text-gray-600">{project.client}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Year</span>
              <span className="col-span-2 text-right text-gray-600">{project.year}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1 border-b border-gray-100">
              <span className="font-semibold text-gray-700">Role</span>
              <span className="col-span-2 text-right text-gray-600">{project.role}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1">
              <span className="font-semibold text-gray-700">Services</span>
              <span className="col-span-2 text-right text-gray-600 flex flex-wrap gap-1 justify-end">
                {project.tags.map((t, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-gray-50 border border-gray-100 rounded text-[10px]">
                    {t}
                  </span>
                ))}
              </span>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs rounded transition-colors mt-6 uppercase tracking-wider"
              >
                <span>Launch Live Site</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Large Media Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-gray-100 shadow-sm bg-gray-50">
          <img
            src={project.coverImage}
            alt={`${project.title} Hero Details`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Challenge & Solution Side-by-Side (Bento Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 border-t border-b border-gray-100 py-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-mono text-xs uppercase tracking-widest">
              <HelpCircle className="w-4 h-4" />
              <span>The Challenge</span>
            </div>
            <h3 className="text-2xl font-display font-medium text-gray-900 tracking-tight">
              Understanding the challenge.
            </h3>
            <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-mono text-xs uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4" />
              <span>The Solution</span>
            </div>
            <h3 className="text-2xl font-display font-medium text-gray-900 tracking-tight">
              Delivering the solution.
            </h3>
            <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* The 3-Step Process (Chronology) */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">Design Highlights</span>
            <h2 className="text-3xl font-display font-light tracking-tight text-gray-900">Three Design Highlights</h2>
            <p className="text-gray-500 font-light text-sm">
              Focusing on communication, clarity, and user experience to deliver a clean, purposeful solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {project.process.map((step, sIdx) => (
              <div key={sIdx} className="bg-white border border-gray-100 p-8 rounded-lg space-y-4 shadow-sm hover:border-gray-900 transition-colors group">
                <span className="text-xs font-mono text-gray-400 group-hover:text-black transition-colors">Highlight 0{sIdx + 1}</span>
                <h4 className="text-lg font-display font-medium text-gray-900">{step.title}</h4>
                <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Seamless Navigation at bottom */}
        <div className="border-t border-gray-100 pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <button
            id="bottom-prev-project"
            onClick={() => onPrevProject(prevProject)}
            className="group flex flex-col items-start gap-1 text-left cursor-pointer"
          >
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Previous Project</span>
            <span className="text-lg font-display font-medium text-gray-400 group-hover:text-black flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {prevProject.title}
            </span>
          </button>

          <button
            id="bottom-back-grid"
            onClick={onClose}
            className="px-6 py-3 border border-gray-950 text-xs font-mono text-gray-900 hover:bg-gray-950 hover:text-white transition-all rounded-md uppercase tracking-widest cursor-pointer"
          >
            Return to Index
          </button>

          <button
            id="bottom-next-project"
            onClick={() => onNextProject(nextProject)}
            className="group flex flex-col items-end gap-1 text-right cursor-pointer"
          >
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Next Project</span>
            <span className="text-lg font-display font-medium text-gray-400 group-hover:text-black flex items-center gap-1.5 transition-colors">
              {nextProject.title}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
        
      </div>
    </motion.div>
  );
}
