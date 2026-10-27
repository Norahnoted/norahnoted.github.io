'use client';

import { workData } from '@/assets/assets';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { tagCls, tagLabel } from './tagStyles';
import styles from './FullPageSlides.module.css';

const TABS = ['All', 'Product Design', 'Business Analysis', 'Web Development'];
export default function Work() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('All');
  const reduced = useReducedMotion();
  useEffect(()=>{const tab=searchParams.get('tab');if(tab&&TABS.includes(tab))setActiveTab(tab);},[searchParams]);
  const filtered=activeTab==='All'?workData:workData.filter(project=>project.category===activeTab);
  const years = [2026, 2025, 2024].filter(year => filtered.some(project => project.year === year));
  return <div id="work" className={styles.workSection}>
    <header className={styles.workHeader}><h2 className={styles.sectionTitle}>Recent work</h2></header>
    <div className={styles.filters} role="group" aria-label="Filter projects">{TABS.map(tab=><button key={tab} aria-pressed={activeTab===tab} onClick={()=>setActiveTab(tab)}><svg viewBox="0 0 32 46" preserveAspectRatio="none" aria-hidden="true"><path d="M 0 .5 H 4 C 15 .5 15 12 21 23 L 31 43 Q 32 45.5 30 45.5 H 0 Z" stroke="none" /><path d="M 0 .5 H 4 C 15 .5 15 12 21 23 L 31 43 Q 32 45.5 30 45.5 H 0" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" /></svg>{tab}<span>{tab==='All'?workData.length:workData.filter(project=>project.category===tab).length}</span></button>)}</div>
    {years.map(year=><section key={`${activeTab}-${year}`} className={styles.workYear} aria-label={`Work from ${year}`}><div className={styles.yearHeading}><h3>{year}</h3></div><div className={styles.projectGrid}>
      {filtered.filter(project=>project.year===year).map((project,index)=><motion.article key={project.id} initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.5,delay:index*.04}}>
        <Link className={styles.card} href={project.locked?'#':`/projects/${project.id}`} aria-disabled={project.locked||undefined} onClick={project.locked?event=>event.preventDefault():undefined}>
          <div className={styles.imageFrame}>{project.locked?<div className={styles.placeholder}>Work in progress<span>COMING SOON</span></div>:<img className={styles.cardImage} src={project.bgImage} alt={`${project.title} preview`} loading="lazy"/>}</div>
          <div className={styles.cardBody}><div className={styles.cardMeta}><span>{project.description}</span><span>{project.isGroup?'Group Work':'Individual'}</span></div><h3>{project.title}</h3><div className={styles.cardTags}>{project.tags.map(tag=><span key={tag} className={tagCls(tag)}>{tagLabel(tag)}</span>)}</div>{project.ongoing&&<p className={styles.ongoing}>● Ongoing</p>}</div>
        </Link>
      </motion.article>)}
    </div></section>)}
  </div>;
}
