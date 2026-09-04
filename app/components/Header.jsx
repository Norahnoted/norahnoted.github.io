'use client';

import React, { useState } from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
const DeskScene = dynamic(() => import('./DeskScene'), { ssr: false })

// Hero copy plus the interactive desk: click the printer for the resume, the laptop
// for the spotlight, a folder tab for that category.
const Header = () => {
  // The hero copy fades out while a folder is out or the laptop screen is open.
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: focused ? 0 : 1, y: 0 }}
        transition={{ duration: focused ? 0.15 : 0.5 }}
        className="absolute inset-x-0 top-[10%] z-10 mx-auto flex flex-col items-center text-center max-w-2xl px-5 pointer-events-none"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
        >
          <Image src={assets.profile_img} alt="" width={112} height={112} className="rounded-full w-24 sm:w-28" />
        </motion.div>

        <h3 className="mt-3 flex items-end gap-2 font-PlusJakarta text-lg sm:text-xl text-[#4A423C] dark:text-white/90">
          Hi, I&apos;m Norah
          <Image src={assets.hand_icon} alt="" className="w-5 sm:w-6" />
        </h3>

        <h1 className="mt-6 sm:mt-8 font-StixTwoText text-[2.1rem] leading-[1.15] sm:text-5xl lg:text-[3.4rem] text-[#3a352c] dark:text-white">
          A <span className="text-[#7DB300]">Product Designer</span>
        </h1>

        <p className="mt-3 font-PlusJakarta text-sm sm:text-base text-[#6f6858] dark:text-white/50">
          Connecting the dots from <span className="text-brand dark:text-[#9DB86A] font-medium">Frontstage</span> to{' '}
          <span className="text-brand dark:text-[#9DB86A] font-medium">Backstage</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="absolute inset-0"
      >
        <DeskScene onFocusChange={setFocused} />
      </motion.div>
    </div>
  );
}

export default Header
