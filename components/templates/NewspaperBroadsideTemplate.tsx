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

export const NewspaperBroadsideTemplate: React.FC = () => {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#F6F5F2] text-black selection:bg-black selection:text-white font-serif antialiased">
      {/* Broadside Header Bar */}
      <div className="sticky top-0 z-50 border-b border-black bg-[#F6F5F2]/95 px-6 py-2 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-black">
          <div className="flex items-center gap-3">
            <span className="font-bold">THE KIBERA SUNDAY HERALD</span>
            <span>|</span>
            <span>VOL. XXXI // NO. 01</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">TEMPLATE #13 · VICTORIAN BROADSIDE</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs font-mono">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* Newspaper Masthead */}
        <div className="border-b-4 border-double border-black py-8 px-6 text-center bg-[#F6F5F2]">
          <div className="mx-auto max-w-7xl flex flex-col items-center">
            <div className="w-full flex justify-between border-b border-black pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-700">
              <span>CIRCULATION: NAIROBI &amp; THE NATIONS</span>
              <span>SPECIAL SUNDAY EDITION</span>
              <span>ESTABLISHED 1995</span>
            </div>
            <h1 className="mt-4 font-serif text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-black">
              The Kibera Herald
            </h1>
            <p className="mt-2 text-xs font-mono uppercase tracking-[0.25em] text-slate-800">
              VOICE OF THE INTERNATIONAL CHRISTIAN ASSEMBLIES · TRUTH &amp; TRANSFORMATION
            </p>
          </div>
        </div>

        {/* ── 01 HERO SECTION: 4-COLUMN FRONT-PAGE LEAD STORY ───── */}
        <section className="border-b-2 border-black px-6 py-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-12 items-start">
              {/* Main Headline & Lead Article (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="border-b border-black pb-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#D90077]">
                    LEAD STORY // {HERO_CONTENT.locationPill} · {HERO_CONTENT.schedulePill}
                  </span>
                </div>

                <h2 className="font-serif text-4xl sm:text-6xl font-black uppercase leading-[0.95] tracking-tight">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="italic font-normal text-[#D90077]">{HERO_CONTENT.headingLine2}</span>
                </h2>

                <p className="first-letter:float-left first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:leading-none text-base leading-relaxed text-slate-900 text-justify">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="border-2 border-black bg-black px-7 py-3 text-xs font-bold uppercase text-white hover:bg-[#D90077] hover:border-[#D90077]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="border-2 border-black bg-white px-7 py-3 text-xs font-bold uppercase text-black hover:bg-slate-200"
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

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-black pt-4 font-mono text-xs">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase text-slate-600 block">{m.label}</span>
                      <span className="font-bold uppercase text-black mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Front-Page Photo (5 Cols) */}
              <div className="lg:col-span-5 border-l-2 border-black pl-0 lg:pl-8">
                <div className="border border-black bg-white p-2">
                  <HeroSlider />
                  <p className="mt-2 text-center text-[10px] font-mono uppercase text-slate-600">
                    FIG. 01 — HISTORIC SANCTUARY GATHERING IN KIBERA, NAIROBI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / EDITORIAL BOARD STATEMENT ───────────── */}
        <section className="border-b-2 border-black px-6 py-16 bg-[#EDEBE6] text-center">
          <div className="mx-auto max-w-4xl border-2 border-black p-8 sm:p-12 bg-white">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#D90077]">
              EDITORIAL PROCLAMATION // {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="mt-4 text-2xl sm:text-4xl font-black uppercase leading-tight text-black">
              “Worshipping Jesus, teaching the Word, raising leaders and giving life to Kibera, Nairobi and the nations — on Sunday and every day.”
            </p>
            <p className="mt-4 font-mono text-xs uppercase text-slate-600">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="border-b-2 border-black py-12 px-6 text-center bg-[#F6F5F2]" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-xs uppercase text-slate-600">
            <span>{KARIBU_CONTENT.eyebrow}</span>
            <span>{KARIBU_CONTENT.subtitle}</span>
          </div>
          <p
            className="mt-4 select-none text-[18vw] font-black uppercase leading-[0.8] tracking-tight"
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

        {/* ── 04 SUNDAY / EVERY DAY 2-COLUMN DISPATCHES ──────────── */}
        <section className="relative grid md:grid-cols-2 border-b-2 border-black">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[45vh] items-end overflow-hidden p-8 border-black md:border-l-2 md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="text-white">
                <span className="border border-white bg-black px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#D90077]">
                  DISPATCH [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-2 text-4xl sm:text-5xl font-black uppercase">{h.label}</p>
                <span className="mt-3 inline-block font-mono text-xs uppercase text-pink-300 group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — PRESS WIRE DISPATCHES ──────────────── */}
        <section className="border-b-2 border-black px-6 py-16 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b-2 border-black pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">[ 05 ]</span>
                <h2 className="mt-2 font-serif text-3xl font-black uppercase text-black">
                  Life at <span className="text-[#D90077]">ICA</span>
                </h2>
              </div>
              <p className="font-mono text-xs uppercase text-slate-600">10 Wire Dispatches</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="border border-black bg-[#F6F5F2] p-2">
                  <div className="aspect-[4/3] overflow-hidden border border-black">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-2 flex justify-between gap-1 font-mono text-[9px] uppercase text-black">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="font-bold text-[#D90077]">№{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES IN CLASSIFIEDS DIRECTORY + STEWARDSHIP ── */}
        <section className="border-b-2 border-black px-6 py-16 bg-[#EDEBE6]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b-2 border-black pb-4 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                  {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 font-serif text-3xl font-black uppercase text-black">
                  Find your <span className="text-[#D90077]">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="border-2 border-black bg-white px-6 py-2 font-mono text-xs font-bold uppercase text-black hover:bg-black hover:text-white">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group border border-black bg-white p-4 transition hover:border-[#D90077]"
                >
                  <div className="aspect-[4/3] overflow-hidden border border-black">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <div className="mt-3">
                    <span className="font-mono text-[10px] text-slate-500">SECTION {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-base font-bold uppercase text-black group-hover:text-[#D90077] mt-0.5">
                      {m.name}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase text-slate-600">{m.meets}</p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group border-2 border-black bg-pink-100 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                    {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 font-serif text-2xl font-black uppercase text-black">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 text-xs uppercase font-bold text-slate-800 leading-relaxed">
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

        {/* ── 07 SERMONS IN PRESS TRANSCRIPTS ────────────────────── */}
        <section className="border-b-2 border-black px-6 py-16 text-center bg-white">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
              {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 font-serif text-3xl font-black uppercase text-black sm:text-4xl">
              Faith comes by <span className="text-[#D90077]">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left font-serif">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group border border-black bg-[#F6F5F2] p-3 text-left transition hover:border-[#D90077]"
                >
                  <div className="aspect-[16/9] overflow-hidden border border-black">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  </div>
                  <p className="mt-2 font-mono text-[10px] text-slate-500 uppercase">
                    RECORD {String(i + 1).padStart(2, '0')} // {s.duration}
                  </p>
                  <p className="mt-1 text-sm font-bold uppercase text-black group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase text-slate-600">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="border-2 border-black bg-white px-8 py-3 font-mono text-xs font-bold uppercase text-black hover:bg-black hover:text-white">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / PUBLIC NOTICES TIMETABLE ────────────────── */}
        <section className="border-b-2 border-black px-6 py-16 bg-[#EDEBE6]">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="font-serif text-3xl font-black uppercase text-black sm:text-4xl">
                A seat is <span className="text-[#D90077]">saved</span> for you.
              </h2>
              <div className="border-2 border-black bg-white p-6 shadow-sm">
                <p className="font-mono text-xs uppercase text-slate-600">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 font-mono">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="border-2 border-black bg-black px-8 py-3 text-xs font-bold uppercase text-white hover:bg-[#D90077]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="border-2 border-black bg-white px-8 py-3 text-xs font-bold uppercase text-black hover:bg-slate-200"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border-2 border-black bg-white p-8 divide-y-2 divide-black">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-slate-600 block">
                      NOTICE {String(i + 1).padStart(2, '0')} // {g.day}
                    </span>
                    <h4 className="font-serif text-base font-bold uppercase text-black mt-1">{g.name}</h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 font-mono text-xs text-slate-600">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b-2 border-black bg-black py-3 text-white">
          <div className="flex gap-8 whitespace-nowrap font-mono text-xs uppercase tracking-widest">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">✦</span>
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

export default NewspaperBroadsideTemplate;
