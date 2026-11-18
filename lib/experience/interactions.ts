import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, type Cleanup } from './core';

gsap.registerPlugin(ScrollTrigger);

/** [data-stack]: a pile of message cards that fans out as it scrolls into view. */
export function initStack(scope: ParentNode = document): Cleanup {
  const triggers: ScrollTrigger[] = [];
  scope.querySelectorAll<HTMLElement>('[data-stack]').forEach((stack) => {
    const cards = Array.from(stack.querySelectorAll<HTMLElement>('[data-stack-card]'));
    const mid = (cards.length - 1) / 2;
    const spread = () => (window.innerWidth < 768 ? 46 : 150);
    if (prefersReducedMotion()) {
      cards.forEach((c, i) => gsap.set(c, { x: (i - mid) * spread(), rotation: (i - mid) * 6, y: Math.abs(i - mid) * 18 }));
      return;
    }
    const tl = gsap.timeline({ scrollTrigger: { trigger: stack, start: 'top 85%', end: 'center 45%', scrub: 0.8 } });
    cards.forEach((c, i) => {
      tl.fromTo(c, { x: 0, y: 40, rotation: (i - mid) * 1.5 }, { x: () => (i - mid) * spread(), y: Math.abs(i - mid) * 18, rotation: (i - mid) * 6, ease: 'power2.out' }, 0);
    });
    if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
  });
  return () => triggers.forEach((t) => t.kill());
}

/** [data-clock]: live Nairobi time; [data-countdown]: time to the next Sunday service. */
export function initClocks(scope: ParentNode = document): Cleanup {
  const clocks = Array.from(scope.querySelectorAll<HTMLElement>('[data-clock]'));
  const countdowns = Array.from(scope.querySelectorAll<HTMLElement>('[data-countdown]'));
  if (!clocks.length && !countdowns.length) return () => {};
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Africa/Nairobi' });
  const update = () => {
    const now = new Date();
    clocks.forEach((c) => (c.textContent = `EAT ${fmt.format(now)}`));
    if (countdowns.length) {
      // Nairobi is UTC+3 with no Daylight Saving Time.
      // Sunday first service is at 08:30:00 EAT, which is 05:30:00 UTC.
      const nowMs = now.getTime();
      const nairobiNow = new Date(nowMs + 3 * 3600_000);
      const dow = nairobiNow.getUTCDay(); // 0 = Sun, 1 = Mon...
      
      let daysToAdd = (7 - dow) % 7;
      const targetYear = nairobiNow.getUTCFullYear();
      const targetMonth = nairobiNow.getUTCMonth();
      const targetDate = nairobiNow.getUTCDate() + daysToAdd;
      
      let targetUtc = Date.UTC(targetYear, targetMonth, targetDate, 5, 30, 0);
      if (targetUtc <= nowMs) {
        // If Sunday service has already started today, countdown to next Sunday
        targetUtc += 7 * 86_400_000;
      }
      
      let ms = Math.max(0, targetUtc - nowMs);
      const d = Math.floor(ms / 86_400_000); ms -= d * 86_400_000;
      const h = Math.floor(ms / 3_600_000); ms -= h * 3_600_000;
      const m = Math.floor(ms / 60_000); ms -= m * 60_000;
      const s = Math.floor(ms / 1000);
      const text = `${String(d).padStart(2, '0')}D ${String(h).padStart(2, '0')}H ${String(m).padStart(2, '0')}M ${String(s).padStart(2, '0')}S`;
      countdowns.forEach((c) => (c.textContent = text));
    }
  };
  update();
  const id = window.setInterval(update, 1000);
  return () => window.clearInterval(id);
}

/** [data-scroll-progress]: thin progress rule + percentage readout. */
export function initProgress(): Cleanup {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-progress]'));
  if (!els.length) return () => {};
  const st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => els.forEach((el) => (el.textContent = `${String(Math.round(self.progress * 100)).padStart(3, '0')}%`)),
  });
  return () => st.kill();
}
