import Link from 'next/link';
import Icon from './Icon';

export default function CtaBand() {
  return (
    <section className="site-wrap pb-20 sm:pb-28">
      <div className="reveal relative isolate overflow-hidden rounded-2xl bg-plum-700 px-6 py-16 text-center text-white sm:px-12 sm:py-24 shadow-xl">
        <img src="/images/elders.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-plum-700/95 via-plum-800/90 to-plum-900/95" />
        <p className="eyebrow-light !text-plum-200">Karibu nyumbani</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl">
          There’s a seat <span className="accent !text-plum-200">saved</span> for you.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90">
          Tell us you’re coming and someone from our welcome team will meet you at the door.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/visit" className="btn bg-white text-plum-900 font-bold hover:bg-plum-50 shadow">
            Plan Your Visit <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link href="/give" className="btn border border-white/50 text-white hover:bg-white/15">Give Online</Link>
        </div>
      </div>
    </section>
  );
}
