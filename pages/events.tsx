import Link from 'next/link';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Icon from '../components/Icon';
import { EVENTS } from '../content/church';

export default function Events() {
  const weekly = EVENTS.filter((e) => e.recurring);
  const special = EVENTS.filter((e) => !e.recurring);
  return (
    <Layout title="Events" description="Weekly gatherings and special services at ICA.">
      <PageHero
        eyebrow="Events"
        title={<>Gather. Worship. <span className="accent">Celebrate.</span></>}
        intro="Our weekly rhythm and the special services that bring the ICA family together."
        image="/images/ministers-seated.jpg"
      />

      <section id="weekly" className="section scroll-mt-20">
        <div className="site-wrap">
          <SectionHeading eyebrow="Every week" title="Our weekly rhythm." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {weekly.map((e) => (
              <div key={e.title} className="reveal card flex flex-col p-7">
                <p className="eyebrow">{e.date}</p>
                <h3 className="h-card mt-3">{e.title}</h3>
                <p className="mt-1 font-display text-2xl font-extrabold text-plum-600">{e.time}</p>
                <p className="body-copy mt-3">{e.summary}</p>
                <p className="mt-auto flex items-center gap-2 pt-6 text-sm text-ink-faint"><Icon name="pin" className="h-4 w-4" />{e.place}</p>
                {e.title === 'Sunday Services' && <Link href="/visit" className="btn-primary mt-5 w-full">Plan your visit</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="conferences" className="bg-mist scroll-mt-20">
        <div className="site-wrap py-20 sm:py-28">
          <SectionHeading eyebrow="Special services" title="Highlights from the ICA calendar." intro="Follow us on Facebook for the latest announcements." />
          <div className="mt-12 space-y-8">
            {special.map((e) => (
              <article key={e.title} className="reveal grid overflow-hidden rounded-[2px] bg-mist lg:grid-cols-2">
                {e.image && <img src={e.image} alt={`${e.title} poster`} loading="lazy" className="h-full w-full object-cover" />}
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="eyebrow flex items-center gap-2"><Icon name="calendar" className="h-4 w-4" />{e.date}</p>
                  <h3 className="mt-4 font-display text-3xl font-extrabold leading-tight">{e.title}</h3>
                  <p className="mt-2 font-semibold text-plum-600">{e.time} · {e.place}</p>
                  <p className="body-copy mt-4">{e.summary}</p>
                  {e.iso && new Date(e.iso + 'T12:00:00+03:00') > new Date() ? (
                    <Link href="/visit" className="btn-primary mt-8 self-start">Plan your visit</Link>
                  ) : (
                    <p className="mt-8 text-sm font-semibold text-ink-faint">This service has taken place. <Link href="/contact" className="text-plum-600 underline underline-offset-4">Ask about upcoming services</Link></p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
