import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { TEMPLATES, TemplateMeta } from '../../content/templates';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ContextCursor } from '../../components/experience/ContextCursor';
import { EasterEggs } from '../../components/experience/EasterEggs';
import { BrandedPreloader } from '../../components/experience/BrandedPreloader';
import { MagneticButton } from '../../components/experience/MagneticButton';

export default function TemplatesHub() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = [
    'ALL',
    'Editorial & Luxury',
    'Kinetic & Broadcast',
    'Architectural & Brutalist',
    'Spatial & Interactive',
    'Classical & Reverent',
    'Community & Story',
  ];

  const filtered = TEMPLATES.filter((t) => {
    const matchesCategory = activeCategory === 'ALL' || t.category === activeCategory;
    const q = search.trim().toLowerCase();
    if (!q) return matchesCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(q) ||
      t.tagline.toLowerCase().includes(q) ||
      t.vibe.toLowerCase().includes(q) ||
      t.signatureFeature.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Head>
        <title>20 Bespoke Church Frontends &amp; Templates | ICA Kibera</title>
        <meta
          name="description"
          content="Explore 20 radically distinct church website templates for ICA Kibera. Each template features unique layout anatomy, interaction models, and aesthetic philosophy, all fully populated with authentic church data, leadership, and M-Pesa 247247 giving."
        />
      </Head>

      <BrandedPreloader />
      <ContextCursor />
      <EasterEggs />

      <Header />

      <main className="min-h-screen bg-[#FCFAF8] pb-32 pt-28 text-slate-900 font-sans selection:bg-[#D90077] selection:text-white">
        {/* Executive Hero */}
        <section className="mx-auto max-w-7xl px-6 lg:px-12 border-b border-slate-200 pb-16 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest text-[#D90077] uppercase">
                [ EXECUTIVE DESIGN SHOWCASE · 20 BESPOKE ARCHETYPES ]
              </span>
              <h1 className="mt-4 text-4xl sm:text-6xl font-black font-serif text-slate-900 leading-tight">
                20 Radical <br />
                <span className="italic text-[#D90077] font-normal">Church Frontends.</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 font-serif">
                Zero generic AI boilerplate. Every single template is an independent architectural statement with unique structural anatomy, layout grids, interaction paradigms, and storytelling flow—all fully populated with genuine ICA Kibera leadership, history, ministries, and M-Pesa Paybill <strong className="text-slate-900 font-bold">247247</strong>.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="rounded-full bg-[#0F172A] px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl hover:bg-[#D90077] transition-all text-center"
              >
                &larr; View Baseline Website
              </Link>
              <div className="text-[11px] font-mono text-slate-400 text-center">
                Press <strong>Ctrl+Shift+P</strong> for virtual prayer candle
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-mono font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#D90077] text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="font-mono text-xs font-bold uppercase text-slate-400">
                Filter:
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates (e.g. Editorial, Brutalist, Filmstrip, Bento...)"
                className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#D90077] focus:outline-none w-full sm:w-80 shadow-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="font-mono text-xs text-[#D90077] hover:underline"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="font-mono text-xs text-slate-500">
              Displaying <strong className="text-[#D90077]">{filtered.length}</strong> of 20 Bespoke Archetypes
            </div>
          </div>
        </section>

        {/* 20 Templates Grid */}
        <section className="mx-auto max-w-7xl px-6 lg:px-12 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D90077] hover:shadow-2xl"
                data-cursor-text="VIEW"
              >
                <div>
                  {/* Card Header Metadata */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-bold text-slate-700">
                      TEMPLATE #{t.number < 10 ? `0${t.number}` : t.number}
                    </span>
                    <span className="font-bold text-[#D90077] uppercase text-[10px]">
                      {t.category}
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold font-serif text-slate-900 group-hover:text-[#D90077] transition-colors">
                    {t.name}
                  </h3>

                  <p className="mt-2 text-xs font-bold text-[#D90077]">
                    {t.tagline}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {t.vibe}
                  </p>

                  {/* Signature Feature Callout */}
                  <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      SIGNATURE ANATOMY:
                    </span>
                    <p className="mt-1 text-xs text-slate-700 leading-snug">
                      {t.signatureFeature}
                    </p>
                  </div>

                  {/* Interaction Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {t.uxInteractions.map((ux, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-500"
                      >
                        +{ux}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Launch Button */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    ROUTE: {t.route}
                  </span>
                  <Link
                    href={t.route}
                    className="inline-flex items-center gap-1 text-xs font-bold font-mono text-[#D90077] group-hover:underline"
                  >
                    Launch Design &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
