'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { workData } from '@/assets/assets';
import WorkDeck from './WorkDeck';

const CATEGORIES = ['Product Design', 'Business Analysis', 'Web Development'];

function ProjectDrawer({ category, projects, selected, onOpen, buttonRef }) {
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const [pull, setPull] = useState(0);
  useMotionValueEvent(progress, 'change', setPull);
  useEffect(() => {
    const controls = animate(progress, selected ? 1 : hovered ? .2 : 0, {duration:reduced?0:.55,ease:[.22,1,.36,1]});
    return () => controls.stop();
  }, [selected, hovered, reduced, progress]);
  const depth = 48 * pull;
  const x = -depth;
  const y = depth;
  return <button ref={buttonRef} type="button" onClick={onOpen} aria-pressed={selected}
    aria-label={`Open ${category}, ${projects.length} projects`}
    onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} onFocus={()=>setHovered(true)} onBlur={()=>setHovered(false)}
    style={{zIndex:selected?3:hovered?2:1}}
    className="relative w-full rounded-none text-[var(--site-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--site-accent)] max-md:w-[240px] max-md:shrink-0 max-md:snap-center">
    <svg viewBox="0 0 260 240" fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-auto w-full overflow-visible">
      <path d="M0 65h260v125H0z" fill="var(--site-bg)" stroke="none" />
      <path d="M30 35h260v125" strokeOpacity=".4" />
      <path d={`M${x} ${65+y} L30 35 H290 L${260+x} ${65+y} Z`} fill="var(--site-bg)" />
      <g transform={`translate(${x*.55} ${y*.55})`}>
        {projects.slice(0,3).reverse().map((project,index)=><g key={project.id}>
          {project.locked ? <rect x={40-index*4} y={6+index*8} width="190" height="108" stroke="none" fill="var(--site-surface-muted)" /> : <image href={project.bgImage} x={40-index*4} y={6+index*8} width="190" height="108" preserveAspectRatio="xMidYMin slice" />}
        </g>)}
      </g>
      <path d={`M${260+x} ${65+y} L290 35 V160 L${260+x} ${190+y} Z`} fill="var(--site-bg)" />
      <g transform={`translate(${x} ${y})`}>
        <path d="M0 65h260v125H0z" fill="var(--site-bg)" />
        <rect x="36" y="77" width="188" height="23" rx="8" fill="var(--site-surface)" />
        <text x="130" y="92" textAnchor="middle" fill="currentColor" stroke="none" fontSize="13" fontFamily="var(--font-navbar), sans-serif">{category}</text>
        <path d="M131 112a2.5 2.5 0 1 0-2 0l-.5 4h3z" strokeWidth=".9" />
        <circle cx="130" cy="140" r="11" />
        <text x="14" y="179" fill="currentColor" stroke="none" fontSize="8" fontFamily="var(--font-navbar), sans-serif" opacity=".7">{String(projects.length).padStart(2,'0')} projects</text>
      </g>
    </svg>
  </button>;
}

export default function WorkArchive() {
  const [category, setCategory] = useState(null);
  const boxButtons = useRef({});
  const lastCategory = useRef(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!category && lastCategory.current) boxButtons.current[lastCategory.current]?.focus({preventScroll:true});
  }, [category]);

  const projects = category ? workData.filter(project=>project.category===category) : [];
  return <div className="relative h-[calc(100svh-2*var(--site-nav-height)-115px)] min-h-[490px] max-md:h-[calc(100svh-2*var(--site-nav-height)-155px)]">
    {category && <motion.div key={category} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:reduced?0:.2,delay:reduced?0:.15}} className="absolute inset-x-0 top-0 z-10">
      <WorkDeck projects={projects} label={category} />
    </motion.div>}
    <div className="absolute -bottom-[4px] left-1/2 grid w-[calc(100%-40px)] max-w-[840px] -translate-x-1/2 grid-cols-3 gap-0 pr-8 max-md:flex max-md:w-full max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:pb-2 [scrollbar-width:thin]" aria-label="Project file drawers">
      {CATEGORIES.map(name => <ProjectDrawer key={name} category={name} projects={workData.filter(project=>project.category===name)} selected={category===name}
        buttonRef={node=>{boxButtons.current[name]=node;}}
        onOpen={()=>{lastCategory.current=name;setCategory(value=>value===name?null:name);}} />)}
    </div>
  </div>;
}
