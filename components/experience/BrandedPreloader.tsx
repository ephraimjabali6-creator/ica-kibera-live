import React, { useEffect, useState } from 'react';

interface BrandedPreloaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export const BrandedPreloader: React.FC<BrandedPreloaderProps> = ({ onComplete, forceShow = false }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Only show once per session unless forceShow is true
    if (!forceShow && typeof window !== 'undefined' && sessionStorage.getItem('ica_preloader_seen')) {
      setShouldRender(false);
      if (onComplete) onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('ica_preloader_seen', 'true');
            }
            setTimeout(() => {
              setShouldRender(false);
              if (onComplete) onComplete();
            }, 600);
          }, 200);
          return 100;
        }
        // Random increment between 5 and 15 for organic loading feel
        return Math.min(prev + Math.floor(Math.random() * 12) + 6, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [forceShow, onComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-white px-8 py-12 text-[#0F172A] transition-all duration-700 ease-in-out ${
        isFinished ? 'pointer-events-none -translate-y-full opacity-0' : 'opacity-100'
      }`}
    >
      {/* Top Header metadata */}
      <div className="flex w-full max-w-5xl items-center justify-between text-[11px] font-semibold tracking-widest text-[#64748B] uppercase">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[#D90077] animate-pulse" />
          <span>ICA ARCHIVE 2026</span>
        </div>
        <div>01°18′47″S · 36°47′13″E</div>
        <div className="hidden sm:block">NAIROBI, KENYA</div>
      </div>

      {/* Center Animated Church Emblem & Progress */}
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
          {/* Animated SVG Ring */}
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#F1F5F9"
              strokeWidth="3"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#D90077"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-100 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold tracking-tighter text-[#0F172A] font-serif">
              ICA
            </span>
          </div>
        </div>

        <h1 className="max-w-md text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl font-serif">
          International Christian Assemblies
        </h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-[#64748B]">
          Kibera · Woodley · Ndhiwa · Pala · Jamhuri · Kitengela
        </p>

        {/* Counter */}
        <div className="mt-8 font-mono text-4xl font-extrabold tracking-tight text-[#D90077]">
          {progress < 10 ? `0${progress}` : progress}%
        </div>
      </div>

      {/* Bottom Scripture Quote */}
      <div className="text-center text-xs tracking-wide text-[#64748B] italic">
        “Always building His church — Matthew 16:18”
      </div>
    </div>
  );
};
