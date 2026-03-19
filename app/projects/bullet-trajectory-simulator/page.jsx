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
  duration: 'Coming soon.',
  overview: 'Coming soon.',
  tools: ['Figma'],
};

export default function Page() {
  return (
    <ProjectLayout project={project} defaultDark>
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="w-2 h-2 rounded-full bg-[#9DB86A] animate-pulse" />
        <p className="text-sm font-PlusJakarta text-gray-400 dark:text-white/40">
          Content is currently in progress — check back soon.
        </p>
      </div>
    </ProjectLayout>
  );
}
