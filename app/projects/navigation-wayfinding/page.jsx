'use client';

import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: 'navigation-wayfinding',
  title: 'Navigation & Wayfinding Design',
  description: 'Accessibility & Inclusive Design',
  bgImage: '/work-2.png',

  category: 'Product Design',
  isGroup: true,
  tags: ['Accessibility & Inclusive Design', 'UX Research'],

  duration: 'Sep 2025 - Dec 2025',

  overview: 'Coming soon.',

  collaborators: 'Coming soon.',
  role: 'Coming soon.',

  tools: ['Figma'],
};

export default function Page() {
  return <ProjectLayout project={project} />;
}
