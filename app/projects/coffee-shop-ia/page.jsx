'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const tabs = [
  { label: 'Card Sorting',      src: '/coffeeShopIA/image1.png' },
  { label: 'Website Schematic', src: '/coffeeShopIA/image2.png' },
  { label: 'Wireframes',        src: null },
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
    'An information architecture project for a coffee shop website, involving competitor analysis of navigation, layout, filtering, sorting, and labeling patterns. Open card sorting was conducted to capture user mental models, informing the proposed site structure and product listing page wireframes.',
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
          className="flex flex-col gap-8"
        >
          {activeTab === 0 ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white">
                  Card Sorting Summary
                </h3>
                <div className="flex flex-col gap-4 text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed">
                  <p>An <strong className="text-[#5A6538] dark:text-[#DDE0C7]">open card sorting</strong> study was conducted via UXTweak with <strong className="text-[#5A6538] dark:text-[#DDE0C7]">9 respondents</strong>. I chose an open card sorting approach because it allows participants the flexibility to create their own categories, which can provide deeper insights into their mental models and preferences.</p>
                  <p>While designing the card sorting, I specifically adjusted some of the naming to a <strong className="text-[#5A6538] dark:text-[#DDE0C7]">uniform format</strong>, such as &lsquo;high roast&rsquo;, &lsquo;low roast&rsquo;, &lsquo;fruity&rsquo; and &lsquo;chocolatey&rsquo;, to avoid unnecessary confusion caused by <strong className="text-[#5A6538] dark:text-[#DDE0C7]">overly general terms</strong>.</p>
                  <p>Most respondents used <strong className="text-[#5A6538] dark:text-[#DDE0C7]">&lsquo;Type&rsquo;</strong> as one of the category names. However, the interpretation of what <strong className="text-[#5A6538] dark:text-[#DDE0C7]">&lsquo;Type&rsquo;</strong> included varied among them. For example, some considered <strong className="text-[#5A6538] dark:text-[#DDE0C7]">&lsquo;Type&rsquo;</strong> to include categories like decaf, blends, and pods, while others categorized it with specific coffee preparation methods like espresso and drip coffee.</p>
                  <p>In terms of coffee preparation methods, there was variation in how respondents named the categories, with terms like <strong className="text-[#5A6538] dark:text-[#DDE0C7]">&lsquo;Brewing method&rsquo;</strong>, <strong className="text-[#5A6538] dark:text-[#DDE0C7]">&lsquo;Type of coffee&rsquo;</strong>, and <strong className="text-[#5A6538] dark:text-[#DDE0C7]">&lsquo;products&rsquo;</strong> being used. Additionally, the placement of <strong className="text-[#5A6538] dark:text-[#DDE0C7]">&lsquo;Single origin&rsquo;</strong> and <strong className="text-[#5A6538] dark:text-[#DDE0C7]">&lsquo;Blends&rsquo;</strong> cards varied, with most seeing them as part of the origin category but some considering them types of coffee.</p>
                  <p>Lastly, the <strong className="text-[#5A6538] dark:text-[#DDE0C7]">categorization of acidity</strong> also showed variation, with some seeing it as a standalone category, while two respondents placed it under &lsquo;Flavor&rsquo; or &lsquo;Roast level&rsquo;.</p>
                </div>
              </div>
              <div className="w-full overflow-hidden border border-gray-100 dark:border-white/10">
                <img src={tabs[0].src} alt={tabs[0].label} className="w-full h-auto" />
              </div>
            </div>
          ) : activeTab === 2 ? (
            <>
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white">
                  Proposed Wireframe #1
                </h3>
                <div className="w-full overflow-hidden border border-gray-100 dark:border-white/10">
                  <img src="/coffeeShopIA/image3.png" alt="Proposed Wireframe 1" className="w-full h-auto" />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white">
                  Proposed Wireframe #2
                </h3>
                <div className="w-full overflow-hidden border border-gray-100 dark:border-white/10">
                  <img src="/coffeeShopIA/image4.png" alt="Proposed Wireframe 2" className="w-full h-auto" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full overflow-hidden border border-gray-100 dark:border-white/10">
              <img src={tabs[activeTab].src} alt={tabs[activeTab].label} className="w-full h-auto" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </ProjectLayout>
  );
}
