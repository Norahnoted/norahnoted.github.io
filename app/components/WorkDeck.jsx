'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { carouselOffset, carouselLayout } from './projectFan';
import { tagCls, tagLabel } from './tagStyles';

export default function WorkDeck({ projects, label }) {
  const [index, setIndex] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [frameWidth, setFrameWidth] = useState(1100);
  const [imageRatios, setImageRatios] = useState({});
  const scene = useRef(null);
  const pointer = useRef(null);
  const touch = useRef(null);
  const router = useRouter();
  const reduced = useReducedMotion();
  const total = projects.length;
  const current = projects[index];
  const step = direction => setIndex(value => (value + direction + total) % total);

  useEffect(() => {
    const element = scene.current;
    const observer = new ResizeObserver(([entry]) => {setNarrow(entry.contentRect.width < 600);setFrameWidth(entry.contentRect.width);});
    observer.observe(element);
    let accumulated = 0;
    let lastEvent = 0;
    let lastStep = -Infinity;
    const wheel = event => {
      if (total < 2 || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      event.stopPropagation();
      const now = performance.now();
      if (now - lastEvent > 180) accumulated = 0;
      lastEvent = now;
      if (now - lastStep < 400) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      accumulated += delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientHeight : 1);
      if (Math.abs(accumulated) < 35) return;
      const direction = Math.sign(accumulated);
      setIndex(value => (value + direction + total) % total);
      lastStep = now;
      accumulated = 0;
    };
    element.addEventListener('wheel', wheel, { passive: false });
    return () => { observer.disconnect(); element.removeEventListener('wheel', wheel); };
  }, [total]);

  const widthFor = project => Math.min(360, frameWidth * .96, (narrow?210:230) * (imageRatios[project.id] || 16/9));
  const frontWidth = widthFor(current) * (narrow ? .75 : .7) * 1.05;
  const pillX = Math.min(frontWidth * .62 + 12, frameWidth / 2 - (narrow ? 44 : 55));
  const pillY = -Math.min(94, (widthFor(current)/(imageRatios[current.id] || 16/9)+75) * (narrow ? .75 : .7) * .42);

  return <div className="relative z-10 min-w-0 font-PlusJakarta">
    <div ref={scene} data-local-scroll={total > 1 ? '' : undefined} role="region" aria-label={`${label} project deck`}
      className="relative h-[265px] touch-pan-y overflow-hidden rounded-xl [perspective:1000px] max-md:h-[270px]"
      onPointerMove={event => {
        if (event.pointerType !== 'mouse' || total < 2) return;
        if (pointer.current === null) { pointer.current = event.clientX; return; }
        if (Math.abs(event.clientX - pointer.current) < 5) return;
        pointer.current = event.clientX;
        const bounds = event.currentTarget.getBoundingClientRect();
        const fraction = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        setIndex(Math.round(fraction * (total - 1)));
      }}
      onPointerLeave={() => { pointer.current = null; }}
      onTouchStart={event => { if (event.touches.length === 1) touch.current = { x:event.touches[0].clientX, y:event.touches[0].clientY }; }}
      onTouchEnd={event => {
        if (!touch.current || !event.changedTouches.length) return;
        const x = event.changedTouches[0].clientX - touch.current.x;
        const y = event.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(x) > 40 && Math.abs(x) > Math.abs(y)) step(x < 0 ? 1 : -1);
        touch.current = null;
      }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); event.stopPropagation(); step(event.key === 'ArrowRight' ? 1 : -1); }
      }}>
      {projects.map((project, position) => {
        const offset = carouselOffset(position, index, total);
        const layout = carouselLayout(offset, { step:narrow?23:17, visible:narrow?1:2, cardScale:narrow ? .75 : .7 });
        const centered = position === index;
        return <motion.button key={project.id} type="button" tabIndex={centered?0:-1} aria-hidden={!layout.interactive} aria-label={`${project.title}${project.locked?' — coming soon':centered?' — open project':' — bring to front'}`} aria-disabled={centered && project.locked || undefined}
          onClick={() => { if (!centered) setIndex(position); else if (!project.locked) router.push(`/projects/${project.id}`); }}
          style={{width:widthFor(project),left:'50%',top:'50%',x:'-50%',y:'-50%',zIndex:layout.z,pointerEvents:layout.interactive?'auto':'none'}}
          initial={reduced?false:{opacity:0,scale:.7,y:'-35%'}}
          animate={{y:'-50%',left:`${layout.x}%`,top:`${50+layout.y}%`,rotate:reduced?0:layout.rotate,scale:layout.scale,opacity:layout.opacity,filter:`saturate(${layout.saturate}) brightness(${layout.brightness})`}}
          transition={reduced?{duration:0}:{type:'spring',stiffness:260,damping:32}}
          className="absolute flex flex-col overflow-hidden rounded-lg bg-[var(--site-surface)] text-left text-[var(--site-text)] shadow-[0_14px_32px_#193c5720] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--site-accent)]">
          <div className="w-full shrink-0 overflow-hidden bg-[var(--site-surface)]">
            {project.locked?<div className="grid aspect-video place-items-center font-StixTwoText text-[24px] text-[var(--site-accent)]">Work in progress</div>:<img src={project.bgImage} alt="" loading="lazy" draggable="false" onLoad={event=>{const image=event.currentTarget;const ratio=image.naturalWidth/image.naturalHeight;if(ratio>0)setImageRatios(values=>values[project.id]===ratio?values:{...values,[project.id]:ratio});}} className="block h-auto w-full" />}
          </div>
          <div className="flex flex-col gap-2 px-4 py-3">
            <h4 className="text-[16px] font-medium leading-[1.35]">{project.title}</h4>
            <div className="flex flex-wrap gap-1">{project.tags.map(tag=><span key={tag} className={`rounded-full px-2 py-0.5 text-[9px] leading-[1.6] ${tagCls(tag)}`}>{tagLabel(tag)}</span>)}</div>
          </div>
        </motion.button>;
      })}
      <AnimatePresence initial={false}>
        <motion.span key={`${current.id}-tag`} aria-hidden="true" initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.85}} transition={{duration:reduced?0:.2}}
          style={{left:'50%',top:'50%',x:`calc(-50% - ${pillX}px)`,y:`calc(-50% + ${pillY-12}px)`,rotate:-8}}
          className={`pointer-events-none absolute z-[103] whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium leading-none shadow-[0_8px_20px_#193c5720] max-md:text-[9px] ${tagCls(current.tags[0])}`}>
          {current.tags[0]}
        </motion.span>
        <motion.span key={`${current.id}-year`} aria-hidden="true" initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.85}} transition={{duration:reduced?0:.2,delay:reduced?0:.04}}
          style={{left:'50%',top:'50%',x:`calc(-50% + ${pillX}px)`,y:`calc(-50% + ${pillY+36}px)`,rotate:7}}
          className="pointer-events-none absolute z-[103] whitespace-nowrap rounded-full bg-[var(--site-surface)] px-3 py-1 text-[11px] font-medium leading-none text-[var(--site-text)] shadow-[0_8px_20px_#193c5720] max-md:text-[9px]">
          {current.ongoing?'Ongoing':current.year}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">{current.title}, project {index+1} of {total}</span>
    </div>
  </div>;
}
