import styles from './ProjectPresentation.module.css';

export default function ProjectSummary({ project }) {
  return <div className={`${styles.summary} ${!project.role ? styles.withoutRole : ''} ${!project.collaborators ? styles.withoutCollaborators : ''}`}>
    <section className={styles.overview}><h2>Project Overview</h2><p>{project.overview}</p></section>
    {project.role && <section className={styles.role}><h3>My Role</h3><p>{project.role}</p></section>}
    {project.duration && <section className={styles.duration}><h3>Duration</h3><p>{project.duration}</p></section>}
    {project.collaborators && <section className={styles.collaborators}><h3>Collaborators</h3><p>{project.collaborators}</p></section>}
    {project.tools?.length > 0 && <section className={styles.tools}><h3>Tools & Methodologies</h3><div>{project.tools.map(tool=><span key={tool}>{tool}</span>)}</div></section>}
  </div>;
}
