/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Flame, Lightbulb, CheckSquare, Sparkles, MapPin, Milestone } from 'lucide-react';
import { STUDIO_INFO, CAPABILITIES, AWARDS } from '../data';

export default function StudioInfo() {
  const [colored, setColored] = useState(false);
  return (
    <section id="studio" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 md:space-y-36">
        
        {/* Profile Bio Section - Asymmetric Editorial Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-stretch">
          {/* Portrait Graphic Column */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 border border-[#1a1a1a] rounded-md translate-x-4 translate-y-4 -z-10" />
            <div className="w-full h-full overflow-hidden bg-gray-50 rounded-md border border-gray-200 shadow-sm relative">
              <img
                src={STUDIO_INFO.profileImage}
                alt={STUDIO_INFO.name}
                referrerPolicy="no-referrer"
                onClick={() => setColored(c => !c)}
                className={`w-full h-full object-cover transition-all duration-700 cursor-pointer ${
                  colored ? 'grayscale-0' : 'grayscale hover:grayscale-0'
                }`}
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-100 rounded py-2 px-3 flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#1a1a1a]" />
                <span className="text-[10px] font-mono text-gray-800 tracking-wider">{STUDIO_INFO.location} ({STUDIO_INFO.timezone})</span>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6 md:pl-6 self-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1a1a1a]" />
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">About Me</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-light text-gray-900 tracking-tight leading-tight">
              Designing digital experiences with <span className="italic font-normal">clarity and purpose</span>.
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-gray-500 font-light leading-relaxed">
              {STUDIO_INFO.bio.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
            <div className="h-[1px] bg-gray-100" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Clarity & Purpose</p>
                <ul className="text-sm text-gray-500 font-light space-y-2 list-disc list-inside">
                  <li>Every element earns its place by reducing friction, not adding it.</li>
                  <li>Layouts lead visitors forward — intuitive, focused, and purposeful.</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Modern Front-End</p>
                <ul className="text-sm text-gray-500 font-light space-y-2 list-disc list-inside">
                  <li>I build with modern code that loads fast and works on every device.</li>
                  <li>Design and development fuse for speed, accessibility, and reliable performance.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="space-y-12">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">Capabilities</span>
            <h3 className="text-2xl md:text-4xl font-display font-light tracking-tight text-gray-900">My Areas of Expertise</h3>
            <p className="text-sm text-gray-500 font-light">
              I focus on the complete customer journey, from the first impression to the final action, ensuring every digital touchpoint is fast, intuitive, and effective.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAPABILITIES.map((cap, capIdx) => {
              const icons = [Milestone, Lightbulb, CheckSquare];
              const IconComp = icons[capIdx] || Sparkles;

              return (
                <div
                  key={capIdx}
                  className="bg-white border border-gray-100 p-8 rounded-lg space-y-6 shadow-sm hover:shadow-md hover:border-gray-900 transition-all duration-300"
                >
                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-md w-fit text-gray-700">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-display font-medium text-gray-900 mb-2">
                      {cap.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed mb-6">
                      {cap.description}
                    </p>
                    <ul className="space-y-2 border-t border-gray-100 pt-4 font-mono text-[11px] text-gray-600">
                      {cap.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-200"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accolades & Awards - Editorial Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-b border-gray-100 py-16 md:py-24">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-gray-400 font-mono text-xs uppercase tracking-widest">
              <Award className="w-4 h-4 text-gray-700" />
              <span>Core Principles</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-display font-light text-gray-900 tracking-tight leading-tight">
              How I Work
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed max-w-sm">
              These four pillars define my work and guide how I approach every website, landing page, and marketing funnel I build.
            </p>
          </div>

          <div className="lg:col-span-8 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-gray-500">
              <thead>
                <tr className="border-b border-gray-200 pb-3 uppercase tracking-wider text-gray-800">
                  <th className="py-3 font-semibold">Design Pillar</th>
                  <th className="py-3 font-semibold">Focus Area</th>
                  <th className="py-3 font-semibold text-center">Goal</th>
                  <th className="py-3 font-semibold text-right">Deliverable</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {AWARDS.map((award) => (
                  <tr key={award.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="py-4 font-medium text-gray-900 text-sm font-display">{award.title}</td>
                    <td className="py-4">{award.organization}</td>
                    <td className="py-4 text-center">{award.year}</td>
                    <td className="py-4 text-right text-gray-800 font-medium">{award.project}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
