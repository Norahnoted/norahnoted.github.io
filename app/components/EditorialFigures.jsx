'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import styles from './EditorialFigures.module.css';

const projects=[
  {id:'01',name:'EO Internship Program',type:'SERVICE DESIGN',src:'/preview-eo.png',caption:'From a first day to a connected journey.',className:'eo',link:'/projects/elections-ontario'},
  {id:'02',name:'RadioVision',type:'PRODUCT DESIGN',src:'/preview-radiovision.png',caption:'Understanding the people behind the interface.',className:'radio',link:'/projects/radiovision'},
  {id:'03',name:'Process modelling',type:'BUSINESS ANALYSIS',src:'/preview-modelling.png',caption:'Making the underlying system visible.',className:'ba',link:'/projects/business-process-modelling'},
];
gsap.registerPlugin(useGSAP);
export default function EditorialFigures() {
  const root=useRef(null);
  useGSAP(()=>{
    const media=gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)',()=>{
      const timeline=gsap.timeline({delay:.25});
      root.current.querySelectorAll('[data-fragment]').forEach((card,i)=>{
        timeline.fromTo(card.querySelector('[data-selection]'),{autoAlpha:0,clipPath:'inset(50% 50% 50% 50%)'},{autoAlpha:1,clipPath:'inset(-3px -3px -3px -3px)',duration:1.2,ease:'power3.inOut'},i*.32)
          .fromTo(card.querySelector('[data-index]'),{autoAlpha:0},{autoAlpha:1,duration:.4},i*.32)
          .fromTo(card.querySelector('img'),{scale:1.15},{scale:1,duration:1.4,ease:'power2.out'},i*.32)
          .fromTo(card.querySelector('[data-caption]'),{autoAlpha:0,y:5},{autoAlpha:1,y:0,duration:.5},i*.32+.9);
      });
      timeline.fromTo('[data-trace]',{autoAlpha:0},{autoAlpha:.65,duration:1.6},.4);
    });
    return()=>media.revert();
  },{scope:root});
  return <div ref={root} className={styles.figure}>
    <div role="region" aria-label="Selected project fragments" className={styles.scroller}>
      <div className={styles.canvas}>
        <svg className={styles.traces} data-trace viewBox="0 0 700 600" fill="none" aria-hidden="true"><path d="M85 68H530V530M50 360H650M180 40V540" stroke="currentColor" strokeWidth=".7" opacity=".45"/><path d="M70 410C60 65 560 30 590 310S340 580 185 480" stroke="currentColor" strokeWidth=".8" strokeDasharray="3 7"/><path d="M270 125 463 320 245 445" stroke="currentColor" opacity=".45"/>{[[85,68],[530,68],[180,360],[530,530]].map(([x,y])=><g key={x+'-'+y}><path d={`M${x-9} ${y}h18M${x} ${y-9}v18`} stroke="currentColor"/></g>)}</svg>
        {projects.map(p=><article key={p.id} data-fragment className={`${styles.fragment} ${styles[p.className]}`}>
          <span data-index className={styles.index}>[ {p.id} ] <span>{p.type}</span></span>
          <div data-selection className={styles.selection}>
          <a href={p.link} className={styles.window} data-window aria-label={`View ${p.name}`}>
            <img src={p.src} alt={`${p.name} project preview`}/>
            

          </a>

          </div>
          <div data-caption className={styles.caption}><h3>{p.name}</h3><p>{p.caption}</p></div>
        </article>)}
        <span className={styles.vertical}>SELECTED PROJECTS</span>
      </div>

    </div>

  </div>;
}
