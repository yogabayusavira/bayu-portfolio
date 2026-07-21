/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  filterCategories: string[];
  tags: string[];
  year: string;
  client: string;
  role: string;
  description: string;
  longDescription: string;
  coverImage: string;
  siteImage: string;
  challenge: string;
  solution: string;
  process: {
    title: string;
    description: string;
  }[];
  accentColor: string;
  liveUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatarUrl: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  project: string;
}

export interface StudioCapability {
  title: string;
  description: string;
  items: string[];
}
