'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './SeasideScene.module.css';

gsap.registerPlugin(useGSAP);

export default function SeasideScene({ isActive = true, isDarkMode = false }) {
  const scene = useRef(null);
  const train = useRef(null);
  const arrival = useRef(null);
  const active = useRef(isActive);
  const syncPlayback = useRef(null);

  useGSAP((context, contextSafe) => {
    const root = scene.current;
    const surface = root.closest('section');
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const layers = root.querySelectorAll('[data-depth]');
    // Percentage movement preserves the stopping point at every viewport size.
    arrival.current = gsap.fromTo(train.current, { xPercent: -110 }, {
      xPercent: 0, duration: 8, ease: 'power2.out', paused: true,
    });
    const sync = () => {
      if (reduced.matches) arrival.current?.progress(1).pause();
      else if (active.current && !document.hidden) arrival.current?.play();
      else arrival.current?.pause();
    };
    syncPlayback.current = sync;
    sync();
    const move = contextSafe(event => {
      if (!active.current || reduced.matches || event.pointerType === 'touch') return;
      const rect = surface.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      layers.forEach(layer => {
        const depth = Number(layer.dataset.depth);
        gsap.to(layer, { x: x * depth, y: y * depth * .35, duration: 1.2, ease: 'sine.out', overwrite: true });
      });
    });
    const reset = contextSafe(() => gsap.to(layers, {
      x: 0, y: 0, duration: 1.2, ease: 'sine.out', overwrite: true,
    }));
    const preference = () => { sync(); reset(); };
    surface.addEventListener('pointermove', move);
    surface.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', preference);
    return () => {
      surface.removeEventListener('pointermove', move);
      surface.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', preference);
      syncPlayback.current = null;
      arrival.current = null;
    };
  }, { scope: scene });

  useEffect(() => {
    active.current = isActive;
    syncPlayback.current?.();
  }, [isActive]);

  return <div ref={scene} className={`${styles.scene} ${isDarkMode ? styles.night : ''}`}
    role="img" aria-label="Watercolor seaside station, with a train arriving behind the platform and stopping">
    <div className={styles.composition}>
      <img src="/seaside/background-v4.png" alt="" aria-hidden="true" className={styles.background} data-depth="2" />
      <div className={styles.middle} data-depth="4">
        <div ref={train} className={styles.train}>
          <span className={styles.trainShadow} />
          <img src="/seaside/train-n-badge.png" alt="" aria-hidden="true" draggable="false" />
        </div>
      </div>
      <div className={styles.foreground} data-depth="7">
        <span className={styles.platformShadow} />
        <img src="/seaside/station-village.png" alt="" aria-hidden="true" className={styles.station} draggable="false" />
      </div>
    </div>
  </div>;
}
