/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Header({ activeSection, scrollToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Time updater
  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(formatter.format(new Date()));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Works', id: 'works' },
    { label: 'About', id: 'studio' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md py-4 border-b border-gray-100' 
          : 'bg-transparent py-6 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="brand-logo"
          onClick={() => scrollToSection('hero')}
          className="font-display text-lg md:text-xl font-semibold tracking-tight hover:opacity-70 transition-opacity cursor-pointer flex items-center gap-2"
        >
          <span>Bayu Savira</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></span>
        </button>

        {/* Desktop Nav - Clean, Editorial style */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  id={`nav-link-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative py-1 cursor-pointer transition-colors ${
                    activeSection === item.id 
                      ? 'text-[#1a1a1a]' 
                      : 'text-gray-400 hover:text-[#1a1a1a]'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1a1a1a]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Swiss Time indicator - Adds architectural/curated realism */}
          <div id="swiss-clock" className="hidden lg:flex items-center gap-2 text-xs font-mono text-gray-400 pl-6 border-l border-gray-200">
            <span>Local Time</span>
            <span className="font-semibold text-gray-600">{currentTime || '13:30:00'}</span>
          </div>

          <button
            id="nav-cta"
            onClick={() => scrollToSection('contact')}
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono border border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            <span>Inquire Now</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1.5 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6 text-gray-900" /> : <Menu className="w-6 h-6 text-gray-900" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-lg md:hidden py-8 px-6 flex flex-col gap-6"
          >
            <ul className="flex flex-col gap-5 text-lg font-display font-medium">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left py-1 ${
                      activeSection === item.id ? 'text-[#1a1a1a] pl-2 border-l-2 border-[#1a1a1a]' : 'text-gray-400'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="h-[1px] bg-gray-100 my-2" />
            <div className="flex justify-between items-center text-xs font-mono text-gray-500">
              <span>Bayu Savira</span>
              <span className="text-gray-800 font-semibold">{currentTime || '13:30:00'}</span>
            </div>
            <button
              id="mobile-nav-cta"
              onClick={() => {
                scrollToSection('contact');
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-md font-mono text-sm"
            >
              <span>Initiate Project Inquiry</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
