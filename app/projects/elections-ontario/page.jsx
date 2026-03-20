'use client';

import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: 'elections-ontario',
  title: 'EO Internship Program Design',
  description: 'Service Design',
  bgImage: '/preview-elections-ontario.png',
  category: 'Product Design',
  isGroup: true,
  ongoing: true,
  tags: ['Public Service'],
  duration: 'Jan 2026 – Apr 2026',
  collaborators: 'Rachel Lau Xin Yi, Amanda Wang, Yijia Li, Elliot Liang',
  role: 'Coming soon.',
  overview: 'Coming soon.',
  tools: ['Figma', 'Co-design Workshop', 'Service Map', 'Claude Code'],
};

export default function Page() {
  return <ProjectLayout project={project} />;
}
