/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Award, Globe, Heart } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18,
      },
    },
  };

  const stats = [
    { label: 'Strategic Approach', detail: 'Growth & User Experience', icon: Award },
    { label: 'Digital Growth', detail: 'Websites, Funnels, Landing Pages', icon: Globe },
    { label: 'Core Philosophy', detail: 'Simplicity & Clear Purpose', icon: Heart },
  ];

  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col justify-center bg-white pt-24 pb-16 md:py-32 overflow-hidden"
    >
      {/* Tilted image on the right with a white gradient overlay from the left */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] pointer-events-none select-none z-0 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0, x: 80, rotate: 8, scale: 0.95 }}
            animate={{ opacity: 0.22, x: 0, rotate: 12, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="w-[115%] md:w-[110%] aspect-[4/3] max-w-[680px] overflow-hidden border border-gray-100 rounded-3xl shadow-2xl origin-center translate-x-[25%] md:translate-x-[20%]"
          >
            <img
              src="/images/project_kallisto_1784579446542.jpg"
              alt="Decorative portfolio work showcase"
              className="w-full h-full object-cover scale-105"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* White gradient overlay from left to right covering the image background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 md:via-white/70 to-transparent w-full h-full" />
          
          {/* Top and bottom soft vignettes to blend image into the white page */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col justify-between h-full grow">
        <div className="my-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 md:space-y-12"
          >
            {/* Tagline category label */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <span className="h-[1px] w-8 bg-gray-300"></span>
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">
                Digital Design & Strategy
              </span>
            </motion.div>

            {/* Huge Headline Typography */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-light tracking-tight leading-[1.05] text-[#1a1a1a] max-w-5xl"
            >
              Designing digital <br />
              <span className="italic font-normal text-gray-500">experiences</span> that <br />
              drive growth.
            </motion.h1>

            {/* Description Paragraph with elegant negative space */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-500 font-light max-w-2xl leading-relaxed"
            >
              I design and build websites, landing pages, and marketing funnels that help businesses communicate clearly, build trust, and convert visitors into customers.
            </motion.p>

            {/* CTA and Explore actions */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 pt-4">
              <button
                id="hero-explore-cta"
                onClick={onExploreClick}
                className="group flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-white rounded-md text-sm font-medium hover:bg-gray-800 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <span>View Portfolio</span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <ArrowDown className="w-4 h-4 text-white" />
                </motion.div>
              </button>

              <button
                id="hero-about-cta"
                onClick={() => {
                  const element = document.getElementById('studio');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-4 text-sm font-medium text-gray-500 hover:text-black border-b border-transparent hover:border-[#1a1a1a] transition-all duration-200 cursor-pointer"
              >
                My Philosophy
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Accolades Section - 3 columns aligned nicely */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="border-t border-gray-100 pt-10 mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-gray-700">
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-0.5">
                  {stat.label}
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {stat.detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
