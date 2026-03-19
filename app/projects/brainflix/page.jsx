'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const tabs = [
  { label: 'Video Page', src: '/brainfilx/Video Page.png' },
  { label: 'Upload Page', src: '/brainfilx/Upload Page.png' },
];

const project = {
  id: 'brainflix',
  title: 'BrainFlix',
  description: 'Streaming Platform',
  bgImage: '/preview-brainflix.png',

  category: 'Web Development',
  isGroup: false,
  tags: ['Full-Stack', 'React', 'Node.js'],

  duration: 'Mar 2024',

  overview:
    'A full-stack prototype for a video streaming platform called BrainFlix.',

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
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ProjectLayout project={project}>
      {/* Tech Stack */}
      <div className="flex flex-col gap-3 mb-10">
        <h2 className="text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white">Tech Stack</h2>
        <ul className="flex flex-col gap-2 text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed list-disc list-inside pl-4">
          <li>Built as a React single-page application with React Router for client-side navigation</li>
          <li>Custom Node.js/Express server that handles API requests</li>
          <li>Data persistence across both sides of the application</li>
        </ul>
      </div>

      {/* GitHub Link */}
      <a
        href="https://github.com/Norahnoted/brainflix"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full border border-gray-300 dark:border-white/20 text-sm font-PlusJakarta text-gray-600 dark:text-white/70 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white transition w-fit"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        GitHub Repo
      </a>

      {/* Tab bar */}
      <div className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 mb-8 w-fit">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`relative px-4 py-2.5 text-sm font-PlusJakarta transition-colors ${
              activeTab === i
                ? 'text-[#4A423C] dark:text-white'
                : 'text-[#4A423C]/40 dark:text-white/40 hover:text-[#4A423C]/70 dark:hover:text-white/60'
            }`}
          >
            {tab.label}
            {activeTab === i && (
              <motion.div
                layoutId="brainflix-tab-underline"
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
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full overflow-hidden border border-gray-100 dark:border-white/10">
            <img src={tabs[activeTab].src} alt={tabs[activeTab].label} className="w-full h-auto block" />
          </div>
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
