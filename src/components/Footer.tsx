/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { STUDIO_INFO } from '../data';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const socialLinks = STUDIO_INFO.socialLinks;

  return (
    <footer id="main-footer" className="bg-[#1a1a1a] text-white py-16 md:py-24 border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Main Footer Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-16 border-b border-gray-800">
          
          {/* Logo Brand Statement */}
          <div className="md:col-span-6 space-y-6">
            <button
              onClick={() => scrollToSection('hero')}
              className="font-display text-xl md:text-2xl font-semibold tracking-tight hover:opacity-85 transition-opacity text-left cursor-pointer flex items-center gap-2"
            >
              <span>Bayu Savira</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            </button>
            <p className="text-gray-400 text-sm font-light max-w-sm leading-relaxed">
              Bayu Savira creates websites, landing pages, and digital experiences that combine thoughtful design with marketing strategy to help businesses grow.
            </p>
          </div>

          {/* Quick Jump Links */}
          <div className="md:col-span-3 space-y-4 font-mono text-xs">
            <h4 className="font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">Navigation</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors cursor-pointer">
                  Top of Page
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('works')} className="hover:text-white transition-colors cursor-pointer">
                  Selected Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('studio')} className="hover:text-white transition-colors cursor-pointer">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Project Inquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Connected Network Links */}
          <div className="md:col-span-3 space-y-4 font-mono text-xs">
            <h4 className="font-bold text-gray-500 uppercase tracking-widest border-b border-gray-800 pb-2">Network</h4>
            <ul className="space-y-2 text-gray-300">
              {socialLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <span>© 2026 Bayu Savira. All rights reserved.</span>
            <span className="hidden sm:inline text-gray-800">•</span>
            <span>Thoughtful Design & Strategy</span>
          </div>

          <button
            id="footer-back-to-top"
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 py-2 px-4 border border-gray-800 rounded-full hover:bg-white hover:text-black hover:border-white transition-all text-gray-400 font-semibold cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
