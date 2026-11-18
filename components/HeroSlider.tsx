import { useEffect, useState, useRef } from 'react';

export interface Slide {
  src: string;
  alt: string;
  caption: string;
  subtitle?: string;
}

export const HERO_UPLOADED_SLIDES: Slide[] = [
  {
    src: '/images/hero-slide-1.jpg',
    alt: 'Bishop Andrew and Dr. Ruth Ouma',
    caption: 'Bishop Andrew & Dr. Ruth Ouma',
    subtitle: 'Senior Pastors & Overseers',
  },
  {
    src: '/images/hero-slide-2.jpg',
    alt: 'Bishop Andrew and Dr. Ruth preaching on stage',
    caption: 'Preaching the Word with Power',
    subtitle: 'Pulpit Ministry at ICA Sanctuary',
  },
  {
    src: '/images/hero-slide-3.jpg',
    alt: 'Bishop Andrew and Dr. Ruth in royal blue',
    caption: 'Impacting Lives with God’s Love',
    subtitle: 'Bishop Andrew & Dr. Ruth Ouma',
  },
  {
    src: '/images/hero-slide-4.jpg',
    alt: 'Ministers and pastoral team of ICA',
    caption: 'ICA Pastoral Team & Ministers',
    subtitle: 'Equipping and Serving the Community',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_UPLOADED_SLIDES.length);
    }, 4200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused]);

  function prevSlide() {
    setCurrent((prev) => (prev - 1 + HERO_UPLOADED_SLIDES.length) % HERO_UPLOADED_SLIDES.length);
  }

  function nextSlide() {
    setCurrent((prev) => (prev + 1) % HERO_UPLOADED_SLIDES.length);
  }

  return (
    <div
      className="group relative w-full overflow-hidden rounded-2xl border border-line bg-mist shadow-[0_25px_60px_-15px_rgba(0,0,0,0.14)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="ICA Church Photo Slideshow"
    >
      {/* Slider viewport */}
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[4/4.6] lg:aspect-[4/4.9]">
        <div
          className="flex h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {HERO_UPLOADED_SLIDES.map((slide, idx) => (
            <div key={slide.src} className="relative h-full w-full shrink-0 bg-paper">
              <img
                src={slide.src}
                alt={slide.alt}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="h-full w-full object-cover object-top"
              />
              {/* Bottom gradient overlay for clear contrast and readable captions */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pb-6 pt-16 px-6 text-white">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-pink-300">
                  {slide.subtitle || 'ICA Kibera'}
                </span>
                <p className="mt-1 font-display text-lg font-bold uppercase tracking-[-0.01em] [font-stretch:115%]">
                  {slide.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows (accessible buttons) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink shadow-md backdrop-blur transition duration-200 hover:bg-white hover:scale-105 focus:opacity-100"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink shadow-md backdrop-blur transition duration-200 hover:bg-white hover:scale-105 focus:opacity-100"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-3 left-6 flex items-center gap-1.5 z-10">
          {HERO_UPLOADED_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                current === idx ? 'w-6 bg-plum-500' : 'w-2 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
