'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: 'business-process-modelling',
  title: 'Business Process Modelling',
  description: 'Business Analysis',
  bgImage: '/work-1.png',
  category: 'Business Analysis',
  isGroup: false,
  tags: ['Process Modelling'],
  duration: '2025 – 2026',
  overview: 'Different business process modelling techniques learned and used throughout different system analysis projects.',
  tools: ['draw.io'],
};

const TABS = ['DFD', 'BPMN', 'ERD', 'UML Activity Diagram'];

const TAB_IMAGES = {
  'DFD':                  ['/Modelling/dfd1.png', '/Modelling/dfd2.png', '/Modelling/dfd3.png'],
  'BPMN':                 ['/Modelling/BPMN1.png', '/Modelling/BPMN2.jpg'],
  'ERD':                  ['/Modelling/ERD1.png', '/Modelling/ERD2.png'],
  'UML Activity Diagram': ['/Modelling/UMLActivity.png'],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState('DFD');
  const images = TAB_IMAGES[activeTab];

  return (
    <ProjectLayout project={project}>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 mb-8 w-fit">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 py-2.5 text-sm font-PlusJakarta transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'text-[#4A423C] dark:text-white'
                : 'text-[#4A423C]/40 dark:text-white/40 hover:text-[#4A423C]/70 dark:hover:text-white/60'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="bpm-tab-underline"
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
          className="flex flex-col gap-4"
        >
          {images.map((src, i) => (
            <img key={i} src={src} alt={`${activeTab} ${i + 1}`} className="w-full h-auto" />
          ))}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
