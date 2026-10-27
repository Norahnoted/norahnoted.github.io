'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';
import ProjectTopicNav from '@/app/components/ProjectTopicNav';
import FloatingTabNav from '@/app/components/FloatingTabNav';

const project = {
  id: "pitchin",
  title: "PitchIn Mobile App",
  description: "App Design",
  bgImage: "/work-2.png",

  category: "Product Design",
  isGroup: false,
  tags: ["UI Design", "Social"],

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

  const scrollToTabs = () => {
    document.getElementById('pitchin-tab-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSideTabClick = (tab) => {
    setActiveTab(tab);
    scrollToTabs();
  };

  return (
    <ProjectLayout project={project} scrollTargetId="pitchin-tab-bar">
      {/* Floating side tabs (desktop only, stays put while scrolling) */}
      <FloatingTabNav
        tabs={TABS.map(tab => ({ label: tab, value: tab }))}
        active={activeTab}
        onSelect={handleSideTabClick}
      />

      {/* Tab bar */}
      <ProjectTopicNav id="pitchin-tab-bar" tabs={TABS.map(tab => ({ label: tab, value: tab }))} active={activeTab} onSelect={setActiveTab} />

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
