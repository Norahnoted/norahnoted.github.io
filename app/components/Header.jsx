'use client';

import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import dynamic from 'next/dynamic'
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

function PendulumCard({ children, staticRotate, mouseX, sensitivity = 1 }) {
  const rawAngle = useTransform(mouseX, [-0.5, 0.5], [-7 * sensitivity, 7 * sensitivity]);
  const angle = useSpring(rawAngle, { stiffness: 40, damping: 12 });

  return (
    <span style={{ transform: `rotate(${staticRotate}deg)`, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <motion.span
        style={{
          rotateZ: angle,
          transformOrigin: 'top center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const Header = () => {
  const mouseX = useMotionValue(0);

  function handleMouseMove(e) {
    mouseX.set(e.clientX / window.innerWidth - 0.5);
  }

  return (
    <div className="relative w-full h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      <HeroScene />
      <div className="relative z-10 w-full max-w-3xl text-center mx-auto h-full flex flex-col items-center justify-center gap-4 px-5 sm:px-8">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
        >
          <Image
            src={assets.profile_img}
            alt=""
            width={128}
            height={128}
            className="rounded-full w-32"
          />
        </motion.div>
        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex items-end gap-2 text-x1 md:text-2xl mb-3 font-PlusJakarta"
        >
          {" "}
          Hi, I'm Norah
          <Image src={assets.hand_icon} alt="" className="w-6" />
        </motion.h3>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-4xl sm:text-6xl lg:text-[66px] font-StixTwoText"
        >
          <span className="block whitespace-nowrap">A <span style={{ color: "#7DB300" }}>Product Designer</span> based</span>
          <span className="block">in Toronto.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="max-w-3xl mx-auto font-PlusJakarta"
        >
          <span className="inline-flex flex-wrap justify-center gap-5 my-3">
            {[
              { label: 'Information & Systems Analysis', staticRotate: -2,   sensitivity: 1    },
              { label: 'User Experiences',               staticRotate:  1.5, sensitivity: 1.15 },
              { label: 'Organizational Processes',       staticRotate: -1,   sensitivity: 0.9  },
            ].map(({ label, staticRotate, sensitivity }) => (
              <PendulumCard key={label} staticRotate={staticRotate} mouseX={mouseX} sensitivity={sensitivity}>
                <span className="w-px h-3 bg-[#5a6538]/50 dark:bg-[#9DB86A]/50" />
                <span className="w-2 h-2 rounded-full border border-[#5a6538]/60 dark:border-[#9DB86A]/50 bg-white dark:bg-darkTheme -mb-px z-10" />
                <span className="flex flex-col items-center px-4 py-5 bg-[#f3f2ec] dark:bg-white/5 border border-[#5a6538]/25 dark:border-[#9DB86A]/20 rounded shadow-sm min-w-[120px] max-w-[140px] transition-shadow duration-300 hover:shadow-[0_0_16px_rgba(125,179,0,0.25)] dark:hover:shadow-[0_0_16px_rgba(125,179,0,0.25)]">
                  <span className="text-xs font-PlusJakarta text-[#4A423C] dark:text-white/70 text-center leading-snug">{label}</span>
                </span>
              </PendulumCard>
            ))}
          </span>
          <span className="block mt-3 mb-1">End-to-end from <span className="text-brand font-semibold">Frontstage User Journeys</span> to <span className="text-brand font-semibold">Backstage Internal Workflows</span></span>
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          <motion.a
            href="#contact"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="px-10 py-3 border rounded-full bg-brand text-white border-brand flex items-center gap-2 dark:bg-transparent"
          >
            Contact me
            <Image
              src={assets.right_arrow_white}
              alt=""
              className="rounded-full w-4"
            />
          </motion.a>

          <motion.a
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            href="/NorahZhou_Resume_2603.pdf"
            download
            className="px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black"
          >
            My resume
            <Image src={assets.download_icon} alt="" className="w-4" />
          </motion.a>
        </div>
      </div>
    </div>
  );
}

export default Header
