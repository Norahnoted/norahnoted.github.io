'use client';

import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: 'bullet-trajectory-simulator',
  title: 'Bullet Trajectory Simulator',
  description: 'Mixed Reality UX Design',
  bgImage: '/preview-bullet-trajectory.png',
  category: 'Product Design',
  isGroup: true,
  tags: ['UI Design', 'UX Design', 'Mixed Reality'],
  duration: 'Sep 2025 – Dec 2025',
  collaborators: 'Haoran Zhang, Zhihui Huang',
  role: 'Coming soon.',
  overview: 'Coming soon.',
  tools: [],
};

export default function Page() {
  return <ProjectLayout project={project} />;
}
