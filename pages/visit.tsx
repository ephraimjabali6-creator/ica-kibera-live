import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import ServiceTimes from '../components/ServiceTimes';
import SectionHeading from '../components/SectionHeading';
import Faq from '../components/Faq';
import Icon from '../components/Icon';
import { VisitForm } from '../components/Forms';
import { CHURCH, FAQS } from '../content/church';

const EXPECT = [
  { icon: 'users' as const, title: 'A warm welcome', text: 'Our ushers will greet you at the gate, help you find a seat and answer any questions.' },
  { icon: 'spark' as const, title: 'Lively worship', text: 'Uzima Choir and the Praise Team lead heartfelt worship in English and Kiswahili.' },
  { icon: 'book' as const, title: 'A message from the Word', text: 'Practical, Bible-based preaching you can take home and live out during the week.' },
  { icon: 'hands' as const, title: 'Prayer ministry', text: 'Ministers are available after the service to pray with you about anything.' },
];

export default function Visit() {
  return (
    <Layout title="Plan Your Visit" description="Service times, what to expect and how to find ICA. Let us know you’re coming.">
      <PageHero
        eyebrow="Plan your visit"
        title={<>We’ve saved you <span className="accent">a seat.</span></>}
        intro="Visiting a church for the first time can feel like a big step. Here’s everything you need to know before Sunday."
        image="/images/leaders-row.jpg"
      >
        <a href="#plan" className="btn-white">Let us know you’re coming <Icon name="arrow" className="h-4 w-4" /></a>
      </PageHero>
      <ServiceTimes />

      <section data-inspect="visit" className="section">
        <div className="site-wrap">
          <SectionHeading eyebrow="What to expect" title="Your first Sunday at ICA." align="center" />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {EXPECT.map((e) => (
              <div key={e.title} className="reveal card p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-plum-50 text-plum-600"><Icon name={e.icon} className="h-6 w-6" /></span>
                <h3 className="h-card mt-5">{e.title}</h3>
                <p className="body-copy mt-2">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="site-wrap grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <div className="reveal">
            <p className="eyebrow">Getting here</p>
            <h2 className="h-section mt-4">Find us in Kibera.</h2>
            <ul className="mt-8 space-y-5 font-antiqua text-[18px] leading-relaxed">
              <li className="flex gap-4">
                <Icon name="pin" className="mt-1 h-6 w-6 shrink-0 text-plum-600" />
                <span>
                  <strong className="block text-ink">Church Location</strong>
                  {CHURCH.location.directions}
                </span>
              </li>
              <li className="flex gap-4">
                <Icon name="arrow" className="mt-1 h-6 w-6 shrink-0 text-plum-600" />
                <span>
                  <strong className="block text-ink">By Public Transport (Matatu)</strong>
                  Take Matatu Route 8 from Nairobi Railways Bus Station or Route 42. Alight near Olympic / Makina stage.
                </span>
              </li>
              <li className="flex gap-4">
                <Icon name="phone" className="mt-1 h-6 w-6 shrink-0 text-plum-600" />
                <span>
                  <strong className="block text-ink">Need live directions on Sunday?</strong>
                  Call or WhatsApp our welcome team at{' '}
                  <a href={CHURCH.phoneHref} className="font-semibold text-plum-600 underline underline-offset-4">
                    {CHURCH.phone}
                  </a>{' '}
                  and we’ll guide you directly to the sanctuary gate.
                </span>
              </li>
              <li className="flex gap-4">
                <Icon name="users" className="mt-1 h-6 w-6 shrink-0 text-plum-600" />
                <span>
                  <strong className="block text-ink">Children & Families</strong>
                  Children’s Church runs concurrently during both Sunday services with dedicated teachers.
                </span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={CHURCH.whatsapp} target="_blank" rel="noreferrer" className="btn-primary">
                WhatsApp Us for Directions ↗
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('ICA Church ' + CHURCH.location.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
          <div className="reveal flex flex-col gap-4">
            <div className="overflow-hidden rounded-xl border border-line bg-paper aspect-[4/3] w-full">
              <iframe
                title="ICA Church Kibera Map Location"
                src={`https://maps.google.com/maps?q=${encodeURIComponent('Kibera Nairobi Kenya')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="font-mono text-xs text-ink-faint">
              01°18′47″S · 36°47′13″E · Kibera, Nairobi
            </p>
          </div>
        </div>
      </section>

      <section id="plan" className="section scroll-mt-4">
        <div className="site-wrap grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">Let us know</p>
            <h2 className="h-section mt-4">Tell us you’re coming.</h2>
            <p className="lead mt-5">We’ll look out for you, reserve a seat and introduce you to someone from the welcome team. It takes less than a minute.</p>
          </div>
          <div className="reveal card p-6 sm:p-10 lg:col-span-7"><VisitForm /></div>
        </div>
      </section>

      <section className="bg-mist">
        <div className="site-wrap py-20 sm:py-28">
          <SectionHeading eyebrow="Questions" title="Good to know." />
          <div className="mt-10"><Faq items={FAQS} /></div>
        </div>
      </section>
    </Layout>
  );
}
