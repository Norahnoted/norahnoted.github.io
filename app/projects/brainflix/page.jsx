'use client';

import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: 'brainflix',
  title: 'BrainFlix',
  description: 'Streaming Platform',
  bgImage: '/work-3.png',

  category: 'Web Development',
  isGroup: true,
  tags: ['Full-Stack', 'React', 'Node.js'],

  duration: '2024',

  overview:
    'A full-stack prototype for a video streaming platform called BrainFlix — built as a React single-page application with React Router for client-side navigation, paired with a custom Node.js/Express server that handles API requests and data persistence across both sides of the application.',

  collaborators: 'Coming soon.',
  role: 'Coming soon.',

  tools: [
    'React',
    'React Router',
    'Node.js',
    'Express',
    'REST API',
    'CSS / SASS',
    'JavaScript (ES6+)',
  ],
};

export default function Page() {
  return <ProjectLayout project={project} />;
}
