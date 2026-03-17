'use client';

import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useRef } from 'react'
import { toolsData } from '@/assets/assets'
import { motion } from 'motion/react'

function PhotoStack() {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) / rect.width;
    const y = (e.clientY - rect.top  - rect.height / 2) / rect.height;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  const spring = { type: 'spring', stiffness: 160, damping: 22 };

  return (
    // Container aspect ratio matches Figma: 432w × 495h ≈ 115% padding-bottom
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ paddingBottom: '115%' }}
      className="relative w-full"
    >
      {/* Photo 1 (sparkle) — upper right, behind */}
      <motion.div
        animate={{ x: mouse.x * -10, y: mouse.y * -8, rotate: 8 }}
        transition={spring}
        style={{ width: '62%', left: '55%', top: '-15%', zIndex: 1 }}
        className="absolute"
      >
        <Image src={assets.picture1} alt="photo 1" className="w-full h-auto block" />
      </motion.div>

      {/* Photo 3 (cat) — lower left, behind */}
      <motion.div
        animate={{ x: mouse.x * -6, y: mouse.y * 10, rotate: -6 }}
        transition={spring}
        style={{ width: '72%', left: '-12%', top: '50%', zIndex: 1 }}
        className="absolute"
      >
        <Image src={assets.picture3} alt="photo 3" className="w-full h-auto block" />
      </motion.div>

      {/* Photo 2 (letter A) — center, on top */}
      <motion.div
        animate={{ x: mouse.x * 8, y: mouse.y * 6, rotate: -3 }}
        transition={spring}
        style={{ width: '60%', left: '27%', top: '22%', zIndex: 3 }}
        className="absolute"
      >
        <Image src={assets.picture2} alt="photo 2" className="w-full h-auto block" />
      </motion.div>
    </div>
  );
}

const timelineSections = [
  {
    title: 'Education',
    entries: [
      { date: '2024.09 – 2026.05', title: 'Master of Information', sub: 'University of Toronto, Toronto, ON', detail: 'Information System Design · User Experience Design' },
      { date: '2017.07 – 2021.05', title: 'B.A. in Philosophy, with East Asian Studies Minor', sub: 'University of Alberta, Edmonton, AB' },
    ],
  },
  {
    title: 'Work Experience',
    entries: [
      { date: '2024.09 – Present', title: 'Business Development and Data Analyst', sub: 'UofT Faculty of Information Career Service Team, Toronto, ON' },
      { date: '2021.05 – 2023.09', title: 'Project Manager', sub: 'Fortune Canada Business Consulting Inc., Richmond, BC' },
    ],
  },
  {
    title: 'Certificate',
    entries: [
      { date: '2024.02 – 2024.05', title: 'Software Engineering Diploma', sub: 'BrainStation Bootcamp, Vancouver, BC' },
      { date: '2019.09 – 2021.05', title: 'Certificate in International Learning', sub: 'University of Alberta' },
    ],
  },
]

const About = ({ isDarkMode }) => {
  return (
    <motion.div
      id="about"
      className="w-full px-5 sm:px-10 lg:px-[12%] py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Heading */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, delay: 0.2 }}
        className="text-center text-5xl font-medium font-PlusJakarta text-[#4a423c] dark:text-white"
      >
        About me
      </motion.h2>

      {/* Photo + Skills + Tools */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex w-full flex-col lg:flex-row items-center gap-10 lg:gap-20 my-10 lg:my-20"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-48 sm:w-64 lg:w-80 shrink-0"
        >
          <PhotoStack />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex-1 flex flex-col gap-8 relative z-10"
        >
          {/* What I do */}
          <div>
            <motion.h4
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.25 }}
              className="mb-4 text-[#374151] text-base font-medium font-PlusJakarta dark:text-white"
            >
              What I do
            </motion.h4>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="flex flex-wrap gap-2"
            >
              {['UX Research', 'Business Process Modelling', 'Data Visualization', 'Project Management'].map((skill, index) => (
                <li
                  key={index}
                  className="px-4 py-1.5 text-sm border border-[#d1d5db] dark:border-white/30 rounded-full font-PlusJakarta text-[#374151] dark:text-white/80"
                >
                  {skill}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Tool I use */}
          <div>
            <motion.h4
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.35 }}
              className="mb-4 text-[#374151] text-base font-medium font-PlusJakarta dark:text-white"
            >
              Tool I use
            </motion.h4>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, 3rem)' }}
            >
              {toolsData.map((tool, index) => (
                <motion.li
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col items-center gap-1.5 cursor-default"
                  key={index}
                >
                  <div className="flex items-center justify-center w-12 h-12 border border-[#d1d5db] dark:border-white/20 rounded-xl">
                    {tool.text
                      ? <span className="text-[11px] font-bold font-PlusJakarta text-[#4A423C] dark:text-white/70">{tool.text}</span>
                      : <img src={tool.src} alt={tool.name} className={`w-6 h-6 object-contain${tool.invert ? ' dark:invert' : ''}`} />
                    }
                  </div>
                  <span className="text-[9px] font-PlusJakarta text-[#6b7280] dark:text-white/50 text-center leading-tight">
                    {tool.name}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline sections */}
      <div className="flex flex-col lg:flex-row gap-12 bg-[#F7F6F2] dark:bg-darkTheme p-6 lg:p-8">
        {timelineSections.map((section, sIndex) => (
          <motion.div
            key={sIndex}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * sIndex }}
            className="flex-1"
          >
            <h4 className="text-base font-medium font-PlusJakarta text-[#374151] dark:text-white mb-5">
              {section.title}
            </h4>
            <ul className="relative border-l-2 border-[rgba(90,101,56,0.4)] flex flex-col gap-7 pl-6">
              {section.entries.map((entry, eIndex) => (
                <motion.li
                  key={eIndex}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 * sIndex + 0.15 * eIndex }}
                  className="relative"
                >
                  <p className="text-xs text-[#9ca3af] dark:text-white/40 mb-0.5 font-normal">{entry.date}</p>
                  <p className="text-sm font-medium text-[#1f2937] dark:text-white leading-snug relative">
                    <span className="absolute -left-[31px] top-[3px] w-3 h-3 rounded-full bg-[#5a6538] border-2 border-[#F7F6F2] dark:border-darkTheme" />
                    {entry.title}
                  </p>
                  {entry.detail && <p className="text-sm text-[#1f2937] dark:text-white leading-snug">{entry.detail}</p>}
                  <p className="text-xs text-[#6b7280] dark:text-white/50 mt-0.5">{entry.sub}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default About
