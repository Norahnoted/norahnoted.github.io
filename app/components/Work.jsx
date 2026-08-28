'use client';

import { workData, assets } from "@/assets/assets";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";

const categoryCls = 'bg-[#c8ccb0] text-[#3a3a2a] dark:bg-[#5A6538]/40 dark:text-[#b8d480]';

const TAG_COLORS = {
  // Design
  'UI Design':                      'bg-[#C7D8E0] text-[#2D4557] dark:bg-[#385A6B]/30 dark:text-[#7BBDD4]',
  'UX Research':                      'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'App Design':                     'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Service Design':                 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Virtual Reality':                  'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  // Research
  'UX Research':                    'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Accessibility & Inclusive Design':'bg-[#C7D8E0] text-[#2D4557] dark:bg-[#385A6B]/30 dark:text-[#7BBDD4]',
  'Navigation':                     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Information Architecture':       'bg-[#DFEFBB] text-[#4A423C] dark:bg-[#DFEFBB]/20 dark:text-[#DFEFBB]',
  // Business
  'Business Analysis':              'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Process Modelling':              'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Digital Marketing':              'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'e-Commerce':                     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  // Dev / Tech
  'Next.js':                        'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'React':                          'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Tailwind CSS':                   'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Full-Stack':                     'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Node.js':                        'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'MySQL':                          'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Python':                         'bg-[#E0C9D4] text-[#4A2D3A] dark:bg-[#6B3A52]/25 dark:text-[#C98AAE]',
  'Healthcare':                     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Public Service':                 'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Green':                 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Sustainability':        'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]',
  'Social':                         'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Pet Care':                       'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Retail':                         'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  'Entertainment':                  'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
  '🏆 1st · UDesignathon 2026':     'bg-[#EAE0C8] text-[#5A4420] dark:bg-[#7A6035]/25 dark:text-[#D4A85A]',
};

const TAG_LABELS = {
  'UI Design': 'UI',
  'UX Research': 'UX',
  'UX Research': 'UX',
};

const tagCls = (tag) => TAG_COLORS[tag] ?? 'bg-[#DDE0C7] text-[#4A423C] dark:bg-[#5A6538]/25 dark:text-[#9DB86A]';
const tagLabel = (tag) => TAG_LABELS[tag] ?? tag;

const TABS = ['All', 'Product Design', 'Business Analysis', 'Web Development'];

const SPOTLIGHT_CATEGORIES = ['Product Design', 'Business Analysis', 'Web Development'];

// One handpicked project per category for the "only have time for one?" spotlight.
// TODO: swap in final picks for Business Analysis / Web Development.
const SPOTLIGHT_IDS = {
  'Product Design': 'elections-ontario',
  'Business Analysis': 'business-process-modelling',
  'Web Development': 'instock',
};

const SPOT_ROW_H = 36; // px per row in the wheel picker

const Work = ({ isDarkMode }) => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && TABS.includes(tab)) setActiveTab(tab);
  }, [searchParams]);

  // Category spotlight: a wheel-picker word switcher (like iOS's UIPickerView date/time
  // wheel) that previews one handpicked project per category.
  const [spotIndex, setSpotIndex] = useState(0);
  const spotWheelLock = useRef(false);
  const spotMouseY = useRef(null);
  const spotMouseAccum = useRef(0);

  const paginateSpot = (dir) => {
    const next = (spotIndex + dir + SPOTLIGHT_CATEGORIES.length) % SPOTLIGHT_CATEGORIES.length;
    setSpotIndex(next);
    setActiveTab(SPOTLIGHT_CATEGORIES[next]);
  };

  const handleSpotWheel = (e) => {
    e.preventDefault();
    if (spotWheelLock.current) return;
    spotWheelLock.current = true;
    paginateSpot(e.deltaY > 0 ? 1 : -1);
    setTimeout(() => { spotWheelLock.current = false; }, 400);
  };

  // Hovering and moving the mouse up/down over the wheel spins it, like dragging
  // a physical picker — no click or scroll needed.
  const SPOT_MOVE_THRESHOLD = 28; // px of mouse travel per step
  const handleSpotMouseMove = (e) => {
    if (spotMouseY.current === null) {
      spotMouseY.current = e.clientY;
      return;
    }
    const delta = e.clientY - spotMouseY.current;
    spotMouseY.current = e.clientY;
    spotMouseAccum.current += delta;

    if (spotMouseAccum.current > SPOT_MOVE_THRESHOLD) {
      paginateSpot(1);
      spotMouseAccum.current = 0;
    } else if (spotMouseAccum.current < -SPOT_MOVE_THRESHOLD) {
      paginateSpot(-1);
      spotMouseAccum.current = 0;
    }
  };
  const handleSpotMouseLeave = () => {
    spotMouseY.current = null;
    spotMouseAccum.current = 0;
  };

  const spotCategory = SPOTLIGHT_CATEGORIES[spotIndex];
  const spotProject = workData.find(p => p.id === SPOTLIGHT_IDS[spotCategory]);

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

      {/* Category spotlight: a wheel-picker word switcher previewing one top pick */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.18 }}
        className="flex flex-col items-center gap-6 mb-16"
      >
        <p className="flex flex-wrap items-center justify-center gap-x-2 text-center text-base sm:text-lg font-PlusJakarta text-gray-500 dark:text-white/50">
          <span>Only have time for one</span>

          {/* Wheel picker */}
          <span
            onWheel={handleSpotWheel}
            onMouseMove={handleSpotMouseMove}
            onMouseLeave={handleSpotMouseLeave}
            onClick={() => paginateSpot(1)}
            role="button"
            aria-label={`Change category, currently ${spotCategory}`}
            style={{ height: SPOT_ROW_H * 3 }}
            className="relative inline-block w-48 overflow-hidden align-middle cursor-ns-resize select-none"
          >
            {SPOTLIGHT_CATEGORIES.map((cat, i) => {
              let rel = i - spotIndex;
              const len = SPOTLIGHT_CATEGORIES.length;
              if (rel > 1) rel -= len;
              if (rel < -1) rel += len;
              const isCurrent = rel === 0;
              return (
                <motion.span
                  key={cat}
                  animate={{
                    y: SPOT_ROW_H + rel * SPOT_ROW_H,
                    opacity: isCurrent ? 1 : 0.3,
                    scale: isCurrent ? 1 : 0.82,
                  }}
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                  style={{ height: SPOT_ROW_H }}
                  className={`absolute inset-x-0 top-0 flex items-center justify-center whitespace-nowrap font-PlusJakarta ${
                    isCurrent
                      ? 'text-lg sm:text-xl font-semibold text-[#9DB86A]'
                      : 'text-base text-gray-400 dark:text-white/30'
                  }`}
                >
                  {cat}
                </motion.span>
              );
            })}
          </span>

          <span>work? See this.</span>
        </p>

        {/* Spotlighted project */}
        {spotProject && (
          <AnimatePresence mode="wait">
            <motion.div
              key={spotProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <Link href={spotProject.locked ? '#' : `/projects/${spotProject.id}`} onClick={spotProject.locked ? (e) => e.preventDefault() : undefined}>
                <motion.div
                  whileHover={spotProject.locked ? {} : { y: -4 }}
                  transition={{ duration: 0.1 }}
                  className={`rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row ${
                    spotProject.locked ? 'cursor-default opacity-60' : 'cursor-pointer'
                  }`}
                >
                  <div className="sm:w-3/5 shrink-0 flex items-center bg-gray-50 dark:bg-black/20">
                    <img
                      src={spotProject.bgImage}
                      alt={spotProject.title}
                      className="w-full h-auto block"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center gap-3 sm:w-2/5">
                    <div>
                      <h3 className="font-semibold font-PlusJakarta text-lg sm:text-xl text-gray-900 dark:text-white leading-snug">
                        {spotProject.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-white/40 font-PlusJakarta mt-2">
                        {spotProject.description}
                      </p>
                    </div>
                    <div className="flex flex-row flex-wrap gap-1.5">
                      {spotProject.tags.map((tag, i) => (
                        <span key={i} className={`px-2.5 py-0.5 text-xs rounded-full font-PlusJakarta ${tagCls(tag)}`}>
                          {tagLabel(tag)}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>

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
                    <Link href={project.locked ? '#' : `/projects/${project.id}`} onClick={project.locked ? (e) => e.preventDefault() : undefined}>
                      <motion.div
                        whileHover={project.locked ? {} : { y: -4 }}
                        transition={{ duration: 0.1 }}
                        className={`rounded-2xl overflow-hidden bg-white dark:bg-white/5 h-full flex flex-col relative ${
                          project.locked
                            ? 'cursor-default opacity-60'
                            : 'cursor-pointer'
                        } ${
                          project.id === 'flot-ai'
                            ? 'border-2 border-[#D4A85A]/60 dark:border-[#D4A85A]/50'
                            : 'border border-gray-200 dark:border-white/10'
                        }`}
                      >
                        {project.locked && (
                          <div className="absolute top-2.5 right-2.5 z-10 bg-white/80 dark:bg-black/50 rounded-full p-1.5 backdrop-blur-sm">
                            <svg className="w-3 h-3 text-gray-500 dark:text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                          </div>
                        )}
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
                              <span key={i} className={`px-2.5 py-0.5 text-xs rounded-full font-PlusJakarta ${tagCls(tag)}`}>
                                {tagLabel(tag)}
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
