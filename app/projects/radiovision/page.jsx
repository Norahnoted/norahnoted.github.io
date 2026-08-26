'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const researchImages = [
  '/radioVision/RVimage1.jpg',
  '/radioVision/RVimage2.jpg',
  '/radioVision/RVimage3.jpg',
  '/radioVision/RVimage4.jpg',
  '/radioVision/RVimage5.jpg',
  '/radioVision/RVimage6.jpg',
  '/radioVision/RVimage7.jpg',
  '/radioVision/RVimage8.jpg',
  '/radioVision/RVimage9.jpg',
  '/radioVision/RVimage10.jpg',
  '/radioVision/RVimage12.jpg',
  '/radioVision/RVimage13.jpg',
];

const designSystemImages = [
  '/radioVision/RVds1.jpg',
  '/radioVision/RVds2.png',
  '/radioVision/RVds3.jpg',
  '/radioVision/RVds4.jpg',
];

const contextImages = [
  '/radioVision/RVcontext1.jpg',
  '/radioVision/RVcontext2.png',
  '/radioVision/RVcontext3.jpg',
  '/radioVision/RVcontext4.jpg',
];

const tabs = [
  { label: 'Context' },
  { label: 'Design' },
  { label: 'Design System' },
  { label: 'Research Phase:' },
  { label: 'Survey Data Analysis' },
  { label: 'Iteration' },
];

const project = {
  id: "radiovision",
  title: "RadioVision Website",
  description: "Web Design",
  bgImage: "/preview-radiovision.png",
  category: "Product Design",
  isGroup: true,
  ongoing: true,
  tags: ["UI Design", "UX Research", "Healthcare"],
  duration: "Jan 2026 – Apr 2026",
  collaborators: "Guihao Fu, Ching-Wen Chang, Haoran Zhang, Amanda Wang",
  role: "Conducted UX research through stakeholder interviews and competitive auditing, and designed Hi-Fi UI prototypes in Figma.",
  overview:
    "A marketing website that communicates complex technology to both B2B and B2C audiences, supporting brand positioning and digital marketing efforts.",
  tools: ["Figma", "Survey", "Python (pandas)", "Journey Map"],
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
                layoutId="radiovision-tab-underline"
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
          className="flex flex-col gap-8"
        >
          {activeTab === 0 ? (
            <div className="flex flex-col">
              {contextImages.map((src, i) => (
                <div key={i} className="w-full overflow-hidden">
                  <img src={src} alt={`Context image ${i + 1}`} className="w-full h-auto block" />
                </div>
              ))}
            </div>
          ) : activeTab === 1 ? (
            <div className="flex flex-col gap-8">
              <div className="w-full overflow-hidden rounded-lg">
                <iframe
                  style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                  width="100%"
                  height="600"
                  src="https://embed.figma.com/proto/QZTjveVOL4kfEEpvf0xG6z/RadioVision-Prototype?node-id=954-10762&viewport=1076%2C33%2C0.13&scaling=scale-down-width&content-scaling=fixed&starting-point-node-id=954%3A10762&page-id=1%3A3&embed-host=share"
                  allowFullScreen
                />
              </div>
              <div className="w-full overflow-hidden">
                <img src="/radioVision/Sitemap.png" alt="Sitemap" className="w-full h-auto block" />
              </div>
            </div>
          ) : activeTab === 2 ? (
            <div className="flex flex-col">
              {designSystemImages.map((src, i) => (
                <div key={i} className="w-full overflow-hidden">
                  <img src={src} alt={`Design system image ${i + 1}`} className="w-full h-auto block" />
                </div>
              ))}
            </div>
          ) : activeTab === 3 ? (
            <div className="flex flex-col">
              {researchImages.map((src, i) => (
                <div key={i} className="w-full overflow-hidden">
                  <img src={src} alt={`Research image ${i + 1}`} className="w-full h-auto block" />
                </div>
              ))}
              <div className="w-full overflow-hidden mt-8">
                <img src="/radioVision/RVuserjourney.jpg" alt="User Journey Map" className="w-full h-auto block" />
              </div>
            </div>
          ) : activeTab === 4 ? (
            <div className="w-full overflow-hidden">
              <img src="/radioVision/RVdataanalysis.jpg" alt="Survey Data Analysis" className="w-full h-auto block" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <div className="w-2 h-2 rounded-full bg-[#9DB86A] animate-pulse" />
              <p className="text-sm font-PlusJakarta text-gray-400 dark:text-white/40">
                Iteration is currently in progress. Check back soon.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
