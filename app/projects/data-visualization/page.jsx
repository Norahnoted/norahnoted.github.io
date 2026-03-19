'use client';

import { motion } from 'motion/react';
import ProjectLayout from '@/app/components/ProjectLayout';

const project = {
  id: 'data-visualization',
  title: 'Data Visualization Report',
  description: 'Data Analysis & Visualization',
  bgImage: '/dataVisualization/Data-Analysis-Report.png',

  category: 'Business Analysis',
  isGroup: false,
  tags: ['Python'],

  duration: 'Aug 2025',

  overview:
    'An end-to-end data analysis project that pulls raw data from a CRM system, cleans and processes it with Python, and presents insights through interactive visualizations and a structured report designed in Figma.',

  tools: [
    'Python (pandas)',
    'Figma',
    'CRM Data Export',
    'Data Cleaning & EDA',
    'Data Visualization',
  ],
};

export default function Page() {
  return (
    <ProjectLayout project={project}>
      {/* Report image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="w-full overflow-hidden border border-gray-100 dark:border-white/10"
      >
        <img
          src="/dataVisualization/Data-Analysis-Report.png"
          alt="Data Visualization Report"
          className="w-full h-auto"
        />
      </motion.div>
    </ProjectLayout>
  );
}
