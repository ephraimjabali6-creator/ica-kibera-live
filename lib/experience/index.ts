import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Cleanup } from './core';
import { initGallery } from './gallery';
import { initKinetic } from './kinetic';
import { initClocks, initProgress, initStack } from './interactions';

/** Site-wide: scroll percentage in the footer. */
export function initGlobal(): Cleanup {
  const off = initProgress();
  return () => off();
}

/** Per page: scroll-scrubbed type, the photo row, the message stack and the service countdown. */
export function initPage(root: HTMLElement): Cleanup {
  const offs: Cleanup[] = [initKinetic(root), initStack(root), initClocks(root)];
  root.querySelectorAll<HTMLElement>('[data-gallery]').forEach((el) => offs.push(initGallery(el)));
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh).catch(() => {});
  return () => {
    window.removeEventListener('load', refresh);
    offs.reverse().forEach((f) => f());
  };
}
