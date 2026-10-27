'use client';

import { assets, workData } from '@/assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import styles from './Navbar.module.css';

const ITEMS = [
  { label: 'Home', title: 'HOME', section: 'top' },
  { label: 'About me', title: 'ABOUT', section: 'about' },
  { label: 'My work', title: 'WORK', section: 'work' },
  { label: 'Contact me', title: 'CONTACT', section: 'contact' },
];
const CATEGORIES = ['Product Design', 'Business Analysis', 'Web Development'];

export default function Navbar({ isDarkMode, setIsDarkMode, currentSection }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const active = pathname.startsWith('/projects/') ? 'work' : currentSection || 'top';
  const prefix = isHome ? '' : '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const projectToggle = useRef(null);
  const close = () => { setMenuOpen(false); setProjectsOpen(false); };

  useEffect(() => {
    const onKey = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setProjectsOpen(false);
        projectToggle.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const links = (mobile = false) => ITEMS.map(item => (
    <div key={item.section} className={`${styles.navItem} ${active === item.section ? styles.active : ''}`}>
      <a href={`${prefix}#${item.section}`} aria-label={item.label} aria-current={active === item.section ? 'page' : undefined} onClick={close}>
        <span className={styles.titleWindow}><span className={styles.titleTrack}><span>{item.title}</span><span aria-hidden="true">{item.title}</span></span></span>
      </a>
      {item.section === 'work' && <button ref={mobile ? undefined : projectToggle} className={`${styles.projectToggle} ${projectsOpen ? styles.expanded : ''}`} type="button" aria-label="Toggle project list" aria-expanded={projectsOpen} aria-controls="navigation-projects" onClick={() => setProjectsOpen(value => !value)}><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.5" /></svg></button>}
      {!mobile && active === item.section && <motion.span className={styles.activeMarker} layoutId="primary-nav-active" aria-hidden="true" transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 36 }} />}
    </div>
  ));

  return (
    <>
      <a href={`${prefix}#top`} aria-label="Norah — Home" className={styles.brand} onClick={close}><Image src={isDarkMode ? assets.logo_dark : assets.logo} alt="Norah" priority /></a>
      <header className={`${styles.header} ${isHome ? styles.homeHeader : ''}`}>
        <span aria-hidden="true" />
        <nav className={styles.desktopNav} aria-label="Main navigation">{links()}</nav>
        <div className={styles.actions}>
          <button className={styles.themeToggle} onClick={() => setIsDarkMode(value => !value)} aria-label={isDarkMode ? 'Light' : 'Dark'} title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}><Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt="" /></button>
          <a href={`${prefix}#contact`} className={styles.contactLink} onClick={close} aria-label="Let's talk"><span className={styles.contactWords}>LET’S<br />TALK</span></a>
          <button className={`${styles.menuToggle} ${menuOpen ? styles.menuExpanded : ''}`} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => { setMenuOpen(value => !value); setProjectsOpen(false); }}><span /><span /></button>
        </div>
      </header>
      <AnimatePresence>
        {(menuOpen || projectsOpen) && <motion.button key="navigation-backdrop" type="button" aria-label="Close navigation overlay" className={styles.backdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .2 }} onClick={close} />}
        {menuOpen && <motion.nav key="mobile-navigation" id="mobile-navigation" aria-label="Mobile navigation" className={styles.mobileNav} initial={{ opacity: 0, y: reduceMotion ? 0 : -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }} transition={{ duration: reduceMotion ? 0 : .25 }}><div className={styles.mobileLinks}>{links(true)}</div><p className={styles.mobileSignature}>Norah Zhou / Product Designer</p></motion.nav>}
        {projectsOpen && <motion.nav key="project-navigation" id="navigation-projects" aria-label="Project navigation" className={styles.projectPanel} initial={{ opacity: 0, y: reduceMotion ? 0 : -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }} transition={{ duration: reduceMotion ? 0 : .25 }}><div className={styles.projectPanelHeading}><span>EXPLORE MY WORK</span><button onClick={() => setProjectsOpen(false)} aria-label="Close project list">Close ×</button></div><div className={styles.projectColumns}>{CATEGORIES.map((category, index) => <motion.div key={category} initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : .25, delay: reduceMotion ? 0 : index * .055 }}><Link className={styles.category} href={`/?tab=${encodeURIComponent(category)}#work`} onClick={close}>{category}<svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><path d="m6 3 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg></Link><ul>{workData.filter(project => project.category === category).map(project => <li key={project.id}>{project.locked ? <span className={styles.locked}>{project.title.replace(' Case Study','')}<small>COMING SOON</small></span> : <Link href={`/projects/${project.id}`} aria-current={pathname === `/projects/${project.id}` ? 'page' : undefined} onClick={close}>{project.title.replace(' Case Study','')}</Link>}</li>)}</ul></motion.div>)}</div></motion.nav>}
      </AnimatePresence>
    </>
  );
}
