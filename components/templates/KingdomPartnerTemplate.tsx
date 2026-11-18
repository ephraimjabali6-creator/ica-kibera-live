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

export const KingdomPartnerTemplate: React.FC = () => {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#D90077] selection:text-white font-sans antialiased">
      {/* Philanthropic Top Bar */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#D90077]" />
            <span className="font-bold text-slate-900">TEMPLATE #20 · KINGDOM PHILANTHROPY DECK</span>
            <span className="text-slate-300">|</span>
            <span>TRANSPARENT STEWARDSHIP &amp; METRIC IMPACT</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: HIGH-CONVERTING IMPACT HERO ───────── */}
        <section className="relative overflow-hidden border-b border-slate-200 px-6 py-20 lg:px-16 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3.5 py-1 text-xs font-semibold text-[#D90077]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D90077]" />
                  <span>{HERO_CONTENT.locationPill} · {HERO_CONTENT.schedulePill}</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-slate-950 leading-[0.98]">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="text-[#D90077]">{HERO_CONTENT.headingLine2}</span>
                </h1>

                <p className="max-w-xl text-lg text-slate-600 leading-relaxed font-normal">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs font-bold">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="rounded-full bg-[#D90077] px-8 py-3.5 text-white shadow-lg shadow-pink-500/20 hover:bg-[#B80065]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="rounded-full border border-slate-300 bg-white px-8 py-3.5 text-slate-800 shadow-sm hover:bg-slate-50"
                  >
                    {HERO_CONTENT.ctas[1].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[2].href}
                    className="text-[#D90077] hover:underline"
                  >
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200 pt-6 font-mono text-xs">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase text-slate-400 block">{m.label}</span>
                      <span className="font-bold uppercase text-slate-900 mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 4-Photo Slider with Metric Overlay */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
                  <HeroSlider />
                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center font-mono">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <span className="text-base font-black text-[#D90077] block">800+</span>
                      <span className="text-[9px] uppercase text-slate-500 block">CHILDREN</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <span className="text-base font-black text-[#D90077] block">1995</span>
                      <span className="text-[9px] uppercase text-slate-500 block">FOUNDED</span>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <span className="text-base font-black text-[#D90077] block">247247</span>
                      <span className="text-[9px] uppercase text-slate-500 block">PAYBILL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / IMPACT PROCLAMATION ─────────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-slate-200 bg-[#F8FAFC] text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D90077]">
              {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="text-3xl sm:text-5xl font-extrabold uppercase leading-snug tracking-tight text-slate-900">
              <span className="text-[#D90077]">Worshipping</span> Jesus, teaching the Word,{' '}
              <span className="text-[#D90077]">raising</span> leaders and{' '}
              <span className="text-[#D90077]">giving life</span> to Kibera, Nairobi and the nations — on Sunday and every day.
            </p>
            <p className="text-base text-slate-500 max-w-xl mx-auto font-normal">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="py-16 px-6 text-center border-b border-slate-200 bg-white" aria-label="Karibu — welcome">
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

        {/* ── 04 SUNDAY / EVERY DAY SPLIT DECK ───────────────────── */}
        <section className="relative grid md:grid-cols-2 border-b border-slate-200">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[48vh] items-end overflow-hidden p-8 sm:p-12 border-slate-200 md:border-l md:first:border-l-0"
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

        {/* ── 05 LIFE AT ICA — PHOTO GALLERY ─────────────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-slate-100 pb-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">[ 05 ]</span>
                <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                  Life at <span className="text-[#D90077]">ICA</span>
                </h2>
              </div>
              <p className="text-xs font-mono uppercase text-slate-400">10 Verified Outreach Photos</p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
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

        {/* ── 06 MINISTRIES + PHILANTHROPIC STEWARDSHIP CARD ───────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-slate-200 bg-[#F8FAFC]">
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
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-[#D90077] hover:shadow-md"
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

              {/* Stewardship Impact Card */}
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
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
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

        {/* ── 07 SERMONS IN VIDEO TILES ──────────────────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-slate-200 bg-white text-center">
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

        {/* ── 08 GATHER / IMPACT TIMETABLE ───────────────────────── */}
        <section className="py-20 px-6 lg:px-16 border-b border-slate-200 bg-[#F8FAFC]">
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
        <div className="overflow-hidden border-b border-slate-200 bg-white py-4">
          <div className="flex gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-600">
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
};

export default KingdomPartnerTemplate;
