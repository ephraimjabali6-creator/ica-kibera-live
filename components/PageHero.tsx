import { ReactNode } from 'react';

/** Brutalist page header: extended display title over a graded image, with mono coordinates. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  position = 'center',
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  image: string;
  position?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[78svh] items-end overflow-hidden pb-14 pt-36 sm:min-h-[82vh] sm:pb-20">
      <div className="absolute inset-y-0 right-0 -z-20 w-full overflow-hidden lg:w-[58%]">
        <img src={image} alt="" className="h-full w-full object-cover opacity-70 grayscale-[35%]" style={{ objectPosition: position }} />
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/60 to-paper/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-paper/60" />
        <span className="absolute right-4 top-28 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint sm:right-12">FIG. 01 — ICA / KIBERA</span>
      </div>
      <div className="site-wrap">
        <p className="eyebrow hero-in">[ {eyebrow} ]</p>
        <h1 className="h-display hero-in-2 mt-6 max-w-5xl">{title}</h1>
        <div className="mt-10 grid gap-8 border-t border-line pt-6 lg:grid-cols-12">
          {intro && <p className="hero-in-3 max-w-xl text-[17px] leading-8 text-ink-muted lg:col-span-6">{intro}</p>}
          <div className="hero-in-3 flex flex-wrap items-start gap-3 lg:col-span-6 lg:justify-end">{children}</div>
        </div>
      </div>
    </section>
  );
}
