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

export const TimelineOdysseyTemplate: React.FC = () => {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 selection:bg-[#D90077] selection:text-white font-sans antialiased">
      {/* Timeline Header Bar */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#D90077] animate-ping" />
            <span className="font-bold text-slate-900">TEMPLATE #15 · TIMELINE ODYSSEY MILESTONE SPINE</span>
            <span className="text-slate-300">|</span>
            <span>CENTRAL MAGENTA LASER SPINE ARCHITECTURE</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: ROOT NODE OF THE ODYSSEY SPINE ────── */}
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

                <p className="max-w-lg text-lg text-slate-600 leading-relaxed">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs font-bold">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="rounded-full bg-[#D90077] px-8 py-3.5 text-white shadow-md hover:bg-[#B80065]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="rounded-full border border-slate-300 bg-white px-8 py-3.5 text-slate-800 hover:bg-slate-50"
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

              {/* Right Column: 4-Photo Slider */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl">
                  <HeroSlider />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CENTRAL SPINE CONTAINER (Alternating Left/Right Sections) ── */}
        <div className="relative max-w-6xl mx-auto px-6 py-16">
          {/* Central Laser Spine Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D90077] via-pink-400 to-[#D90077] -translate-x-1/2 -z-10" />

          {/* ── 02 MANIFESTO / MILESTONE POD ───────────────────────── */}
          <div className="my-16 md:w-1/2 md:pr-12 md:text-right">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#D90077]">
                {MANIFESTO_CONTENT.eyebrow}
              </span>
              <p className="mt-4 text-2xl font-extrabold uppercase leading-snug text-slate-900">
                <span className="text-[#D90077]">Worshipping</span> Jesus, teaching the Word,{' '}
                <span className="text-[#D90077]">raising</span> leaders and{' '}
                <span className="text-[#D90077]">giving life</span> to Kibera, Nairobi and the nations — on Sunday and every day.
              </p>
              <p className="mt-4 text-sm text-slate-500">
                {MANIFESTO_CONTENT.subtitle}
              </p>
            </div>
          </div>

          {/* ── 03 MASKED KARIBU MILESTONE POD ─────────────────────── */}
          <div className="my-16 md:w-1/2 md:ml-auto md:pl-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
              <span className="font-mono text-xs font-bold uppercase text-slate-400 block">
                {KARIBU_CONTENT.eyebrow} // {KARIBU_CONTENT.subtitle}
              </span>
              <p
                className="mt-4 select-none text-[14vw] sm:text-[80px] font-black uppercase leading-none"
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
          </div>

          {/* ── 04 SUNDAY / EVERY DAY SPLIT POD ────────────────────── */}
          <div className="my-16 md:w-1/2 md:pr-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              {SPLIT_CONTENT.map((h) => (
                <Link
                  key={h.label}
                  href={h.href}
                  className="group relative flex min-h-[220px] items-end overflow-hidden rounded-2xl p-6"
                >
                  <img
                    src={h.img}
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent" />
                  <div className="text-white">
                    <span className="font-mono text-[10px] font-bold uppercase text-pink-300">
                      [ {h.idx} ] · {h.sub}
                    </span>
                    <p className="text-3xl font-extrabold">{h.label}</p>
                    <span className="text-xs uppercase font-bold text-pink-300 group-hover:underline">
                      {h.cta} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── 05 LIFE AT ICA GALLERY POD ─────────────────────────── */}
          <div className="my-16 md:w-1/2 md:ml-auto md:pl-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">[ 05 ]</span>
              <h2 className="mt-2 text-2xl font-extrabold uppercase text-slate-900">
                Life at <span className="text-[#D90077]">ICA</span>
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {LIFE_CONTENT.slice(0, 6).map((l, i) => (
                  <div key={l.src} className="rounded-xl overflow-hidden aspect-[4/3] border border-slate-200">
                    <img src={l.src} alt={l.caption} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-mono text-slate-500 text-center">
                +4 MORE ARCHIVAL MOMENTS
              </p>
            </div>
          </div>

          {/* ── 06 MINISTRIES POD + STEWARDSHIP ────────────────────── */}
          <div className="my-16 md:w-1/2 md:pr-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                {MINISTRIES_CONTENT.eyebrow}
              </span>
              <h2 className="text-2xl font-extrabold uppercase text-slate-900">
                Find your <span className="text-[#D90077]">place.</span>
              </h2>
              <div className="space-y-3">
                {MINISTRIES_CONTENT.list.slice(0, 4).map((m, i) => (
                  <Link
                    key={m.slug}
                    href={`/ministries#${m.slug}`}
                    className="block p-3 rounded-xl border border-slate-100 hover:border-[#D90077] transition"
                  >
                    <h4 className="text-sm font-bold uppercase text-slate-900">{m.name}</h4>
                    <p className="text-[10px] font-mono uppercase text-slate-400">{m.meets}</p>
                  </Link>
                ))}
              </div>

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="block rounded-2xl border border-pink-200 bg-pink-50 p-5 mt-4"
              >
                <span className="font-mono text-[10px] font-bold uppercase text-[#D90077]">
                  {MINISTRIES_CONTENT.stewardship.tag}
                </span>
                <p className="mt-2 text-lg font-bold text-slate-900">Partnering in Grace &amp; Giving</p>
                <p className="mt-1 text-xs text-slate-600">{MINISTRIES_CONTENT.stewardship.description}</p>
                <span className="text-xs font-bold text-[#D90077] mt-3 inline-block">
                  {MINISTRIES_CONTENT.stewardship.cta}
                </span>
              </Link>
            </div>
          </div>

          {/* ── 07 SERMONS POD ─────────────────────────────────────── */}
          <div className="my-16 md:w-1/2 md:ml-auto md:pl-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                {MESSAGES_CONTENT.eyebrow}
              </span>
              <h2 className="text-2xl font-extrabold uppercase text-slate-900">
                Faith comes by <span className="text-[#D90077]">hearing.</span>
              </h2>
              <div className="space-y-3">
                {MESSAGES_CONTENT.latest.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setPlaying(s)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl border border-slate-100 hover:border-[#D90077] text-left transition"
                  >
                    <img src={sermonThumb(s.id)} alt={s.title} className="w-20 aspect-[16/9] object-cover rounded-lg" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 line-clamp-1">{s.title}</p>
                      <span className="text-[10px] font-mono text-slate-400">{s.speaker} · {s.duration}</span>
                    </div>
                  </button>
                ))}
              </div>
              <Link href={MESSAGES_CONTENT.allLink} className="block text-center text-xs font-bold uppercase text-[#D90077] pt-2">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>

          {/* ── 08 GATHER TIMETABLE POD ────────────────────────────── */}
          <div className="my-16 md:w-1/2 md:pr-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="text-2xl font-extrabold uppercase text-slate-900">
                A seat is <span className="text-[#D90077]">saved</span> for you.
              </h2>
              <div className="divide-y divide-slate-100">
                {GATHER_CONTENT.gatherings.map((g) => (
                  <div key={g.name} className="py-2.5 flex justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{g.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 uppercase">{g.day}</span>
                    </div>
                    <span className="font-mono font-bold text-[#D90077]">{g.time}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-3">
                <Link href={GATHER_CONTENT.ctas[0].href} className="rounded-full bg-[#D90077] px-6 py-2.5 text-xs font-bold text-white">
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link href={GATHER_CONTENT.ctas[1].href} className="rounded-full border border-slate-300 bg-white px-6 py-2.5 text-xs font-bold text-slate-700">
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-y border-slate-200 bg-white py-4">
          <div className="flex gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-slate-600">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">⚡</span>
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

export default TimelineOdysseyTemplate;
