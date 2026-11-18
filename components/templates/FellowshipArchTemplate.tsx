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

export default function FellowshipArchTemplate() {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1917] selection:bg-[#D90077] selection:text-white font-sans antialiased">
      {/* Top Attribution Dock */}
      <div className="sticky top-0 z-50 border-b border-[#E7E2DA] bg-[#FAF7F2]/95 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-[#78716C]">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#D90077]" />
            <span className="font-bold text-[#1C1917]">TEMPLATE #02 · THE FELLOWSHIP ORGANIC ARCH</span>
            <span className="hidden sm:inline text-[#D6D0C4]">|</span>
            <span className="hidden sm:inline">CONCENTRIC PARABOLIC ARCH CATHEDRAL</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: 2-COLUMN ASYMMETRIC SPLIT WITH PARABOLIC ARCH ── */}
        <section className="relative overflow-hidden border-b border-[#E7E2DA] px-6 py-20 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-14 lg:grid-cols-12">
              {/* Left Column: Content */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50/80 px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#D90077]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D90077] animate-pulse" />
                  <span>{HERO_CONTENT.locationPill} · {HERO_CONTENT.schedulePill}</span>
                </div>

                <h1 className="font-sans text-4xl font-[900] uppercase leading-[0.95] tracking-tight text-[#1C1917] sm:text-6xl lg:text-[70px]">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="font-serif italic font-normal text-[#D90077] lowercase tracking-normal [font-size:1.15em]">
                    {HERO_CONTENT.headingLine2}
                  </span>
                </h1>

                <p className="max-w-xl font-serif text-[19px] leading-relaxed text-[#57534E]">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="rounded-full bg-[#D90077] px-8 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#B80065]"
                  >
                    {HERO_CONTENT.ctas[0].label} →
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="rounded-full border border-[#D6D0C4] bg-[#F2EDE4] px-7 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1C1917] transition hover:bg-white"
                  >
                    {HERO_CONTENT.ctas[1].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[2].href}
                    className="font-mono text-xs font-bold uppercase text-[#D90077] hover:underline"
                  >
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                {/* Sub-hero metadata row */}
                <div className="grid grid-cols-2 gap-4 border-t border-[#E7E2DA] pt-6 sm:grid-cols-3 font-mono text-xs">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase text-[#78716C] block">{m.label}</span>
                      <span className="font-bold text-[#1C1917] mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Signature Parabolic Organic Arch Framing */}
              <div className="relative flex justify-center lg:col-span-5">
                <div className="absolute -inset-3 rounded-t-[190px] rounded-b-3xl border-2 border-pink-200/60 -z-10 translate-x-2 translate-y-2 pointer-events-none" />
                <div className="relative w-full max-w-[420px] overflow-hidden rounded-t-[180px] rounded-b-3xl border border-[#D6D0C4] bg-white p-2 shadow-xl">
                  <div className="overflow-hidden rounded-t-[170px] rounded-b-2xl">
                    <HeroSlider />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / WHO WE ARE IN ARCHED ALCOVE ─────────── */}
        <section className="relative border-b border-[#E7E2DA] bg-[#F2EDE4] px-6 py-24 lg:px-16">
          <div className="mx-auto max-w-5xl rounded-t-[120px] rounded-b-3xl border border-[#E0D8CB] bg-[#FAF7F2] p-8 sm:p-16 text-center shadow-sm">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077] block">
              {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="mt-4 font-sans text-3xl font-[900] uppercase leading-tight tracking-tight text-[#1C1917] sm:text-5xl">
              <span className="italic font-serif font-normal text-[#D90077]">Worshipping</span> Jesus, teaching the Word,{' '}
              <span className="italic font-serif font-normal text-[#D90077]">raising</span> leaders and{' '}
              <span className="italic font-serif font-normal text-[#D90077]">giving life</span> to Kibera, Nairobi and the nations — on Sunday and every day.
            </p>
            <p className="mt-6 font-serif text-[18px] text-[#78716C] max-w-xl mx-auto">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU SECTION WITH ARCHED FRAME ─────────── */}
        <section className="border-b border-[#E7E2DA] py-16 px-6 lg:px-16 text-center" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#78716C]">
            <span>{KARIBU_CONTENT.eyebrow}</span>
            <span>{KARIBU_CONTENT.subtitle}</span>
          </div>
          <div className="mt-8 mx-auto max-w-3xl overflow-hidden rounded-t-[160px] border border-[#D6D0C4] bg-white p-8">
            <p
              className="select-none font-serif text-[16vw] font-bold uppercase leading-[0.8] tracking-tight"
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
          </div>
        </section>

        {/* ── 04 SUNDAY / EVERY DAY SPLIT WITH ARCHED HEADERS ────── */}
        <section className="relative grid md:grid-cols-2 border-b border-[#E7E2DA]">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[55vh] items-end overflow-hidden p-8 sm:p-12 border-[#E7E2DA] md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-50 grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/60 to-transparent" />
              <div className="rounded-t-3xl border border-[#D6D0C4] bg-[#FAF7F2]/90 p-6 backdrop-blur-sm w-full">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D90077] font-bold block">
                  [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-2 font-serif text-4xl italic text-[#1C1917] sm:text-5xl">
                  {h.label}
                </p>
                <span className="mt-4 inline-block font-mono text-xs font-bold uppercase text-[#D90077]">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — PHOTO GALLERY IN ARCH WINDOWS ─────── */}
        <section className="border-b border-[#E7E2DA] px-6 py-24 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
                  [ 05 ]
                </span>
                <h2 className="mt-2 font-sans text-4xl font-[900] uppercase text-[#1C1917] sm:text-5xl">
                  Life at <span className="font-serif italic font-normal text-[#D90077] lowercase">ICA</span>
                </h2>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#78716C]">
                10 Authentic Moments
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="group overflow-hidden rounded-t-[80px] rounded-b-2xl border border-[#D6D0C4] bg-white p-2 shadow-sm">
                  <div className="overflow-hidden rounded-t-[72px] rounded-b-xl aspect-[3/4]">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 px-2 pb-1 flex justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#78716C]">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="font-bold text-[#D90077]">{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES IN ARCHED TILES + STEWARDSHIP ────────── */}
        <section className="border-b border-[#E7E2DA] px-6 py-24 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-[#E7E2DA] pb-8 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
                  {MINISTRIES_CONTENT.eyebrow}
                </p>
                <h2 className="mt-4 font-sans text-4xl font-[900] uppercase text-[#1C1917] sm:text-5xl">
                  Find your <span className="font-serif italic font-normal text-[#D90077] lowercase">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="rounded-full border border-[#D6D0C4] bg-white px-6 py-2 font-mono text-xs font-bold uppercase text-[#1C1917] hover:bg-[#F2EDE4]">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group rounded-t-[60px] rounded-b-2xl border border-[#D6D0C4] bg-white p-4 transition duration-500 hover:border-[#D90077] hover:shadow-lg"
                >
                  <div className="overflow-hidden rounded-t-[50px] rounded-b-xl aspect-[4/3]">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4 px-1">
                    <span className="font-mono text-[10px] text-[#78716C] uppercase">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-sans text-lg font-bold uppercase text-[#1C1917] group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase text-[#78716C]">
                      {m.meets}
                    </p>
                  </div>
                </Link>
              ))}

              {/* Arched Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group rounded-t-[60px] rounded-b-2xl border border-pink-200 bg-pink-50/60 p-6 transition duration-300 hover:bg-pink-100 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
                    {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 font-sans text-2xl font-[900] uppercase text-[#1C1917] group-hover:text-[#D90077]">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 font-serif text-[15px] leading-relaxed text-[#57534E]">
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

        {/* ── 07 SERMONS IN ARCHED CARDS ─────────────────────────── */}
        <section className="border-b border-[#E7E2DA] px-6 py-28 lg:px-16 text-center">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
              {MESSAGES_CONTENT.eyebrow}
            </p>
            <h2 className="mt-4 font-sans text-4xl font-[900] uppercase text-[#1C1917] sm:text-5xl">
              Faith comes by <span className="font-serif italic font-normal text-[#D90077] lowercase">hearing.</span>
            </h2>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group rounded-t-[50px] rounded-b-2xl border border-[#D6D0C4] bg-white p-4 transition duration-300 hover:border-[#D90077] hover:shadow-lg text-left"
                >
                  <div className="overflow-hidden rounded-t-[42px] rounded-b-lg aspect-[16/9]">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[10px] uppercase text-[#78716C]">
                    {String(i + 1).padStart(2, '0')} · {s.duration}
                  </p>
                  <p className="mt-1 font-sans text-base font-bold uppercase text-[#1C1917] group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase text-[#78716C]">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="rounded-full border border-[#D6D0C4] bg-white px-8 py-3 font-mono text-xs font-bold uppercase text-[#1C1917] hover:bg-[#F2EDE4]">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / TIMETABLE IN CATHEDRAL SCHEDULE ────────── */}
        <section className="border-b border-[#E7E2DA] px-6 py-24 lg:px-16">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
                {GATHER_CONTENT.eyebrow}
              </p>
              <h2 className="font-sans text-4xl font-[900] uppercase text-[#1C1917] sm:text-5xl">
                A seat is <span className="font-serif italic font-normal text-[#D90077] lowercase">saved</span> for you.
              </h2>
              <div className="rounded-t-[40px] rounded-b-2xl border border-[#D6D0C4] bg-white p-6 shadow-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#78716C]">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-3xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="rounded-full bg-[#D90077] px-8 py-3 font-mono text-xs font-bold uppercase text-white shadow hover:bg-[#B80065]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="rounded-full border border-[#D6D0C4] bg-white px-7 py-3 font-mono text-xs font-bold uppercase text-[#1C1917] hover:bg-[#F2EDE4]"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-t-[60px] rounded-b-2xl border border-[#D6D0C4] bg-white p-8 sm:p-10 shadow-sm divide-y divide-[#E7E2DA]">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-5 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#78716C] block">
                      {String(i + 1).padStart(2, '0')} · {g.day}
                    </span>
                    <h4 className="font-sans text-lg font-bold uppercase text-[#1C1917] mt-1">{g.name}</h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-6 font-mono text-[10px] uppercase text-[#78716C]">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b border-[#E7E2DA] bg-[#F2EDE4] py-4">
          <div className="flex gap-8 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#57534E]">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">◆</span>
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
