'use client';

import { useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// Keep the top navigation and frame anchored during route changes.
export default function NavigationTransitions({ children }) {
  const root = useRef(null);
  const timeline = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const firstRender = useRef(true);

  useGSAP((context, contextSafe) => {
    const content = root.current.querySelector('[data-navigation-content]');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (content && !firstRender.current && !reduceMotion.matches) {
      gsap.fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, duration: .35, ease: 'power3.out', clearProps: 'transform,opacity,visibility' });
    }
    firstRender.current = false;
    let recovery;
    const onClick = contextSafe(event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.('a[href]');
      if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (!url.pathname.startsWith('/projects/') && url.pathname !== '/') return;
      const outgoing = root.current.querySelector('[data-navigation-content]');
      if (!outgoing || reduceMotion.matches) return;
      event.preventDefault();
      timeline.current?.kill();
      clearTimeout(recovery);
      timeline.current = gsap.timeline({ onComplete: () => router.push(`${url.pathname}${url.search}${url.hash}`) })
        .to(outgoing, { autoAlpha: 0, duration: .2, ease: 'power2.in' });
      // A failed or interrupted navigation must never leave the current page hidden.
      recovery = setTimeout(contextSafe(() => gsap.set(outgoing, { clearProps: 'transform,opacity,visibility' })), 6000);
    });
    document.addEventListener('click', onClick, true);
    return () => {
      clearTimeout(recovery);
      document.removeEventListener('click', onClick, true);
    };
  }, { scope: root, dependencies: [pathname], revertOnUpdate: true });

  return <div ref={root}>{children}</div>;
}
