'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';
import ProjectTopicNav from '@/app/components/ProjectTopicNav';
import FloatingTabNav from '@/app/components/FloatingTabNav';

// ─── Edit your project content here ───────────────────────────────────────────

const project = {
  id: "iPet",
  title: "iPet Mobile App",
  description: "App Design",
  bgImage: "/work-1.png",

  category: 'Product Design',
  isGroup: true,
  tags: ['UI Design', 'UX Research', 'Pet Care'],

  duration: "Sep 2024 - Dec 2024",

  overview:
    "A mobile app that uses AI to provide real-time insights into pet behaviours, helping owners understand their pets' needs. With live monitoring and remote access, it ensures pet well-being and pace of mind for owners, even when away..",

  collaborators: 'Yonghan Liu, Runqing Zhang, Xinglong Zhou, Yijing Shen, Lyle Guo',
  role: "Conducted UX research and led the design process.",

  tools: ["Figma", "Competitor Research", "Affinity Diagram", "Prioritization Matrix", "User Flow Chart","Journey Map"],
};

// ─── Tabs ──────────────────────────────────────────────────────────────────────

const TABS = ['Overview', 'Problem Discovery', 'UX Research', 'Ideation', 'Design', 'Iteration'];

const TAB_CONTENT = {
  'Overview':          '/iPet/iPet-overview.png',
  'Problem Discovery': '/iPet/iPet-problemdiscovery.png',
  'UX Research':       '/iPet/iPet-uxresearch.png',
  'Ideation':          '/iPet/iPet-ideation.png',
  'Design':            '/iPet/iPet-design.png',
  'Iteration':         '/iPet/iPet-Iteration.png',
};

// ──────────────────────────────────────────────────────────────────────────────

function ProjectTabs() {
  const [activeTab, setActiveTab] = useState('Overview');

  const scrollToTabs = () => {
    document.getElementById('ipet-tab-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSideTabClick = (tab) => {
    setActiveTab(tab);
    scrollToTabs();
  };

  return (
    <div>
      {/* Floating side tabs (desktop only, stays put while scrolling) */}
      <FloatingTabNav
        tabs={TABS.map(tab => ({ label: tab, value: tab }))}
        active={activeTab}
        onSelect={handleSideTabClick}
      />

      {/* Tab bar */}
      <ProjectTopicNav id="ipet-tab-bar" tabs={TABS.map(tab => ({ label: tab, value: tab }))} active={activeTab} onSelect={setActiveTab} />

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <img
            src={TAB_CONTENT[activeTab]}
            alt={activeTab}
            className="w-full h-auto"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Page() {
  return (
    <ProjectLayout project={project} scrollTargetId="ipet-tab-bar">
      <ProjectTabs />
    </ProjectLayout>
  );
}
