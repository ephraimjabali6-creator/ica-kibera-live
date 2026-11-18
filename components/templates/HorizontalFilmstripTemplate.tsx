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

export const HorizontalFilmstripTemplate: React.FC = () => {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-[#D90077] selection:text-white font-sans antialiased">
      {/* Filmstrip Header Bar */}
      <div className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 px-6 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-white">TEMPLATE #10 · PANORAMIC CINEMA FILMSTRIP</span>
            <span className="text-slate-600">|</span>
            <span>2.39:1 LETTERBOXED CINEMA CANVAS</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: CINEMATIC LETTERBOXED FRAME ───────── */}
        <section className="relative overflow-hidden border-b border-slate-800 px-6 py-20 lg:px-16 lg:py-28 bg-slate-950">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#D90077]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D90077]" />
                  <span>{HERO_CONTENT.locationPill} // {HERO_CONTENT.schedulePill}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-tight">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="text-[#D90077]">{HERO_CONTENT.headingLine2}</span>
                </h1>

                <p className="max-w-xl text-base text-slate-300 leading-relaxed font-light">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="rounded-md bg-[#D90077] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-pink-900/50 hover:bg-[#B80065]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="rounded-md border border-slate-700 bg-slate-900 px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-slate-800"
                  >
                    {HERO_CONTENT.ctas[1].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[2].href}
                    className="font-mono text-xs uppercase text-[#D90077] hover:underline"
                  >
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3 font-mono text-xs">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase text-slate-500 block">{m.label}</span>
                      <span className="font-bold text-white mt-1 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 4-Photo Slider in Cinema 16:9 Letterbox */}
              <div className="lg:col-span-5">
                <div className="border border-slate-800 bg-black p-3 shadow-2xl">
                  <div className="flex items-center justify-between pb-2 font-mono text-[9px] text-slate-500">
                    <span>FRAME: 001 // SCENE: SANCTUARY</span>
                    <span>24.00 FPS</span>
                  </div>
                  <HeroSlider />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / CINEMA OPENING CRAWL ─────────────────── */}
        <section className="border-b border-slate-800 px-6 py-24 bg-black text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#D90077]">
              {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="text-3xl sm:text-5xl font-extrabold uppercase leading-snug tracking-tight text-white">
              “<span className="text-[#D90077]">Worshipping</span> Jesus, teaching the Word,{' '}
              <span className="text-[#D90077]">raising</span> leaders and{' '}
              <span className="text-[#D90077]">giving life</span> to Kibera, Nairobi and the nations — on Sunday and every day.”
            </p>
            <p className="font-mono text-xs uppercase text-slate-500 max-w-xl mx-auto">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="border-b border-slate-800 py-16 px-6 text-center bg-slate-950" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-xs uppercase text-slate-500">
            <span>{KARIBU_CONTENT.eyebrow}</span>
            <span>{KARIBU_CONTENT.subtitle}</span>
          </div>
          <p
            className="mt-6 select-none text-[18vw] font-black uppercase leading-[0.8] tracking-tight"
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

        {/* ── 04 SUNDAY / EVERY DAY WIDESCREEN ACTS ──────────────── */}
        <section className="relative grid md:grid-cols-2 border-b border-slate-800">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[50vh] items-end overflow-hidden p-8 sm:p-12 border-slate-800 md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="text-white">
                <span className="rounded bg-black/60 px-2 py-1 font-mono text-[10px] font-bold uppercase text-[#D90077]">
                  ACT [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-2 text-4xl sm:text-5xl font-black uppercase">{h.label}</p>
                <span className="mt-4 inline-block font-mono text-xs uppercase text-pink-300 group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — 35MM HORIZONTAL FILMSTRIP ─────────── */}
        <section className="border-b border-slate-800 px-6 py-20 bg-black">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">[ 05 ]</span>
                <h2 className="mt-2 text-3xl font-extrabold uppercase text-white">
                  Life at <span className="text-[#D90077]">ICA</span>
                </h2>
              </div>
              <p className="font-mono text-xs uppercase text-slate-500">10 35mm Frame Stills</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="border border-slate-800 bg-slate-950 p-2">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-2 flex justify-between gap-1 font-mono text-[9px] uppercase text-slate-400">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="text-[#D90077]">#{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES IN CAST CALL-SHEET + STEWARDSHIP ───────── */}
        <section className="border-b border-slate-800 px-6 py-20 bg-slate-900">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-slate-800 pb-4 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                  {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 text-3xl font-extrabold uppercase text-white">
                  Find your <span className="text-[#D90077]">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="border border-slate-700 bg-slate-800 px-6 py-2 font-mono text-xs font-bold uppercase text-white hover:bg-slate-700">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group border border-slate-800 bg-slate-950 p-4 transition hover:border-[#D90077]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[10px] text-slate-500">CALL // {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-base font-bold uppercase text-white group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase text-slate-400">{m.meets}</p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group border border-pink-900 bg-pink-950/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                    {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 text-2xl font-bold uppercase text-white">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 text-sm text-slate-300 leading-relaxed">
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

        {/* ── 07 SERMONS IN CINEMA MARQUEE ───────────────────────── */}
        <section className="border-b border-slate-800 px-6 py-20 text-center bg-black">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
              {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl font-extrabold uppercase text-white sm:text-4xl">
              Faith comes by <span className="text-[#D90077]">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group border border-slate-800 bg-slate-950 p-3 text-left transition hover:border-[#D90077]"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[10px] text-slate-500 uppercase">
                    FEATURE {String(i + 1).padStart(2, '0')} // {s.duration}
                  </p>
                  <p className="mt-1 text-sm font-bold uppercase text-white group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase text-slate-400">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="border border-slate-700 bg-slate-800 px-8 py-3 font-mono text-xs font-bold uppercase text-white hover:bg-slate-700">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / SHOWTIMES TIMETABLE ────────────────────── */}
        <section className="border-b border-slate-800 px-6 py-20 bg-slate-950">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="text-3xl font-extrabold uppercase text-white sm:text-4xl">
                A seat is <span className="text-[#D90077]">saved</span> for you.
              </h2>
              <div className="border border-slate-800 bg-slate-900 p-6">
                <p className="font-mono text-xs uppercase text-slate-400">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 font-mono">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="rounded bg-[#D90077] px-8 py-3 text-xs font-bold uppercase text-white hover:bg-[#B80065]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="rounded border border-slate-700 bg-slate-900 px-8 py-3 text-xs font-bold uppercase text-slate-200 hover:bg-slate-800"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border border-slate-800 bg-slate-900 p-8 divide-y divide-slate-800">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-500 block">
                      SHOWTIME {String(i + 1).padStart(2, '0')} // {g.day}
                    </span>
                    <h4 className="text-base font-bold uppercase text-white mt-1">{g.name}</h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 font-mono text-xs text-slate-500">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b border-slate-800 bg-black py-3 text-white">
          <div className="flex gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-widest">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">▶</span>
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

export default HorizontalFilmstripTemplate;
