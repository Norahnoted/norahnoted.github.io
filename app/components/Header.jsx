import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

const Header = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
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
          With my background in Information & Systems Analysis, I'm interested
          in exploring how digital products function across both frontstage user
          experiences and backstage organizational processes, from user journeys
          to internal workflows.
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
            href="/sample-resume.pdf"
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
