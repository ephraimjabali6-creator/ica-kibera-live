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

export default function HouseKineticTemplate() {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#D90077] selection:text-white font-sans antialiased">
      {/* Broadcast Attribution Bar */}
      <div className="sticky top-0 z-50 border-b-2 border-slate-900 bg-white px-6 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono font-bold uppercase tracking-[0.2em]">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-600">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
            </span>
            <span className="text-red-600 font-extrabold">LIVE BROADCAST CONSOLE</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-900">TEMPLATE #03 · HOUSE KINETIC</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION (High-Voltage Megachurch Broadcast) ── */}
        <section className="relative overflow-hidden border-b-2 border-slate-900 px-6 py-20 lg:px-16 lg:py-28 bg-[#FAFAFC]">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-white">
                  <span className="h-2 w-2 rounded-full bg-[#D90077] animate-pulse" />
                  <span>{HERO_CONTENT.locationPill} · {HERO_CONTENT.schedulePill}</span>
                </div>

                <h1 className="font-display text-5xl font-[950] uppercase leading-[0.9] tracking-tight text-slate-950 sm:text-7xl lg:text-[80px]">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="bg-[#D90077] px-2 text-white inline-block mt-2">
                    {HERO_CONTENT.headingLine2}
                  </span>
                </h1>

                <p className="max-w-xl text-lg font-medium leading-relaxed text-slate-700">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="rounded-none border-2 border-slate-900 bg-[#D90077] px-8 py-4 font-mono text-xs font-black uppercase tracking-widest text-white shadow-[4px_4px_0_0_#0F172A] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#0F172A]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="rounded-none border-2 border-slate-900 bg-white px-8 py-4 font-mono text-xs font-black uppercase tracking-widest text-slate-900 shadow-[4px_4px_0_0_#0F172A] transition hover:bg-slate-100 hover:translate-x-0.5 hover:translate-y-0.5"
                  >
                    {HERO_CONTENT.ctas[1].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[2].href}
                    className="font-mono text-xs font-bold uppercase text-[#D90077] underline underline-offset-4"
                  >
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t-2 border-slate-900 pt-6 sm:grid-cols-3 font-mono">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">{m.label}</span>
                      <span className="text-xs font-black uppercase text-slate-950 mt-1 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 4-Photo Slider with Broadcast Framing */}
              <div className="lg:col-span-5">
                <div className="relative border-4 border-slate-900 bg-slate-900 p-2 shadow-[8px_8px_0_0_#D90077]">
                  <div className="flex items-center justify-between px-3 py-1.5 font-mono text-[10px] font-bold uppercase text-white bg-slate-900">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      LIVE FEED // SANCTUARY
                    </span>
                    <span>1080P HD</span>
                  </div>
                  <HeroSlider />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / KINETIC MARQUEE BANNER ──────────────── */}
        <section className="border-b-2 border-slate-900 bg-[#D90077] px-6 py-20 text-white">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-xs font-black uppercase tracking-[0.25em] bg-white text-slate-900 px-3 py-1 inline-block">
              {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="mt-6 font-display text-3xl font-[950] uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Worshipping Jesus, teaching the Word, raising leaders and giving life to Kibera, Nairobi and the nations — on Sunday and every day.
            </p>
            <p className="mt-6 font-mono text-xs uppercase font-bold tracking-widest text-pink-100">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="border-b-2 border-slate-900 py-16 px-6 text-center bg-white" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-[10px] uppercase font-bold text-slate-500">
            <span>{KARIBU_CONTENT.eyebrow}</span>
            <span>{KARIBU_CONTENT.subtitle}</span>
          </div>
          <p
            className="mt-6 select-none font-display text-[20vw] font-[950] uppercase leading-[0.78] tracking-tighter"
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

        {/* ── 04 SUNDAY / EVERY DAY HIGH-CONTRAST SPLIT ──────────── */}
        <section className="relative grid md:grid-cols-2 border-b-2 border-slate-900">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[50vh] items-end overflow-hidden p-8 border-slate-900 md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              <div className="text-white">
                <span className="bg-[#D90077] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest">
                  [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-3 font-display text-5xl font-[950] uppercase tracking-tight sm:text-6xl">
                  {h.label}
                </p>
                <span className="mt-4 inline-block font-mono text-xs font-black uppercase text-pink-400 group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA PHOTO REEL ──────────────────────────── */}
        <section className="border-b-2 border-slate-900 px-6 py-20 bg-[#FAFAFC]">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b-2 border-slate-900 pb-6">
              <div>
                <span className="bg-slate-900 px-2 py-0.5 font-mono text-[10px] font-black uppercase text-white">
                  [ 05 ]
                </span>
                <h2 className="mt-2 font-display text-4xl font-[950] uppercase tracking-tight text-slate-950">
                  Life at <span className="text-[#D90077]">ICA</span>
                </h2>
              </div>
              <p className="font-mono text-xs font-bold uppercase text-slate-500">10 Camera Feeds</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="group border-2 border-slate-900 bg-white p-2 shadow-[4px_4px_0_0_#0F172A]">
                  <div className="aspect-[4/3] overflow-hidden bg-slate-900">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-2 flex justify-between gap-1 font-mono text-[9px] font-black uppercase text-slate-800">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="text-[#D90077]">{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES IN BROADCAST TILES + STEWARDSHIP ───────── */}
        <section className="border-b-2 border-slate-900 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b-2 border-slate-900 pb-6 md:flex-row md:items-end">
              <div>
                <span className="bg-[#D90077] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-white">
                  {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 font-display text-4xl font-[950] uppercase tracking-tight text-slate-950">
                  Find your <span className="text-[#D90077]">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="border-2 border-slate-900 bg-white px-6 py-2.5 font-mono text-xs font-black uppercase text-slate-900 shadow-[3px_3px_0_0_#0F172A] hover:bg-slate-100">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0_0_#0F172A] transition duration-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#0F172A]"
                >
                  <div className="aspect-[4/3] overflow-hidden border border-slate-900">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[10px] font-bold text-slate-400 uppercase">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-display text-lg font-black uppercase text-slate-900 group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase font-bold text-slate-500">
                      {m.meets}
                    </p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group border-2 border-slate-900 bg-pink-100 p-6 shadow-[4px_4px_0_0_#D90077] flex flex-col justify-between"
              >
                <div>
                  <span className="bg-[#D90077] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-white">
                    {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 font-display text-2xl font-black uppercase text-slate-900">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-800">
                    {MINISTRIES_CONTENT.stewardship.description}
                  </p>
                </div>
                <span className="font-mono text-xs font-black uppercase text-[#D90077] mt-6">
                  {MINISTRIES_CONTENT.stewardship.cta}
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 07 SERMONS IN VIDEO CONSOLE ────────────────────────── */}
        <section className="border-b-2 border-slate-900 px-6 py-24 text-center bg-[#FAFAFC]">
          <div className="mx-auto max-w-7xl">
            <span className="bg-slate-900 px-2 py-0.5 font-mono text-[10px] font-black uppercase text-white">
              {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 font-display text-4xl font-[950] uppercase tracking-tight text-slate-950 sm:text-5xl">
              Faith comes by <span className="text-[#D90077]">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group border-2 border-slate-900 bg-white p-3 shadow-[4px_4px_0_0_#0F172A] text-left transition hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  <div className="relative aspect-[16/9] overflow-hidden border border-slate-900">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <span className="absolute bottom-1 right-1 bg-black px-1.5 py-0.5 font-mono text-[9px] font-bold text-white">
                      {s.duration}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-base font-black uppercase text-slate-900 group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase font-bold text-slate-500">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="border-2 border-slate-900 bg-white px-8 py-3 font-mono text-xs font-black uppercase text-slate-900 shadow-[4px_4px_0_0_#0F172A] hover:bg-slate-100">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / TIMETABLE DECK ──────────────────────────── */}
        <section className="border-b-2 border-slate-900 px-6 py-20 bg-white">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="bg-[#D90077] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-white">
                {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="font-display text-4xl font-[950] uppercase tracking-tight text-slate-950 sm:text-5xl">
                A seat is <span className="text-[#D90077]">saved</span> for you.
              </h2>
              <div className="border-2 border-slate-900 bg-slate-900 p-6 text-white shadow-[6px_6px_0_0_#D90077]">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-pink-400">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-3xl font-black text-white">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="border-2 border-slate-900 bg-[#D90077] px-8 py-3.5 font-mono text-xs font-black uppercase text-white shadow-[4px_4px_0_0_#0F172A]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="border-2 border-slate-900 bg-white px-8 py-3.5 font-mono text-xs font-black uppercase text-slate-900 shadow-[4px_4px_0_0_#0F172A]"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border-2 border-slate-900 bg-white p-8 shadow-[8px_8px_0_0_#0F172A] divide-y-2 divide-slate-100">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block">
                      {String(i + 1).padStart(2, '0')} · {g.day}
                    </span>
                    <h4 className="font-display text-lg font-black uppercase text-slate-900 mt-1">{g.name}</h4>
                  </div>
                  <span className="font-mono text-sm font-black text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 font-mono text-[10px] uppercase font-bold text-slate-500">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b-2 border-slate-900 bg-slate-900 py-3 text-white">
          <div className="flex gap-8 whitespace-nowrap font-mono text-xs font-black uppercase tracking-[0.25em]">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">★</span>
              </span>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {playing && <VideoModal id={playing.id} title={playing.title} onClose={() => setPlaying(null)} />}
    </div>
  );
}
