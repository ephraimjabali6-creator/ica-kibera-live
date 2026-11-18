import Link from 'next/link';
import { CHURCH, GATHERINGS } from '../content/church';
import { NAV } from '../content/nav';
import { Wordmark } from './Logo';

export default function Footer() {
  return (
    <footer data-inspect="footer" className="relative overflow-hidden border-t border-line bg-paper">
      <div className="site-wrap pb-10 pt-24 sm:pt-32">
        <div className="flex flex-col items-center text-center">
          <img src="/images/ica-logo.png" alt="ICA — International Christian Assemblies" width={1119} height={342} className="h-16 w-auto object-contain sm:h-20" />
          <p className="eyebrow mt-8">[ Matthew 16 : 18 ]</p>
          <h2 data-reveal-words className="mt-6 max-w-6xl font-display text-[13vw] font-[900] uppercase leading-[0.85] tracking-[-0.03em] [font-stretch:125%] sm:text-[9vw] xl:text-[132px]">
            Always building <em className="accent">His church.</em>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/visit" className="btn-primary">Plan a visit</Link>
            <Link href="/give" className="btn-outline">Give online</Link>
          </div>
        </div>

        <div className="mt-24 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark size="md" tone="dark" />
            <p className="mt-6 max-w-sm font-antiqua text-[18px] leading-relaxed text-ink-muted">
              A Spirit-filled family in the heart of Kibera, led by {CHURCH.seniorLeaders}.
            </p>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow-light">[ Gather ]</p>
            <ul className="mt-4 space-y-2 font-mono text-[12px] uppercase tracking-[0.08em]">
              {GATHERINGS.map((g) => (
                <li key={g.name} className="flex justify-between gap-4 border-b border-line pb-2">
                  <span className="text-ink-muted">{g.day.slice(0, 3)} · {g.name}</span>
                  <span className="text-ink tabular-nums">{g.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="eyebrow-light">[ Index ]</p>
            <ul className="mt-4 space-y-1.5 font-mono text-[12px] uppercase tracking-[0.12em]">
              {NAV.map((n, i) => (
                <li key={n.label}>
                  <Link href={n.href} className="text-ink-muted transition hover:text-plum-600">
                    <span className="text-ink-faint">{String(i + 1).padStart(2, '0')}</span> {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/give" className="text-ink-muted transition hover:text-plum-600">
                  <span className="text-ink-faint">06</span> Give & Partner
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="eyebrow-light">[ Contact ]</p>
            <ul className="mt-4 space-y-2 font-mono text-[12px] uppercase tracking-[0.1em] text-ink-muted">
              <li>{CHURCH.location.area}</li>
              <li><a href={CHURCH.phoneHref} className="hover:text-plum-500">{CHURCH.phone}</a></li>
              <li className="normal-case"><a href={`mailto:${CHURCH.email}`} className="hover:text-plum-500">{CHURCH.email}</a></li>
              <li className="flex gap-4 pt-2">
                <a href={CHURCH.social.facebook} target="_blank" rel="noreferrer" className="hover:text-plum-500">Facebook ↗</a>
                <a href={CHURCH.social.youtube} target="_blank" rel="noreferrer" className="hover:text-plum-500">YouTube ↗</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} {CHURCH.fullName}</span>
          <span>01°18′47″S · 36°47′13″E · Kibera, Nairobi</span>
          <span>Scroll <span data-scroll-progress className="text-plum-500 tabular-nums">000%</span></span>
        </div>
      </div>
    </footer>
  );
}
