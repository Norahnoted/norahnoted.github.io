'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { workData } from '@/assets/assets';
import { tagCls, tagLabel } from './tagStyles';

const SPOTLIGHT_CATEGORIES = ['Service Design', 'UI/UX Design', 'Business Analysis', 'Web Development'];

// One handpicked project per category for the "only have time for one?" spotlight.
const SPOTLIGHT_IDS = {
  'Service Design': 'elections-ontario',
  'UI/UX Design': 'radiovision',
  'Business Analysis': 'architectural-information-hub',
  'Web Development': 'instock',
};

// A wheel-picker word switcher (like iOS's UIPickerView) that picks one handpicked
// project per category, then routes to it or to the full work list.
const SPOT_ROW_H = 36; // px per row in the wheel picker

const Spotlight = ({ onAllProjects }) => {
  const [spotIndex, setSpotIndex] = useState(0);
  const wheelLock = useRef(false);
  const mouseY = useRef(null);
  const mouseAccum = useRef(0);

  const paginate = (dir) => {
    setSpotIndex((i) => (i + dir + SPOTLIGHT_CATEGORIES.length) % SPOTLIGHT_CATEGORIES.length);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (wheelLock.current) return;
    wheelLock.current = true;
    paginate(e.deltaY > 0 ? 1 : -1);
    setTimeout(() => { wheelLock.current = false; }, 400);
  };

  // Hovering and moving the mouse up/down over the wheel spins it, like dragging
  // a physical picker — no click or scroll needed.
  const MOVE_THRESHOLD = 28; // px of mouse travel per step
  const handleMouseMove = (e) => {
    if (mouseY.current === null) {
      mouseY.current = e.clientY;
      return;
    }
    const delta = e.clientY - mouseY.current;
    mouseY.current = e.clientY;
    mouseAccum.current += delta;

    if (mouseAccum.current > MOVE_THRESHOLD) {
      paginate(1);
      mouseAccum.current = 0;
    } else if (mouseAccum.current < -MOVE_THRESHOLD) {
      paginate(-1);
      mouseAccum.current = 0;
    }
  };
  const handleMouseLeave = () => {
    mouseY.current = null;
    mouseAccum.current = 0;
  };

  const spotCategory = SPOTLIGHT_CATEGORIES[spotIndex];
  const spotProject = workData.find((p) => p.id === SPOTLIGHT_IDS[spotCategory]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-5 w-full max-w-3xl mx-auto"
    >
      <p className="flex flex-wrap items-center justify-center gap-x-2 text-center text-base sm:text-lg font-PlusJakarta text-gray-500 dark:text-white/50">
        <span>Only have time for one</span>

        <span
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => paginate(1)}
          role="button"
          aria-label={`Change category, currently ${spotCategory}`}
          style={{ height: SPOT_ROW_H * 3 }}
          className="relative inline-block w-56 overflow-hidden align-middle cursor-ns-resize select-none"
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
            <Link
              href={spotProject.locked ? '#' : `/projects/${spotProject.id}`}
              onClick={spotProject.locked ? (e) => e.preventDefault() : undefined}
            >
              <motion.div
                whileHover={spotProject.locked ? {} : { y: -4 }}
                transition={{ duration: 0.1 }}
                className={`rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center ${
                  spotProject.locked ? 'cursor-default opacity-60' : 'cursor-pointer'
                }`}
              >
                <div className="sm:w-3/5 shrink-0">
                  <img src={spotProject.bgImage} alt={spotProject.title} className="w-full h-auto block" />
                </div>
                <div className="p-4 sm:p-6 flex flex-col justify-center gap-2 sm:w-2/5">
                  <div>
                    <h3 className="font-semibold font-PlusJakarta text-base sm:text-lg text-gray-900 dark:text-white leading-snug">
                      {spotProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-white/40 font-PlusJakarta mt-1">
                      {spotProject.description}
                    </p>
                  </div>
                  <div className="flex flex-row flex-wrap gap-1.5">
                    {spotProject.tags.map((tag, i) => (
                      <span key={i} className={`px-2.5 py-0.5 text-[11px] rounded-full font-PlusJakarta ${tagCls(tag)}`}>
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

      <Link
        href="/?tab=All#work"
        onClick={onAllProjects}
        className="text-xs sm:text-sm font-PlusJakarta text-gray-500 dark:text-white/50 underline underline-offset-4 decoration-gray-300 dark:decoration-white/25"
      >
        See all projects
      </Link>
    </motion.div>
  );
};

export default Spotlight;
