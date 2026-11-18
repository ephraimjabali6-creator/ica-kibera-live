import Link from 'next/link';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import { MINISTRIES } from '../content/church';

export default function Ministries() {
  return (
    <Layout title="Ministries" description="Find your place at ICA — worship, women, youth, children, prayer and missions.">
      <PageHero
        eyebrow="Ministries"
        title={<>There’s a place <span className="accent">for you.</span></>}
        intro="Church is more than Sunday. Grow alongside others, use your gifts and make a difference in Kibera."
        image="/images/sermon-TzxjaC98O8k.jpg"
      />

      <section data-inspect="ministries" className="section">
        <div className="site-wrap space-y-20 sm:space-y-28">
          {MINISTRIES.map((m, i) => (
            <article id={m.slug} key={m.slug} className="reveal grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={`overflow-hidden rounded-xl border border-line bg-mist ${i % 2 ? 'lg:order-2' : ''}`}>
                <img src={m.image} alt="" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              </div>
              <div>
                <p className="eyebrow">{String(i + 1).padStart(2, '0')} · Ministry</p>
                <h2 className="h-section mt-4">{m.name}</h2>
                <p className="lead mt-5">{m.summary}</p>
                <p className="body-copy mt-3">{m.detail}</p>
                <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-plum-200 bg-plum-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-plum-700">
                  <Icon name="calendar" className="h-4 w-4" /> {m.meets}
                </p>
                <div className="mt-6">
                  <Link href={`/contact?subject=${encodeURIComponent(`Joining ${m.name}`)}`} className="link-arrow">I’d like to join <Icon name="arrow" className="h-4 w-4" /></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </Layout>
  );
}
