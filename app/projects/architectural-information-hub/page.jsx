'use client';

import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: 'architectural-information-hub',
  title: 'Architectural Information Hub',
  description: 'Business Analysis',
  bgImage: '/preview-arch-hub.png',
  category: 'Business Analysis',
  isGroup: true,
  tags: ['Business Analysis'],
  duration: 'Jan 2026 – Apr 2026',
  collaborators: 'Cordelia Shen, Kex Zhang, Joy Gu, Vlad Serenko',
  role: 'Coming soon.',
  overview: 'Coming soon.',
  tools: [],
};

export default function Page() {
  return <ProjectLayout project={project} />;
}
