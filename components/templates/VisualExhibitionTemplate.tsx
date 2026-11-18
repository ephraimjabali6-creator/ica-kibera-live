import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../Header';
import Footer from '../Footer';
import HeroSlider from '../HeroSlider';
import VideoModal from '../VideoModal';
import { Sermon, sermonThumb } from '../../content/church';
import {
  HERO_CONTENT,
  MANIFESTO_CONTENT,
  KARIBU_CONTENT,
  SPLIT_CONTENT,
  LIFE_CONTENT,
  MINISTRIES_CONTENT,
  MESSAGES_CONTENT,
  GATHER_CONTENT,
  MARQUEE_CONTENT,
} from '../../content/canonicalLanding';

export const VisualExhibitionTemplate: React.FC = () => {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 selection:bg-[#D90077] selection:text-white font-serif antialiased">
      {/* Museum Gallery Top Bar */}
      <div className="sticky top-0 z-50 border-b border-stone-200 bg-[#FDFCFB]/95 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-stone-500">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#D90077]" />
            <span className="font-bold text-slate-900">TEMPLATE #18 · CURATED FINE-ART EXHIBITION</span>
            <span className="text-stone-300">|</span>
            <span>WHITE-CUBE GALLERY &amp; CURATORIAL LABELS</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs font-mono">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: MUSEUM EXHIBITION PAVILION ────────── */}
        <section className="relative overflow-hidden border-b border-stone-200 px-6 py-24 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-block border border-stone-300 bg-white px-3 py-1 font-mono text-xs uppercase tracking-widest text-stone-600">
                  EXHIBITION ROOM 01 // {HERO_CONTENT.locationPill} · {HERO_CONTENT.schedulePill}
                </div>

                <h1 className="text-5xl sm:text-7xl lg:text-[76px] font-light tracking-tight text-slate-950 leading-[1.02]">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="italic font-normal text-[#D90077]">{HERO_CONTENT.headingLine2}</span>
                </h1>

                <p className="max-w-xl text-lg font-light leading-relaxed text-stone-600">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="border border-slate-900 bg-slate-900 px-8 py-3.5 font-bold uppercase tracking-widest text-white hover:bg-[#D90077] hover:border-[#D90077]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="border border-stone-300 bg-white px-8 py-3.5 font-bold uppercase tracking-widest text-slate-800 hover:bg-stone-50"
                  >
                    {HERO_CONTENT.ctas[1].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[2].href}
                    className="font-bold uppercase tracking-widest text-[#D90077] hover:underline"
                  >
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-stone-200 pt-6 font-mono">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase text-stone-400 block tracking-widest">{m.label}</span>
                      <span className="text-xs font-bold uppercase text-slate-900 mt-1 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 4-Photo Slider Framed in Fine-Art Passe-Partout */}
              <div className="lg:col-span-5">
                <div className="border border-stone-300 bg-white p-6 shadow-2xl">
                  <HeroSlider />
                  <div className="mt-4 border-t border-stone-200 pt-2 font-mono text-[9px] uppercase tracking-widest text-stone-500 flex justify-between">
                    <span>CAT. NO. ICA-2026-HERO</span>
                    <span>ARCHIVAL PRINT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / CURATORIAL WALL TEXT ────────────────── */}
        <section className="border-b border-stone-200 px-6 py-24 bg-white text-center">
          <div className="mx-auto max-w-4xl border border-stone-200 p-10 sm:p-16 bg-[#FDFCFB] shadow-sm space-y-6">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#D90077]">
              CURATORIAL WALL TEXT // {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="font-serif text-3xl sm:text-5xl font-light leading-relaxed text-slate-900">
              “<span className="italic font-normal text-[#D90077]">Worshipping</span> Jesus, teaching the Word,{' '}
              <span className="italic font-normal text-[#D90077]">raising</span> leaders and{' '}
              <span className="italic font-normal text-[#D90077]">giving life</span> to Kibera, Nairobi and the nations — on Sunday and every day.”
            </p>
            <p className="font-serif text-base text-stone-500 max-w-xl mx-auto">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="border-b border-stone-200 py-16 px-6 text-center bg-[#FDFCFB]" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-xs uppercase text-stone-400">
            <span>{KARIBU_CONTENT.eyebrow}</span>
            <span>{KARIBU_CONTENT.subtitle}</span>
          </div>
          <p
            className="mt-6 select-none font-serif text-[18vw] font-bold uppercase leading-[0.8] tracking-tight"
            style={{
              backgroundImage: `url(${KARIBU_CONTENT.bgImage})`,
              backgroundSize: '130%',
              backgroundPosition: '50% 50%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {KARIBU_CONTENT.word}
          </p>
        </section>

        {/* ── 04 SUNDAY / EVERY DAY SPLIT GALLERIES ──────────────── */}
        <section className="relative grid md:grid-cols-2 border-b border-stone-200">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[50vh] items-end overflow-hidden p-8 sm:p-12 border-stone-200 md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-1000 group-hover:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="text-white">
                <span className="font-mono text-[10px] uppercase tracking-widest text-pink-300">
                  GALLERY [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-2 text-4xl sm:text-5xl font-light italic">{h.label}</p>
                <span className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-[#D90077] group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — CURATED EXHIBITION PLATES ──────────── */}
        <section className="border-b border-stone-200 px-6 py-24 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-stone-200 pb-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">[ 05 ]</span>
                <h2 className="mt-2 font-serif text-3xl font-light text-slate-900 sm:text-4xl">
                  Life at <span className="italic font-normal text-[#D90077]">ICA</span>
                </h2>
              </div>
              <p className="font-mono text-xs uppercase text-stone-400">10 Curated Photographic Plates</p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="group border border-stone-200 bg-[#FDFCFB] p-3 shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden border border-stone-200">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 flex justify-between gap-1 font-mono text-[9px] uppercase tracking-wider text-stone-500">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="text-[#D90077] font-bold">PLATE {String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES IN CURATED CATALOG + STEWARDSHIP ───────── */}
        <section className="border-b border-stone-200 px-6 py-24 bg-[#FDFCFB]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-stone-200 pb-6 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                  {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 font-serif text-3xl font-light text-slate-900 sm:text-4xl">
                  Find your <span className="italic font-normal text-[#D90077]">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="border border-stone-300 bg-white px-6 py-2 font-mono text-xs font-bold uppercase text-slate-800 hover:bg-stone-50">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#D90077]"
                >
                  <div className="aspect-[4/3] overflow-hidden border border-stone-200">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[10px] text-stone-400">ENTRY {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-serif text-lg font-normal text-slate-900 group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase text-stone-500">{m.meets}</p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group border border-pink-200 bg-pink-50/70 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                    {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 font-serif text-2xl font-light text-slate-900">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 font-serif text-sm text-stone-600 leading-relaxed">
                    {MINISTRIES_CONTENT.stewardship.description}
                  </p>
                </div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077] mt-6">
                  {MINISTRIES_CONTENT.stewardship.cta}
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 07 SERMONS IN AUDITORIUM SESSIONS ───────────────────── */}
        <section className="border-b border-stone-200 px-6 py-24 text-center bg-white">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
              {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 font-serif text-3xl font-light text-slate-900 sm:text-4xl">
              Faith comes by <span className="italic font-normal text-[#D90077]">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left font-serif">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group border border-stone-200 bg-[#FDFCFB] p-4 text-left transition hover:border-[#D90077]"
                >
                  <div className="aspect-[16/9] overflow-hidden border border-stone-200">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[10px] text-stone-400">
                    SESSION {String(i + 1).padStart(2, '0')} · {s.duration}
                  </p>
                  <p className="mt-1 font-serif text-base font-normal text-slate-900 group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase text-stone-500">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="border border-stone-300 bg-white px-8 py-3 font-mono text-xs font-bold uppercase text-slate-800 hover:bg-stone-50">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / MUSEUM TIMETABLE ───────────────────────── */}
        <section className="border-b border-stone-200 px-6 py-20 bg-[#FDFCFB]">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="font-serif text-3xl font-light text-slate-900 sm:text-4xl">
                A seat is <span className="italic font-normal text-[#D90077]">saved</span> for you.
              </h2>
              <div className="border border-stone-300 bg-white p-6 shadow-sm">
                <p className="font-mono text-xs uppercase text-stone-400">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 font-mono">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="border border-slate-900 bg-slate-900 px-8 py-3.5 text-xs font-bold uppercase text-white hover:bg-[#D90077]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="border border-stone-300 bg-white px-8 py-3.5 text-xs font-bold uppercase text-slate-800 hover:bg-stone-50"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border border-stone-300 bg-white p-8 divide-y divide-stone-200">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-stone-400 block">
                      SCHEDULE {String(i + 1).padStart(2, '0')} · {g.day}
                    </span>
                    <h4 className="font-serif text-base font-normal text-slate-900 mt-1">{g.name}</h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 font-mono text-xs text-stone-400">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b border-stone-200 bg-white py-4">
          <div className="flex gap-8 whitespace-nowrap font-serif text-sm font-light uppercase tracking-widest text-stone-600">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">◇</span>
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {playing && <VideoModal id={playing.id} title={playing.title} onClose={() => setPlaying(null)} />}
    </div>
  );
};

export default VisualExhibitionTemplate;
