'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: "flot-ai",
  title: "Flot AI Workplace",
  description: "Web Design",
  bgImage: "/work-3.png",
  category: "Product Design",
  isGroup: true,
  tags: ["UI Design", "UX Design"],

  duration: "Mar 2026",

  overview:
    " A mindful AI workspace that helps people use AI tools intentionally by tracking environmental impact and rewarding users for choosing a more sustainable option. Won 1st Place at the 24-hour UDesign Designathon 2026.",

  collaborators: "Mina Wang, Kex Zhang",
  role: "Initiated the project idea. Led the UI design, and crafted the presentation narrative.",

  tools: ["Figma", "Interview", "Desk research"],
};

const TABS = ['Problem Define', 'UX Research', 'Design', 'Next Steps'];

const DESIGN_TITLES = [
  'Mindful Prompting',
  'Real-Time Energy Tracking',
  'Bear Companion',
  'Usage Detail Page',
  'Icon Collections',
];

const DESIGN_CAPTIONS = [
  "On the left, you pick the model you like, whether it's Gemini or ChatGPT.\nBefore you submit any prompt, Flot reminds you to consider whether AI is necessary by offering alternatives like Google search, Wikipedia, or the library. \nEach time you choose an alternative, you earn points for rewards.",
  "After each response, Flot displays the total energy used based on tokens. In the top right, Flot displays daily energy usage. This section shows the real-time environmental footprint.",
  "When the user clicks the bear icon, a popover opens. It shows the bear's mood — Happy, Caution, or Critical — and the message changes with the mood. \nOn the Settings page, users can choose icons they already own, and they can also open the store to redeem new icons with the points they have collected.",
  "If the user wants more information, they click the icon and go to this detail page. \nAt the top, Flot shows a clear summary of today's totals. Below, it breaks down usage by time, so users can see when their impact is highest during the day.",
  "Flot offers different icon collections. They all follow the same levels: Low, Medium, High, and High +. \nThe icons become more positive as users improve. \nIf the user stays in High for two days, it upgrades to High Plus and shows a special icon, like the polar bear.",
];

const TAB_IMAGES = {
  'UX Research':    ['/Flot/UX Research.png'],
  'Problem Define': ['/Flot/Problem define.png'],
  'Design':         ['/Flot/design1.png', '/Flot/design2.png', '/Flot/design3.png', '/Flot/design4.png', '/Flot/design5.png'],
  'Next Steps':     ['/Flot/nextSteps.png'],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState('Problem Define');

  return (
    <ProjectLayout project={project}>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 mb-8 w-fit">
        {TABS.map(tab => (
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
                layoutId="flot-tab-underline"
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
          {TAB_IMAGES[activeTab].map((src, i) => (
            <div key={i} className="flex flex-col gap-3">
              {activeTab === 'Design' && DESIGN_TITLES[i] && (
                <h3 className="text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white mt-2">
                  {DESIGN_TITLES[i]}
                </h3>
              )}
              {activeTab === 'Design' && DESIGN_CAPTIONS[i] && (
                <p className="text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-loose whitespace-pre-line my-3">
                  {DESIGN_CAPTIONS[i]}
                </p>
              )}
              <img src={src} alt={`${activeTab} ${i + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
