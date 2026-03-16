'use client';

import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: 'instock',
  title: 'InStock',
  description: 'Inventory Management System',
  bgImage: '/work-1.png',

  category: 'Web Development',
  isGroup: true,
  tags: ['Full-Stack', 'MySQL', 'Node.js'],

  duration: '2024',

  overview:
    'InStock is a full-stack inventory management system designed to replicate the operations of an actual chain of warehouses. It allows users to manage warehouse locations, track inventory items across multiple sites, and perform CRUD operations through a clean, responsive interface.',

  collaborators: 'Coming soon.',
  role: 'Coming soon.',

  tools: [
    'ReactJS',
    'SASS',
    'Node.js',
    'ExpressJS',
    'MySQL',
    'Knex.js',
    'REST API',
  ],
};

export default function Page() {
  return <ProjectLayout project={project} />;
}
