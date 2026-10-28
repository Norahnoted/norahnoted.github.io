'use client';

import { workData } from '@/assets/assets';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { tagCls, tagLabel } from './tagStyles';
import styles from './FullPageSlides.module.css';
import WorkTable from './WorkTable';
import WorkArchive from './WorkArchive';

const TABS = ['All', 'Product Design', 'Business Analysis', 'Web Development'];
const VIEWS = ['Drawers', 'Gallery', 'Table'];
function ViewIcon({ view }) {
  return <svg aria-hidden="true" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-3.5 w-3.5">
    {view === 'Gallery' ? <><rect x="2" y="2" width="5" height="5" rx=".7" /><rect x="11" y="2" width="5" height="5" rx=".7" /><rect x="2" y="11" width="5" height="5" rx=".7" /><rect x="11" y="11" width="5" height="5" rx=".7" /></>
      : view === 'Table' ? <><rect x="2" y="2" width="14" height="14" rx="1" /><path d="M2 7h14M2 11.5h14M7 2v14" /></>
      : <><rect x="6" y="3" width="6" height="12" rx="1" /><path d="m4 5-3 1 2 10 3-.6m8-10 3 1-2 10-3-.6" /></>}
  </svg>;
}
export default function Work() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('All');
  const [view, setView] = useState('Drawers');
  const reduced = useReducedMotion();
  useEffect(()=>{const tab=searchParams.get('tab');if(tab&&TABS.includes(tab)){setActiveTab(tab);setView('Gallery');}},[searchParams]);
  const filtered=view !== 'Gallery' || activeTab==='All'?workData:workData.filter(project=>project.category===activeTab);
  const years = [2026, 2025, 2024].filter(year => filtered.some(project => project.year === year));
  return <div id="work" className={`${styles.workSection} min-h-[calc(100svh-2*var(--site-nav-height))] ${view==='Drawers'?'!pb-3':''}`}>
    <header className={`${styles.workHeader} flex-wrap`}><h2 className={styles.sectionTitle}>Recent work</h2>
      <div role="group" aria-label="Project view" className="inline-flex shrink-0 items-center gap-0.5 rounded-md border border-[var(--site-border)] bg-[var(--site-surface)] p-0.5 font-PlusJakarta">
        {VIEWS.map(option=><button type="button" key={option} aria-pressed={view===option} aria-controls="work-results" onClick={()=>setView(option)} className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-[10px] leading-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--site-accent)] ${view===option?'bg-[var(--site-accent-soft)] font-medium text-[var(--site-accent)]':'text-[var(--site-text-muted)] hover:bg-[var(--site-surface-muted)]'}`}><ViewIcon view={option}/>{option}</button>)}
      </div>
    </header>
    {view === 'Gallery' && <div className={styles.filters} role="group" aria-label="Filter projects">{TABS.map(tab=><button key={tab} aria-pressed={activeTab===tab} onClick={()=>setActiveTab(tab)}><svg viewBox="0 0 32 46" preserveAspectRatio="none" aria-hidden="true"><path d="M 0 .5 H 4 C 15 .5 15 12 21 23 L 31 43 Q 32 45.5 30 45.5 H 0 Z" stroke="none" /><path d="M 0 .5 H 4 C 15 .5 15 12 21 23 L 31 43 Q 32 45.5 30 45.5 H 0" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" /></svg>{tab}<span>{tab==='All'?workData.length:workData.filter(project=>project.category===tab).length}</span></button>)}</div>}
    <div id="work-results">
    {view === 'Drawers' ? <WorkArchive /> : years.map(year=><section key={`${activeTab}-${year}`} className={styles.workYear} aria-label={`Work from ${year}`}><div className={styles.yearHeading}><h3>{year}</h3></div>{view === 'Table' ? <WorkTable projects={filtered.filter(project=>project.year===year)} year={year}/> : <div className={styles.projectGrid}>
      {filtered.filter(project=>project.year===year).map((project,index)=><motion.article key={project.id} initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.08}} transition={{duration:.5,delay:index*.04}}>
        <Link className={styles.card} href={project.locked?'#':`/projects/${project.id}`} aria-disabled={project.locked||undefined} onClick={project.locked?event=>event.preventDefault():undefined}>
          <div className={styles.imageFrame}>{project.locked?<div className={styles.placeholder}>Work in progress<span>COMING SOON</span></div>:<img className={styles.cardImage} src={project.bgImage} alt={`${project.title} preview`} loading="lazy"/>}</div>
          <div className={styles.cardBody}><div className={styles.cardMeta}><span>{project.description}</span><span>{project.isGroup?'Group Work':'Individual'}</span></div><h3>{project.title}</h3><div className={styles.cardTags}>{project.tags.map(tag=><span key={tag} className={tagCls(tag)}>{tagLabel(tag)}</span>)}</div>{project.ongoing&&<p className={styles.ongoing}>● Ongoing</p>}</div>
        </Link>
      </motion.article>)}
    </div>}</section>)}
    </div>
  </div>;
}
