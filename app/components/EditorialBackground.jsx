import styles from './EditorialBackground.module.css';

const shadedCells = [
  [70, 420, .07], [140, 420, .035], [140, 490, .07],
  [280, 490, .045], [420, 350, .045], [490, 420, .08],
];

export default function EditorialBackground() {
  return (
    <div className={styles.background} aria-hidden="true">
      <svg className={styles.texture} viewBox="0 0 800 600" fill="none">
        <defs>
          <pattern id="fragment-grid" width="70" height="70" patternUnits="userSpaceOnUse">
            <path d="M70 0H0V70" stroke="currentColor" strokeWidth=".65" />
          </pattern>
          <pattern id="fragment-dots" width="7" height="7" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r=".6" fill="currentColor" />
          </pattern>
          <radialGradient id="fragment-falloff" cx="42%" cy="78%" r="63%">
            <stop stopColor="white" />
            <stop offset=".55" stopColor="white" stopOpacity=".55" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="fragment-grid-mask">
            <rect width="800" height="600" fill="url(#fragment-falloff)" />
          </mask>
          <filter id="fragment-grain">
            <feTurbulence type="fractalNoise" baseFrequency=".83" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <g mask="url(#fragment-grid-mask)">
          <rect x="35" y="195" width="665" height="375" fill="url(#fragment-grid)" opacity=".46" />
          {shadedCells.map(([x, y, opacity]) => (
            <rect key={x + ':' + y} x={x} y={y} width="70" height="70" fill="currentColor" opacity={opacity} />
          ))}
          <path d="M70 455H210V560H70ZM490 350H630V420H490Z" fill="url(#fragment-dots)" opacity=".32" />
          <rect x="40" y="280" width="600" height="290" filter="url(#fragment-grain)" opacity=".035" />
          <g stroke="currentColor" strokeWidth=".75" opacity=".55">
            <path d="M70 395v-15h15m460 155h15v-15M210 560h140m-140-5v5m35-3v3m35-5v5m35-3v3m35-5v5" />
            <path d="M350 525h140v-70" strokeDasharray="2 5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
