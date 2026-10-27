'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';
import ProjectTopicNav from '@/app/components/ProjectTopicNav';
import FloatingTabNav from '@/app/components/FloatingTabNav';

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
  tags: ["UX Research", "Information Architecture", "Digital Marketing"],

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

  const scrollToTabs = () => {
    document.getElementById('content-audit-tab-bar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSideTabClick = (i) => {
    setActiveTab(i);
    scrollToTabs();
  };

  return (
    <ProjectLayout project={project} scrollTargetId="content-audit-tab-bar">
      {/* Floating side tabs (desktop only, stays put while scrolling) */}
      <FloatingTabNav
        tabs={tabs.map((tab, i) => ({ label: tab.label, value: i }))}
        active={activeTab}
        onSelect={handleSideTabClick}
      />

      {/* Tab bar */}
      <ProjectTopicNav id="content-audit-tab-bar" tabs={tabs.map((tab,i) => ({ label: tab.label, value: i }))} active={activeTab} onSelect={setActiveTab} />

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
