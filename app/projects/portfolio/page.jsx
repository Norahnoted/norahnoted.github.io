'use client';

import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: 'portfolio',
  title: 'Personal Portfolio Website',
  description: 'Web Design & Development',
  bgImage: '/work-4.png',

  category: 'Web Development',
  isGroup: false,
  tags: ['Next.js', 'React', 'Tailwind CSS'],

  duration: 'Jan 2026 - Mar 2026',

  overview:
    'A personal portfolio website designed and developed from scratch to showcase UX/UI design work, data analysis projects, and web development experience.',

  tools: [
    'Next.js',
    'React',
    'Tailwind CSS',
    'Framer Motion',
    'Figma',
    'TypeScript',
  ],
};

export default function Page() {
  return <ProjectLayout project={project} />;
}
