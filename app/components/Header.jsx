'use client';

import Image from 'next/image';
import sunGreeting from '@/assets/sun-icon.png';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import Spotlight from './Spotlight';

const ROLES = ['Product Designer', 'Business Analyst'];

export default function Header({ isActive = true, isDarkMode = false }) {
  const reduced = useReducedMotion();
  const [typing, setTyping] = useState({ text: '', complete: false });

  useEffect(() => {
    if (reduced) {
      setTyping({ text: ROLES[0], complete: true });
      return;
    }
    if (!isActive) return;
    let timer;
    let role = 0;
    let characters = 0;
    let deleting = false;
    setTyping({ text: '', complete: false });
    const tick = () => {
      const title = ROLES[role];
      if (!deleting) {
        characters++;
        const complete = characters === title.length;
        setTyping({ text: title.slice(0, characters), complete });
        if (complete) {
          deleting = true;
          timer = setTimeout(tick, 2100);
        } else timer = setTimeout(tick, 95);
      } else {
        characters--;
        setTyping({ text: title.slice(0, characters), complete: false });
        if (characters === 0) {
          role = (role + 1) % ROLES.length;
          deleting = false;
          timer = setTimeout(tick, 450);
        } else timer = setTimeout(tick, 48);
      }
    };
    timer = setTimeout(tick, 450);
    return () => clearTimeout(timer);
  }, [isActive, reduced]);

  return <div className="relative h-full min-h-[inherit] w-full overflow-hidden font-PlusJakarta">
    {isDarkMode && <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {[
        {left:'12%',top:'13%',size:7,delay:0},
        {left:'31%',top:'22%',size:4,delay:1.3},
        {left:'44%',top:'8%',size:6,delay:2.6},
        {left:'39%',top:'42%',size:4,delay:.7},
        {left:'88%',top:'49%',size:6,delay:1.9},
      ].map((star,index)=><motion.svg key={index} viewBox="0 0 12 12" fill="currentColor"
        className="absolute overflow-visible text-[#e0efff] drop-shadow-[0_0_5px_#badcff99]"
        style={{left:star.left,top:star.top,width:star.size,height:star.size}}
        initial={{opacity:.65}} animate={reduced || !isActive ? {opacity:.65} : {opacity:[.4,.95,.4]}}
        transition={{duration:4.5+index*.4,delay:star.delay,repeat:Infinity,ease:'easeInOut'}}>
        <path d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6 4.6 4.6Z" />
      </motion.svg>)}
    </div>}
    <motion.div className="absolute left-[43%] right-[4%] top-[12%] z-[5] text-right max-md:left-[5%] max-md:right-[5%] max-md:top-[7%] max-md:pr-8"
      initial={{opacity:0,y:reduced?0:16}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
      <h1 className="font-StixTwoText font-normal leading-[1.15] text-[#386f8c] dark:text-[#c2e4f5]">
        <span className="block text-[clamp(32px,3.4vw,48px)] tracking-[-1px] max-md:text-[32px]">Hi, I’m Norah <motion.span animate={reduced || !isActive ? {rotate:0} : {rotate:[-7,7]}} transition={{duration:3.6,repeat:Infinity,repeatType:"reverse",ease:"easeInOut"}} className="relative -top-[.12em] inline-block h-[1.3em] w-[1.3em] overflow-hidden align-middle text-[.85em]">{isDarkMode ? <svg role="img" aria-label="Moon" viewBox="0 0 48 48" className="h-full w-full overflow-visible text-[#f2df9d] drop-shadow-[0_0_7px_#f2df9d40]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M31 6a18 18 0 1 0 11 27A18 18 0 0 1 31 6Z" fill="#f2df9d14" /><path d="m37 8 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" strokeWidth="1.2" /></svg> : <Image src={sunGreeting} alt="Sun" className="absolute -left-[.67em] -top-[.68em] h-[2.6em] w-[2.6em] max-w-none" />}</motion.span></span>
        <span className="sr-only">a Product Designer and Business Analyst</span>
        <span aria-hidden="true" className="mt-6 flex items-center justify-end gap-3 max-md:gap-2">
          <span className="text-[28px] italic max-md:text-[23px]">a</span>
          <span className="relative inline-flex h-[1.5em] w-[9.3em] items-center justify-center border border-[var(--site-accent)] bg-transparent px-[.2em] text-center font-PlusJakarta text-[clamp(23px,2.3vw,33px)] font-normal leading-none text-[var(--site-text)] max-md:text-[clamp(21px,5.5vw,27px)]">
            {['-left-[3px] -top-[3px]', '-right-[3px] -top-[3px]', '-bottom-[3px] -left-[3px]', '-bottom-[3px] -right-[3px]'].map(position => <span key={position} className={`absolute h-[5px] w-[5px] border border-[var(--site-accent)] bg-[var(--site-bg)] ${position}`} />)}
            <span className="whitespace-nowrap">{typing.text}</span>
            <motion.span className="ml-[3px] inline-block h-[.8em] w-px shrink-0 bg-[var(--site-text)]" animate={{opacity:reduced?1:[1,1,0,0]}} transition={{duration:1,repeat:reduced?0:Infinity,times:[0,.45,.5,1]}} />
            <motion.span aria-hidden="true" style={{fontFamily:"var(--font-hand-round), cursive"}} className="pointer-events-none absolute -right-[1.6em] -top-[.5em] text-[1em] text-[#79abc7] dark:text-[#b9ddf2]"
              animate={{opacity:typing.complete && typing.text === ROLES[0] ? 1 : 0,rotate:-14,y:typing.complete?0:5}}
              transition={{duration:reduced?0:.25,delay:typing.complete ? .2 : 0}}>or?</motion.span>
          </span>
        </span>
        <span className="mt-6 block whitespace-nowrap font-PlusJakarta text-[clamp(13px,1.15vw,17px)] leading-[1.7] tracking-normal text-[#5b6f79] dark:text-[#c7dce7] max-md:mt-5 max-md:text-[clamp(9px,2.7vw,13px)]">
          connecting the dots from <span className="font-medium text-[#587550] dark:text-[#b5cfb6]">Frontstage</span> to <span className="font-medium text-[#587550] dark:text-[#b5cfb6]">Backstage.</span>
        </span>
      </h1>
    </motion.div>
    <div className="pointer-events-none absolute inset-x-0 bottom-[-6px] top-[calc(25%+6px)] max-md:top-[calc(48%-12px)]">
      <Image src={isDarkMode ? '/banner-image-night.png' : '/banner-image.png'} alt={isDarkMode ? 'Illustrated Vancouver waterfront at night with illuminated windows and sailboats' : 'Illustrated Vancouver waterfront with mountains and sailboats'} fill priority sizes="100vw" className="object-contain object-left-bottom" />
    </div>
    <aside aria-label="Recommended project" className="absolute bottom-7 right-[1%] z-[6] w-[620px] max-w-[56%] max-md:bottom-auto max-md:left-[7%] max-md:right-[3%] max-md:top-[67%] max-md:w-auto max-md:max-w-none">
      <Spotlight variant="home" />
    </aside>
  </div>;
}
