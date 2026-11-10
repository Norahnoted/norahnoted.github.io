'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { carouselOffset } from './projectFan';
import { tagCls, tagLabel } from './tagStyles';

export default function WorkDeck({ projects, label }) {
  const [index,setIndex]=useState(0);
  const [width,setWidth]=useState(900);
  const [ratios,setRatios]=useState({});
  const scene=useRef(null),touch=useRef(null),suppressClick=useRef(false);
  const reduced=useReducedMotion();
  const total=projects.length;
  const safeIndex=Math.min(index,Math.max(0,total-1));
  const current=projects[safeIndex];
  const step=direction=>setIndex(value=>(value+direction+total)%total);
  useEffect(()=>{
    const el=scene.current;if(!el)return;
    const observer=new ResizeObserver(([entry])=>setWidth(entry.contentRect.width));observer.observe(el);
    let accumulated=0,last=0,locked=false;
    const wheel=event=>{
      if(total<2||event.ctrlKey||event.metaKey)return;
      // One trackpad gesture advances one card; momentum cannot race through the deck.
      event.preventDefault();event.stopPropagation();
      const now=performance.now();if(now-last>180){accumulated=0;locked=false;}last=now;
      if(locked)return;
      const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
      accumulated+=delta*(event.deltaMode===1?16:event.deltaMode===2?el.clientHeight:1);
      if(Math.abs(accumulated)<55)return;
      const direction=Math.sign(accumulated);locked=true;setIndex(value=>(value+direction+total)%total);
    };
    el.addEventListener('wheel',wheel,{passive:false});
    return()=>{observer.disconnect();el.removeEventListener('wheel',wheel);};
  },[total]);
  if(!current)return null;
  const widthFor=project=>Math.min(460,width*(width<600?.7:.5),(width<600?160:187)*(ratios[project.id]||16/9));
  const cardWidth=widthFor(current);
  const duration=reduced?0:.42;
  return <div className="relative z-10 min-w-0 font-PlusJakarta">
    <div ref={scene} data-local-scroll role="region" aria-roledescription="carousel" aria-label={`${label} projects`}
      className="relative h-[204px] overflow-hidden [perspective:1200px] touch-pan-y max-md:h-[190px]"
      onTouchStart={e=>{suppressClick.current=false;if(e.touches.length===1)touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}}
      onTouchEnd={e=>{if(!touch.current||!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-touch.current.x,dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){step(dx<0?1:-1);suppressClick.current=true;}touch.current=null;}}
      onClickCapture={e=>{if(suppressClick.current){e.preventDefault();e.stopPropagation();suppressClick.current=false;}}}
      onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();step(e.key==='ArrowRight'?1:-1);}}}>
      {projects.map((project,position)=>{
        const offset=carouselOffset(position,safeIndex,total),distance=Math.abs(offset),centered=offset===0;
        const visible=distance<=1;
        const projectWidth=widthFor(project);
        const image=<img onLoad={e=>{const img=e.currentTarget;const ratio=img.naturalWidth/img.naturalHeight;if(ratio>0)setRatios(values=>values[project.id]===ratio?values:{...values,[project.id]:ratio});}} src={project.bgImage} alt={project.title} loading={visible?'eager':'lazy'} draggable="false" className="block h-auto w-full"/>;
        const controlClass='block h-full w-full overflow-hidden rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[var(--site-accent)]';
        return <motion.div key={project.id} aria-hidden={!visible} initial={false}
          style={{position:'absolute',left:'50%',top:'50%',width:projectWidth,marginLeft:-projectWidth/2,marginTop:'-1px',zIndex:centered?3:1,pointerEvents:visible?'auto':'none',transformStyle:'preserve-3d'}}
          animate={{x:offset*cardWidth*.82,y:'-50%',rotateY:reduced?0:offset*-18,scale:centered?1:.87,opacity:!visible?0:centered?1:.48}}
          transition={{duration,ease:[.22,.61,.36,1]}}>
          {centered?<Link href={`/projects/${project.id}`} className={controlClass} aria-label={`Open ${project.title}`}>{image}</Link>:<button type="button" tabIndex={-1} className={controlClass} onClick={()=>setIndex(position)} aria-label={`Show ${project.title}`}>{image}</button>}
        </motion.div>;
      })}
    </div>
    <div className="mx-auto mt-0 flex w-full max-w-[920px] items-center justify-between gap-4 px-3 max-md:gap-2" data-local-scroll>
      <div className="min-w-0"><p className="text-[10px] leading-5 tabular-nums text-[var(--site-text-muted)]">{String(safeIndex+1).padStart(2,'0')} — {String(total).padStart(2,'0')} · {current.ongoing?'Ongoing':current.year}</p><h4 className="truncate text-[15px] font-medium leading-6 max-md:text-xs">{current.title}</h4><div className="mt-1 flex flex-wrap gap-1">{current.tags.map(tag=><span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] leading-4 ${tagCls(tag)}`}>{tagLabel(tag)}</span>)}</div></div>
      <div className="flex shrink-0 items-center gap-2">
        <button type="button" onClick={()=>step(-1)} disabled={total<2} aria-label="Previous project" className="grid h-8 w-8 place-items-center rounded border border-[var(--site-border)] text-[var(--site-accent)] disabled:opacity-30">←</button>
        <button type="button" onClick={()=>step(1)} disabled={total<2} aria-label="Next project" className="grid h-8 w-8 place-items-center rounded border border-[var(--site-border)] text-[var(--site-accent)] disabled:opacity-30">→</button>
        <Link href={`/projects/${current.id}`} className="rounded bg-[var(--site-accent)] px-3 py-2 text-[11px] leading-4 text-[var(--site-on-accent)] max-md:px-2">View project</Link>
      </div>
    </div>
    <span className="sr-only" aria-live="polite">{current.title}, project {safeIndex+1} of {total}</span>
  </div>;
}
