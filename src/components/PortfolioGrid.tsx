/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowRight, CornerDownRight } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data';

interface PortfolioGridProps {
  onSelectProject: (project: Project) => void;
}

export default function PortfolioGrid({ onSelectProject }: PortfolioGridProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['All', 'Websites', 'Landing Pages', 'CMS', 'Enterprise', 'Featured', 'Personal'];

  const [showMore, setShowMore] = useState(false);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || 
                              (project.filterCategories && project.filterCategories.includes(selectedCategory));
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            project.client.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedProjects = useMemo(() => {
    if (showMore) {
      return filteredProjects;
    }
    // Only hide them on "All" category view so other categories (like "Personal" or "CMS") still show them directly
    if (selectedCategory === 'All') {
      return filteredProjects.filter(p => p.id !== 'guramo' && p.id !== 'wirausahain');
    }
    return filteredProjects;
  }, [filteredProjects, selectedCategory, showMore]);

  return (
    <section id="works" className="py-24 md:py-32 bg-white border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title Block - Editorial Asymmetric Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <CornerDownRight className="w-4 h-4 text-[#1a1a1a]" />
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">Selected Projects</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-[#1a1a1a] tracking-tight leading-tight">
              Guiding users <br />
              naturally.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-12">
            <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
              Throughout my career, I have contributed to over <strong>200 websites</strong>. The projects below are a curated selection of my recent work, notable collaborations, and personal projects that best represent my design philosophy today.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar - High Contrast, Tactile UI */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-200/60 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                id={`filter-tab-${category.toLowerCase().replace(' ', '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs font-mono rounded-full border transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-[#1a1a1a] border-[#1a1a1a] text-white'
                    : 'bg-transparent border-gray-200 text-gray-400 hover:border-gray-900 hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="portfolio-search-input"
              type="text"
              placeholder="Search works..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-md outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        {/* Dynamic Project Grid - Responsive asymmetric layout */}
        <AnimatePresence mode="popLayout">
          {displayedProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200"
            >
              <SlidersHorizontal className="w-8 h-8 text-gray-300 mx-auto mb-4" />
              <p className="text-sm font-mono text-gray-500">No matching projects found. Try resetting filters.</p>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-y-24"
            >
              {displayedProjects.map((project, idx) => {
                // Alternating sizes for an interesting asymmetric editorial pace
                const isEven = idx % 2 === 0;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className={`group cursor-pointer ${isEven ? 'md:translate-y-0' : 'md:translate-y-12'}`}
                    onClick={() => onSelectProject(project)}
                    onMouseEnter={() => setHoveredId(project.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Visual Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 rounded-md border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-md">
                      <img
                        src={project.coverImage}
                        alt={`${project.title} Cover`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      
                      {/* Dark Overlay Subtle Vignette on Hover */}
                      <div className="absolute inset-0 bg-[#1a1a1a]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Interactive Tags at bottom corner */}
                      <div className="absolute bottom-4 left-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.tags.slice(0, 2).map((tag, tIdx) => (
                          <span key={tIdx} className="px-2.5 py-1 bg-white/95 border border-gray-100 backdrop-blur-sm text-[10px] font-mono rounded text-gray-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metadata Content Block */}
                    <div className="mt-6 flex justify-between items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-400 mb-1">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium uppercase tracking-wider">{project.category}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                          <span>{project.client}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                          <span>{project.year}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-display font-medium text-[#1a1a1a] group-hover:text-[#1a1a1a] group-hover:opacity-80 transition-all">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-light mt-1.5 line-clamp-2 max-w-md">
                          {project.description}
                        </p>
                      </div>
                      
                      <div className="p-3 border border-gray-200 rounded-full group-hover:bg-gray-900 group-hover:border-gray-900 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* See More Toggle Button */}
        {selectedCategory === 'All' && filteredProjects.length > displayedProjects.length && (
          <div className="flex justify-center mt-16 md:mt-24">
            <button
              id="portfolio-see-more-btn"
              onClick={() => setShowMore(true)}
              className="px-8 py-4 border border-gray-950 text-xs font-mono text-gray-900 hover:bg-gray-950 hover:text-white transition-all rounded-md uppercase tracking-widest cursor-pointer"
            >
              See More Projects
            </button>
          </div>
        )}

        {selectedCategory === 'All' && showMore && (
          <div className="flex justify-center mt-16 md:mt-24">
            <button
              id="portfolio-see-less-btn"
              onClick={() => setShowMore(false)}
              className="px-8 py-4 border border-gray-300 text-xs font-mono text-gray-500 hover:border-gray-950 hover:text-black transition-all rounded-md uppercase tracking-widest cursor-pointer"
            >
              See Less
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
