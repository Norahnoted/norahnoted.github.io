'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

// ─── Import tab images from assets ────────────────────────────────────────────
import iPetOverview         from '@/assets/iPet/iPet-overview.png';
import iPetProblemDiscovery from "@/assets/iPet/iPet-problemdiscovery.png";
import iPetUXResearch       from '@/assets/iPet/iPet-uxresearch.png';
import iPetIdeation         from '@/assets/iPet/iPet-ideation.png';
import iPetDesign           from '@/assets/iPet/iPet-design.png';
import iPetIteration        from '@/assets/iPet/iPet-Iteration.png';

// ─── Edit your project content here ───────────────────────────────────────────

const project = {
  id: "iPet",
  title: "iPet Mobile App",
  description: "App Design",
  bgImage: "/work-1.png",

  category: 'Product Design',
  isGroup: true,
  tags: ['UI Design', 'UX Research', 'App Design'],

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
  'Overview':          iPetOverview,
  'Problem Discovery': iPetProblemDiscovery,
  'UX Research':       iPetUXResearch,
  'Ideation':          iPetIdeation,
  'Design':            iPetDesign,
  'Iteration':         iPetIteration,
};

// ──────────────────────────────────────────────────────────────────────────────

function ProjectTabs() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 mb-8 w-fit">
        {TABS.map((tab) => (
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
                layoutId="ipet-tab-underline"
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <Image
            src={TAB_CONTENT[activeTab]}
            alt={activeTab}
            className="w-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Page() {
  return (
    <ProjectLayout project={project}>
      <ProjectTabs />
    </ProjectLayout>
  );
}
