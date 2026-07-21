/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Testimonial, Award, StudioCapability } from './types';

export const STUDIO_INFO = {
  name: "Bayu Savira",
  title: "Digital Designer & Strategist",
  tagline: "Designing digital experiences that drive growth.",
  bio: "My approach is guided by a simple belief: good design isn't about adding more—it's about making decisions easier. I believe visitors shouldn't feel overwhelmed by too many choices. Every page should have a clear purpose, every interaction should feel natural, and every element should earn its place.\n\nWhen we remove the unnecessary noise, simplicity becomes a powerful tool that helps people know what to do next. I strive to create web experiences that are not only visually refined and fast, but genuinely effective at helping businesses grow.",
  philosophy: "Good design isn't about adding more—it's about making decisions easier. I believe visitors shouldn't feel overwhelmed by too many choices. Every page should have a clear purpose, every interaction should feel natural, and every element should earn its place. Simplicity isn't about removing features—it's about helping people know what to do next.",
  location: "Malang, Indonesia",
  timezone: "UTC+7",
  email: "bayu@guramo.com",
  socialLinks: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/yogabayusavira/" },
    { label: "GitHub", url: "https://github.com/yogabayusavira" },
    { label: "Instagram", url: "https://www.instagram.com/bayuscales/" },
  ],
  profileImage: "/images/Bayu Savira.jpg"
};

export const PROJECTS: Project[] = [
  {
    id: "yamaha",
    title: "Yamaha Motor",
    category: "Enterprise",
    filterCategories: ["Websites", "Enterprise"],
    tags: ["Website Design", "User Experience", "Front-end Design"],
    year: "2023",
    client: "Yamaha Motor",
    role: "Digital Designer",
    description: "A website redesign concept for Yamaha Motor focused on improving usability, simplifying navigation, and creating a modern digital experience while respecting the strength of an established global brand.",
    longDescription: "A website redesign concept for Yamaha Motor focused on improving usability, simplifying navigation, and creating a modern digital experience while respecting the strength of an established global brand. Large enterprise websites often contain extensive information that can overwhelm visitors and make navigation difficult. This project presents a structured solution to organize content intuitively.",
    coverImage: "/images/mockup_yamaha.webp",
    siteImage: "/images/site_yamaha.webp",
    challenge: "Large enterprise websites often contain extensive information that can overwhelm visitors and make navigation difficult.",
    solution: "Create a clearer information hierarchy, improve navigation, and simplify the browsing experience without sacrificing brand identity.",
    process: [
      {
        title: "Information Architecture",
        description: "Reorganizing complex product categories and specifications into a clear, visual directory that reduces mental strain."
      },
      {
        title: "Product-focused Navigation",
        description: "Designing a streamlined navigation flow that allows visitors to reach product details or find local dealers in fewer clicks."
      },
      {
        title: "Responsive Experience",
        description: "Ensuring the deep product catalog remains highly readable, navigable, and fast across all mobile, tablet, and desktop devices."
      }
    ],
    accentColor: "bg-[#1E2022]"
  },
  {
    id: "future-modern",
    title: "Future Modern",
    category: "Featured",
    filterCategories: ["Landing Pages", "Featured"],
    tags: ["Landing Page Design", "User Experience", "Front-end Design"],
    year: "2026",
    client: "Future Modern",
    role: "Digital Designer",
    description: "A marketing landing page focused on communicating ideas with clarity through strong visual hierarchy, thoughtful storytelling, and purposeful calls to action.",
    longDescription: "A marketing landing page focused on communicating ideas with clarity through strong visual hierarchy, thoughtful storytelling, and purposeful calls to action. Every element has been placed with a specific focus on keeping readers engaged and preventing cognitive overload.",
    coverImage: "/images/mockup_futuremodern.webp",
    siteImage: "/images/site_futuremodern.webp",
    challenge: "Present complex ideas in a way that's engaging, easy to understand, and visually balanced.",
    solution: "Use thoughtful spacing, strong visual hierarchy, and focused messaging to create a smooth reading experience.",
    process: [
      {
        title: "Focused Storytelling",
        description: "Structuring the content with a narrative arc that naturally guides the reader's attention and highlights primary takeaways."
      },
      {
        title: "Editorial-inspired Layout",
        description: "Using beautiful typography contrast, generous negative space, and a refined grid system that gives content room to breathe."
      },
      {
        title: "Purposeful Calls-to-Action",
        description: "Placing low-friction buttons and sign-up prompts at key decision points to gently prompt engagement."
      }
    ],
    accentColor: "bg-[#1C1917]"
  },
  {
    id: "laserreach",
    title: "LaserReach",
    category: "Featured",
    filterCategories: ["Websites", "Featured"],
    tags: ["Website Design", "Landing Page Design", "User Experience"],
    year: "2026",
    client: "LaserReach",
    role: "Digital Designer",
    description: "A marketing website for LaserReach designed to clearly communicate the platform's value, establish credibility, and guide visitors naturally toward learning more.",
    longDescription: "A marketing website for LaserReach designed to clearly communicate the platform's value, establish credibility, and guide visitors naturally toward learning more. It translates complex technical capabilities into benefit-driven structures that help businesses connect with the service.",
    coverImage: "/images/mockup_laserreach.webp",
    siteImage: "/images/site_laserreach.webp",
    challenge: "Communicate a technical SaaS product in a way that's easy to understand without overwhelming visitors.",
    solution: "Create a clear content hierarchy, structured storytelling, and purposeful calls to action that naturally guide visitors through the product.",
    process: [
      {
        title: "Clear Product Messaging",
        description: "Translating technical product capabilities into conversational, benefit-driven headlines that resonate with visitors immediately."
      },
      {
        title: "Conversion-focused Layout",
        description: "Developing a logical reading flow with supportive visual aids that build trust and address concerns step-by-step."
      },
      {
        title: "Modern Web Experience",
        description: "Combining high-performance, fast page load times with subtle interactive transitions to create a polished, responsive feel."
      }
    ],
    accentColor: "bg-[#1E293B]"
  },
  {
    id: "ikigai",
    title: "We Are Ikigai",
    category: "Featured",
    filterCategories: ["Websites", "Featured"],
    tags: ["Website Design", "User Experience", "Brand Experience"],
    year: "2025",
    client: "We Are Ikigai",
    role: "Digital Designer",
    description: "A website for We Are Ikigai, an established Asian brand, designed to strengthen its identity while creating a clean, approachable, and intuitive browsing experience.",
    longDescription: "A website for We Are Ikigai, an established Asian brand, designed to strengthen its identity while creating a clean, approachable, and intuitive browsing experience. It balances strong, traditional branding elements with clean responsive typography.",
    coverImage: "/images/mockup_ikigai.webp",
    siteImage: "/images/site_ikigai.webp",
    challenge: "Balance strong visual branding with an intuitive user experience across different devices.",
    solution: "Create a consistent visual language supported by clear navigation, thoughtful layouts, and responsive design.",
    process: [
      {
        title: "Brand Consistency",
        description: "Integrating traditional brand identity elements with modern web grids, achieving harmony between heritage and modern design."
      },
      {
        title: "Intuitive Navigation",
        description: "Simplifying multi-category pages into a clean, unified menu system that allows users to find what they need instantly."
      },
      {
        title: "Responsive Design",
        description: "Adapting complex visual elements gracefully across all viewports to ensure a consistent experience on phones or desktop screens."
      }
    ],
    accentColor: "bg-[#451A03]"
  },
  {
    id: "guramo",
    title: "Guramo Systems",
    category: "Personal",
    filterCategories: ["Landing Pages", "Personal"],
    tags: ["Website Design", "Branding", "User Experience"],
    year: "2025",
    client: "Personal Project",
    role: "Designer & Developer",
    description: "My personal project exploring branding, thoughtful user experiences, and my philosophy that good design helps people make decisions more easily.",
    longDescription: "My personal project exploring branding, thoughtful user experiences, and my philosophy that good design helps people make decisions more easily. It serves as an exploration of minimalist UI patterns and focused user flows.",
    coverImage: "/images/mockup_guramo.webp",
    siteImage: "/images/site_guramo.webp",
    challenge: "Create a website that feels trustworthy and professional without overwhelming visitors with unnecessary information.",
    solution: "Build the experience around a simple philosophy: every element should have a purpose, every interaction should feel natural, and every page should guide visitors toward the next step.",
    process: [
      {
        title: "Clear Communication",
        description: "Using humble, straightforward copywriting and clear headings to convey ideas transparently and build real user trust."
      },
      {
        title: "Thoughtful User Journey",
        description: "Mapping out key touchpoints to eliminate choice paralysis, allowing visitors to browse the portfolio with absolute ease."
      },
      {
        title: "Performance-first Experience",
        description: "Developing lightweight code with optimized images, leading to lightning-fast load times and seamless interactions on any device."
      }
    ],
    accentColor: "bg-[#090D16]"
  },
  {
    id: "wirausahain",
    title: "Wirausahain",
    category: "Personal",
    filterCategories: ["CMS", "Personal"],
    tags: ["CMS Design", "Website Design", "User Experience"],
    year: "2025",
    client: "Personal Project",
    role: "Designer & Developer",
    description: "Wirausahain is my personal content management system built for an Indonesian business news platform. I designed and developed the experience to make publishing, managing, and discovering articles simple while creating a clean reading experience for visitors.",
    longDescription: "Wirausahain is my personal content management system built for an Indonesian business news platform. I designed and developed the experience to make publishing, managing, and discovering articles simple while creating a clean reading experience for visitors. Large publication platforms often require complex interfaces, but Wirausahain was designed with minimalism and high efficiency in mind.",
    coverImage: "/images/mockup_wirausahain.webp",
    siteImage: "/images/site_wirausahain.webp",
    challenge: "News websites require an efficient publishing workflow for editors while remaining fast, organized, and easy to navigate for readers. The challenge was balancing content management with a clean reading experience.",
    solution: "I designed a content-first CMS that streamlines article management, organizes categories clearly, and presents news in a way that's easy to browse across desktop and mobile devices.",
    process: [
      {
        title: "Editorial Workflow",
        description: "Streamlining the publishing process with a clean editor and robust management tools."
      },
      {
        title: "Content-first Navigation",
        description: "Organizing news categories logically so readers can discover and browse articles effortlessly."
      },
      {
        title: "Responsive Reading Experience",
        description: "Creating a fast, accessible, and distraction-free interface optimized for reading on any screen size."
      }
    ],
    accentColor: "bg-[#111827]"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Jenkins",
    role: "Marketing Director",
    company: "Apex Solutions",
    text: "Bayu understands the core of digital marketing: clarity. He designed and built our landing page with a deep focus on user experience. He was professional, communicated clearly throughout, and the design has made it significantly easier for our clients to understand our offering.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop"
  },
  {
    id: "t2",
    name: "David Chen",
    role: "Founder",
    company: "Scribe Publishing",
    text: "Working with Bayu was an absolute pleasure. He combines a refined design aesthetic with actual technical and marketing knowledge. He guided us through the entire process, simplified our multi-page site into a clear, unified experience, and delivered exactly what we needed.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop"
  },
  {
    id: "t3",
    name: "Maya Rodriguez",
    role: "Product Manager",
    company: "Lumina Wear",
    text: "Bayu brought incredible professionalism and structure to our website redesign. He didn't just design a pretty layout; he restructured our entire marketing funnel so that visitors know exactly what to do next. His communication is outstanding.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop"
  }
];

export const AWARDS: Award[] = [
  { id: "a1", title: "Conversion Architecture", organization: "Marketing Strategy", year: "Focus", project: "Landing Pages" },
  { id: "a2", title: "Clear Visual Hierarchy", organization: "User Experience", year: "Focus", project: "Websites" },
  { id: "a3", title: "Modern Code Quality", organization: "Front-end Development", year: "Focus", project: "Performance" },
  { id: "a4", title: "Frictionless Journeys", organization: "Decision Design", year: "Focus", project: "Marketing Funnels" }
];

export const CAPABILITIES: StudioCapability[] = [
  {
    title: "Website Design",
    description: "I design modern, responsive business websites that communicate clearly, build trust, and create a strong first impression for your brand.",
    items: ["Business Websites", "Responsive Design", "Information Architecture", "Performance Optimization"]
  },
  {
    title: "Landing Pages & Marketing Funnels",
    description: "I design focused customer journeys that guide visitors naturally toward taking action through thoughtful layout, messaging, and conversion-focused design.",
    items: ["Landing Pages", "Marketing Funnels", "Conversion Optimization", "Call-to-Action Strategy"]
  },
  {
    title: "User Experience (UX)",
    description: "I make digital experiences intuitive, effortless to navigate, and free from unnecessary complexity. Good design isn't about adding more—it's about making decisions easier, helping visitors understand what to do next without feeling overwhelmed.",
    items: ["User Experience (UX)", "Wireframing", "Interaction Design", "Accessibility"]
  }
];
