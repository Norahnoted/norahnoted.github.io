'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const tabs = [
  { label: 'Card Sorting',       src: '/coffeeShopIA/image1.png' },
  { label: 'Website Schematic',  src: '/coffeeShopIA/image2.png' },
  { label: 'Wireframes',         src: '/coffeeShopIA/image3.png' },
];

const project = {
  id: 'coffee-shop-ia',
  title: 'Coffee Shop IA Case Study',
  description: 'UI/UX Design',
  bgImage: '/coffeeShopIA/image3.png',

  category: 'Product Design',
  isGroup: false,
  tags: ['Information Architecture', 'UX Research', 'e-Commerce'],

  duration: 'Fall 2024',

  overview:
    'An information architecture project for a coffee shop website — analyzing competitor IA patterns, conducting open card sorting to capture user mental models, designing a website schematic, and wireframing both a traditional and a modern product list page.',

  tools: ['Figma', 'UXTweak', 'Card Sorting', 'Competitive Analysis', 'Wireframing'],
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
                layoutId="coffee-shop-tab-underline"
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
