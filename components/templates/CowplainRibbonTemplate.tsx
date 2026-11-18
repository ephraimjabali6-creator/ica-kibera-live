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

export default function CowplainRibbonTemplate() {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFCFF] text-slate-800 selection:bg-[#D90077] selection:text-white font-sans antialiased">
      {/* Top Header Dock */}
      <div className="sticky top-0 z-50 border-b border-sky-100 bg-white/95 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#D90077]" />
            <span className="font-bold text-slate-900">TEMPLATE #07 · COWPLAIN COMMUNITY RIBBON</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">ORGANIC CURVED WAVES &amp; COMMUNITY STORY</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: WARM COMMUNITY WAVE ──────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-pink-50/30 pt-20 pb-28 px-6 lg:px-16 border-b border-pink-100">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white px-4 py-1.5 text-xs font-bold text-[#D90077] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#D90077]" />
                  <span>{HERO_CONTENT.locationPill} · {HERO_CONTENT.schedulePill}</span>
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-tight">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="text-[#D90077] underline decoration-pink-300 decoration-wavy">
                    {HERO_CONTENT.headingLine2}
                  </span>
                </h1>

                <p className="max-w-xl text-lg text-slate-600 leading-relaxed font-normal">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="rounded-full bg-[#D90077] px-8 py-3.5 font-bold text-white shadow-lg shadow-pink-500/20 hover:bg-[#B80065]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="rounded-full border border-slate-300 bg-white px-8 py-3.5 font-bold text-slate-700 shadow-sm hover:bg-slate-50"
                  >
                    {HERO_CONTENT.ctas[1].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[2].href}
                    className="text-xs font-bold uppercase tracking-wider text-[#D90077] hover:underline"
                  >
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-pink-100 pt-6 sm:grid-cols-3">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">{m.label}</span>
                      <span className="text-sm font-bold text-slate-800 mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 4-Photo Slider in Wave-Border Card */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-[36px] border-4 border-white bg-white p-2 shadow-xl shadow-pink-500/10">
                  <HeroSlider />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / COMMUNITY STORY BANNER ──────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-pink-100 bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <span className="rounded-full bg-pink-100 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-[#D90077]">
              {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-snug">
              <span className="text-[#D90077]">Worshipping</span> Jesus, teaching the Word,{' '}
              <span className="text-[#D90077]">raising</span> leaders and{' '}
              <span className="text-[#D90077]">giving life</span> to Kibera, Nairobi and the nations — on Sunday and every day.
            </p>
            <p className="mt-6 text-base text-slate-500 max-w-xl mx-auto">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="py-16 px-6 text-center border-b border-pink-100 bg-[#FAFCFF]" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-xs uppercase text-slate-400">
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

        {/* ── 04 SUNDAY / EVERY DAY SPLIT WAVES ──────────────────── */}
        <section className="relative grid md:grid-cols-2 border-b border-pink-100">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[48vh] items-end overflow-hidden p-8 sm:p-12 border-pink-100 md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent" />
              <div className="text-white">
                <span className="rounded-full bg-pink-500/80 px-3 py-1 font-mono text-[10px] font-bold uppercase backdrop-blur-sm">
                  [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-3 text-4xl font-extrabold sm:text-5xl">{h.label}</p>
                <span className="mt-4 inline-block font-semibold text-pink-300 group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — PHOTO STORY ───────────────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-pink-100 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">[ 05 ]</span>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Life at <span className="text-[#D90077]">ICA</span>
                </h2>
              </div>
              <p className="text-xs font-mono uppercase text-slate-400">10 Story Snapshots</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="group overflow-hidden rounded-2xl border border-pink-100 bg-[#FAFCFF] p-2 shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-2.5 px-1 flex justify-between gap-1 text-[10px] font-medium text-slate-500">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="font-bold text-[#D90077]">{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES IN FRIENDLY TILES + STEWARDSHIP ───────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-pink-100 bg-[#FAFCFF]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                  {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Find your <span className="text-[#D90077]">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="rounded-full border border-slate-300 bg-white px-6 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group rounded-2xl border border-pink-100 bg-white p-5 shadow-sm transition hover:border-[#D90077] hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[10px] text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-xs text-slate-500">{m.meets}</p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group rounded-2xl border border-pink-200 bg-pink-100/60 p-6 shadow-sm transition hover:bg-pink-100 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                    {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 text-2xl font-bold text-slate-900">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {MINISTRIES_CONTENT.stewardship.description}
                  </p>
                </div>
                <span className="font-bold text-xs text-[#D90077] mt-6">
                  {MINISTRIES_CONTENT.stewardship.cta}
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 07 SERMONS IN COMMUNITY PODCAST TILES ───────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-pink-100 bg-white text-center">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
              {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Faith comes by <span className="text-[#D90077]">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#D90077] hover:shadow-lg text-left"
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-xl">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[10px] text-slate-400">
                    {String(i + 1).padStart(2, '0')} · {s.duration}
                  </p>
                  <p className="mt-1 font-bold text-slate-900 group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="rounded-full border border-slate-300 bg-white px-8 py-3 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / NOTICEBOARD TIMETABLE ──────────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-pink-100 bg-[#FAFCFF]">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                A seat is <span className="text-[#D90077]">saved</span> for you.
              </h2>
              <div className="rounded-3xl border border-pink-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-mono uppercase text-slate-400">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-3xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="rounded-full bg-[#D90077] px-8 py-3.5 font-bold text-white shadow-md hover:bg-[#B80065]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="rounded-full border border-slate-300 bg-white px-8 py-3.5 font-bold text-slate-700 shadow-sm hover:bg-slate-50"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm divide-y divide-slate-100">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      {String(i + 1).padStart(2, '0')} · {g.day}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{g.name}</h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 text-xs font-mono text-slate-400">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b border-pink-100 bg-white py-4">
          <div className="flex gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-600">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">♥</span>
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
