/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { CornerDownRight, Mail, Compass, Clock, Calendar } from 'lucide-react';

export default function ContactSection() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "discovery" });
      cal("ui", {
        styles: { branding: { brandColor: "#1a1a1a" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();

    // 3. Robust Scroll-Lock Guard
    // When Cal's modal is active, it may set overflow: hidden on the body.
    // If the modal is closed, this observer guarantees body/documentElement scroll is fully restored.
    const handleScrollLockFix = () => {
      const hasCalModal = !!document.querySelector('iframe[src*="cal.com"]') || 
                           !!document.querySelector('.cal-modal') ||
                           !!document.querySelector('[class*="cal-"]') ||
                           !!document.getElementById('cal-modal') ||
                           !!document.querySelector('.cal-embed-modal');
      if (!hasCalModal) {
        const body = document.body;
        const html = document.documentElement;
        if (body.style.overflow === 'hidden') {
          body.style.overflow = '';
        }
        if (html.style.overflow === 'hidden') {
          html.style.overflow = '';
        }
      }
    };

    const observer = new MutationObserver(handleScrollLockFix);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="contact" className="py-24 md:py-32 bg-white border-t border-gray-200/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 md:mb-24 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <CornerDownRight className="w-4 h-4 text-[#1a1a1a]" />
              <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">Initiate Collaboration</span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-light text-[#1a1a1a] tracking-tight leading-tight">
              Let's discuss <br />
              your project.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pl-12">
            <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
              If you're looking for a website, landing page, or digital experience that helps your business grow, I'd love to hear about your goals. Book a free discovery call or send me an email—whichever is more convenient for you.
            </p>
          </div>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-stretch">
          
          {/* Quick Details & Inquiries Sidebar */}
          <div className="lg:col-span-4 space-y-8 font-mono text-xs">
            <div className="bg-gray-50/50 p-8 rounded-lg border border-gray-100 space-y-6 h-full flex flex-col justify-center shadow-sm">
              
              {/* General Inquiries */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <Mail className="w-4 h-4 text-[#1a1a1a]" />
                  <span className="uppercase tracking-widest">General Inquiries</span>
                </div>
                <p className="text-gray-500 leading-relaxed font-sans text-xs sm:text-sm font-light">
                  For general questions, collaborations, or simply to say hello, feel free to send me an email.
                </p>
                <a
                  href="mailto:bayu@guramo.com"
                  className="block text-sm md:text-base font-semibold text-[#1a1a1a] hover:text-black transition-colors font-sans pt-1"
                >
                  bayu@guramo.com
                </a>
              </div>

              <div className="border-t border-gray-200/60" />

              {/* Location */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <Compass className="w-4 h-4 text-[#1a1a1a]" />
                  <span className="uppercase tracking-widest">Location</span>
                </div>
                <p className="text-gray-800 text-sm md:text-base font-semibold font-sans">
                  Bali, Indonesia (UTC+8)
                </p>
              </div>

              <div className="border-t border-gray-200/60" />

              {/* Response Time */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-semibold text-gray-700">
                  <Clock className="w-4 h-4 text-[#1a1a1a]" />
                  <span className="uppercase tracking-widest">Response Time</span>
                </div>
                <p className="text-gray-500 leading-relaxed font-sans text-xs sm:text-sm font-light">
                  I typically respond to emails in hours.
                </p>
              </div>

            </div>
          </div>

          {/* Premium Booking Card */}
          <div className="lg:col-span-8 bg-gray-50/30 border border-gray-200/60 rounded-xl p-8 md:p-12 shadow-sm flex flex-col justify-between h-full space-y-8 min-h-[400px]">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 text-gray-500">
                <Calendar className="w-4 h-4 text-[#1a1a1a]" />
                <span className="text-xs font-mono tracking-widest uppercase">Direct Scheduling</span>
              </div>
              <h3 className="text-2xl md:text-3.5xl font-display font-light text-[#1a1a1a] tracking-tight">
                Book a Discovery Call
              </h3>
              <p className="text-gray-500 font-light text-sm md:text-base leading-relaxed">
                Let's discuss your project, goals, timeline, and whether we're a good fit. The call is completely free with no obligation.
              </p>

              <div className="space-y-3 border-t border-b border-gray-200/60 py-6 mt-4">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block mb-1">
                  Session Specifications
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 font-sans font-light">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <span>30-minute Google Meet</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <span>Free consultation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                    <span>Bring a coffee</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                data-cal-link="guramo/discovery"
                data-cal-namespace="discovery"
                data-cal-config='{"layout":"month_view"}'
                className="w-full sm:w-auto bg-[#1a1a1a] hover:bg-black text-white px-8 py-4 rounded text-xs font-mono tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-3 group cursor-pointer"
              >
                <span>Book Discovery Call</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
}
