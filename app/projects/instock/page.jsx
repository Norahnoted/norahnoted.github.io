'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const tabs = [
  { label: 'Warehouses Page', images: ['/instock/Warehourses.png', '/instock/add warehourse.png'] },
  { label: 'Inventory Page', images: ['/instock/Inventory.png', '/instock/add inventory.png'] },
];

const heading = 'text-lg font-semibold font-PlusJakarta text-[#4A423C] dark:text-white';
const body    = 'text-[15px] text-gray-600 dark:text-white/70 font-PlusJakarta leading-relaxed';

const project = {
  id: 'instock',
  title: 'InStock',
  description: 'Inventory Management System',
  bgImage: '/preview-instock.png',

  category: 'Web Development',
  isGroup: true,
  tags: ['Full-Stack', 'MySQL', 'Node.js', 'Retail', 'Entertainment'],

  duration: 'Apr 2024',

  overview:
    'InStock is a full-stack inventory management system designed to replicate the operations of an actual chain of warehouses.',

  collaborators: 'Heather Orlemann, Vicky Chu, Padma Lathak',
  role: 'Focused on frontend development, built and styled UI components using SASS, implemented responsive layouts, and integrated frontend API calls to connect the client with the server backend.',

  tools: [
    'ReactJS',
    'SASS',
    'Node.js',
    'ExpressJS',
    'MySQL',
    'Knex.js',
    'REST API',
    'Jira',
  ],
};

export default function Page() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <ProjectLayout project={project}>
      <div className="flex flex-col gap-10">

        {/* Tech Stack */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h2 className={heading}>Tech Stack</h2>
          <ul className={`flex flex-col gap-2 ${body} list-disc list-inside pl-4`}>
            <li>React & React Router for client-side SPA navigation</li>
            <li>Node.js & Express REST API backend</li>
            <li>MySQL database with Knex.js query builder and migrations</li>
            <li>SASS for styling, Axios for API communication</li>
            <li>Jira for ticket assignment, sprint planning, and team task tracking</li>
          </ul>
        </motion.div>

        {/* Functionality */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          <h2 className={heading}>Functionality</h2>
          <ul className={`flex flex-col gap-2 ${body} list-disc list-inside pl-4`}>
            <li>View a list of all warehouses and browse inventory across multiple locations</li>
            <li>Add, edit, and delete warehouse entries</li>
            <li>Add, edit, and delete inventory items, each linked to a specific warehouse</li>
            <li>View detailed pages for individual warehouses and inventory items</li>
            <li>Full CRUD operations across both warehouses and inventory via RESTful API</li>
            <li>Search functionality to quickly filter warehouses and inventory items</li>
          </ul>
        </motion.div>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-0 border-b border-gray-200 dark:border-white/10 w-fit">
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
                  layoutId="instock-tab-underline"
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
            className="flex flex-col gap-6"
          >
            {tabs[activeTab].images.map((src, i) => (
              <div key={i} className="w-full overflow-hidden border border-gray-100 dark:border-white/10">
                <img src={src} alt={`${tabs[activeTab].label} ${i + 1}`} className="w-full h-auto block" />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </ProjectLayout>
  );
}
