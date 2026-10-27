'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';
import ProjectTopicNav from '@/app/components/ProjectTopicNav';
import FloatingTabNav from '@/app/components/FloatingTabNav';

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

const TABS = ['DFD', 'BPMN', 'ERD', 'UML Diagram'];

const TAB_IMAGES = {
  'DFD':  ['/Modelling/dfd1.png', '/Modelling/dfd2.png', '/Modelling/dfd3.png'],
  'BPMN': ['/Modelling/BPMN1.png', '/Modelling/BPMN2.jpg'],
  'ERD':  ['/Modelling/ERD1.png', '/Modelling/ERD2.png'],
};

const UML_DIAGRAMS = [
  { label: 'Activity Diagram', src: '/Modelling/UMLActivity.png', narrow: true },
  { label: 'Use Case Diagram', src: '/AIH/usecasediagram.drawio.png' },
  { label: 'Class Diagram', src: '/AIH/classdiagram.png' },
  { label: 'Sequence Diagram', src: '/AIH/sequencediagram.jpg' },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState('DFD');
  const images = TAB_IMAGES[activeTab];
  const label = 'text-sm uppercase tracking-widest text-gray-400 dark:text-white/40 font-PlusJakarta';

  const scrollToTabs = () => {
    document.getElementById('bpm-tab-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSideTabClick = (tab) => {
    setActiveTab(tab);
    scrollToTabs();
  };

  return (
    <ProjectLayout project={project} scrollTargetId="bpm-tab-bar">
      {/* Floating side tabs (desktop only, stays put while scrolling) */}
      <FloatingTabNav
        tabs={TABS.map(tab => ({ label: tab, value: tab }))}
        active={activeTab}
        onSelect={handleSideTabClick}
      />

      {/* Tab bar */}
      <ProjectTopicNav id="bpm-tab-bar" tabs={TABS.map(tab => ({ label: tab, value: tab }))} active={activeTab} onSelect={setActiveTab} />

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-8"
        >
          {activeTab === 'UML Diagram' ? (
            UML_DIAGRAMS.map((d, i) => (
              <div key={i} className="flex flex-col gap-3">
                <h3 className={label}>{d.label}</h3>
                {d.narrow ? (
                  <div
                    className="w-full max-w-sm mx-auto h-[500px] overflow-y-auto rounded-lg border border-gray-200 dark:border-white/10"
                    style={{ overflowAnchor: 'none' }}
                  >
                    <img
                      src={d.src}
                      alt={d.label}
                      className="w-full h-auto block"
                      onLoad={(e) => { e.currentTarget.parentElement.scrollTop = 0; }}
                    />
                  </div>
                ) : (
                  <img src={d.src} alt={d.label} className="w-full h-auto" />
                )}
              </div>
            ))
          ) : (
            images.map((src, i) => (
              <img key={i} src={src} alt={`${activeTab} ${i + 1}`} className="w-full h-auto" />
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
