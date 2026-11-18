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

export default function HeritageClassicTemplate() {
  const [playing, setPlaying] = useState<Sermon | null>(null);

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A1614] selection:bg-[#D90077] selection:text-white font-serif antialiased">
      {/* Liturgical Top Header */}
      <div className="sticky top-0 z-50 border-b border-[#D9CDB8] bg-[#FAF6EE]/95 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-[#7A6F62]">
          <div className="flex items-center gap-3">
            <span className="text-[#D90077]">✠</span>
            <span className="font-bold text-[#1A1614]">TEMPLATE #06 · THE HERITAGE SACRED LITURGY</span>
            <span className="hidden sm:inline text-[#D9CDB8]">|</span>
            <span className="hidden sm:inline">CENTRAL SACRED LITURGICAL AXIS</span>
          </div>
          <Link href="/templates" className="text-[#D90077] hover:underline font-bold text-xs font-mono">
            ← 20 Archetypes Gallery
          </Link>
        </div>
      </div>

      <Header />

      <main id="main">
        {/* ── 01 HERO SECTION: CENTERED SACRED LITURGICAL AXIS ───── */}
        <section className="relative overflow-hidden border-b border-[#D9CDB8] px-6 py-24 text-center">
          <div className="mx-auto max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#D9CDB8] bg-white px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-[#7A6F62]">
              <span>✠</span>
              <span>{HERO_CONTENT.locationPill} · {HERO_CONTENT.schedulePill}</span>
              <span>✠</span>
            </div>

            <h1 className="text-4xl font-normal uppercase tracking-tight text-[#1A1614] sm:text-6xl lg:text-7xl leading-[1.05]">
              {HERO_CONTENT.headingLine1} <br />
              <span className="italic text-[#D90077] lowercase font-normal [font-size:1.1em]">
                {HERO_CONTENT.headingLine2}
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#5C5346]">
              {HERO_CONTENT.leadParagraph}
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-2 font-mono">
              <Link
                href={HERO_CONTENT.ctas[0].href}
                className="border border-[#1A1614] bg-[#1A1614] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#FAF6EE] shadow-sm hover:bg-[#D90077] hover:border-[#D90077]"
              >
                {HERO_CONTENT.ctas[0].label}
              </Link>
              <Link
                href={HERO_CONTENT.ctas[1].href}
                className="border border-[#D9CDB8] bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-[#1A1614] hover:bg-[#FAF6EE]"
              >
                {HERO_CONTENT.ctas[1].label}
              </Link>
              <Link
                href={HERO_CONTENT.ctas[2].href}
                className="text-xs font-bold uppercase tracking-widest text-[#D90077] hover:underline"
              >
                {HERO_CONTENT.ctas[2].label}
              </Link>
            </div>

            {/* Centered Slider Framing */}
            <div className="mt-12 mx-auto max-w-2xl overflow-hidden border-4 border-[#D9CDB8] bg-white p-3 shadow-lg">
              <HeroSlider />
            </div>

            {/* Metadata Axis */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#D9CDB8] pt-8 font-mono">
              {HERO_CONTENT.metadata.map((m) => (
                <div key={m.label}>
                  <span className="text-[10px] uppercase text-[#7A6F62] block">{m.label}</span>
                  <span className="text-xs font-bold uppercase text-[#1A1614] mt-1 block">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 02 MANIFESTO / WHO WE ARE IN SACRED CREST ──────────── */}
        <section className="border-b border-[#D9CDB8] px-6 py-24 bg-white text-center">
          <div className="mx-auto max-w-4xl border border-[#D9CDB8] p-10 sm:p-16 bg-[#FAF6EE] shadow-inner">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#D90077] block">
              ✠ {MANIFESTO_CONTENT.eyebrow} ✠
            </span>
            <p className="mt-6 text-2xl sm:text-4xl font-normal leading-relaxed text-[#1A1614]">
              “Worshipping Jesus, teaching the Word, raising leaders and giving life to Kibera, Nairobi and the nations — on Sunday and every day.”
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-[#7A6F62]">
              {MANIFESTO_CONTENT.subtitle}
            </p>
          </div>
        </section>

        {/* ── 03 MASKED KARIBU IN SACRED GOLD-LEAF FRAME ─────────── */}
        <section className="border-b border-[#D9CDB8] py-16 px-6 text-center" aria-label="Karibu — welcome">
          <div className="mx-auto max-w-7xl flex items-center justify-between font-mono text-xs uppercase text-[#7A6F62]">
            <span>{KARIBU_CONTENT.eyebrow}</span>
            <span>{KARIBU_CONTENT.subtitle}</span>
          </div>
          <p
            className="mt-6 select-none text-[18vw] font-bold uppercase leading-[0.8] tracking-tight"
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

        {/* ── 04 SUNDAY / EVERY DAY SPLIT TRIPTYCH PANELS ────────── */}
        <section className="relative grid md:grid-cols-2 border-b border-[#D9CDB8]">
          {SPLIT_CONTENT.map((h) => (
            <Link
              key={h.label}
              href={h.href}
              className="group relative flex min-h-[50vh] items-end overflow-hidden p-8 sm:p-12 border-[#D9CDB8] md:border-l md:first:border-l-0"
            >
              <img
                src={h.img}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#1A1614] via-[#1A1614]/50 to-transparent" />
              <div className="text-[#FAF6EE]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-pink-300">
                  ✠ [ {h.idx} ] · {h.sub}
                </span>
                <p className="mt-2 text-4xl sm:text-5xl font-normal italic">{h.label}</p>
                <span className="mt-4 inline-block font-mono text-xs uppercase tracking-wider text-[#D90077] group-hover:underline">
                  {h.cta} →
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── 05 LIFE AT ICA — SACRED PHOTO ARCHIVE ──────────────── */}
        <section className="border-b border-[#D9CDB8] px-6 py-24 bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-baseline justify-between border-b border-[#D9CDB8] pb-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">✠ [ 05 ]</span>
                <h2 className="mt-2 text-3xl font-normal uppercase text-[#1A1614]">
                  Life at <span className="italic text-[#D90077] lowercase font-normal">ICA</span>
                </h2>
              </div>
              <p className="font-mono text-xs uppercase text-[#7A6F62]">10 Archival Plates</p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {LIFE_CONTENT.map((l, i) => (
                <figure key={l.src} className="group border border-[#D9CDB8] bg-[#FAF6EE] p-3 shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden border border-[#D9CDB8]">
                    <img
                      src={l.src}
                      alt={l.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 flex justify-between gap-1 font-mono text-[9px] uppercase tracking-widest text-[#7A6F62]">
                    <span className="line-clamp-1">{l.caption}</span>
                    <span className="text-[#D90077] font-bold">PLATE {String(i + 1).padStart(2, '0')}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── 06 MINISTRIES DIRECTORY + STEWARDSHIP ──────────────── */}
        <section className="border-b border-[#D9CDB8] px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 border-b border-[#D9CDB8] pb-6 md:flex-row md:items-end">
              <div>
                <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                  ✠ {MINISTRIES_CONTENT.eyebrow}
                </span>
                <h2 className="mt-2 text-3xl font-normal uppercase text-[#1A1614]">
                  Find your <span className="italic text-[#D90077] lowercase">place.</span>
                </h2>
              </div>
              <Link href={MINISTRIES_CONTENT.allLink} className="border border-[#D9CDB8] bg-white px-6 py-2 font-mono text-xs font-bold uppercase text-[#1A1614] hover:bg-[#FAF6EE]">
                {MINISTRIES_CONTENT.allLabel} →
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {MINISTRIES_CONTENT.list.map((m, i) => (
                <Link
                  key={m.slug}
                  href={`/ministries#${m.slug}`}
                  className="group border border-[#D9CDB8] bg-white p-5 shadow-sm transition hover:border-[#D90077]"
                >
                  <div className="aspect-[4/3] overflow-hidden border border-[#D9CDB8]">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="font-mono text-[10px] text-[#7A6F62]">ORDER {String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-lg font-normal uppercase text-[#1A1614] group-hover:text-[#D90077] mt-1">
                      {m.name}
                    </h3>
                    <p className="mt-2 font-mono text-[10px] uppercase text-[#7A6F62]">{m.meets}</p>
                  </div>
                </Link>
              ))}

              {/* Stewardship Card */}
              <Link
                href={MINISTRIES_CONTENT.stewardship.href}
                className="group border border-[#D9CDB8] bg-[#F2ECE1] p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                    ✠ {MINISTRIES_CONTENT.stewardship.tag}
                  </span>
                  <p className="mt-4 text-2xl font-normal uppercase text-[#1A1614]">
                    Partnering in <br />Grace &amp; Giving
                  </p>
                  <p className="mt-3 text-sm text-[#5C5346] leading-relaxed">
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

        {/* ── 07 SERMONS HOMILIES ARCHIVE ────────────────────────── */}
        <section className="border-b border-[#D9CDB8] px-6 py-24 text-center bg-white">
          <div className="mx-auto max-w-7xl">
            <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
              ✠ {MESSAGES_CONTENT.eyebrow}
            </span>
            <h2 className="mt-2 text-3xl font-normal uppercase text-[#1A1614] sm:text-4xl">
              Faith comes by <span className="italic text-[#D90077] lowercase">hearing.</span>
            </h2>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left font-serif">
              {MESSAGES_CONTENT.latest.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setPlaying(s)}
                  className="group border border-[#D9CDB8] bg-[#FAF6EE] p-4 text-left transition hover:border-[#D90077]"
                >
                  <div className="aspect-[16/9] overflow-hidden border border-[#D9CDB8]">
                    <img
                      src={sermonThumb(s.id)}
                      alt={s.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-mono text-[10px] text-[#7A6F62]">
                    HOMILY {String(i + 1).padStart(2, '0')} · {s.duration}
                  </p>
                  <p className="mt-1 font-normal text-lg text-[#1A1614] group-hover:text-[#D90077] line-clamp-2">
                    {s.title}
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase text-[#7A6F62]">{s.speaker}</p>
                </button>
              ))}
            </div>

            <div className="mt-10">
              <Link href={MESSAGES_CONTENT.allLink} className="border border-[#D9CDB8] bg-white px-8 py-3 font-mono text-xs font-bold uppercase text-[#1A1614] hover:bg-[#FAF6EE]">
                {MESSAGES_CONTENT.allLabel} →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 08 GATHER / ORDER OF SERVICES ──────────────────────── */}
        <section className="border-b border-[#D9CDB8] px-6 py-20">
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs font-bold uppercase text-[#D90077]">
                ✠ {GATHER_CONTENT.eyebrow}
              </span>
              <h2 className="text-3xl font-normal uppercase text-[#1A1614] sm:text-4xl">
                A seat is <span className="italic text-[#D90077] lowercase">saved</span> for you.
              </h2>
              <div className="border border-[#D9CDB8] bg-white p-6 shadow-sm">
                <p className="font-mono text-xs uppercase text-[#7A6F62]">
                  {GATHER_CONTENT.countdownLabel}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold text-[#D90077]">SUNDAY 8:30 AM</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-2 font-mono">
                <Link
                  href={GATHER_CONTENT.ctas[0].href}
                  className="border border-[#1A1614] bg-[#1A1614] px-8 py-3.5 text-xs font-bold uppercase text-[#FAF6EE] hover:bg-[#D90077]"
                >
                  {GATHER_CONTENT.ctas[0].label}
                </Link>
                <Link
                  href={GATHER_CONTENT.ctas[1].href}
                  className="border border-[#D9CDB8] bg-white px-8 py-3.5 text-xs font-bold uppercase text-[#1A1614] hover:bg-[#FAF6EE]"
                >
                  {GATHER_CONTENT.ctas[1].label}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 border border-[#D9CDB8] bg-white p-8 divide-y divide-[#D9CDB8]">
              {GATHER_CONTENT.gatherings.map((g, i) => (
                <div key={g.name} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-[#7A6F62] block">
                      ✠ {String(i + 1).padStart(2, '0')} · {g.day}
                    </span>
                    <h4 className="text-lg font-normal uppercase text-[#1A1614] mt-1">{g.name}</h4>
                  </div>
                  <span className="font-mono text-sm font-bold text-[#D90077]">{g.time}</span>
                </div>
              ))}
              <p className="pt-4 font-mono text-xs uppercase text-[#7A6F62]">
                {GATHER_CONTENT.locationNote}
              </p>
            </div>
          </div>
        </section>

        {/* ── 09 MARQUEE TICKER ──────────────────────────────────── */}
        <div className="overflow-hidden border-b border-[#D9CDB8] bg-[#F2ECE1] py-4">
          <div className="flex gap-8 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#5C5346]">
            {[...MARQUEE_CONTENT, ...MARQUEE_CONTENT].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                <span>{m}</span>
                <span className="text-[#D90077]">✠</span>
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
