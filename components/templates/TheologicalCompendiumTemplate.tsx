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

export const TheologicalCompendiumTemplate: React.FC = () => {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F1D1A] selection:bg-[#D90077] selection:text-white font-serif antialiased">
      {/* Codex Header Bar */}
      <div className="sticky top-0 z-50 border-b border-[#E8E2D5] bg-[#FDFBF7]/95 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C8270]">
          <div className="flex items-center gap-3">
            <span className="text-[#D90077] font-bold">§</span>
            <span className="font-bold text-[#1F1D1A]">TEMPLATE #19 · THEOLOGICAL CODEX &amp; COMPENDIUM</span>
            <span className="text-[#E8E2D5]">|</span>
            <span>SCHOLASTIC MARGINALIA &amp; CATECHETICAL AXIS</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs font-mono">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: SCHOLASTIC THESIS & MARGINALIA ────── */}
        <section className="relative overflow-hidden border-b border-[#E8E2D5] px-6 py-24 lg:px-16 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-12 items-start">
              {/* Left Margin Notes (3 Cols) */}
              <div className="hidden lg:block lg:col-span-3 space-y-8 font-mono text-[11px] text-[#8C8270] border-r border-[#E8E2D5] pr-8">
                <div>
                  <span className="text-[#D90077] font-bold block">§ 1.0 FOUNDATION</span>
                  <p className="mt-1 leading-relaxed">
                    Codified under the apostolic governance of ICA Kenya.
                  </p>
                </div>
                <div>
                  <span className="text-[#1F1D1A] font-bold block">CANONICAL LOCUS:</span>
                  <p className="mt-1 leading-relaxed">{HERO_CONTENT.locationPill}</p>
                </div>
                <div>
                  <span className="text-[#1F1D1A] font-bold block">LITURGICAL SYNOD:</span>
                  <p className="mt-1 leading-relaxed">{HERO_CONTENT.schedulePill}</p>
                </div>
              </div>

              {/* Central Text Axis (6 Cols) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-block border-b border-[#D90077] pb-1 font-mono text-xs uppercase tracking-widest text-[#D90077]">
                  DISPUTATIO // {HERO_CONTENT.locationPill} · {HERO_CONTENT.schedulePill}
                </div>

                <h1 className="text-4xl sm:text-6xl font-normal uppercase tracking-tight text-[#1F1D1A] leading-[1.05]">
                  {HERO_CONTENT.headingLine1} <br />
                  <span className="italic text-[#D90077] lowercase font-normal [font-size:1.1em]">
                    {HERO_CONTENT.headingLine2}
                  </span>
                </h1>

                <p className="text-lg leading-relaxed text-[#544D42]">
                  {HERO_CONTENT.leadParagraph}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                  <Link
                    href={HERO_CONTENT.ctas[0].href}
                    className="border border-[#1F1D1A] bg-[#1F1D1A] px-8 py-3.5 font-bold uppercase tracking-widest text-[#FDFBF7] hover:bg-[#D90077] hover:border-[#D90077]"
                  >
                    {HERO_CONTENT.ctas[0].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[1].href}
                    className="border border-[#E8E2D5] bg-white px-8 py-3.5 font-bold uppercase tracking-widest text-[#1F1D1A] hover:bg-[#FDFBF7]"
                  >
                    {HERO_CONTENT.ctas[1].label}
                  </Link>
                  <Link
                    href={HERO_CONTENT.ctas[2].href}
                    className="font-bold uppercase tracking-widest text-[#D90077] hover:underline"
                  >
                    {HERO_CONTENT.ctas[2].label}
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#E8E2D5] pt-6 font-mono">
                  {HERO_CONTENT.metadata.map((m) => (
                    <div key={m.label}>
                      <span className="text-[10px] uppercase text-[#8C8270] block">{m.label}</span>
                      <span className="text-xs font-bold uppercase text-[#1F1D1A] mt-1 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Margin Slider (3 Cols) */}
              <div className="lg:col-span-3 border-l border-[#E8E2D5] pl-0 lg:pl-8">
                <div className="border border-[#E8E2D5] bg-white p-2 shadow-sm">
                  <HeroSlider />
                  <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-wider text-[#8C8270]">
                    ILLUSTRATIO I // SANCTUARY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / DOCTRINAL CONFESSION ────────────────── */}
        <section className="border-b border-[#E8E2D5] px-6 py-20 bg-white text-center">
          <div className="mx-auto max-w-4xl border border-[#E8E2D5] p-10 sm:p-14 bg-[#FDFBF7]">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#D90077] block">
              § {MANIFESTO_CONTENT.eyebrow}
            </span>
            <p className="mt-6 text-2xl sm:text-4xl font-normal leading-relaxed text-[#1F1D1A]">
              “Worshipping Jesus, teaching the Word, raising leaders and giving life to Kibera, Nairobi and the nations — on Sunday and every day.”
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[#8C8270]">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU WORD SECTION ──────────────────────── */}
        <section className="border-b border-[#E8E2D5] py-16 px-6 text-center bg-[#FDFBF7]" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-xs uppercase text-[#8C8270]">
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

        {/* ── 04 SUNDAY / EVERY DAY DUAL CODEX LEAVES ────────────── */}
        <section className="relative grid md:grid-cols-2 border-b border-[#E8E2D5]">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[50vh] items-end overflow-hidden p-8 sm:p-12 border-[#E8E2D5] md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1F1D1A] via-[#1F1D1A]/50 to-transparent" />
              <div className="text-[#FDFBF7]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-pink-300">
                  FOLIO [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-2 text-4xl sm:text-5xl font-normal italic">{h.label}</p>
                <span className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-[#D90077] group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — CODEX ARCHIVE PLATES ───────────────── */}
        <section className="border-b border-[#E8E2D5] px-6 py-20 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-[#E8E2D5] pb-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">§ [ 05 ]</span>
                <h2 className="mt-2 font-serif text-3xl font-normal uppercase text-[#1F1D1A]">
                  Life at <span className="italic text-[#D90077] lowercase">ICA</span>
                </h2>
              </div>
              <p className="font-mono text-xs uppercase text-[#8C8270]">10 Codex Plates</p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="border border-[#E8E2D5] bg-[#FDFBF7] p-3 shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden border border-[#E8E2D5]">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale transition duration-500 hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-3 flex justify-between gap-1 font-mono text-[9px] uppercase tracking-widest text-[#8C8270]">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="text-[#D90077] font-bold">TABULA {String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES IN SCHOLASTIC INDEX + STEWARDSHIP ──────── */}
        <section className="border-b border-[#E8E2D5] px-6 py-20 bg-[#FDFBF7]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-[#E8E2D5] pb-6 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                  § {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 font-serif text-3xl font-normal uppercase text-[#1F1D1A]">
                  Find your <span className="italic text-[#D90077] lowercase">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="border border-[#E8E2D5] bg-white px-6 py-2 font-mono text-xs font-bold uppercase text-[#1F1D1A] hover:bg-[#FDFBF7]">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group border border-[#E8E2D5] bg-white p-5 shadow-sm transition hover:border-[#D90077]"
                >
                  <div className="aspect-[4/3] overflow-hidden border border-[#E8E2D5]">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[10px] text-[#8C8270]">CAPUT {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-lg font-normal uppercase text-[#1F1D1A] group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase text-[#8C8270]">{m.meets}</p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group border border-[#E8E2D5] bg-[#F5EFE4] p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                    § {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 text-2xl font-normal uppercase text-[#1F1D1A]">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 text-sm text-[#544D42] leading-relaxed">
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

        {/* ── 07 SERMONS IN HOMILY COMPILATION ────────────────────── */}
        <section className="border-b border-[#E8E2D5] px-6 py-20 text-center bg-white">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
              § {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 font-serif text-3xl font-normal uppercase text-[#1F1D1A] sm:text-4xl">
              Faith comes by <span className="italic text-[#D90077] lowercase">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left font-serif">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group border border-[#E8E2D5] bg-[#FDFBF7] p-4 text-left transition hover:border-[#D90077]"
                >
                  <div className="aspect-[16/9] overflow-hidden border border-[#E8E2D5]">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[10px] text-[#8C8270]">
                    HOMILIA {String(i + 1).padStart(2, '0')} · {s.duration}
                  </p>
                  <p className="mt-1 font-normal text-lg text-[#1F1D1A] group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase text-[#8C8270]">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="border border-[#E8E2D5] bg-white px-8 py-3 font-mono text-xs font-bold uppercase text-[#1F1D1A] hover:bg-[#FDFBF7]">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / SYNOD TIMETABLE ────────────────────────── */}
        <section className="border-b border-[#E8E2D5] px-6 py-20 bg-[#FDFBF7]">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                § {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="text-3xl font-normal uppercase text-[#1F1D1A] sm:text-4xl">
                A seat is <span className="italic text-[#D90077] lowercase">saved</span> for you.
              </h2>
              <div className="border border-[#E8E2D5] bg-white p-6 shadow-sm">
                <p className="font-mono text-xs uppercase text-[#8C8270]">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 font-mono">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="border border-[#1F1D1A] bg-[#1F1D1A] px-8 py-3.5 text-xs font-bold uppercase text-[#FDFBF7] hover:bg-[#D90077]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="border border-[#E8E2D5] bg-white px-8 py-3.5 text-xs font-bold uppercase text-[#1F1D1A] hover:bg-[#FDFBF7]"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border border-[#E8E2D5] bg-white p-8 divide-y divide-[#E8E2D5]">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#8C8270] block">
                      § {String(i + 1).padStart(2, '0')} · {g.day}
                    </span>
                    <h4 className="text-lg font-normal uppercase text-[#1F1D1A] mt-1">{g.name}</h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 font-mono text-xs uppercase text-[#8C8270]">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b border-[#E8E2D5] bg-[#F5EFE4] py-4">
          <div className="flex gap-8 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#544D42]">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">§</span>
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

export default TheologicalCompendiumTemplate;
