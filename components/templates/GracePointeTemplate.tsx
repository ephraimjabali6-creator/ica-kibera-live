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

export default function GracePointeTemplate() {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#F9F7F3] text-[#292524] selection:bg-[#D90077] selection:text-white font-sans antialiased">
      {/* Front-Porch Attribution Bar */}
      <div className="sticky top-0 z-50 border-b border-[#E7E5E0] bg-[#F9F7F3]/95 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-[#78716C]">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#D90077]" />
            <span className="font-bold text-[#292524]">TEMPLATE #08 · GRACEPOINTE WELCOMING HEARTH</span>
            <span className="hidden sm:inline text-[#E7E5E0]">|</span>
            <span className="hidden sm:inline">DOUBLE-PAGE OPEN BOOK EDITORIAL</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: DOUBLE-PAGE OPEN BOOK LAYOUT ──────── */}
        <section className="relative overflow-hidden border-b border-[#E7E5E0] px-6 py-20 lg:px-16 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl border border-[#E7E5E0] bg-white p-8 sm:p-14 shadow-sm grid items-center gap-12 lg:grid-cols-12">
              {/* Left Page: Headline & Lead */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 text-xs font-bold text-[#D90077]">
                  <span>{HERO_CONTENT.locationPill} · {HERO_CONTENT.schedulePill}</span>
                </div>

                <h1 className="font-serif text-4xl font-normal tracking-tight text-[#292524] sm:text-6xl lg:text-7xl leading-[1.05]">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="italic text-[#D90077]">{HERO_CONTENT.headingLine2}</span>
                </h1>

                <p className="max-w-xl font-serif text-lg leading-relaxed text-[#57534E]">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="rounded-full bg-[#D90077] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#B80065]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="rounded-full border border-[#D6D3D1] bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#292524] hover:bg-[#F5F5F4]"
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

                <div className="grid grid-cols-2 gap-4 border-t border-[#E7E5E0] pt-6 sm:grid-cols-3 font-mono text-xs">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase text-[#78716C] block">{m.label}</span>
                      <span className="font-bold text-[#292524] mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Page: Photo Album Frame */}
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border-4 border-[#F5F5F4] bg-white p-2 shadow-lg">
                  <HeroSlider />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / WHO WE ARE HEARTH LETTER ─────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-[#E7E5E0] bg-white">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D90077]">
              {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="mt-6 font-serif text-3xl sm:text-5xl font-normal leading-relaxed text-[#292524]">
              “<span className="italic text-[#D90077]">Worshipping</span> Jesus, teaching the Word,{' '}
              <span className="italic text-[#D90077]">raising</span> leaders and{' '}
              <span className="italic text-[#D90077]">giving life</span> to Kibera, Nairobi and the nations — on Sunday and every day.”
            </p>
            <p className="mt-6 font-serif text-base text-[#78716C] max-w-xl mx-auto">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="py-16 px-6 text-center border-b border-[#E7E5E0] bg-[#F9F7F3]" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-xs uppercase text-[#78716C]">
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

        {/* ── 04 SUNDAY / EVERY DAY SPLIT PAGES ──────────────────── */}
        <section className="relative grid md:grid-cols-2 border-b border-[#E7E5E0]">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[48vh] items-end overflow-hidden p-8 sm:p-12 border-[#E7E5E0] md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#292524] via-[#292524]/50 to-transparent" />
              <div className="text-white">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-pink-300">
                  [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-2 font-serif text-4xl sm:text-5xl italic">{h.label}</p>
                <span className="mt-4 inline-block font-mono text-xs font-bold uppercase text-[#D90077] group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — PHOTO ALBUM ───────────────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-[#E7E5E0] bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-[#E7E5E0] pb-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">[ 05 ]</span>
                <h2 className="mt-2 font-serif text-3xl font-normal uppercase text-[#292524] sm:text-4xl">
                  Life at <span className="italic text-[#D90077] lowercase">ICA</span>
                </h2>
              </div>
              <p className="font-mono text-xs uppercase text-[#78716C]">10 Hearth Dispatches</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="group border border-[#E7E5E0] bg-[#F9F7F3] p-3 shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 flex justify-between gap-1 font-serif text-xs text-[#78716C]">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="font-mono font-bold text-[#D90077]">{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES IN OPEN DIRECTORY + STEWARDSHIP ───────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-[#E7E5E0] bg-[#F9F7F3]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-[#E7E5E0] pb-6 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                  {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 font-serif text-3xl font-normal uppercase text-[#292524] sm:text-4xl">
                  Find your <span className="italic text-[#D90077] lowercase">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="border border-[#D6D3D1] bg-white px-6 py-2 font-mono text-xs font-bold uppercase text-[#292524] hover:bg-[#F5F5F4]">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group border border-[#E7E5E0] bg-white p-5 shadow-sm transition hover:border-[#D90077]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[10px] text-[#78716C]">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-serif text-lg font-bold text-[#292524] group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 font-mono text-xs text-[#78716C]">{m.meets}</p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group border border-pink-200 bg-pink-50 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                    {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 font-serif text-2xl font-bold text-[#292524]">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 font-serif text-sm text-[#57534E] leading-relaxed">
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

        {/* ── 07 SERMONS IN FIRESIDE CARDS ───────────────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-[#E7E5E0] bg-white text-center">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
              {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 font-serif text-3xl font-normal uppercase text-[#292524] sm:text-4xl">
              Faith comes by <span className="italic text-[#D90077] lowercase">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left font-serif">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group border border-[#E7E5E0] bg-[#F9F7F3] p-4 text-left transition hover:border-[#D90077]"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[10px] text-[#78716C]">
                    {String(i + 1).padStart(2, '0')} · {s.duration}
                  </p>
                  <p className="mt-1 font-bold text-lg text-[#292524] group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-2 font-mono text-xs text-[#78716C]">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="border border-[#D6D3D1] bg-white px-8 py-3 font-mono text-xs font-bold uppercase text-[#292524] hover:bg-[#F5F5F4]">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / HEARTH TIMETABLE ───────────────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-[#E7E5E0] bg-[#F9F7F3]">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="font-serif text-3xl font-normal uppercase text-[#292524] sm:text-4xl">
                A seat is <span className="italic text-[#D90077] lowercase">saved</span> for you.
              </h2>
              <div className="border border-[#E7E5E0] bg-white p-6 shadow-sm rounded-xl">
                <p className="font-mono text-xs uppercase text-[#78716C]">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 font-mono">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="rounded-full bg-[#D90077] px-8 py-3.5 text-xs font-bold uppercase text-white hover:bg-[#B80065]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="rounded-full border border-[#D6D3D1] bg-white px-8 py-3.5 text-xs font-bold uppercase text-[#292524] hover:bg-[#F5F5F4]"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border border-[#E7E5E0] bg-white p-8 rounded-2xl divide-y divide-[#E7E5E0]">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#78716C] block">
                      {String(i + 1).padStart(2, '0')} · {g.day}
                    </span>
                    <h4 className="font-serif text-lg font-bold text-[#292524] mt-1">{g.name}</h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 font-mono text-xs text-[#78716C]">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b border-[#E7E5E0] bg-white py-4">
          <div className="flex gap-8 whitespace-nowrap font-serif text-sm font-bold uppercase tracking-widest text-[#78716C]">
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
}
