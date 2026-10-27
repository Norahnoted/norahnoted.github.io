'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Navbar from './Navbar';
import Header from './Header';
import AboutSlides from './AboutSlides';
import Work from './Work';
import Contact from './Contact';
import Footer from './Footer';
import styles from './HomeExperience.module.css';
import slideStyles from './FullPageSlides.module.css';

gsap.registerPlugin(useGSAP);
const SECTIONS = ['top', 'about', 'work', 'contact'];
const LABELS = { top: 'Home', about: 'About me', work: 'My work', contact: 'Contact me' };

export default function HomeExperience() {
  const [active, setActive] = useState('top');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);
  const stage = useRef(null);
  const scroller = useRef(null);
  const sweep = useRef(null);
  const current = useRef('top');
  const transition = useRef(null);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    setThemeReady(true);
  }, []);
  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode, themeReady]);

  useGSAP((context, contextSafe) => {
    const scroll = scroller.current;
    const regions = [...scroll.querySelectorAll('[data-site-section]')];
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const topOf = region => {
      let top = 0;
      for (let node = region; node && node !== scroll; node = node.offsetParent) top += node.offsetTop;
      return top;
    };
    const find = name => regions.find(region => region.dataset.siteSection === name);
    const pages = [find('top'), ...find('about').querySelectorAll('[data-scroll-page]'), find('work'), find('contact')];
    const pageName = page => page.dataset.siteSection || page.closest('[data-site-section]').dataset.siteSection;
    const firstPageOf = name => pages.find(page => pageName(page) === name);
    let activePage = pages[0];
    let frame = 0;
    let navigating = false;
    const select = name => {
      if (name === current.current) return;
      current.current = name;
      setActive(name);
    };
    const bottomLeft = name => name === 'about' || name === 'contact';
    const insets = () => {
      const bounds = stage.current.getBoundingClientRect();
      return { side: innerWidth - bounds.right + (innerWidth < 768 ? 14 : 0), top: bounds.top };
    };
    const setLayout = name => {
      const { side } = insets();
      stage.current.style.setProperty('--frame-side-inset', `${side}px`);
      stage.current.dataset.corner = bottomLeft(name) ? 'bottom-left' : 'top-right';
    };
    const framePosition = name => {
      const { side, top } = insets();
      return {
        '--frame-x': `${bottomLeft(name) ? side : innerWidth - side}px`,
        '--frame-y': `${bottomLeft(name) ? innerHeight - top : top}px`,
      };
    };
    const placeFrame = name => gsap.set(sweep.current, { ...framePosition(name), autoAlpha: 1 });
    // The visible rectangle is derived from the actual moving lines, in viewport pixels.
    const maskFor = name => {
      const bounds = scroll.getBoundingClientRect();
      const clampX = x => Math.max(0, Math.min(bounds.width, x));
      const clampY = y => Math.max(0, Math.min(bounds.height, y));
      return () => {
        const x = parseFloat(sweep.current.style.getPropertyValue('--frame-x'));
        const y = parseFloat(sweep.current.style.getPropertyValue('--frame-y'));
        scroll.style.clipPath = bottomLeft(name)
          ? `inset(0px 0px ${clampY(bounds.bottom-y)}px ${clampX(x-bounds.left)}px)`
          : `inset(${clampY(y-bounds.top)}px ${clampX(bounds.right-x)}px 0px 0px)`;
      };
    };
    const syncSection = () => {
      frame = 0;
      if (navigating) return;
      // Fallback for scrollbar dragging. Wheel, touch and page keys step before a boundary is crossed.
      const page = [...pages].reverse().find(page => topOf(page) <= scroll.scrollTop + 2) || pages[0];
      if (page !== activePage) {
        const name = pageName(page);
        history.replaceState(null, '', `${location.pathname}${location.search}#${name}`);
        navigate(name, { fromScroll: true, pageTarget: page });
      }
    };
    const initial = SECTIONS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'top';
    activePage = firstPageOf(initial);
    setLayout(initial);
    scroll.scrollTop = topOf(activePage);
    scroll.dataset.homePage = activePage.dataset.scrollPage || initial;
    select(initial);
    placeFrame(initial);

    const navigate = contextSafe((name, { fromScroll = false, pageTarget } = {}) => {
      if (!SECTIONS.includes(name)) return;
      const previous = current.current;
      const previousPage = activePage;
      transition.current?.kill();
      scroll.style.removeProperty('clip-path');
      scroll.style.removeProperty('overflow-y');
      const region = pageTarget || firstPageOf(name);
      const withinAbout = previous === 'about' && name === 'about';
      const animate = !media.matches && region !== previousPage && !withinAbout;
      const destination = () => {
        setLayout(name);
        const start = topOf(region);
        const backwards = fromScroll && pages.indexOf(region) < pages.indexOf(previousPage);
        scroll.scrollTop = backwards ? Math.max(start, start + region.offsetHeight - scroll.clientHeight) : start;
      };
      navigating = true;
      select(name);
      activePage = region;
      scroll.dataset.homePage = region.dataset.scrollPage || name;
      const finish = () => {
        scroll.style.removeProperty('clip-path');
        scroll.style.removeProperty('overflow-y');
        placeFrame(name);
        navigating = false;
        if (!fromScroll) region.focus({ preventScroll: true });
      };
      if (!animate) { destination(); finish(); return; }
      scroll.style.overflowY = 'hidden';
      const sameCorner = bottomLeft(previous) === bottomLeft(name);
      let updateMask = () => {};
      const timeline = gsap.timeline({ defaults: { ease: 'power3.inOut' }, onUpdate: () => updateMask(), onComplete: finish });
      transition.current = timeline;
      if (sameCorner) {
        updateMask = maskFor(previous);
        timeline.to(sweep.current, { ...framePosition(bottomLeft(name) ? 'top' : 'about'), duration: .45 }, 0)
          .call(() => {
            scroll.style.clipPath = 'inset(100%)';
            destination();
            updateMask = maskFor(name);
            updateMask();
          }, [], .45);
      } else {
        scroll.style.clipPath = 'inset(100%)';
        destination();
        updateMask = maskFor(name);
        updateMask();
      }
      timeline.to(sweep.current, { ...framePosition(name), duration: .95 }, sameCorner ? .45 : 0);
    });
    const onClick = event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.('a[href]');
      if (!anchor || anchor.getAttribute('aria-disabled') === 'true' || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return;
      const url = new URL(anchor.href, location.href);
      if (url.origin !== location.origin || url.pathname !== '/') return;
      const name = url.hash.slice(1) || 'top';
      if (!SECTIONS.includes(name)) return;
      event.preventDefault();
      if (url.href !== location.href) history.pushState(null, '', `${url.pathname}${url.search}#${name}`);
      navigate(name);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(syncSection); };
    const hasOverlay = () => document.getElementById('mobile-navigation') || document.getElementById('navigation-projects') || document.querySelector('[data-portfolio-modal]');
    const localControl = target => target.closest?.('input,textarea,select,[contenteditable="true"],[data-local-scroll]');
    const remainingInPage = direction => {
      const start = topOf(activePage);
      const end = Math.max(start, start + activePage.offsetHeight - scroll.clientHeight);
      return direction > 0 ? end - scroll.scrollTop : scroll.scrollTop - start;
    };
    const stepPage = direction => {
      const page = pages[pages.indexOf(activePage) + direction];
      if (!page || navigating) return;
      const name = pageName(page);
      history.replaceState(null, '', `${location.pathname}${location.search}#${name}`);
      navigate(name, { fromScroll: true, pageTarget: page });
    };
    let lastGestureTime = 0;
    let gestureLocked = false;
    let gestureDelta = 0;
    const handleDelta = (event, delta) => {
      if (!delta) return;
      const now = performance.now();
      const quiet = now - lastGestureTime > 180;
      lastGestureTime = now;
      if (gestureLocked && quiet && !navigating) gestureLocked = false;
      if (navigating || gestureLocked) { event.preventDefault(); return; }
      const direction = Math.sign(delta);
      const remaining = remainingInPage(direction);
      // Long chapters keep normal reading scroll, clamped before the next chapter can peek in.
      if (remaining > 24) {
        gestureDelta = 0;
        if (Math.abs(delta) >= remaining) {
          event.preventDefault();
          scroll.scrollTop += direction * remaining;
        }
        return;
      }
      event.preventDefault();
      if (quiet || Math.sign(gestureDelta) !== direction) gestureDelta = 0;
      gestureDelta += delta;
      if (Math.abs(gestureDelta) < 40) return;
      gestureLocked = true;
      gestureDelta = 0;
      stepPage(direction);
    };
    const onWheel = event => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY) || localControl(event.target) || hasOverlay()) return;
      const units = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroll.clientHeight : 1;
      handleDelta(event, event.deltaY * units);
    };
    let touchY = null;
    const onTouchStart = event => {
      touchY = event.touches.length === 1 && !localControl(event.target) && !hasOverlay() ? event.touches[0].clientY : null;
      if (!navigating) { gestureLocked = false; gestureDelta = 0; }
    };
    const onTouchMove = event => {
      if (touchY === null || event.touches.length !== 1) return;
      const nextY = event.touches[0].clientY;
      handleDelta(event, touchY - nextY);
      touchY = nextY;
    };
    const onPageKey = event => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || !['PageDown','PageUp'].includes(event.key)) return;
      if (localControl(event.target) || hasOverlay()) return;
      event.preventDefault();
      if (navigating || event.repeat) return;
      const direction = event.key === 'PageDown' ? 1 : -1;
      const remaining = remainingInPage(direction);
      if (remaining > 24) scroll.scrollBy({ top: direction * Math.min(remaining, scroll.clientHeight * .85), behavior: media.matches ? 'instant' : 'smooth' });
      else stepPage(direction);
    };
    const onHistory = () => navigate(location.hash.slice(1) || 'top');
    const onMotionPreference = () => { if (media.matches) transition.current?.progress(1); };
    const onResize = () => { transition.current?.progress(1); setLayout(current.current); placeFrame(current.current); };
    document.addEventListener('click', onClick, true);
    scroll.addEventListener('scroll', onScroll, { passive: true });
    stage.current.addEventListener('wheel', onWheel, { passive: false });
    scroll.addEventListener('touchstart', onTouchStart, { passive: true });
    scroll.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('keydown', onPageKey);
    window.addEventListener('resize', onResize);
    window.addEventListener('hashchange', onHistory);
    window.addEventListener('popstate', onHistory);
    media.addEventListener('change', onMotionPreference);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('click', onClick, true);
      scroll.removeEventListener('scroll', onScroll);
      stage.current?.removeEventListener('wheel', onWheel);
      scroll.removeEventListener('touchstart', onTouchStart);
      scroll.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('keydown', onPageKey);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('hashchange', onHistory);
      window.removeEventListener('popstate', onHistory);
      media.removeEventListener('change', onMotionPreference);
    };
  }, { scope: stage });

  return <>
    <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} currentSection={active} />
    <main ref={stage} className={styles.stage} data-navigation-content aria-label="Portfolio">
      <div ref={scroller} data-home-scroll className={styles.scroll} tabIndex={-1}>
        <section data-site-section="top" className={styles.heroSection} aria-label="Home" tabIndex={-1}><Header isActive={active === 'top'} /></section>
        <section data-site-section="about" aria-label="About me" tabIndex={-1}><AboutSlides /></section>
        <section data-site-section="work" aria-label="My work" tabIndex={-1}><Suspense><Work /></Suspense></section>
        <section data-site-section="contact" className={slideStyles.contactSection} aria-label="Contact me" tabIndex={-1}><Contact /><Footer isDarkMode={isDarkMode} /></section>
      </div>
    </main>
    <div ref={sweep} className={styles.sweep} aria-hidden="true"><span data-sweep-horizontal className={styles.sweepHorizontal} /><span data-sweep-vertical className={styles.sweepVertical} /><span data-frame-intersection className={styles.frameIntersection} /></div>
    <span className={styles.announcement} role="status">{LABELS[active]}</span>
  </>;
}
