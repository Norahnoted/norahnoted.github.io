'use client';

import { workData, assets } from "@/assets/assets";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const tagCls    = 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]';
const categoryCls = 'bg-[#c8ccb0] text-[#3a3a2a] dark:bg-[#5A6538]/40 dark:text-[#b8d480]';

const TABS = ['All', 'Product Design', 'Business Analysis', 'Web Development'];

const Work = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All'
    ? workData
    : workData.filter(p => p.category === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="work"
      className="w-full px-5 sm:px-10 lg:px-[12%] py-24"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.15 }}
        className="text-center text-4xl sm:text-5xl font-PlusJakarta mb-6"
      >
        Latest work
      </motion.h2>

      {/* Tabs */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.2 }}
        className="flex gap-2 justify-center mb-12"
      >
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-PlusJakarta transition-colors duration-200
              ${activeTab === tab
                ? 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#DDE0C7]/30 dark:text-white'
                : 'bg-[#DDE0C7]/40 text-[#4A423C]/60 hover:bg-[#DDE0C7]/70 dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/20'
              }`}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Cards grouped by year */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-10"
        >
          {Array.from(new Set(filtered.map(p => p.year))).sort((a, b) => b - a).map(year => (
            <div key={year} className="flex gap-6 lg:gap-10">
              {/* Year label */}
              <div className="w-14 shrink-0 pt-1">
                <span className="text-sm font-medium font-PlusJakarta text-[#9ca3af] dark:text-white/30 sticky top-6">
                  {year}
                </span>
              </div>

              {/* Cards for this year */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.filter(p => p.year === year).map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.05 }}
                    className="h-full"
                  >
                    <Link href={`/projects/${project.id}`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.1 }}
                        className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 cursor-pointer bg-white dark:bg-white/5 h-full flex flex-col"
                      >
                        <div
                          className="aspect-video bg-cover bg-center w-full shrink-0"
                          style={{ backgroundImage: `url(${project.bgImage})` }}
                        />
                        <div className="p-4 flex flex-col flex-1 gap-2">
                          <div>
                            <h2 className="font-semibold font-PlusJakarta text-sm text-gray-900 dark:text-white leading-snug">
                              {project.title}
                            </h2>
                            <p className="text-xs text-gray-500 dark:text-white/40 font-PlusJakarta mt-0.5">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex flex-row flex-wrap gap-1 mt-1">
                            {project.tags.map((tag, i) => (
                              <span key={i} className={`px-2.5 py-0.5 text-xs rounded-full font-PlusJakarta ${tagCls}`}>
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-auto pt-2 flex justify-between items-center">
                            {project.ongoing
                              ? <span className="flex items-center gap-1.5 text-[11px] font-PlusJakarta text-[#7a8f4a] dark:text-[#9DB86A]">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#7a8f4a] dark:bg-[#9DB86A] animate-pulse" />
                                  Ongoing
                                </span>
                              : <span />
                            }
                            <span className="text-[11px] font-PlusJakarta text-gray-400 dark:text-white/30">
                              {project.isGroup ? 'Group Work' : 'Individual'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

    </motion.div>
  );
};

export default Work;
