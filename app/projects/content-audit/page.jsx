'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const tabs = [
  { label: 'Overview',              src: '/contentAudit/contentAudit_overview.png' },
  { label: 'Content Inventory',     src: '/contentAudit/contentAudit_contentIventory.png' },
  { label: 'Issues: Nav',           src: '/contentAudit/contentAudit_navIssues.png' },
  { label: 'Content Page',          src: '/contentAudit/contentAudit_contentIssue.png' },
  { label: 'Content Quality & SEO', src: '/contentAudit/contentAudit_contentQuality& SEO.png' },
];

const project = {
  id: "content-audit",
  title: "Content Audit Case Study",
  description: "UX Research & Strategy",
  bgImage: "/work-2.png",

  category: "Product Design",
  isGroup: false,
  tags: ["UX Research", "Digital Marketing & SEO"],

  duration: "Sep 2024 - Dec 2024",

  overview:
    "A content audit case study evaluating a website’s information hierarchy, navigation structure, content quality, and SEO performance, with a focus on information architecture and using tree testing as a UX research method.",

  tools: [
    "Tree Testing", "Figma",
    "Content Analysis",
    "Screaming Frog SEO Spider",
    "UX Tweak",
    "Task Priority Table",
  ],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ProjectLayout project={project}>
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
                layoutId="content-audit-tab-underline"
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
          className="w-full overflow-hidden border border-gray-100 dark:border-white/10"
        >
          <img
            src={tabs[activeTab].src}
            alt={tabs[activeTab].label}
            className="w-full h-auto"
          />
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
