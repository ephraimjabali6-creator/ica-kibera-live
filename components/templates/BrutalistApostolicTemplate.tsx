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

export const BrutalistApostolicTemplate: React.FC = () => {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-[#D90077] font-mono antialiased">
      {/* Swiss Top Rail */}
      <div className="sticky top-0 z-50 border-b-2 border-black bg-white px-6 py-2">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 bg-[#D90077]" />
            <span>SWISS APOSTOLIC WIREFRAME // TEMPLATE #09</span>
            <span className="text-slate-300">|</span>
            <span>2PX BLACK BORDERS // JETBRAINS MONO</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: 2PX SOLID BLACK WIREFRAME GRID ────── */}
        <section className="border-b-2 border-black px-6 py-16 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="border-2 border-black p-6 sm:p-12 grid items-center gap-12 lg:grid-cols-12 bg-white">
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-block border-2 border-black bg-[#D90077] px-3 py-1 text-xs font-black uppercase text-white">
                  {HERO_CONTENT.locationPill} // {HERO_CONTENT.schedulePill}
                </div>

                <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tighter">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="text-[#D90077]">{HERO_CONTENT.headingLine2}</span>
                </h1>

                <p className="max-w-xl text-sm uppercase leading-relaxed text-slate-800 font-bold">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="border-2 border-black bg-black px-8 py-3 text-xs font-black uppercase text-white hover:bg-[#D90077]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="border-2 border-black bg-white px-8 py-3 text-xs font-black uppercase text-black hover:bg-slate-100"
                  >
                    {HERO_CONTENT.ctas[1].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[2].href}
                    className="text-xs font-black uppercase text-[#D90077] underline underline-offset-4"
                  >
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t-2 border-black pt-6 sm:grid-cols-3">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase text-slate-500 block font-bold">{m.label}</span>
                      <span className="text-xs font-black uppercase text-black mt-1 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 4-Photo Slider in 2px Black Border */}
              <div className="lg:col-span-5">
                <div className="border-2 border-black p-2 bg-slate-50">
                  <HeroSlider />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / WIREFRAME BANNER ─────────────────────── */}
        <section className="border-b-2 border-black px-6 py-20 bg-black text-white">
          <div className="mx-auto max-w-7xl">
            <span className="border border-white px-2 py-0.5 text-xs uppercase font-bold text-[#D90077]">
              {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="mt-6 font-sans text-3xl sm:text-5xl font-black uppercase leading-tight">
              Worshipping Jesus, teaching the Word, raising leaders and giving life to Kibera, Nairobi and the nations — on Sunday and every day.
            </p>
            <p className="mt-6 text-xs uppercase text-slate-400 font-bold">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="border-b-2 border-black py-16 px-6 text-center bg-white" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between text-xs uppercase font-bold text-slate-500">
            <span>{KARIBU_CONTENT.eyebrow}</span>
            <span>{KARIBU_CONTENT.subtitle}</span>
          </div>
          <p
            className="mt-6 select-none font-sans text-[20vw] font-black uppercase leading-[0.78] tracking-tighter"
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

        {/* ── 04 SUNDAY / EVERY DAY 50/50 WIREFRAME BOXES ─────────── */}
        <section className="relative grid md:grid-cols-2 border-b-2 border-black">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[50vh] items-end overflow-hidden p-8 border-black md:border-l-2 md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="text-white">
                <span className="border border-[#D90077] bg-[#D90077] px-2 py-0.5 text-[10px] font-black uppercase">
                  [ {h.idx} ] // {h.sub}
                </span>
                <p className="mt-3 font-sans text-5xl font-black uppercase">{h.label}</p>
                <span className="mt-4 inline-block text-xs font-black uppercase text-pink-300 group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — 10 WIREFRAME TILES ─────────────────── */}
        <section className="border-b-2 border-black px-6 py-20 bg-slate-50">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b-2 border-black pb-4">
              <div>
                <span className="border border-black bg-black px-2 py-0.5 text-[10px] font-black uppercase text-white">
                  [ 05 ]
                </span>
                <h2 className="mt-2 font-sans text-3xl font-black uppercase text-black">
                  Life at <span className="text-[#D90077]">ICA</span>
                </h2>
              </div>
              <p className="text-xs uppercase font-bold text-slate-500">10 Camera Documents</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="border-2 border-black bg-white p-2">
                  <div className="aspect-[4/3] overflow-hidden border border-black">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-2 flex justify-between gap-1 text-[9px] font-bold uppercase text-black">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="text-[#D90077]">DOC {String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES WIREFRAME GRID + STEWARDSHIP ──────────── */}
        <section className="border-b-2 border-black px-6 py-20 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b-2 border-black pb-4 md:flex-row md:items-end">
              <div>
                <span className="border border-black bg-[#D90077] px-2 py-0.5 text-[10px] font-black uppercase text-white">
                  {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 font-sans text-3xl font-black uppercase text-black">
                  Find your <span className="text-[#D90077]">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="border-2 border-black bg-white px-6 py-2 text-xs font-black uppercase text-black hover:bg-black hover:text-white">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group border-2 border-black bg-white p-4 transition hover:bg-slate-50"
                >
                  <div className="aspect-[4/3] overflow-hidden border border-black">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="text-[10px] font-bold text-slate-400">INDEX // {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-sans text-base font-black uppercase text-black group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-[10px] uppercase text-slate-600 font-bold">{m.meets}</p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group border-2 border-black bg-pink-100 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="border border-black bg-[#D90077] px-2 py-0.5 text-[10px] font-black uppercase text-white">
                    {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 font-sans text-2xl font-black uppercase text-black">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 text-xs uppercase font-bold text-slate-800 leading-relaxed">
                    {MINISTRIES_CONTENT.stewardship.description}
                  </p>
                </div>
                <span className="text-xs font-black uppercase text-[#D90077] mt-6">
                  {MINISTRIES_CONTENT.stewardship.cta}
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 07 SERMONS IN WIREFRAME CELLS ──────────────────────── */}
        <section className="border-b-2 border-black px-6 py-20 text-center bg-slate-50">
          <div className="mx-auto max-w-7xl">
            <span className="border border-black bg-black px-2 py-0.5 text-[10px] font-black uppercase text-white">
              {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 font-sans text-3xl font-black uppercase text-black sm:text-4xl">
              Faith comes by <span className="text-[#D90077]">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group border-2 border-black bg-white p-3 text-left transition hover:border-[#D90077]"
                >
                  <div className="aspect-[16/9] overflow-hidden border border-black">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase">
                    SERMON {String(i + 1).padStart(2, '0')} // {s.duration}
                  </p>
                  <p className="mt-1 font-sans text-sm font-black uppercase text-black group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-1 text-[10px] uppercase font-bold text-slate-600">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="border-2 border-black bg-white px-8 py-3 text-xs font-black uppercase text-black hover:bg-black hover:text-white">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / TIMETABLE TABLE ────────────────────────── */}
        <section className="border-b-2 border-black px-6 py-20 bg-white">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="border border-black bg-[#D90077] px-2 py-0.5 text-[10px] font-black uppercase text-white">
                {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="font-sans text-3xl font-black uppercase text-black sm:text-4xl">
                A seat is <span className="text-[#D90077]">saved</span> for you.
              </h2>
              <div className="border-2 border-black bg-slate-50 p-6">
                <p className="text-xs uppercase font-bold text-slate-500">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 text-2xl font-black text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="border-2 border-black bg-black px-8 py-3.5 text-xs font-black uppercase text-white hover:bg-[#D90077]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="border-2 border-black bg-white px-8 py-3.5 text-xs font-black uppercase text-black hover:bg-slate-100"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border-2 border-black bg-white p-8 divide-y-2 divide-black">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      {String(i + 1).padStart(2, '0')} // {g.day}
                    </span>
                    <h4 className="font-sans text-base font-black uppercase text-black mt-1">{g.name}</h4>
                  </div>
                  <span className="text-sm font-black text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 text-xs font-bold uppercase text-slate-500">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b-2 border-black bg-black py-3 text-white">
          <div className="flex gap-8 whitespace-nowrap text-xs font-black uppercase tracking-widest">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">■</span>
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

export default BrutalistApostolicTemplate;
