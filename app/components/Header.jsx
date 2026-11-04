'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import EditorialBackground from './EditorialBackground';
import EditorialFigures from './EditorialFigures';
import editorial from './EditorialIntro.module.css';



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
    <EditorialBackground />
    <EditorialFigures />
    <motion.div className={editorial.intro} initial={{opacity:0,y:reduced?0:16}} animate={{opacity:1,y:0}} transition={{duration:.6}}>
      <div className={editorial.ornament} aria-hidden="true"><span/><i/><span/></div>
      <h1 className={editorial.heading}>Hi, I’m <span>Norah</span></h1>
      <div className={editorial.role}>
        <span className="sr-only">Product Designer and Business Analyst</span>
        <span aria-hidden="true">a <span className={editorial.typed}>{typing.text}<span className={editorial.cursor}/></span></span>
      </div>
      <p className={editorial.statement}>connecting the dots from <span>Frontstage</span> to <span>Backstage.</span></p>
      <aside className={editorial.prompt}><p>Only have time for <em>one project?</em></p><span className={editorial.seeThis}>See this<span className={editorial.guide} aria-hidden="true"/></span></aside>
    </motion.div>
  </div>;
}
