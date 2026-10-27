'use client';

import PhotoStack from './PhotoStack';
import { timelineSections } from './aboutData';
import { toolsData } from '@/assets/assets';
import { motion, useReducedMotion } from 'motion/react';
import styles from './FullPageSlides.module.css';

const SKILLS = ['Business Process Modelling', 'UX Research', 'UI Design', 'Service Design', 'Web Development', 'Data Visualization', 'Digital Marketing', 'Project Management'];
export default function AboutSlides() {
  const reduced = useReducedMotion();
  const reveal = {initial:reduced?false:{opacity:0,y:24},whileInView:{opacity:1,y:0},viewport:{once:true,amount:.15},transition:{duration:.65}};
  return <div id="about">
    <motion.section {...reveal} className={`${styles.screen} ${styles.aboutIntro}`} data-scroll-page="profile" aria-label="About: profile, skills and tools">
      <div className={styles.intro}>
        <div><p className={styles.eyebrow}>THE PERSON BEHIND THE WORK</p><h2 className={styles.heading}>About <em>me.</em></h2><p className={styles.introDescription}>Product design, UX research, and the systems behind the experience.</p><div className={styles.capabilities}><h3>What I do</h3><div className={styles.skills}>{SKILLS.map(skill=><span key={skill}>{skill}</span>)}</div></div></div>
        <div className={styles.photos}><PhotoStack /></div>
      </div>

      <div className={styles.toolBand}><h3>Tools I use</h3><div className={styles.toolGrid}>{toolsData.map(tool=><div className={styles.tool} key={tool.name}><div>{tool.text?<b>{tool.text}</b>:<img src={tool.src} alt="" className={tool.invert?'dark:invert':''}/>}</div><span>{tool.name}</span></div>)}</div></div>
    </motion.section>
    <motion.section {...reveal} className={`${styles.screen} ${styles.experience}`} data-scroll-page="experience" aria-label="About: experience">
      <div className={styles.chapterHeading}><p className={styles.eyebrow}>THE JOURNEY SO FAR</p><h2 className={styles.sectionTitle}>Experience.</h2></div>

      <div className={styles.timeline}>{timelineSections.map(section=><section key={section.title}><h3>{section.title}</h3><ul>{section.entries.map(entry=><li key={entry.title}><time>{entry.date}</time><h4>{entry.title}</h4>{entry.detail&&<p>{entry.detail}</p>}<p>{entry.sub}</p></li>)}</ul></section>)}</div>
    </motion.section>
  </div>;
}
