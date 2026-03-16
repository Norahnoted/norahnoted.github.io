'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

import bpmn1       from '@/assets/Modelling/BPMN1.png';
import bpmn2       from '@/assets/Modelling/BPMN2.jpg';
import erd1        from '@/assets/Modelling/ERD1.png';
import erd2        from '@/assets/Modelling/ERD2.png';
import umlActivity from '@/assets/Modelling/UMLActivity.png';
import dfd1        from '@/assets/Modelling/dfd1.png';
import dfd2        from '@/assets/Modelling/dfd2.png';
import dfd3        from '@/assets/Modelling/dfd3.png';

const project = {
  id: 'business-process-modelling',
  title: 'Business Process Modelling',
  description: 'Business Analysis',
  bgImage: '/work-1.png',
  category: 'Business Analysis',
  isGroup: false,
  tags: ['Business Analysis', 'Process Modelling'],
  duration: '2025 – 2026',
  overview: 'Coming soon.',
  tools: ['draw.io'],
};

const TABS = ['DFD', 'BPMN', 'ERD', 'UML Activity Diagram'];

const TAB_IMAGES = {
  'DFD':                  [dfd1, dfd2, dfd3],
  'BPMN':                 [bpmn1, bpmn2],
  'ERD':                  [erd1, erd2],
  'UML Activity Diagram': [umlActivity],
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
            <Image key={i} src={src} alt={`${activeTab} ${i + 1}`} className="w-full" />
          ))}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
