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

export const CommandCenterTemplate: React.FC = () => {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-900 selection:bg-[#D90077] selection:text-white font-mono antialiased">
      {/* HUD Telemetry Top Bar */}
      <div className="sticky top-0 z-50 border-b border-slate-300 bg-white/95 px-6 py-2 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] uppercase tracking-wider text-slate-600">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-900">TELEMETRY HUD // TEMPLATE #17</span>
            <span className="text-slate-300">|</span>
            <span>SYSTEM STATUS: NORMAL // LIVE CONSOLE</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: MISSION CONSOLE OVERVIEW ───────────── */}
        <section className="border-b border-slate-300 px-6 py-16 lg:px-16 lg:py-24 bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl">
            <div className="border border-slate-300 bg-white p-8 sm:p-12 shadow-sm grid items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-bold text-slate-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D90077]" />
                  <span>LOC: {HERO_CONTENT.locationPill} // TIME: {HERO_CONTENT.schedulePill}</span>
                </div>

                <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-slate-950 leading-none">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="text-[#D90077]">{HERO_CONTENT.headingLine2}</span>
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-slate-600 font-sans">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="border border-[#D90077] bg-[#D90077] px-8 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#B80065]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="border border-slate-300 bg-white px-8 py-3 text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-50"
                  >
                    {HERO_CONTENT.ctas[1].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[2].href}
                    className="text-xs font-bold uppercase text-[#D90077] hover:underline"
                  >
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-6 sm:grid-cols-3">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase text-slate-400 block">{m.label}</span>
                      <span className="text-xs font-bold uppercase text-slate-900 mt-1 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 4-Photo Slider in Telemetry Monitor */}
              <div className="lg:col-span-5">
                <div className="border border-slate-300 bg-slate-900 p-2 shadow-inner">
                  <div className="flex justify-between pb-1.5 px-2 text-[9px] text-slate-400">
                    <span>FEED // OPTICAL SENSOR 01</span>
                    <span className="text-emerald-400">● 100% HEALTH</span>
                  </div>
                  <HeroSlider />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / COMMAND DIRECTIVE ───────────────────── */}
        <section className="border-b border-slate-300 px-6 py-16 bg-white text-center">
          <div className="mx-auto max-w-4xl border border-slate-300 p-8 sm:p-12 bg-slate-50">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D90077] block">
              DIRECTIVE // {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="mt-4 font-sans text-2xl sm:text-4xl font-extrabold uppercase leading-snug text-slate-900">
              “Worshipping Jesus, teaching the Word, raising leaders and giving life to Kibera, Nairobi and the nations — on Sunday and every day.”
            </p>
            <p className="mt-4 text-xs text-slate-500 uppercase">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="border-b border-slate-300 py-16 px-6 text-center bg-[#F1F5F9]" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between text-xs uppercase text-slate-400">
            <span>{KARIBU_CONTENT.eyebrow}</span>
            <span>{KARIBU_CONTENT.subtitle}</span>
          </div>
          <p
            className="mt-6 select-none font-sans text-[18vw] font-black uppercase leading-[0.8] tracking-tight"
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

        {/* ── 04 SUNDAY / EVERY DAY SPLIT CONSOLE MODULES ────────── */}
        <section className="relative grid md:grid-cols-2 border-b border-slate-300">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[48vh] items-end overflow-hidden p-8 sm:p-12 border-slate-300 md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              <div className="text-white">
                <span className="border border-white/40 bg-slate-900 px-2 py-0.5 text-[10px] uppercase text-pink-300">
                  CHANNEL [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-2 font-sans text-4xl sm:text-5xl font-black uppercase">{h.label}</p>
                <span className="mt-4 inline-block text-xs uppercase text-[#D90077] group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — TELEMETRY PHOTO REEL ──────────────── */}
        <section className="border-b border-slate-300 px-6 py-16 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-slate-300 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#D90077]">[ 05 ]</span>
                <h2 className="mt-2 font-sans text-3xl font-black uppercase text-slate-900">
                  Life at <span className="text-[#D90077]">ICA</span>
                </h2>
              </div>
              <p className="text-xs uppercase text-slate-400">10 Telemetry Feeds</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="border border-slate-300 bg-slate-50 p-2">
                  <div className="aspect-[4/3] overflow-hidden border border-slate-300">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-2 flex justify-between gap-1 text-[9px] uppercase text-slate-600">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="text-[#D90077] font-bold">NODE-{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES IN TELEMETRY DECK + STEWARDSHIP ───────── */}
        <section className="border-b border-slate-300 px-6 py-16 bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-slate-300 pb-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase text-[#D90077]">
                  {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 font-sans text-3xl font-black uppercase text-slate-900">
                  Find your <span className="text-[#D90077]">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="border border-slate-300 bg-white px-6 py-2 text-xs font-bold uppercase text-slate-800 hover:bg-slate-50">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group border border-slate-300 bg-white p-4 transition hover:border-[#D90077]"
                >
                  <div className="aspect-[4/3] overflow-hidden border border-slate-300">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="text-[10px] text-slate-400">SUBSYSTEM // {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-sans text-base font-bold uppercase text-slate-900 group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-[10px] uppercase text-slate-500">{m.meets}</p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group border border-pink-200 bg-pink-50 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase text-[#D90077]">
                    {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 font-sans text-2xl font-black uppercase text-slate-900">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 text-xs uppercase text-slate-600 leading-relaxed font-sans">
                    {MINISTRIES_CONTENT.stewardship.description}
                  </p>
                </div>
                <span className="text-xs font-bold uppercase text-[#D90077] mt-6">
                  {MINISTRIES_CONTENT.stewardship.cta}
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 07 SERMONS IN CONSOLE PLAYER TILES ──────────────────── */}
        <section className="border-b border-slate-300 px-6 py-16 text-center bg-white">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs font-bold uppercase text-[#D90077]">
              {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 font-sans text-3xl font-black uppercase text-slate-900 sm:text-4xl">
              Faith comes by <span className="text-[#D90077]">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group border border-slate-300 bg-slate-50 p-3 text-left transition hover:border-[#D90077]"
                >
                  <div className="aspect-[16/9] overflow-hidden border border-slate-300">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-[10px] text-slate-400 uppercase">
                    LOG {String(i + 1).padStart(2, '0')} // {s.duration}
                  </p>
                  <p className="mt-1 font-sans text-sm font-bold uppercase text-slate-900 group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[10px] uppercase text-slate-500">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="border border-slate-300 bg-white px-8 py-3 text-xs font-bold uppercase text-slate-800 hover:bg-slate-50">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / TELEMETRY TIMETABLE ────────────────────── */}
        <section className="border-b border-slate-300 px-6 py-16 bg-[#F8FAFC]">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase text-[#D90077]">
                {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="font-sans text-3xl font-black uppercase text-slate-900 sm:text-4xl">
                A seat is <span className="text-[#D90077]">saved</span> for you.
              </h2>
              <div className="border border-slate-300 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase text-slate-400">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 text-2xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="border border-[#D90077] bg-[#D90077] px-8 py-3 text-xs font-bold uppercase text-white hover:bg-[#B80065]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="border border-slate-300 bg-white px-8 py-3 text-xs font-bold uppercase text-slate-800 hover:bg-slate-50"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border border-slate-300 bg-white p-8 divide-y divide-slate-100">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block">
                      SCHEDULE // {String(i + 1).padStart(2, '0')} · {g.day}
                    </span>
                    <h4 className="font-sans text-base font-bold uppercase text-slate-900 mt-1">{g.name}</h4>
                  </div>
                  <span className="text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 text-xs text-slate-400">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b border-slate-300 bg-white py-3">
          <div className="flex gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-600">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">●</span>
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

export default CommandCenterTemplate;
