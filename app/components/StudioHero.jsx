import EditorialFigures from './EditorialFigures';
import actions from './EditorialAction.module.css';
import styles from './StudioHero.module.css';

export default function StudioHero({ isActive }) {
  return (
    <div className={styles.poster} data-studio-hero>
      <div className={styles.composition}>
        <div className={styles.copy}>
          <p className={styles.index}>[ 00 / INTRODUCTION ]</p>
          <h1>Hi, I’m Norah.</h1>
          <p className={styles.roles}>Product Designer <span>/</span> Business Analyst</p>
          <p className={styles.statement}>Connecting the dots from <strong>Frontstage</strong> to <strong>Backstage.</strong></p>
          <a className={`${actions.outline} ${styles.cta}`} href="#work">Explore my work <span aria-hidden="true">→</span></a>
        </div>

        <EditorialFigures embedded isActive={isActive} />
      </div>
    </div>
  );
}
