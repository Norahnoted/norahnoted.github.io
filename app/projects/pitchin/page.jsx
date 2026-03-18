'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: "pitchin",
  title: "PitchIn Mobile App",
  description: "App Design",
  bgImage: "/work-2.png",

  category: "Product Design",
  isGroup: false,
  tags: ["UI Design"],

  duration: "Jan 2025 - Apr 2025",

  overview:
    "PitchIn is a group event planning tool that helps communities organize tasks, assign responsibilities, and manage resources collaboratively.",

  tools: ["Figma"],
};

const TABS = ['Storyboard', 'Task Flow', 'Design System', 'Components'];

const TAB_IMAGES = {
  'Storyboard':    ['/PitchIn/onmock.png', '/PitchIn/Storyboard1.png', '/PitchIn/Storyboard2.png'],
  'Task Flow':     ['/PitchIn/Task.png', '/PitchIn/flow2.png'],
  'Design System': ['/PitchIn/designsystem1.png', '/PitchIn/designsystem2.png', '/PitchIn/designsystem3.png', '/PitchIn/designsystem4.png'],
  'Components':    ['/PitchIn/components.png'],
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
            activeTab === 'Storyboard' && i > 0 ? (
              <div key={i} className="w-full overflow-x-auto">
                <img src={src} alt={`Storyboard ${i + 1}`} className="h-[480px] w-auto max-w-none" />
              </div>
            ) : (
              <img key={i} src={src} alt={`${activeTab} ${i + 1}`} className="w-full h-auto" />
            )
          )}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
