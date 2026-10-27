'use client';

import styles from './ProjectPresentation.module.css';

export default function ProjectTopicNav({ id, tabs, active, onSelect }) {
  return <div id={id} className={styles.topics}>
    <div className={styles.tabList} role="group" aria-label="Project topics">
      {tabs.map(({label,value})=><button key={value} type="button" onClick={()=>onSelect(value)} aria-pressed={active===value} className={`${styles.tab} ${active===value ? styles.activeTab : ''}`}>{label}</button>)}
    </div>
  </div>;
}
