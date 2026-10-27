'use client';

import { useState } from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import dynamic from 'next/dynamic';
import styles from './Header.module.css';
const DeskScene = dynamic(() => import('./DeskScene'), { ssr: false });

export default function Header({ isActive = true }) {
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  return <div className={styles.hero}>
    <motion.div className={styles.copy} initial={{opacity:0,y:reduced?0:16}} animate={{opacity:focused?0:1,y:0}} transition={{duration:focused ? .15 : .6}}>
      <div className={styles.introduction}><Image src={assets.profile_img} alt="Norah Zhou" width={54} height={54}/><p>Hi, I’m <strong>Norah.</strong></p></div>
      <h1 className={styles.title}>Product<br /><span>Designer.</span></h1>
      <p className={styles.description}>Connecting the dots from <strong>Frontstage</strong> to <strong>Backstage.</strong></p>
    </motion.div>
    <div className={styles.desk}><DeskScene onFocusChange={setFocused} isActive={isActive}/></div>
    <div className={styles.caption}><span>SCROLL TO EXPLORE ↓</span></div>
  </div>;
}
