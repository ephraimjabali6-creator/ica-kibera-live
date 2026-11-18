import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, type Cleanup } from './core';

gsap.registerPlugin(ScrollTrigger);

/**
 * [data-gallery]: on large screens the photo row slides sideways while the section scrolls
 * (one transform, scrubbed). On phones it stays a native swipe row.
 */
export function initGallery(root: HTMLElement): Cleanup {
  const track = root.querySelector<HTMLElement>('[data-gallery-track]');
  if (!track || prefersReducedMotion()) return () => {};
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth),
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
    });
  });
  return () => mm.revert();
}
