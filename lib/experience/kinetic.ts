import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, type Cleanup } from './core';

gsap.registerPlugin(ScrollTrigger);

/** Wrap each word (keeping <em> accents) in a span so it can be animated on its own. */
function splitWords(el: HTMLElement) {
  if (el.dataset.split === 'done') return Array.from(el.querySelectorAll<HTMLElement>('.kw'));
  const words: HTMLElement[] = [];
  const walk = (node: Node, accent: boolean) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        (child.textContent || '').split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(document.createTextNode(part));
          const s = document.createElement('span');
          s.className = `kw${accent ? ' kw-accent' : ''}`;
          s.textContent = part;
          frag.append(s);
          words.push(s);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child, accent || (child as HTMLElement).tagName === 'EM');
      }
    });
  };
  walk(el, false);
  el.dataset.split = 'done';
  return words;
}

/**
 * [data-kinetic]: large manifesto type that fills from outline to solid as you scroll
 * (scrubbed, word by word). Accent words (<em>) fill in ICA violet.
 */
export function initKinetic(scope: ParentNode = document): Cleanup {
  const triggers: ScrollTrigger[] = [];
  const reduced = prefersReducedMotion();
  scope.querySelectorAll<HTMLElement>('[data-kinetic]').forEach((el) => {
    const words = splitWords(el);
    words.forEach((w) => {
      w.style.backgroundImage = `linear-gradient(90deg, ${w.classList.contains('kw-accent') ? 'var(--accent)' : 'var(--fg)'} 50%, transparent 50%)`;
      w.style.backgroundSize = '200% 100%';
      w.style.backgroundPosition = reduced ? '0% 0' : '100% 0';
      w.style.backgroundClip = 'text';
      (w.style as CSSStyleDeclaration & { webkitBackgroundClip: string }).webkitBackgroundClip = 'text';
      w.style.color = 'transparent';
      (w.style as CSSStyleDeclaration & { webkitTextStroke: string }).webkitTextStroke = '1.5px rgba(24,24,27,0.18)';
    });
    if (reduced) return;
    const tween = gsap.to(words, {
      backgroundPosition: '0% 0',
      ease: 'none',
      stagger: 0.12,
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  // [data-mask-text]: giant word with live imagery clipped inside; the image drifts and zooms on scroll
  scope.querySelectorAll<HTMLElement>('[data-mask-text]').forEach((el) => {
    if (reduced) return;
    const tween = gsap.fromTo(
      el,
      { backgroundPosition: '50% 0%', backgroundSize: '160%' },
      { backgroundPosition: '50% 100%', backgroundSize: '110%', ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } }
    );
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  // [data-reveal-lines]: headings rise out of a mask, word by word, when they enter
  scope.querySelectorAll<HTMLElement>('[data-reveal-words]').forEach((el) => {
    const words = splitWords(el);
    if (reduced) return;
    words.forEach((w) => {
      w.style.display = 'inline-block';
      w.style.willChange = 'transform';
    });
    el.style.overflow = 'hidden';
    const tween = gsap.from(words, {
      yPercent: 110,
      rotate: 4,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.045,
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
    if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
  });

  return () => triggers.forEach((t) => t.kill());
}
