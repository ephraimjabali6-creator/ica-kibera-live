import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';
import { Wordmark } from '../components/Logo';
import VideoModal from '../components/VideoModal';
import HeroSlider from '../components/HeroSlider';
import { CHURCH, GATHERINGS, LOCAL_THUMBS, MINISTRIES, SERMONS, Sermon, sermonThumb } from '../content/church';

const LIFE = [
  { src: '/images/worship-sanctuary.jpg', caption: 'Sunday worship — the sanctuary, Kibera' },
  { src: '/images/outreach-crowd.jpg', caption: 'Community outreach — gifts for every family' },
  { src: '/images/preaching-pulpit.jpg', caption: 'The Word, preached without apology' },
  { src: '/images/kajiado-worship.jpg', caption: 'Mission service — Ngatataek, Kajiado' },
  { src: '/images/city-outreach-2.jpg', caption: 'Giving Life to the City — Nairobi' },
  { src: '/images/elders.jpg', caption: 'Bishops and elders — special service' },
  { src: '/images/sanctuary-keyboard.jpg', caption: 'Praise and worship' },
  { src: '/images/outreach-women.jpg', caption: 'Mothers of the community' },
  { src: '/images/kajiado-prayer.jpg', caption: 'Hands raised — Kajiado' },
  { src: '/images/laying-on-of-hands.jpg', caption: 'Laying on of hands — commissioning' },
];

const MARQUEE = ['Giving Life to the City', 'Ngatataek Mission · Kajiado', 'Believers Conference', 'Feast of the Word', 'Uzima Choir', 'Alabaster Ladies', 'Friday Kesha', 'Lifesource Mission · Lodwar'];

export default function Home() {
  const [playing, setPlaying] = useState<Sermon | null>(null);
  const stack = SERMONS.filter((s) => LOCAL_THUMBS.has(s.id)).slice(0, 5);
  const latest = SERMONS.filter((s) => true).slice(0, 4);

  return (
    <Layout>
      {/* ── 01 HERO ────────────────────────────────────────────── */}
      <section data-inspect="hero" className="relative min-h-[85svh] overflow-hidden pb-16 pt-24 sm:pt-28 lg:pt-32" aria-label="Welcome to ICA">
        <div aria-hidden="true" className="outline-text pointer-events-none absolute inset-x-0 top-[10%] select-none text-center font-display text-[20vw] font-[900] uppercase leading-none tracking-[-0.05em] opacity-30 [font-stretch:125%]">
          ICA
        </div>

        <div className="site-wrap relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Column: Heading, Context & Action */}
            <div className="space-y-6 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em]">
                <span className="rounded-full bg-plum-50 px-3 py-1 font-bold text-plum-600 border border-plum-200">
                  Kibera, Nairobi
                </span>
                <span className="text-ink font-semibold">Sundays 08:30 & 11:00 EAT</span>
              </div>

              <h1 className="hero-in font-display text-4xl font-[900] uppercase leading-[0.92] tracking-[-0.025em] text-ink sm:text-6xl lg:text-[68px] xl:text-[78px] [font-stretch:125%]">
                Come as <br />
                you are. <br />
                <em className="accent text-[1.02em] leading-[0.85] text-plum-600">Leave transformed.</em>
              </h1>

              <p className="hero-in-2 max-w-xl font-antiqua text-[18px] leading-relaxed text-ink">
                A Spirit-filled family in the heart of Kibera, led by {CHURCH.seniorLeaders}. Dedicated to honouring God, impacting lives with His love, and equipping people to be active channels of transformation.
              </p>

              <div className="hero-in-3 flex flex-wrap items-center gap-3.5 pt-2">
                <Link href="/visit" className="btn-primary">
                  Plan a visit
                </Link>
                <Link href="/messages" className="btn-outline">
                  Watch messages
                </Link>
                <Link href="/about" className="btn-outline-light">
                  Our Vision & Story →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-line pt-6 sm:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Senior Overseers</p>
                  <p className="mt-1 font-display text-xs font-bold uppercase text-ink">{CHURCH.seniorLeaders}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Next Gathering</p>
                  <p className="mt-1 font-display text-xs font-bold uppercase text-ink">Sunday 8:30 AM & 11:00 AM</p>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Scripture Anchor</p>
                  <p className="mt-1 font-display text-xs font-bold uppercase text-plum-600">{CHURCH.scriptureFoundation}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Autonomous Horizontal Slider of the 4 photos */}
            <div className="hero-in-2 lg:col-span-5">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 MANIFESTO — kinetic outline → solid ───────────── */}
      <section className="relative py-24 sm:py-36">
        <div className="site-wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow">[ 01 — Who we are ]</p>
            <p className="mt-6 max-w-[15rem] font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-ink-faint">
              International Christian Assemblies — one of a family of assemblies across Kenya and the nations.
            </p>
          </div>
          <p data-kinetic className="font-display text-[7vw] font-[900] uppercase leading-[0.95] tracking-[-0.02em] [font-stretch:125%] sm:text-[5vw] lg:col-span-9 lg:text-[4vw] 2xl:text-[68px]">
            <em className="accent">Worshipping</em> Jesus, teaching the Word, <em className="accent">raising</em> leaders and <em className="accent">giving life</em> to Kibera, Nairobi and the nations — on Sunday and every day.
          </p>
        </div>
      </section>

      {/* ── 03 MASKED WORD — imagery inside type ─────────────── */}
      <section className="relative border-y border-line py-10" aria-label="Karibu — welcome">
        <div className="site-wrap flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          <span>[ 02 ]</span>
          <span>Karibu — Kiswahili for “welcome”</span>
        </div>
        <p
          data-mask-text
          className="select-none text-center font-display text-[18vw] font-[900] uppercase leading-[0.8] tracking-[-0.05em] [font-stretch:125%]"
          style={{
            backgroundImage: 'url(/images/worship-sanctuary.jpg)',
            backgroundSize: '130%',
            backgroundPosition: '50% 50%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Karibu
        </p>
      </section>

      {/* ── 04 SUNDAY / EVERY DAY split ──────────────────────── */}
      <section className="relative grid md:grid-cols-2" aria-label="Sunday and every day">
        {[
          { label: 'Sunday', sub: 'Worship · Word · Prayer', img: '/images/worship-sanctuary.jpg', href: '/visit', cta: 'Plan your Sunday', idx: '03' },
          { label: 'Every day', sub: 'Outreach · Missions · Care', img: '/images/city-outreach.jpg', href: '/about#outreach', cta: 'See our missions', idx: '04' },
        ].map((h) => (
          <Link key={h.label} href={h.href} className="group relative flex min-h-[65vh] items-end overflow-hidden border-line p-6 sm:p-10 md:border-l md:first:border-l-0">
            <img src={h.img} alt="" className="absolute inset-0 -z-10 h-full w-full scale-105 object-cover opacity-40 grayscale transition duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-100 group-hover:opacity-80 group-hover:grayscale-0" />
            <span className="absolute inset-0 -z-10 bg-gradient-to-t from-paper via-paper/40 to-transparent" />
            <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint sm:left-10 sm:top-10">[ {h.idx} ]</span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-plum-600 font-bold">{h.sub}</p>
              <p className="mt-3 font-serif text-[14vw] italic leading-[0.8] text-ink transition duration-700 group-hover:text-plum-600 md:text-[5.5vw]">{h.label}</p>
              <span className="link-arrow mt-6">{h.cta} →</span>
            </div>
          </Link>
        ))}
      </section>

      {/* ── 05 LIFE AT ICA — horizontal scroll gallery ───────── */}
      <section data-gallery className="relative lg:h-[300vh]" aria-label="Life at ICA photo gallery">
        <div data-gallery-stage className="flex flex-col justify-center overflow-hidden py-24 lg:sticky lg:top-0 lg:h-[100svh] lg:py-0">
          <div className="site-wrap flex items-start justify-between gap-6">
            <h2 className="h-section">
              Life at <em className="accent">ICA</em>
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">[ 05 ]</p>
          </div>
          <div data-gallery-track className="snap-row mt-10 flex gap-5 overflow-x-auto px-4 sm:px-8 lg:mt-12 lg:overflow-visible lg:px-12">
            {LIFE.map((l, i) => (
              <figure key={l.src} data-gallery-item data-caption={l.caption} className="group w-[78vw] shrink-0 sm:w-[46vw] lg:w-[34vw]">
                <div className="overflow-hidden">
                  <img src={l.src} alt={l.caption} loading="lazy" className="aspect-[4/3] w-full object-cover grayscale-[30%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
                </div>
                <figcaption className="mt-3 flex justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                  <span>{l.caption}</span>
                  <span className="text-plum-500 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 MINISTRIES — catalog grid ─────────────────────── */}
      <section data-inspect="ministries" className="section">
        <div className="site-wrap">
          <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">[ 06 — Ministries ]</p>
              <h2 data-reveal-words className="h-section mt-5">
                Find your <em className="accent">place.</em>
              </h2>
            </div>
            <Link href="/ministries" className="btn-outline self-start md:self-auto">All ministries</Link>
          </div>
          <div className="grid border-l border-line sm:grid-cols-2 lg:grid-cols-4">
            {MINISTRIES.map((m, i) => (
              <Link key={m.slug} href={`/ministries#${m.slug}`} className="group/tile relative block border-b border-r border-line [--mx:50%] [--my:50%]">
                <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden p-6 lg:aspect-[4/5] transition-colors duration-500 group-hover/tile:bg-plum-50">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover/tile:opacity-100"
                    style={{ background: 'radial-gradient(420px circle at var(--mx) var(--my), rgba(230,0,126,0.15), transparent 45%)', boxShadow: 'inset 0 0 0 1px rgba(230,0,126,0.5), 0 0 40px -10px rgba(230,0,126,0.3)' }}
                  />
                  <img
                    src={m.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-x-6 top-16 h-[46%] w-[calc(100%-3rem)] object-cover opacity-0 grayscale transition duration-700 [clip-path:inset(100%_0_0_0)] max-lg:opacity-70 max-lg:[clip-path:inset(0_0_0_0)] group-hover/tile:opacity-100 group-hover/tile:grayscale-0 group-hover/tile:[clip-path:inset(0_0_0_0)]"
                  />
                  <div className="flex items-start justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span className="transition group-hover/tile:text-plum-600">↗</span>
                  </div>
                  <div className="relative">
                    <h3 className="font-display text-xl font-[850] uppercase leading-[1.02] tracking-[-0.01em] [font-stretch:120%]">{m.name}</h3>
                    <p className="mt-2 font-mono text-[10px] uppercase leading-4 tracking-[0.14em] text-ink-faint">{m.meets}</p>
                  </div>
                </div>
              </Link>
            ))}
            <Link href="/give" className="group/tile relative block border-b border-r border-line bg-mist p-6 transition duration-300 hover:bg-plum-50/70">
              <div className="flex aspect-[4/5] flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-plum-600">[ Stewardship & Care ]</span>
                  <p className="mt-4 font-display text-2xl font-[850] uppercase leading-[1.05] tracking-[-0.01em] text-ink group-hover/tile:text-plum-600">
                    Partnering in <br />Grace & Giving
                  </p>
                  <p className="mt-3 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                    Supporting monthly children’s feeding, Jesus Film outreach, and church planting across Kenya.
                  </p>
                </div>
                <span className="link-arrow text-xs font-semibold">Learn how to give →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 07 MESSAGES — fanned card stack ──────────────────── */}
      <section data-inspect="sermons" className="relative overflow-hidden border-t border-line py-28 sm:py-40">
        <div className="site-wrap text-center">
          <p className="eyebrow">[ 07 — On the record ]</p>
          <h2 data-reveal-words className="h-section mx-auto mt-5 max-w-4xl">
            Faith comes by <em className="accent">hearing.</em>
          </h2>
        </div>
        <div data-stack className="relative mx-auto mt-20 flex h-[340px] max-w-site items-center justify-center sm:h-[440px]">
          {stack.map((s, i) => (
            <a
              key={s.id}
              href={`https://www.youtube.com/watch?v=${s.id}`}
              target="_blank"
              rel="noreferrer"
              data-stack-card
             
              onClick={(e) => {
                e.preventDefault();
                setPlaying(s);
              }}
              className="group absolute w-[190px] border border-line bg-white p-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] transition-[border-color] duration-300 hover:!z-20 hover:border-plum-500 sm:w-[270px]"
              style={{ zIndex: 10 - Math.abs(i - Math.floor(stack.length / 2)) }}
            >
              <img src={sermonThumb(s.id)} alt="" className="aspect-[3/4] w-full object-cover grayscale-[20%] transition duration-500 group-hover:grayscale-0" />
              <div className="flex items-center justify-between gap-2 px-1 pb-1 pt-3 text-left font-mono text-[9px] uppercase tracking-[0.14em]">
                <span className="line-clamp-1 text-ink">{s.title}</span>
                <span className="shrink-0 text-plum-600">{s.duration}</span>
              </div>
            </a>
          ))}
        </div>
        <div className="site-wrap mt-20">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {latest.map((s, i) => (
              <button key={s.id} data-yt={s.id} onClick={() => setPlaying(s)} className="group bg-paper p-6 text-left transition hover:bg-plum-50">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  {String(i + 1).padStart(2, '0')} · {s.duration}
                </p>
                <p className="mt-4 font-display text-[15px] font-extrabold uppercase leading-snug [font-stretch:112%] group-hover:text-plum-600">{s.title}</p>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">{s.speaker}</p>
              </button>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/messages" className="btn-outline">All messages</Link>
          </div>
        </div>
      </section>

      {/* ── 08 GATHER — timetable ────────────────────────────── */}
      <section data-inspect="servicetimes" className="section border-t border-line">
        <div className="site-wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">[ 08 — Gather ]</p>
            <h2 data-reveal-words className="h-section mt-5">
              A seat is <em className="accent">saved</em> for you.
            </h2>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">Next Sunday service in</p>
            <p data-countdown className="mt-2 whitespace-nowrap font-display text-[7.4vw] font-[900] tracking-[-0.02em] text-plum-500 tabular-nums [font-stretch:110%] sm:text-4xl lg:text-[2.6vw]">
              --D --H --M --S
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/visit" className="btn-primary">Plan a visit</Link>
              <Link href="/give" className="btn-outline">Give online</Link>
            </div>
          </div>
          <div className="lg:col-span-7">
            {GATHERINGS.map((g, i) => (
              <div key={g.name} className="group grid grid-cols-12 items-baseline gap-3 border-b border-line py-6 transition hover:bg-mist">
                <span className="col-span-1 font-mono text-[10px] text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                <span className="col-span-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">{g.day}</span>
                <span className="col-span-5 font-display text-lg font-extrabold uppercase leading-tight [font-stretch:115%] group-hover:text-plum-600 sm:text-xl">{g.name}</span>
                <span className="col-span-3 text-right font-display text-xl font-[900] tabular-nums text-plum-500 [font-stretch:125%] sm:text-2xl">{g.time}</span>
              </div>
            ))}
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">{CHURCH.location.area} · Children’s church during Sunday services</p>
          </div>
        </div>
      </section>

      {/* ── 09 MARQUEE ───────────────────────────────────────── */}
      <section className="overflow-hidden border-t border-line py-6" aria-label="Moments and ministries">
        <div className="marquee">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap px-8 font-display text-3xl font-[900] uppercase tracking-[-0.01em] [font-stretch:125%] sm:text-5xl">
              <span className={i % 2 ? 'outline-text' : ''}>{m}</span>
              <span className="text-plum-500">✦</span>
            </span>
          ))}
        </div>
      </section>

      {playing && <VideoModal id={playing.id} title={playing.title} onClose={() => setPlaying(null)} />}
    </Layout>
  );
}
