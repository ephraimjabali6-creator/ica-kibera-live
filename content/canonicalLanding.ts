// Canonical Landing Page Data Contract — Identical writeups, images, and sequence from pages/index.tsx
import { CHURCH, GATHERINGS, MINISTRIES, SERMONS, Sermon, sermonThumb, LOCAL_THUMBS } from './church';

export const HERO_CONTENT = {
  watermark: 'ICA',
  locationPill: 'Kibera, Nairobi',
  schedulePill: 'Sundays 08:30 & 11:00 EAT',
  headingLine1: 'Come as you are.',
  headingLine2: 'Leave transformed.',
  leadParagraph: `A Spirit-filled family in the heart of Kibera, led by ${CHURCH.seniorLeaders}. Dedicated to honouring God, impacting lives with His love, and equipping people to be active channels of transformation.`,
  ctas: [
    { label: 'Plan a visit', href: '/visit', primary: true },
    { label: 'Watch messages', href: '/messages', outline: true },
    { label: 'Our Vision & Story →', href: '/about', light: true },
  ],
  metadata: [
    { label: 'Senior Overseers', value: CHURCH.seniorLeaders },
    { label: 'Next Gathering', value: 'Sunday 8:30 AM & 11:00 AM' },
    { label: 'Scripture Anchor', value: CHURCH.scriptureFoundation },
  ],
  sliderImages: [
    { src: '/images/worship-sanctuary.jpg', caption: 'Sunday worship — the sanctuary, Kibera' },
    { src: '/images/outreach-crowd.jpg', caption: 'Community outreach — gifts for every family' },
    { src: '/images/preaching-pulpit.jpg', caption: 'The Word, preached without apology' },
    { src: '/images/kajiado-worship.jpg', caption: 'Mission service — Ngatataek, Kajiado' },
  ],
};

export const MANIFESTO_CONTENT = {
  eyebrow: '[ 01 — Who we are ]',
  subtitle: 'International Christian Assemblies — one of a family of assemblies across Kenya and the nations.',
  statementPrefix: 'Worshipping Jesus, teaching the Word, raising leaders and giving life to Kibera, Nairobi and the nations — on Sunday and every day.',
  highlights: ['Worshipping', 'raising', 'giving life'],
};

export const KARIBU_CONTENT = {
  eyebrow: '[ 02 ]',
  subtitle: 'Karibu — Kiswahili for “welcome”',
  word: 'Karibu',
  bgImage: '/images/worship-sanctuary.jpg',
};

export const SPLIT_CONTENT = [
  {
    idx: '03',
    label: 'Sunday',
    sub: 'Worship · Word · Prayer',
    img: '/images/worship-sanctuary.jpg',
    href: '/visit',
    cta: 'Plan your Sunday',
  },
  {
    idx: '04',
    label: 'Every day',
    sub: 'Outreach · Missions · Care',
    img: '/images/city-outreach.jpg',
    href: '/about#outreach',
    cta: 'See our missions',
  },
];

export const LIFE_CONTENT = [
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

export const MINISTRIES_CONTENT = {
  eyebrow: '[ 06 — Ministries ]',
  title: 'Find your place.',
  allLink: '/ministries',
  allLabel: 'All ministries',
  list: MINISTRIES,
  stewardship: {
    tag: '[ Stewardship & Care ]',
    title: 'Partnering in Grace & Giving',
    description: 'Supporting monthly children’s feeding, Jesus Film outreach, and church planting across Kenya.',
    cta: 'Learn how to give →',
    href: '/give',
  },
};

export const MESSAGES_CONTENT = {
  eyebrow: '[ 07 — On the record ]',
  title: 'Faith comes by hearing.',
  allLink: '/messages',
  allLabel: 'All messages',
  stack: SERMONS.filter((s) => LOCAL_THUMBS.has(s.id)).slice(0, 5),
  latest: SERMONS.slice(0, 4),
};

export const GATHER_CONTENT = {
  eyebrow: '[ 08 — Gather ]',
  title: 'A seat is saved for you.',
  countdownLabel: 'Next Sunday service in',
  ctas: [
    { label: 'Plan a visit', href: '/visit', primary: true },
    { label: 'Give online', href: '/give', outline: true },
  ],
  gatherings: GATHERINGS,
  locationNote: `${CHURCH.location.area} · Children’s church during Sunday services`,
};

export const MARQUEE_CONTENT = [
  'Giving Life to the City',
  'Ngatataek Mission · Kajiado',
  'Believers Conference',
  'Feast of the Word',
  'Uzima Choir',
  'Alabaster Ladies',
  'Friday Kesha',
  'Lifesource Mission · Lodwar',
];
