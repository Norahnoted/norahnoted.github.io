'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';


import ProjectLayout from '@/app/components/ProjectLayout';

import storyboard1    from '@/assets/PitchIn/Storyboard1.png';
import storyboard2    from '@/assets/PitchIn/Storyboard2.png';
import taskFlow1      from '@/assets/PitchIn/Task.png';
import taskFlow2      from '@/assets/PitchIn/flow2.png';
import designSystem1  from '@/assets/PitchIn/designsystem1.png';
import designSystem2  from '@/assets/PitchIn/designsystem2.png';
import designSystem3  from '@/assets/PitchIn/designsystem3.png';
import designSystem4  from '@/assets/PitchIn/designsystem4.png';
import components from "@/assets/PitchIn/components.png";

const project = {
  id: 'pitchin',
  title: 'PitchIn Mobile App',
  description: 'App Design',
  bgImage: '/work-2.png',

  category: 'Product Design',
  isGroup: false,
  tags: ['UI Design', 'UX Design'],

  duration: 'Jan 2025 - Apr 2025',

  overview:
    'PitchIn is a platform for close-knit communities to plan, organize, and manage events with transparency and decentralized authority. The platform helps users manage tasks, track resources, assign responsibilities, and ensures that everyone has a clear and equitable role in the process, fostering a sense of ownership and shared purpose.',

  tools: ['Figma'],
};

const TABS = ['Storyboard', 'Task Flow', 'Design System', 'Components'];

const TAB_IMAGES = {
  'Storyboard':    [storyboard1, storyboard2],
  'Task Flow':     [taskFlow1, taskFlow2],
  'Design System': [designSystem1, designSystem2, designSystem3, designSystem4],
  'Components':    [components],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState('Storyboard');

  return (
    <ProjectLayout project={project}>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 mb-8 w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2.5 text-sm font-PlusJakarta transition-colors ${
              activeTab === tab
                ? 'text-[#4A423C] dark:text-white'
                : 'text-[#4A423C]/40 dark:text-white/40 hover:text-[#4A423C]/70 dark:hover:text-white/60'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="pitchin-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DDE0C7] dark:bg-[#DDE0C7]"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col gap-4"
        >
          {TAB_IMAGES[activeTab].map((src, i) =>
            activeTab === 'Storyboard' ? (
              <div key={i} className="w-full overflow-x-auto">
                <Image src={src} alt={`Storyboard ${i + 1}`} className="h-[480px] w-auto max-w-none" />
              </div>
            ) : (
              <Image key={i} src={src} alt={`${activeTab} ${i + 1}`} className="w-full" />
            )
          )}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
