'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { workData } from '@/assets/assets';
import { tagCls, tagLabel } from './tagStyles';

const SPOTLIGHT_CATEGORIES = ['Service Design', 'UI/UX Design', 'Business Analysis', 'Web Development'];

// One handpicked project per category for the "only have time for one?" spotlight.
const SPOTLIGHT_IDS = {
  'Service Design': 'elections-ontario',
  'UI/UX Design': 'radiovision',
  'Business Analysis': 'architectural-information-hub',
  'Web Development': 'instock',
};

// A wheel-picker word switcher (like iOS's UIPickerView) that picks one handpicked
// project per category, then routes to it or to the full work list.
const SPOT_ROW_H = 36; // px per row in the wheel picker

const Spotlight = ({ onAllProjects, variant = 'default' }) => {
  const reduced = useReducedMotion();
  const [spotIndex, setSpotIndex] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const homeWheel = useRef(null);
  const hidePreviewTimer = useRef(null);
  const wheelLock = useRef(false);
  const mouseY = useRef(null);
  const mouseAccum = useRef(0);

  const paginate = useCallback((dir) => {
    setSpotIndex((i) => (i + dir + SPOTLIGHT_CATEGORIES.length) % SPOTLIGHT_CATEGORIES.length);
    if (variant === 'home') setPreviewVisible(true);
  }, [variant]);

  useEffect(() => {
    const wheel = homeWheel.current;
    if (!wheel) return;
    let lastStep = -Infinity;
    let accumulated = 0;
    let lastEvent = 0;
    const onWheel = event => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      event.stopPropagation();
      setPreviewVisible(true);
      const now = performance.now();
      if (now - lastEvent > 180) accumulated = 0;
      lastEvent = now;
      if (now - lastStep < 450) return;
      accumulated += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
      if (Math.abs(accumulated) < 25) return;
      paginate(accumulated > 0 ? 1 : -1);
      accumulated = 0;
      lastStep = now;
    };
    wheel.addEventListener('wheel', onWheel, { passive: false });
    return () => wheel.removeEventListener('wheel', onWheel);
  }, [paginate]);

  useEffect(() => () => clearTimeout(hidePreviewTimer.current), []);
  const keepPreview = () => clearTimeout(hidePreviewTimer.current);
  const hidePreview = () => {
    keepPreview();
    hidePreviewTimer.current = setTimeout(() => setPreviewVisible(false), 250);
    handleMouseLeave();
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (wheelLock.current) return;
    wheelLock.current = true;
    paginate(e.deltaY > 0 ? 1 : -1);
    setTimeout(() => { wheelLock.current = false; }, 400);
  };

  // Hovering and moving the mouse up/down over the wheel spins it, like dragging
  // a physical picker — no click or scroll needed.
  const MOVE_THRESHOLD = 28; // px of mouse travel per step
  const handleMouseMove = (e) => {
    if (mouseY.current === null) {
      mouseY.current = e.clientY;
      return;
    }
    const delta = e.clientY - mouseY.current;
    mouseY.current = e.clientY;
    mouseAccum.current += delta;

    if (mouseAccum.current > MOVE_THRESHOLD) {
      paginate(1);
      mouseAccum.current = 0;
    } else if (mouseAccum.current < -MOVE_THRESHOLD) {
      paginate(-1);
      mouseAccum.current = 0;
    }
  };
  const handleMouseLeave = () => {
    mouseY.current = null;
    mouseAccum.current = 0;
  };

  const spotCategory = SPOTLIGHT_CATEGORIES[spotIndex];
  const spotProject = workData.find((p) => p.id === SPOTLIGHT_IDS[spotCategory]);

  if (variant === 'home') return <div className="relative font-PlusJakarta text-[var(--site-text)]"
    onMouseEnter={keepPreview} onMouseLeave={hidePreview}
    onFocusCapture={() => { keepPreview(); setPreviewVisible(true); }}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) hidePreview(); }}>
    <AnimatePresence mode="wait">
      {previewVisible && spotProject && <motion.div key={spotProject.id}
        initial={{opacity:0,y:reduced?0:8,rotate:reduced?0:2}} animate={{opacity:1,y:0,rotate:-2}} exit={{opacity:0,y:reduced?0:-5}}
        transition={{duration:reduced?0:.2}} className="absolute bottom-[calc(100%+12px)] right-0 w-[260px] origin-bottom-right max-md:right-[5%]">
        <Link href={`/projects/${spotProject.id}`} onClick={onAllProjects} className="group block overflow-hidden rounded-sm border border-[var(--site-border)] bg-[var(--site-bg)] p-2 shadow-[0_8px_24px_#193c5714] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--site-accent)]">
          <img src={spotProject.bgImage} alt={`${spotProject.title} preview`} className="h-[120px] w-full object-cover" />
          <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-2">
            <h3 className="text-[11px] font-medium leading-[1.5] group-hover:text-[var(--site-accent)]">{spotProject.title}</h3>

          </div>
        </Link>
      </motion.div>}
    </AnimatePresence>
    <p className="relative ml-auto flex w-fit max-w-full flex-nowrap items-center justify-end gap-x-2 whitespace-nowrap px-4 text-[clamp(13px,1.15vw,17px)] leading-[1.7] max-md:gap-x-1 max-md:px-2 max-md:text-[clamp(9px,2.7vw,13px)]">
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-8 -translate-y-1/2 rounded-md bg-white/55 backdrop-blur-md dark:bg-[#111b29]/60 max-md:h-6" />
      <span className="relative z-10">Only have time for one</span>
      <button ref={homeWheel} data-local-scroll type="button" aria-label={`Change category, currently ${spotCategory}. Scroll, click, or use arrow keys.`}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => paginate(1)}
        onKeyDown={event => { if (['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(event.key)) { event.preventDefault(); event.stopPropagation(); paginate(['ArrowDown','ArrowRight'].includes(event.key)?1:-1); } }}
        className="relative z-10 inline-block h-[84px] w-[184px] shrink-0 cursor-ns-resize select-none overflow-hidden align-middle [mask-image:linear-gradient(transparent,black_30%,black_70%,transparent)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--site-accent)] max-md:w-[32vw]">
        {SPOTLIGHT_CATEGORIES.map((category,index) => {
          let relative = index-spotIndex;
          if (relative > 1) relative -= SPOTLIGHT_CATEGORIES.length;
          if (relative < -1) relative += SPOTLIGHT_CATEGORIES.length;
          return <motion.span key={category} aria-hidden="true"
            animate={{y:28+relative*28,opacity:relative===0?1:.3,scale:relative===0?1:.87}}
            transition={reduced?{duration:0}:{type:'spring',stiffness:320,damping:30}}
            className={`absolute inset-x-0 top-0 flex h-7 items-center justify-center whitespace-nowrap ${relative===0?'font-medium text-[var(--site-accent)]':'text-[var(--site-text-muted)]'}`}>
            {category}
          </motion.span>;
        })}
      </button>
      <span className="relative z-10">project?</span>
    </p>
  </div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-5 w-full max-w-3xl mx-auto"
    >
      <p className="flex flex-wrap items-center justify-center gap-x-2 text-center text-base sm:text-lg font-PlusJakarta text-gray-500 dark:text-white/50">
        <span>Only have time for one</span>

        <span
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => paginate(1)}
          role="button"
          aria-label={`Change category, currently ${spotCategory}`}
          style={{ height: SPOT_ROW_H * 3 }}
          className="relative inline-block w-56 overflow-hidden align-middle cursor-ns-resize select-none"
        >
          {SPOTLIGHT_CATEGORIES.map((cat, i) => {
            let rel = i - spotIndex;
            const len = SPOTLIGHT_CATEGORIES.length;
            if (rel > 1) rel -= len;
            if (rel < -1) rel += len;
            const isCurrent = rel === 0;
            return (
              <motion.span
                key={cat}
                animate={{
                  y: SPOT_ROW_H + rel * SPOT_ROW_H,
                  opacity: isCurrent ? 1 : 0.3,
                  scale: isCurrent ? 1 : 0.82,
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                style={{ height: SPOT_ROW_H }}
                className={`absolute inset-x-0 top-0 flex items-center justify-center whitespace-nowrap font-PlusJakarta ${
                  isCurrent
                    ? 'text-lg sm:text-xl font-semibold text-brand'
                    : 'text-base text-gray-400 dark:text-white/30'
                }`}
              >
                {cat}
              </motion.span>
            );
          })}
        </span>

        <span>work? See this.</span>
      </p>

      {spotProject && (
        <AnimatePresence mode="wait">
          <motion.div
            key={spotProject.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="w-full"
          >
            <Link
              href={spotProject.locked ? '#' : `/projects/${spotProject.id}`}
              onClick={spotProject.locked ? (e) => e.preventDefault() : undefined}
            >
              <motion.div
                whileHover={spotProject.locked ? {} : { y: -4 }}
                transition={{ duration: 0.1 }}
                className={`rounded-2xl overflow-hidden bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center ${
                  spotProject.locked ? 'cursor-default opacity-60' : 'cursor-pointer'
                }`}
              >
                <div className="sm:w-3/5 shrink-0">
                  <img src={spotProject.bgImage} alt={spotProject.title} className="w-full h-auto block" />
                </div>
                <div className="p-4 sm:p-6 flex flex-col justify-center gap-2 sm:w-2/5">
                  <div>
                    <h3 className="font-semibold font-PlusJakarta text-base sm:text-lg text-gray-900 dark:text-white leading-snug">
                      {spotProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-white/40 font-PlusJakarta mt-1">
                      {spotProject.description}
                    </p>
                  </div>
                  <div className="flex flex-row flex-wrap gap-1.5">
                    {spotProject.tags.map((tag, i) => (
                      <span key={i} className={`px-2.5 py-0.5 text-[11px] rounded-full font-PlusJakarta ${tagCls(tag)}`}>
                        {tagLabel(tag)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </AnimatePresence>
      )}

      <Link
        href="/?tab=All#work"
        onClick={onAllProjects}
        className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-PlusJakarta font-semibold text-[#7a8f4a] dark:text-brand hover:text-[#5f7139] dark:hover:text-[#b3d488] transition-colors"
      >
        See all projects
        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </Link>
    </motion.div>
  );
};

export default Spotlight;
