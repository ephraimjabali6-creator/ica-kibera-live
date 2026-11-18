import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import VideoModal from '../VideoModal';
import { MagneticButton } from '../experience/MagneticButton';
import { Sermon, sermonThumb, CHURCH } from '../../content/church';
import {
  HERO_CONTENT,
  MANIFESTO_CONTENT,
  KARIBU_CONTENT,
  LIFE_CONTENT,
  MESSAGES_CONTENT,
  GATHER_CONTENT,
} from '../../content/canonicalLanding';

// ─── Types for GSAP (dynamic import, SSR-safe) ───────────────────────────────
type CleanupFn = () => void;

export default function TrinityAnglicanTemplate() {
  const [playing, setPlaying] = useState<Sermon | null>(null);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard?.writeText(text);
      if (typeof navigator.vibrate === 'function') {
        navigator.vibrate(15);
      }
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2500);
    }
  };

  const featuredSermon = MESSAGES_CONTENT.stack[0] || MESSAGES_CONTENT.latest[0];
  const recentSermons = MESSAGES_CONTENT.latest.slice(1, 3);

  // ── Smart Auto-Hide Header on Scroll Down, Reveal on Scroll Up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // ── Hero slides
  const heroSlides = [
    { src: '/images/worship-sanctuary.jpg',  alt: 'ICA Kibera Worship Sanctuary'     },
    { src: '/images/preaching-pulpit.jpg',   alt: 'Word & Apostolic Ministry at ICA' },
    { src: '/images/kajiado-worship.jpg',    alt: 'Apostolic Fellowship & Worship'   },
    { src: '/images/outreach-crowd.jpg',     alt: 'Community Outreach in Kibera'     },
  ];

  // Auto-cycle Ken Burns hero
  useEffect(() => {
    const timer = setInterval(() => setActiveHeroSlide((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // ─────────────────────────────────────────────────────────────────────────
  //  GSAP SCROLL ENGINE — identical pattern to lib/experience/index.ts
  //  All effects are SSR-safe (dynamic import runs only in browser)
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const root = pageRef.current;
    if (!root) return;

    const cleanups: CleanupFn[] = [];

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      const { ScrollToPlugin } = await import('gsap/ScrollToPlugin');
      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── 0. SMOOTH IN-PAGE ANCHOR SCROLLING (Cinematic Glide) ─────────────
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
        if (!anchor) return;
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#' || targetId === '#main') return;
        const targetEl = root.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: targetEl, offsetY: 70 },
            ease: 'power3.inOut',
          });
        }
      };
      root.addEventListener('click', handleAnchorClick);
      cleanups.push(() => root.removeEventListener('click', handleAnchorClick));

      // ── 1. PROGRESS BAR ──────────────────────────────────────────────────
      const progressBar = root.querySelector<HTMLElement>('[data-progress-bar]');
      if (progressBar) {
        const st = ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            progressBar.style.width = `${self.progress * 100}%`;
            progressBar.style.opacity = self.progress > 0.01 ? '1' : '0';
          },
        });
        cleanups.push(() => st.kill());
      }

      // ── 2. SECTION FADE-SLIDE-UP REVEALS ────────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        if (prefersReduced) return;
        gsap.set(el, { autoAlpha: 0, y: 55 });
        const tween = gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 3. STAGGERED CHILD REVEALS ───────────────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
        if (prefersReduced) return;
        const items = Array.from(group.children) as HTMLElement[];
        gsap.set(items, { autoAlpha: 0, y: 40 });
        const tween = gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: 'top 85%', once: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 4. SCRUBBED KINETIC TEXT (WORD FILL) ────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-kinetic]').forEach((el) => {
        if (el.dataset.split === 'done') return;
        const words: HTMLElement[] = [];
        const walk = (node: Node) => {
          Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
              const frag = document.createDocumentFragment();
              (child.textContent || '').split(/(\s+)/).forEach((part) => {
                if (!part) return;
                if (/^\s+$/.test(part)) return frag.append(document.createTextNode(part));
                const s = document.createElement('span');
                s.className = 'kw';
                s.style.backgroundImage = 'linear-gradient(90deg, #0F172A 50%, transparent 50%)';
                s.style.backgroundSize = '200% 100%';
                s.style.backgroundPosition = prefersReduced ? '0% 0' : '100% 0';
                s.style.backgroundClip = 'text';
                (s.style as any).webkitBackgroundClip = 'text';
                s.style.color = 'transparent';
                (s.style as any).webkitTextStroke = '1px rgba(15,23,42,0.18)';
                s.style.display = 'inline-block';
                s.textContent = part;
                frag.append(s);
                words.push(s);
              });
              child.replaceWith(frag);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
              walk(child);
            }
          });
        };
        walk(el);
        el.dataset.split = 'done';
        if (prefersReduced) return;
        const tween = gsap.to(words, {
          backgroundPosition: '0% 0',
          ease: 'none',
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 42%', scrub: 0.7 },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 5. SCRUBBED TEXT REVEAL (word-by-word float up) ─────────────────
      root.querySelectorAll<HTMLElement>('[data-reveal-words]').forEach((el) => {
        if (prefersReduced || el.dataset.split === 'done') return;
        const originalText = el.textContent || '';
        el.textContent = '';
        const words: HTMLElement[] = [];
        originalText.split(/\s+/).filter(Boolean).forEach((word) => {
          const s = document.createElement('span');
          s.textContent = word + ' ';
          s.style.display = 'inline-block';
          s.style.willChange = 'transform';
          el.appendChild(s);
          words.push(s);
        });
        el.dataset.split = 'done';
        const tween = gsap.from(words, {
          yPercent: 115,
          rotate: 5,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.045,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 6. PARALLAX IMAGE LAYERS ─────────────────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        if (prefersReduced) return;
        const factor = parseFloat(el.dataset.parallax || '0.25');
        const tween = gsap.to(el, {
          yPercent: factor * 100,
          ease: 'none',
          scrollTrigger: { trigger: el.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 7. HORIZONTAL GALLERY SCRUB ─────────────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-gallery]').forEach((galleryRoot) => {
        const track = galleryRoot.querySelector<HTMLElement>('[data-gallery-track]');
        if (!track || prefersReduced) return;
        const mm = gsap.matchMedia();
        mm.add('(min-width: 1024px)', () => {
          const tween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth + 64),
            ease: 'none',
            scrollTrigger: {
              trigger: galleryRoot,
              start: 'top top',
              end: () => `+=${track.scrollWidth - window.innerWidth + 64}`,
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          cleanups.push(() => tween.scrollTrigger?.kill());
        });
        cleanups.push(() => mm.revert());
      });

      // ── 8. STICKY SECTION BACKGROUND COLOR SHIFT ────────────────────────
      root.querySelectorAll<HTMLElement>('[data-bg-shift]').forEach((el) => {
        if (prefersReduced) return;
        const from = el.dataset.bgFrom || '#ffffff';
        const to   = el.dataset.bgTo   || '#F8F9FA';
        const tween = gsap.fromTo(el,
          { backgroundColor: from },
          { backgroundColor: to, ease: 'none', scrollTrigger: { trigger: el, start: 'top 70%', end: 'top 20%', scrub: 1 } }
        );
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 9. COUNTER ANIMATE (number roll-up) ─────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-count-to]').forEach((el) => {
        if (prefersReduced) { el.textContent = el.dataset.countTo!; return; }
        const target = parseFloat(el.dataset.countTo!);
        const obj = { val: 0 };
        const tween = gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power3.out',
          onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString(); },
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 10. CLIP-PATH WIPE REVEAL ────────────────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-clip-reveal]').forEach((el) => {
        if (prefersReduced) return;
        gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
        const tween = gsap.to(el, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 11. SCALE + FADE CARDS ───────────────────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-scale-in]').forEach((el) => {
        if (prefersReduced) return;
        gsap.set(el, { autoAlpha: 0, scale: 0.88 });
        const tween = gsap.to(el, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 12. SCRUBBED HERO PARALLAX DEPTH ─────────────────────────────────
      const heroImg = root.querySelector<HTMLElement>('[data-hero-parallax]');
      if (heroImg && !prefersReduced) {
        const tween = gsap.to(heroImg, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: { trigger: heroImg.parentElement!, start: 'top top', end: 'bottom top', scrub: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      }

      // ── 13. SMOOTH SECTION FADE-IN (for sections without data-reveal) ──
      root.querySelectorAll<HTMLElement>('[data-fade-section]').forEach((el) => {
        if (prefersReduced) return;
        gsap.set(el, { autoAlpha: 0 });
        const tween = gsap.to(el, {
          autoAlpha: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      // ── 14. HORIZONTAL LINE WIPE ──────────────────────────────────────
      root.querySelectorAll<HTMLElement>('[data-line-wipe]').forEach((el) => {
        if (prefersReduced) return;
        gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
        const tween = gsap.to(el, {
          scaleX: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
        cleanups.push(() => tween.scrollTrigger?.kill());
      });

      ScrollTrigger.refresh();
      cleanups.push(() => ScrollTrigger.getAll().forEach((t) => t.kill()));
    })();

    return () => { cleanups.forEach((fn) => fn?.()); };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#FAF9F6] text-[#334155] antialiased selection:bg-[#D90077]/20 selection:text-[#0F172A] relative overflow-x-hidden" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>

      {/* ── MAGENTA SCRUBBED SCROLL PROGRESS BEAM ─────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[200] pointer-events-none">
        <div
          data-progress-bar
          className="h-full bg-gradient-to-r from-[#D90077] to-[#FF4DA6] opacity-0 transition-none"
          style={{ width: '0%' }}
        />
      </div>

      {/* ── UNIFIED TRINITY ANGLICAN NAVIGATION (Auto-Hiding, Sleek 68px) ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-white/92 backdrop-blur-xl border-b border-[#E2E8F0]/50 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isNavHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{ boxShadow: '0 1px 2px rgba(15,23,42,0.02)' }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo & Church Name */}
          <Link href="/" className="flex items-center gap-3 group" data-cursor-text="HOME">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image src="/images/ica-logo.png" alt="ICA Kibera Emblem" width={36} height={36} className="object-contain" priority />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-[#0F172A] leading-none group-hover:text-[#D90077] transition-colors duration-300" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                ICA Kibera
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#94A3B8] font-medium mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Olympic · Makina · Nairobi
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.12em] text-[#64748B]">
            <a href="#welcome" className="hover:text-[#0F172A] transition-colors duration-300">About</a>
            <a href="#schedule" className="hover:text-[#0F172A] transition-colors duration-300">Worship</a>
            <a href="#livestream" className="hover:text-[#0F172A] transition-colors duration-300">Livestream</a>
            <a href="#ministries" className="hover:text-[#0F172A] transition-colors duration-300">Ministries</a>
            <a href="#gallery" className="hover:text-[#0F172A] transition-colors duration-300">Community</a>
          </nav>

          {/* Right Action: Mobile Menu Toggle only (No Give/Tithe banner) */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-xl">
            <a
              href="#welcome"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-[#D90077]"
            >
              About Overseers
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-[#D90077]"
            >
              Worship Times
            </a>
            <a
              href="#livestream"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-[#D90077]"
            >
              Livestream
            </a>
            <a
              href="#ministries"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-[#D90077]"
            >
              Ministries
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold uppercase tracking-wider text-slate-800 hover:text-[#D90077]"
            >
              Community Gallery
            </a>
          </div>
        )}
      </header>

      <main id="main" className="pt-16">
        {/* ── 01 HERO — LUMINOUS CATHEDRAL STAGE ───────────────────────── */}
        <section className="relative min-h-[600px] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0F172A]">
          {/* Luminous sanctuary photography background */}
          <div data-hero-parallax className="absolute inset-0 w-full h-[125%] -top-[12%]">
            {heroSlides.map((slide, idx) => (
              <div key={idx} className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${idx === activeHeroSlide ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  className={`object-cover object-center transition-transform ease-out ${idx === activeHeroSlide ? 'scale-[1.03] duration-[12000ms]' : 'scale-100 duration-700'}`}
                />
              </div>
            ))}
          </div>

          {/* Refined gradient veil — deeper at bottom for text contrast, luminous at top */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/50 via-[#0F172A]/40 to-[#0F172A]/90" />

          {/* Hero Content */}
          <div data-reveal className="relative z-10 max-w-3xl mx-auto px-6 py-32 lg:py-40 text-center space-y-8">
            {/* Worship time pill */}
            <div className="inline-flex flex-col items-center gap-3">
              <div className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white/80 text-xs" style={{ fontFamily: '"Instrument Serif", serif' }}>
                ✝
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                {HERO_CONTENT.schedulePill} · {HERO_CONTENT.locationPill}
              </span>
            </div>

            <div className="space-y-4">
              <h1
                className="text-[40px] sm:text-[56px] lg:text-[72px] font-normal tracking-[-0.02em] text-white leading-[1.05]"
                style={{ fontFamily: '"Instrument Serif", Georgia, serif', textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}
                data-reveal-words
              >
                {HERO_CONTENT.headingLine1}
              </h1>
              <p className="text-xl sm:text-3xl lg:text-[36px] italic text-white/80 leading-[1.3] font-normal" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                {HERO_CONTENT.headingLine2}
              </p>
            </div>

            <p className="max-w-xl mx-auto text-[15px] sm:text-base text-white/65 leading-[1.8] font-light tracking-[0.01em]" style={{ fontFamily: 'Inter, sans-serif' }}>
              {HERO_CONTENT.leadParagraph}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <MagneticButton
                asAnchor
                href="#welcome"
                strength={0.35}
                className="inline-flex items-center gap-2.5 bg-white text-[#0F172A] px-7 py-3.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#D90077] hover:text-white shadow-lg shadow-black/10 active:scale-[0.97]"
                data-cursor-text="WELCOME"
              >
                <span>Plan Your Visit</span>
                <span className="text-[9px]">→</span>
              </MagneticButton>
              <MagneticButton
                asAnchor
                href="#livestream"
                strength={0.35}
                className="inline-flex items-center gap-2.5 bg-transparent hover:bg-white/10 border border-white/20 hover:border-white/40 text-white px-7 py-3.5 rounded-full text-[11px] font-medium uppercase tracking-[0.1em] backdrop-blur-sm transition-all duration-300 active:scale-[0.97]"
                data-cursor-text="STREAM"
              >
                <span>Watch Live</span>
                <span className="text-[9px]">▶</span>
              </MagneticButton>
            </div>
          </div>

          {/* Slide indicators — minimal dots */}
          <div className="absolute bottom-8 right-8 z-20 flex gap-1.5">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setActiveHeroSlide(i)}
                      aria-label={`Slide ${i + 1}`}
                      className={`rounded-full transition-all duration-500 ${i === activeHeroSlide ? 'w-7 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/50'}`} />
            ))}
          </div>
        </section>

        {/* ── 02 KINETIC MANIFESTO STRIP (SCRUBBED WORD-FILL) ───────────── */}
        <section className="bg-white border-y border-[#E2E8F0]/50 py-28 sm:py-36 px-6 lg:px-16 overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#D90077] font-semibold mb-10" style={{ fontFamily: 'Inter, sans-serif' }} data-reveal>
              Apostolic Manifesto · ICA Kibera
            </p>
            <p
              data-kinetic
              className="text-[28px] sm:text-[42px] lg:text-[52px] font-normal tracking-[-0.02em]"
              style={{ lineHeight: 1.3, fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              Worshipping Jesus, teaching His Word, raising the next generation and giving life to Kibera, Nairobi and the nations — every Sunday and every day.
            </p>
          </div>
        </section>

        {/* ── 03 PASTORAL LETTER — DIGNIFIED EDITORIAL LAYOUT ──────────── */}
        <section id="welcome" className="py-32 sm:py-40 bg-[#FAF9F6] relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 sm:px-8">
            <div data-reveal className="space-y-14">
              
              {/* Pastoral Header & Eyebrow */}
              <div className="text-center space-y-5">
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  A Pastoral Welcome · Since 1994
                </span>
                <h2 className="text-[32px] sm:text-[48px] font-normal text-[#0F172A] tracking-[-0.02em] leading-[1.1]" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                  Welcome to our Sanctuary Family
                </h2>
                <p className="italic text-lg sm:text-xl text-[#64748B] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                  &ldquo;A church of ministers who are scripture-oriented, able, and community-sensitive.&rdquo;
                </p>
              </div>

              {/* Pastoral Editorial Sheet */}
              <div
                className="bg-white rounded-2xl p-8 sm:p-14 border border-[#E2E8F0]/60 relative"
                style={{ boxShadow: '0 20px 60px -15px rgba(15,23,42,0.06), 0 0 0 1px rgba(15,23,42,0.03)' }}
              >
                {/* Bishop & Dr. Ruth Portrait Row */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-10 border-b border-[#F1F5F9]">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0 ring-3 ring-[#FAF9F6] shadow-sm">
                    <Image
                      src="/images/elders.jpg"
                      alt="Bishop Andrew & Dr. Ruth Ouma"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <h3 className="text-lg font-normal text-[#0F172A]" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>Bishop Andrew &amp; Dr. Ruth Ouma</h3>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#D90077] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Presiding Bishop &amp; Pastoral Overseers
                    </p>
                    <p className="text-[11px] text-[#94A3B8] italic" style={{ fontFamily: '"Instrument Serif", serif' }}>
                      International Christian Assemblies · Olympic, Kibera
                    </p>
                  </div>
                </div>

                {/* Editorial Letter Body */}
                <div className="pt-8 space-y-6 text-[15px] sm:text-[16px] text-[#475569] leading-[1.9]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <p>
                    Karibu to International Christian Assemblies. For over thirty years, our calling has been simple and uncompromising: to worship Jesus Christ with pure hearts, to preach the uncompromised Word of God, and to bring life, restoration, and real hope to families across Kibera and Nairobi.
                  </p>
                  <p>
                    {MANIFESTO_CONTENT.statementPrefix}
                  </p>
                  <p className="text-sm text-[#64748B] leading-relaxed pt-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Whether you are an Olympic resident, visiting Kibera, or worshipping with our global family across Kenya, our sanctuary doors, our altar, and our hearts are open to you.
                  </p>
                </div>

                {/* Handwritten Ink Sign-Off */}
                <div className="mt-12 pt-8 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#94A3B8] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>Signed with grace,</span>
                    {/* Authentic Handwritten Signature using Caveat */}
                    <div className="text-[32px] sm:text-[38px] text-[#0F172A] leading-none" style={{ fontFamily: 'Caveat, cursive', fontWeight: 500 }}>
                      Bishop Andrew &amp; Dr. Ruth
                    </div>
                    <span className="text-[10px] text-[#94A3B8] font-medium tracking-[0.15em] uppercase block" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Bishop Andrew &amp; Dr. Ruth Ouma
                    </span>
                  </div>

                  {/* Pastoral Actions */}
                  <div className="flex flex-wrap gap-3">
                    <MagneticButton
                      asAnchor
                      href={CHURCH.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      strength={0.3}
                      className="inline-flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-6 py-2.5 rounded-full text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-300 shadow-sm hover:shadow-md active:scale-[0.97]"
                      data-cursor-text="CHAT"
                    >
                      <span>WhatsApp Office</span>
                      <span className="text-[9px] opacity-60">↗</span>
                    </MagneticButton>
                    <a
                      href={CHURCH.phoneHref}
                      className="inline-flex items-center gap-2 border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#475569] px-5 py-2.5 rounded-full text-[11px] font-medium uppercase tracking-[0.1em] transition-all duration-300 hover:bg-[#F8FAFC]"
                    >
                      <span>{CHURCH.phone}</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 04 STAT COUNTER STRIP ─────────────────────────────────────── */}
        <section
          data-bg-shift
          data-bg-from="#ffffff"
          data-bg-to="#FAFAF8"
          className="py-16 sm:py-20 border-y border-[#E2E8F0]/60"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div data-stagger className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
              {[
                { count: '800', suffix: '+', label: 'Children Fed Daily' },
                { count: '1994', suffix: '', label: 'Year Founded' },
                { count: '6', suffix: '', label: 'Active Ministries' },
                { count: '247247', suffix: '', label: 'Equity Paybill' },
              ].map(({ count, suffix, label }) => (
                <div key={label} className="space-y-1.5">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0F172A] leading-none tracking-tight" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                    <span data-count-to={count}>0</span>{suffix}
                  </div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 SERVICES & SCHEDULE — SUNDAY-FIRST HIERARCHY ─────────── */}
        <section id="schedule" className="py-28 sm:py-36 bg-[#FAF9F6] border-t border-[#E2E8F0]/60">
          <div className="max-w-5xl mx-auto px-6 sm:px-8">
            <div data-reveal className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Worship &amp; Fellowship Times
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#0F172A] tracking-[-0.02em] leading-tight" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                Join Us in Worship &amp; Prayer
              </h2>
              <p className="text-[#64748B] text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                In-person at Olympic Sanctuary, Kibera, or joining remotely worldwide.
              </p>
            </div>

            <div className="space-y-6">
              {/* Primary Card: Sunday Celebration Services (Prominent Hero Treatment) */}
              <div
                data-scale-in
                className="bg-white rounded-2xl p-8 sm:p-12 border border-[#E2E8F0]/80 relative overflow-hidden"
                style={{ boxShadow: '0 20px 45px -10px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.02)' }}
                data-cursor-text="SUNDAYS"
              >
                <div className="w-1 h-full bg-[#D90077] absolute top-0 left-0" />
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#F1F5F9] gap-4">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D90077]" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Lord’s Day Gathering
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-normal text-[#0F172A] mt-1" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                      Sunday Celebration Services
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Olympic Sanctuary · Makina · Kibera, Nairobi
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="#livestream"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D90077] hover:underline underline-offset-4"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <span>Watch Live Stream</span>
                      <span className="text-[10px]">▶</span>
                    </a>
                  </div>
                </div>

                {/* Sunday Times Grid */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {GATHER_CONTENT.gatherings.slice(0, 2).map((srv, i) => (
                    <div key={i} className="bg-[#FAF9F6] rounded-xl p-6 border border-[#E2E8F0]/60 flex flex-col justify-between">
                      <div>
                        <div className="text-lg font-normal text-[#0F172A]" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>{srv.name}</div>
                        <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{srv.note}</p>
                      </div>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-mono">DOORS OPEN 30M PRIOR</span>
                        <span className="bg-white text-[#D90077] px-3 py-1 rounded-md text-xs font-semibold border border-[#E2E8F0] shadow-sm font-mono">
                          {srv.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span>Children&apos;s Church runs concurrently during all Sunday celebrations</span>
                  <span className="font-mono text-[10px]">Bilingual Service: English &amp; Kiswahili</span>
                </div>
              </div>

              {/* Secondary Band: Midweek Bible Fellowship & Night Kesha */}
              <div
                data-scale-in
                className="bg-white rounded-2xl p-8 sm:p-10 border border-[#E2E8F0]/80"
                style={{ boxShadow: '0 8px 30px -4px rgba(15,23,42,0.02)' }}
                data-cursor-text="MIDWEEK"
              >
                <div className="pb-6 border-b border-[#F1F5F9]">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Midweek Discipleship &amp; Intercession
                  </span>
                  <h4 className="text-xl font-normal text-[#0F172A] mt-0.5" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                    Prayer Warfare &amp; Bible Teaching
                  </h4>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {GATHER_CONTENT.gatherings.slice(2, 4).map((srv, i) => (
                    <div key={i} className="flex items-start justify-between gap-4 py-2">
                      <div>
                        <div className="font-medium text-[#0F172A] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>{srv.name}</div>
                        <div className="text-xs text-[#64748B] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{srv.note}</div>
                      </div>
                      <div className="flex-shrink-0 bg-[#F1F5F9] text-[#0F172A] px-3 py-1 rounded-md text-xs font-semibold font-mono">
                        {srv.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 06 LIVESTREAM BANNER (SCALE-IN + DEEP NAVY) ──────────────── */}
        <section id="livestream" className="relative bg-[#0F172A] text-white py-28 sm:py-36 overflow-hidden">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D90077]/10 rounded-full blur-[180px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
            <div data-reveal className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <span className="inline-block bg-[#D90077] text-white text-[10px] font-medium uppercase tracking-[0.25em] px-3.5 py-1 rounded-full"
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                Live Broadcast
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-tight leading-tight" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                Sunday Livestream &amp; Apostolic Sermons
              </h2>
              <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                Cannot make it in person? Join hundreds of believers streaming live every Sunday morning on YouTube and Facebook.
              </p>
            </div>

            {/* Video Player — SCALE-IN REVEAL */}
            <div data-scale-in className="max-w-4xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video group cursor-pointer border border-white/10"
                   style={{ boxShadow: '0 25px 60px -12px rgba(0,0,0,0.6)' }}
                   onClick={() => setPlaying(featuredSermon)}
                   data-cursor-text="PLAY">
                <Image src={sermonThumb(featuredSermon.id)} alt={featuredSermon.title} fill
                       className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-between p-6 sm:p-10">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 bg-red-600/90 text-white text-[10px] font-medium uppercase px-3 py-1 rounded-full font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Latest Broadcast
                    </span>
                    <span className="text-[11px] text-slate-300 font-mono">{featuredSermon.date} · {featuredSermon.speaker}</span>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md text-white inline-flex items-center justify-center group-hover:bg-[#D90077] group-hover:scale-105 active:scale-95 transition-all duration-300 mx-auto"
                         style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
                      <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-normal text-white mt-4" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>{featuredSermon.title}</h3>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>{featuredSermon.description}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span>Message Archive</span>
                    <span className="text-[#FF80BF] font-medium hover:underline">Watch Now →</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sermons Strip */}
            <div data-stagger className="max-w-4xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentSermons.map((sermon, i) => (
                <div key={i} onClick={() => setPlaying(sermon)}
                     className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#D90077]/40 rounded-xl p-4 flex gap-4 items-center cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                     data-cursor-text="PLAY">
                  <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-800">
                    <Image src={sermonThumb(sermon.id)} alt={sermon.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-white text-[10px]">▶</span></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-[#D90077] font-medium font-mono">{sermon.date}</div>
                    <div className="text-sm font-medium text-white truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{sermon.title}</div>
                    <div className="text-xs text-slate-500 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{sermon.speaker}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subtle Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
            <svg className="block w-full h-8 sm:h-12 text-[#FAF9F6]" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" />
            </svg>
          </div>
        </section>

        {/* ── 07 HORIZONTAL SCROLL GALLERY ── */}
        <section
          id="gallery"
          data-gallery
          className="relative bg-[#FAF9F6] border-y border-[#E2E8F0]/60 overflow-hidden lg:h-screen"
        >
          {/* Mobile Horizontal Snap Container / Desktop Pinned Track */}
          <div
            data-gallery-track
            className="flex flex-col lg:flex-row lg:h-full lg:items-center gap-8 px-6 sm:px-12 lg:px-16 py-16 lg:py-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-none will-change-transform"
            style={{ width: '100%' }}
          >
            {/* Section Label */}
            <div className="flex-shrink-0 w-full lg:w-80 space-y-4 mb-4 lg:mb-0 lg:mr-8">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>Life at ICA Kibera</span>
              <h2 className="text-3xl sm:text-4xl font-normal text-[#0F172A] leading-tight" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                Photojournalism &amp; Community
              </h2>
              <p className="text-sm text-[#64748B] leading-relaxed font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
                A visual journey through authentic moments of high praise, compassion, and church family in Olympic, Kibera.
              </p>
              <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-400 font-mono uppercase tracking-wider pt-2">
                <span>Scroll Sideways</span>
                <svg className="w-8 h-3 fill-current" viewBox="0 0 32 12">
                  <path d="M0 6h28M22 1l6 5-6 5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Photo Cards with Mobile Snap Alignment */}
            <div className="flex gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 snap-x snap-mandatory">
              {LIFE_CONTENT.map((img, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 snap-center relative rounded-2xl overflow-hidden group cursor-pointer border border-[#E2E8F0]/80"
                  style={{
                    width: 'clamp(280px, 75vw, 360px)',
                    height: 'clamp(380px, 55vh, 500px)',
                    boxShadow: '0 12px 35px -8px rgba(15,23,42,0.04)'
                  }}
                  data-cursor-text="VIEW"
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-6">
                    <div>
                      <div className="text-[10px] text-[#FF94C7] font-mono font-medium uppercase tracking-wider mb-1">
                        {String(i + 1).padStart(2, '0')} / {String(LIFE_CONTENT.length).padStart(2, '0')}
                      </div>
                      <p className="text-white font-normal text-sm leading-snug" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>{img.caption}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveGalleryIndex(i)}
                    className="absolute inset-0"
                    aria-label={`View: ${img.caption}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 08 MINISTRIES 3-COL (SCALE-IN STAGGER) ─────────────────── */}
        <section id="ministries" className="py-28 sm:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div data-reveal className="text-center max-w-2xl mx-auto mb-16 space-y-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Discipleship &amp; Mission
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-normal text-[#0F172A] tracking-[-0.02em] leading-tight" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                Ministries &amp; Community Programs
              </h2>
            </div>

            <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { img: '/images/kajiado-worship.jpg', badge: 'Generation Revival', title: 'Youth & Young Adults', desc: 'Radical worship, campus mentorship, creative arts, and digital discipleship equipping young people to lead with apostolic fire.', time: 'Saturdays 3:00 PM', link: '#contact' },
                { img: '/images/outreach-crowd.jpg', badge: 'Compassion Outreach', title: 'Hope School & 800+ Feeding', desc: 'Free Christian primary education, daily hot meals for 800+ children, and uniform support for the most vulnerable families of Kibera.', time: 'Monday – Friday', link: '#give' },
                { img: '/images/sanctuary-keyboard.jpg', badge: 'Sacred Worship', title: 'Uzima Praise & Musicians', desc: 'Leading thousands in spontaneous prayer, high-praise harmonies, and prophetic worship that shifts atmospheres and heals souls.', time: 'Thurs Rehearsals 5:30 PM', link: '#contact' },
              ].map(({ img, badge, title, desc, time, link }, i) => (
                <div key={i} data-scale-in className="bg-[#FAF9F6] rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1.5 group border border-[#E2E8F0]/70"
                     style={{ boxShadow: '0 4px 20px -4px rgba(15,23,42,0.03)' }}
                     data-cursor-text="EXPLORE">
                  <div className="relative h-60 overflow-hidden">
                    <Image src={img} alt={title} fill className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
                    <div className="absolute top-4 left-4 text-white text-[9px] font-semibold uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-[#0F172A]/75 backdrop-blur-md" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {badge}
                    </div>
                  </div>
                  <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-xl font-normal text-[#0F172A] mb-2 group-hover:text-[#D90077] transition-colors duration-300" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>{title}</h3>
                      <p className="text-[13px] text-[#64748B] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{desc}</p>
                    </div>
                    <div className="pt-4 border-t border-[#E2E8F0]/60 flex items-center justify-between">
                      <span className="text-xs text-[#94A3B8] font-mono">{time}</span>
                      <a href={link} className="text-xs font-semibold text-[#D90077] flex items-center gap-1 group-hover:gap-1.5 transition-all duration-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                        LEARN MORE →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 09 GIVING / PAYBILL 247247 ───────────────────────────────── */}
        <section id="give" className="py-28 sm:py-36 bg-[#0F172A] text-white relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D90077]/8 blur-[200px] pointer-events-none" />

          <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Mission Narrative & 1-Tap Copy Badges */}
              <div data-reveal className="lg:col-span-7 space-y-6">
                <span className="inline-block bg-[#D90077] text-white text-[10px] font-medium uppercase tracking-[0.25em] px-3.5 py-1 rounded-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Apostolic Partnership &amp; Generosity
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-white leading-tight" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>
                  Partner in Faith &amp; Kingdom Impact
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed max-w-xl font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Your tithes power our weekly worship, feed 800+ children daily at Hope Community School, and bring essential emergency relief to families across Kibera.
                </p>

                {/* 1-Tap Copy Tiles with Instant Visual Feedback */}
                <div data-stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 max-w-lg">
                  {/* Business Paybill Tile */}
                  <div
                    onClick={() => copyToClipboard('247247', 'Paybill')}
                    className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-[#D90077]/50 p-6 rounded-2xl cursor-pointer transition-all active:scale-[0.98] group"
                    title="Click to copy Business Number"
                    data-cursor-text="COPY"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
                      <span>Equity Paybill</span>
                      <span className="text-[#FF80BF] group-hover:underline">
                        {copiedField === 'Paybill' ? '✓ COPIED' : 'TAP TO COPY'}
                      </span>
                    </div>
                    <div className="text-3xl font-semibold text-[#FF4DA6] font-mono mt-1 tracking-tight">
                      247247
                    </div>
                  </div>

                  {/* Account Number Tile */}
                  <div
                    onClick={() => copyToClipboard('1170271072550', 'Account')}
                    className="bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-md border border-white/10 hover:border-white/30 p-6 rounded-2xl cursor-pointer transition-all active:scale-[0.98] group"
                    title="Click to copy Account Number"
                    data-cursor-text="COPY"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-slate-400">
                      <span>Account No</span>
                      <span className="text-white group-hover:underline">
                        {copiedField === 'Account' ? '✓ COPIED' : 'TAP TO COPY'}
                      </span>
                    </div>
                    <div className="text-2xl font-semibold text-white font-mono mt-1.5 tracking-tight truncate">
                      1170271072550
                    </div>
                  </div>
                </div>

                {copiedField && (
                  <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-4 py-2 rounded-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span>✓</span>
                    <span>{copiedField} number copied to clipboard!</span>
                  </div>
                )}
              </div>

              {/* Right Column: Step-by-Step Safaricom M-Pesa Instructions Card */}
              <div
                data-scale-in
                className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-8 sm:p-10 space-y-6"
                style={{ boxShadow: '0 25px 60px -12px rgba(0,0,0,0.4)' }}
              >
                <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
                  <div>
                    <h3 className="text-xl font-normal text-[#0F172A]" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>How to Give via M-Pesa</h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>Safaricom Sim Toolkit / M-Pesa App</p>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-3 py-1 rounded-full uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Instant
                  </span>
                </div>

                <ol className="text-xs space-y-3.5 text-[#475569] list-decimal list-inside font-medium leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <li>Open <strong>M-Pesa</strong> menu on your phone</li>
                  <li>Select <strong>Lipa na M-Pesa</strong> → <strong>Paybill</strong></li>
                  <li>Enter Business No: <strong className="text-[#D90077] font-mono text-sm">247247</strong></li>
                  <li>Enter Account No: <strong className="font-mono text-sm text-[#0F172A]">1170271072550</strong></li>
                  <li>Enter Amount, confirm with your M-Pesa PIN</li>
                </ol>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-[#94A3B8]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span>SMS confirmation sent instantly</span>
                  <span className="text-[#D90077] font-medium">God bless you</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 10 LANDSCAPE ANCHOR — PARALLAX DRIFT ─────────────────────── */}
        <section className="relative h-72 sm:h-96 w-full overflow-hidden bg-black">
          <div data-parallax="0.35" className="absolute inset-0 w-full h-[130%] -top-[15%]">
            <Image src="/images/laying-on-of-hands.jpg" alt="ICA Kibera — Commissioning & Laying on of Hands" fill
                   className="object-cover object-center brightness-[0.55]" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 flex items-center justify-center text-center p-6">
            <div data-reveal className="max-w-2xl space-y-3">
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white uppercase tracking-wider"
                  style={{ fontFamily: '"Instrument Serif", Georgia, serif', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                &ldquo;Where Christ Reigns &amp; Hope Lives&rdquo;
              </h3>
              <p className="text-[10px] sm:text-[11px] text-white/60 uppercase tracking-[0.3em] font-light" style={{ fontFamily: 'Inter, sans-serif' }}>
                International Christian Assemblies · Olympic, Kibera, Nairobi
              </p>
            </div>
          </div>
        </section>

        {/* ── 11 FOOTER ─────────────────────────────────────────────────── */}
        <footer id="contact" className="bg-[#0F172A] text-slate-400 text-xs py-16 border-t border-slate-800/60" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div data-stagger className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9"><Image src="/images/ica-logo.png" alt="ICA Logo" fill className="object-contain" /></div>
                  <span className="text-base text-white font-normal" style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}>ICA Kibera</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-xs">
                  International Christian Assemblies is an apostolic Bible-believing church rooted in Olympic, Kibera, transforming communities across Kenya.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Service Hours</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><span className="text-white font-medium">1st Service:</span> 8:30 AM – 10:30 AM</li>
                  <li><span className="text-white font-medium">2nd Service:</span> 11:00 AM – 1:30 PM</li>
                  <li><span className="text-white font-medium">Midweek Bible:</span> Wed 5:30 PM</li>
                  <li><span className="text-white font-medium">Night Kesha:</span> Fri 10:00 PM</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Reach Us</h4>
                <div className="space-y-2 text-xs text-slate-400">
                  <div>Olympic, Makina, Kibera, Nairobi, Kenya</div>
                  <div>Phone: <a href={CHURCH.phoneHref} className="text-slate-300 hover:text-[#D90077] transition-colors">{CHURCH.phone}</a></div>
                  <div>Email: <a href={`mailto:${CHURCH.email}`} className="text-slate-300 hover:text-[#D90077] transition-colors">{CHURCH.email}</a></div>
                  <div>Paybill: <span className="text-[#FF80BF] font-mono font-medium">247247</span></div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-white text-xs font-semibold uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><a href="#welcome" className="hover:text-white transition-colors">About Our Pastors</a></li>
                  <li><a href="#schedule" className="hover:text-white transition-colors">Worship Schedule</a></li>
                  <li><a href="#livestream" className="hover:text-white transition-colors">Watch Livestreams</a></li>
                  <li><a href="#ministries" className="hover:text-white transition-colors">Hope School &amp; Feeding</a></li>
                  <li><Link href="/templates" className="text-[#FF80BF] hover:underline underline-offset-2 font-medium">Switch Template →</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
              <div>© {new Date().getFullYear()} International Christian Assemblies · Olympic, Makina, Kibera. All rights reserved.</div>
              <div className="flex gap-4">
                <Link href="/templates" className="hover:text-slate-400 transition-colors">All Templates</Link>
                <span>·</span>
                <a href="#main" className="hover:text-slate-400 transition-colors">Back to Top ↑</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {playing && <VideoModal id={playing.id} title={playing.title} onClose={() => setPlaying(null)} />}
    </div>
  );
}
