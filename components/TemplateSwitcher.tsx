import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TEMPLATES } from '../content/templates';

interface TemplateSwitcherProps {
  currentSlug?: string;
}

export const TemplateSwitcher: React.FC<TemplateSwitcherProps> = ({ currentSlug }) => {

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Editorial & Luxury',
    'Kinetic & Broadcast',
    'Architectural & Brutalist',
    'Spatial & Interactive',
    'Classical & Reverent',
    'Community & Story',
  ];

  const currentSlugFromRoute = currentSlug || (router.query.slug as string);
  const currentTemplate = TEMPLATES.find((t) => t.slug === currentSlugFromRoute) || TEMPLATES[0];

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (activeCategory === 'ALL') return true;
    return t.category === activeCategory;
  });

  return (
    <>
      {/* Sticky Bottom Pill Switcher */}
      <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/95 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all hover:border-slate-300">
          <Link
            href="/templates"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#D90077]"
            title="View all 20 templates showcase"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D90077] text-[10px] font-extrabold text-white">
              20
            </span>
            <span className="hidden sm:inline font-mono">ALL TEMPLATES</span>
          </Link>

          <span className="h-4 w-px bg-slate-200" />

          {/* Current Template Name & Drawer Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-slate-900 hover:text-[#D90077]"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="max-w-[140px] truncate sm:max-w-[200px]">
              #{currentTemplate.number} {currentTemplate.name}
            </span>
            <span className="text-[10px] text-slate-400">
              {isOpen ? '▲' : '▼'}
            </span>
          </button>

          <span className="h-4 w-px bg-slate-200" />

          {/* Next / Previous Quick Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const prevIndex = (currentTemplate.number - 2 + TEMPLATES.length) % TEMPLATES.length;
                router.push(TEMPLATES[prevIndex].route);
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100"
              title="Previous Template"
            >
              ‹
            </button>
            <button
              onClick={() => {
                const nextIndex = currentTemplate.number % TEMPLATES.length;
                router.push(TEMPLATES[nextIndex].route);
              }}
              className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100"
              title="Next Template"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Quick Switcher Tray */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 pb-24 backdrop-blur-sm sm:items-center sm:pb-4 animate-in fade-in duration-150">
          <div className="relative max-h-[80vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-slate-200 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#D90077] uppercase">
                  ICA Kibera Architectural Gallery
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  Switch Church Frontend (20 Bespoke Designs)
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-4 flex flex-wrap gap-1.5 pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-[#0F172A] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 20 Template Grid */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {filteredTemplates.map((t) => {
                const isActive = t.slug === currentSlug;
                return (
                  <Link
                    key={t.id}
                    href={t.route}
                    onClick={() => setIsOpen(false)}
                    className={`group relative flex flex-col justify-between rounded-2xl border p-4 transition-all hover:scale-[1.02] ${
                      isActive
                        ? 'border-[#D90077] bg-[#D90077]/5 shadow-md ring-2 ring-[#D90077]/20'
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                        <span>TEMPLATE #{t.number < 10 ? `0${t.number}` : t.number}</span>
                        <span className="text-[10px] uppercase text-[#D90077] font-sans font-bold">
                          {t.category.split(' ')[0]}
                        </span>
                      </div>
                      <h4 className="mt-1 font-bold text-slate-900 group-hover:text-[#D90077]">
                        {t.name}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                        {t.tagline}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] font-semibold text-[#D90077]">
                      <span>{isActive ? '● Currently Active' : 'Launch Design →'}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateSwitcher;
