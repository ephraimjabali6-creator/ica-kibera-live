import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../Header';
import Footer from '../Footer';
import HeroSlider from '../HeroSlider';
import VideoModal from '../VideoModal';
import { MagneticButton } from '../experience/MagneticButton';
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

export const SanctuaryEditorialTemplate: React.FC = () => {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-white text-[#0F172A] selection:bg-[#D90077] selection:text-white font-sans antialiased">
      {/* Editorial Attribution Bar */}
      <div className="border-b border-slate-100 bg-white/90 px-6 py-2.5 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-[#64748B]">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#D90077] animate-pulse" />
            <span className="font-bold text-slate-900">TEMPLATE #01 · SANCTUARY LUXURY EDITORIAL</span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">THE DESIGN SHOP ARCHETYPE</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <Link href="/templates" className="text-[#D90077] hover:underline">
              ← 20 Archetypes Gallery
            </Link>
          </div>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION (Asymmetrical Monastic Editorial) ── */}
        <section className="relative overflow-hidden border-b border-slate-100 px-6 py-20 lg:px-16 lg:py-28">
          <div className="pointer-events-none absolute left-6 top-8 select-none font-mono text-[10px] uppercase tracking-[0.25em] text-slate-300">
            {HERO_CONTENT.watermark} · EDITORIAL FOLIO
          </div>

          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-12">
              {/* Left Column: Refined Serif Typography & Tactile CTAs */}
              <div className="space-y-8 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                  <span className="rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 font-bold text-[#D90077]">
                    {HERO_CONTENT.locationPill}
                  </span>
                  <span className="text-slate-500 font-semibold">{HERO_CONTENT.schedulePill}</span>
                </div>

                <h1 className="font-serif text-5xl font-light tracking-tight text-slate-950 sm:text-7xl lg:text-[76px] leading-[0.98]">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="italic font-normal text-[#D90077]">{HERO_CONTENT.headingLine2}</span>
                </h1>

                <p className="max-w-xl font-serif text-[18px] leading-relaxed text-slate-600">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <MagneticButton asAnchor href={HERO_CONTENT.ctas[0].href} className="btn-primary">
                    {HERO_CONTENT.ctas[0].label}
                  </MagneticButton>
                  <MagneticButton asAnchor href={HERO_CONTENT.ctas[1].href} className="btn-outline">
                    {HERO_CONTENT.ctas[1].label}
                  </MagneticButton>
                  <Link href={HERO_CONTENT.ctas[2].href} className="btn-outline-light text-sm">
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                {/* Micro Metadata Row */}
                <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-8 sm:grid-cols-3">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">{m.label}</p>
                      <p className="mt-1 font-sans text-xs font-bold uppercase text-slate-900">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Autonomous Horizontal 4-Photo Slider */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)]">
                  <HeroSlider />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / KINETIC EDITORIAL SPREAD ────────────── */}
        <section className="relative border-b border-slate-100 px-6 py-24 lg:px-16 lg:py-32 bg-[#FAF8F5]">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
                {MANIFESTO_CONTENT.eyebrow}
              </p>
              <p className="mt-6 max-w-xs font-mono text-[12px] uppercase leading-relaxed tracking-[0.14em] text-slate-500">
                {MANIFESTO_CONTENT.subtitle}
              </p>
            </div>
            <div className="lg:col-span-8">
              <p className="font-serif text-3xl font-light leading-[1.25] tracking-tight text-slate-900 sm:text-5xl lg:text-[52px]">
                <span className="italic font-normal text-[#D90077]">Worshipping</span> Jesus, teaching the Word,{' '}
                <span className="italic font-normal text-[#D90077]">raising</span> leaders and{' '}
                <span className="italic font-normal text-[#D90077]">giving life</span> to Kibera, Nairobi and the nations — on Sunday and every day.
              </p>
            </div>
          </div>
        </section>

        {/* ── 03 MASKED "KARIBU" WORD SECTION ──────────────────── */}
        <section className="relative border-b border-slate-100 py-16 px-6 lg:px-16 text-center" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
            <span>{KARIBU_CONTENT.eyebrow}</span>
            <span>{KARIBU_CONTENT.subtitle}</span>
          </div>
          <p
            className="mt-6 select-none font-serif text-[18vw] font-bold uppercase leading-[0.82] tracking-tight"
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

        {/* ── 04 SUNDAY / EVERY DAY SPLIT CARDS ─────────────────── */}
        <section className="relative grid md:grid-cols-2 border-b border-slate-100" aria-label="Sunday and every day">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[60vh] items-end overflow-hidden p-8 sm:p-12 border-slate-100 md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover opacity-40 grayscale transition duration-1000 group-hover:scale-100 group-hover:opacity-80 group-hover:grayscale-0"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-white via-white/50 to-transparent" />
              <span className="absolute left-8 top-8 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                [ {h.idx} ]
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D90077] font-bold">{h.sub}</p>
                <p className="mt-3 font-serif text-5xl italic leading-none text-slate-900 transition duration-500 group-hover:text-[#D90077] sm:text-6xl">
                  {h.label}
                </p>
                <span className="mt-6 inline-block font-mono text-xs font-semibold text-slate-900 group-hover:text-[#D90077]">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — PHOTO GALLERY ─────────────────────── */}
        <section className="border-b border-slate-100 px-6 py-24 lg:px-16" aria-label="Life at ICA photo gallery">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
                  {LIFE_CONTENT[0] ? '[ 05 ]' : ''}
                </span>
                <h2 className="mt-2 font-serif text-4xl font-light text-slate-900 sm:text-5xl">
                  Life at <span className="italic font-normal text-[#D90077]">ICA</span>
                </h2>
              </div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">
                10 Curated Photographic Dispatches
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="group overflow-hidden rounded-xl border border-slate-100 bg-white p-2">
                  <div className="overflow-hidden rounded-lg aspect-[4/3]">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 flex justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="font-bold text-[#D90077]">{String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES CATALOG + STEWARDSHIP CARD ──────────── */}
        <section className="border-b border-slate-100 px-6 py-24 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
                  {MINISTRIES_CONTENT.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-4xl font-light text-slate-900 sm:text-5xl">
                  Find your <span className="italic font-normal text-[#D90077]">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="btn-outline self-start md:self-auto">
                {MINISTRIES_CONTENT.allLabel}
              </Link>
            </div>

            <div className="grid border-l border-slate-100 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group relative block border-b border-r border-slate-100 p-6 transition duration-500 hover:bg-pink-50/40"
                >
                  <div className="flex aspect-[4/5] flex-col justify-between">
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      <span className="transition group-hover:text-[#D90077]">↗</span>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-normal text-slate-900 group-hover:text-[#D90077]">
                        {m.name}
                      </h3>
                      <p className="mt-2 font-mono text-[10px] uppercase leading-tight text-slate-400">
                        {m.meets}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group relative block border-b border-r border-slate-100 bg-[#FAF8F5] p-6 transition duration-300 hover:bg-pink-50"
              >
                <div className="flex aspect-[4/5] flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
                      {MINISTRIES_CONTENT.stewardship.tag}
                    </span>
                    <p className="mt-4 font-serif text-2xl font-light uppercase text-slate-900 group-hover:text-[#D90077]">
                      Partnering in <br />Grace &amp; Giving
                    </p>
                    <p className="mt-3 font-serif text-base leading-relaxed text-slate-600">
                      {MINISTRIES_CONTENT.stewardship.description}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#D90077]">
                    {MINISTRIES_CONTENT.stewardship.cta}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 07 MESSAGES / SERMONS ──────────────────────────────── */}
        <section className="border-b border-slate-100 px-6 py-28 lg:px-16 text-center">
          <div className="mx-auto max-w-7xl">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
              {MESSAGES_CONTENT.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-light text-slate-900 sm:text-5xl">
              Faith comes by <span className="italic font-normal text-[#D90077]">hearing.</span>
            </h2>

            {/* Featured Message Cards */}
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group rounded-xl border border-slate-200 bg-white p-5 transition duration-300 hover:border-[#D90077] hover:shadow-lg"
                >
                  <div className="aspect-[16/9] overflow-hidden rounded-lg">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    {String(i + 1).padStart(2, '0')} · {s.duration}
                  </p>
                  <p className="mt-2 font-serif text-lg font-normal text-slate-900 group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase text-slate-500">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-12">
              <Link href={MESSAGES_CONTENT.allLink} className="btn-outline">
                {MESSAGES_CONTENT.allLabel}
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / TIMETABLE ──────────────────────────────── */}
        <section className="border-b border-slate-100 px-6 py-24 lg:px-16">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#D90077]">
                {GATHER_CONTENT.eyebrow}
              </p>
              <h2 className="font-serif text-4xl font-light text-slate-900 sm:text-5xl">
                A seat is <span className="italic font-normal text-[#D90077]">saved</span> for you.
              </h2>
              <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-3xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2">
                <MagneticButton asAnchor href={GATHER_CONTENT.ctas[0].href} className="btn-primary">
                  {GATHER_CONTENT.ctas[0].label}
                </MagneticButton>
                <MagneticButton asAnchor href={GATHER_CONTENT.ctas[1].href} className="btn-outline">
                  {GATHER_CONTENT.ctas[1].label}
                </MagneticButton>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-slate-100 border-t border-slate-100 lg:border-t-0">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-6 flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block">{g.day}</span>
                      <h4 className="font-serif text-xl font-normal text-slate-900">{g.name}</h4>
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-6 font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b border-slate-100 py-6 bg-slate-50" aria-label="Moments and ministries">
          <div className="marquee">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap px-8 font-serif text-2xl font-light uppercase tracking-wider text-slate-800 sm:text-4xl">
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

export default SanctuaryEditorialTemplate;
