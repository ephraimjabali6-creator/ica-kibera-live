import Link from 'next/link';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import CtaBand from '../components/CtaBand';
import Icon from '../components/Icon';
import { BELIEFS, CHURCH } from '../content/church';

const VALUES = [
  { icon: 'book' as const, title: 'The Word of God', text: 'Uncompromising Bible teaching that builds strong believers, marriages and families.' },
  { icon: 'hands' as const, title: 'Fervent Prayer', text: 'From midweek Bible study to Friday overnight Kesha, intercession is the engine of our ministry.' },
  { icon: 'spark' as const, title: 'The Holy Spirit', text: 'Welcoming the tangible presence, gifts, and transformative power of the Holy Spirit.' },
  { icon: 'users' as const, title: 'Servant Leadership', text: 'Equipping and raising men, women and youth to be active channels of community transformation.' },
];

export default function About() {
  return (
    <Layout
      title="About Us — Vision, Leadership & Branches"
      description="About International Christian Assemblies (ICA): Our Habakkuk 2:2 vision, leadership by Bishop Andrew & Dr. Ruth Ouma, our assemblies and community missions."
    >
      <PageHero
        eyebrow="About ICA"
        title={<>Built on the Word. <span className="accent">Moved by love.</span></>}
        intro="International Christian Assemblies (ICA) is a Spirit-filled family making disciples in Kibera, across Kenya, and among the nations."
        image="/images/hero-slide-4.jpg"
        position="50% 30%"
      />

      {/* ── 01 VISION & SCRIPTURAL MANDATE ── */}
      <section id="vision" className="section scroll-mt-20 border-b border-line bg-paper">
        <div className="site-wrap grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="reveal lg:col-span-5">
            <p className="eyebrow">[ Scriptural Vision · Habakkuk 2:2 ]</p>
            <h2 className="h-section mt-4">Plain on tablets. Powerful in life.</h2>
            <div className="mt-6 rounded-2xl border-2 border-plum-500/20 bg-plum-50/50 p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-plum-700 font-bold">
                The Scripture Anchor:
              </p>
              <blockquote className="mt-2 text-base italic leading-relaxed text-ink">
                “Write the vision and make it plain on tablets, that he may run who reads it.”
                <footer className="mt-2 font-mono text-xs not-italic text-plum-600">— Habakkuk 2:2</footer>
              </blockquote>
            </div>
          </div>

          <div className="reveal space-y-6 lg:col-span-7">
            <div className="rounded-2xl border border-line bg-mist p-8 shadow-sm">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-plum-600">
                Official Vision Statement
              </span>
              <p className="mt-3 font-display text-2xl font-[850] uppercase leading-snug tracking-tight text-ink">
                “To honor God, Impact lives with God’s love, Raise and equip people; To be active channels of blessing and transformation to the community.”
              </p>
            </div>

            <p className="lead">
              Founded under apostolic leadership, ICA is a vibrant spiritual home in the heart of Kibera for people from every walk of life. We believe the Gospel transforms not only the human heart for eternity, but also brings tangible dignity, education, nutrition, and hope to the surrounding community today.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="border-l-2 border-plum-500 pl-4">
                <h4 className="font-display text-sm font-bold uppercase text-ink">Honouring God</h4>
                <p className="mt-1 font-antiqua text-[18px] leading-relaxed text-ink-muted">Through Spirit-filled worship, holy living, and unwavering adherence to Biblical truth.</p>
              </div>
              <div className="border-l-2 border-plum-500 pl-4">
                <h4 className="font-display text-sm font-bold uppercase text-ink">Impacting Lives</h4>
                <p className="mt-1 font-antiqua text-[18px] leading-relaxed text-ink-muted">Reaching beyond our walls through feeding programmes, youth football mentorship, and mercy relief.</p>
              </div>
              <div className="border-l-2 border-plum-500 pl-4">
                <h4 className="font-display text-sm font-bold uppercase text-ink">Raising & Equipping</h4>
                <p className="mt-1 font-antiqua text-[18px] leading-relaxed text-ink-muted">Training leaders through in-depth expository Bible teaching, apostolic seminars, and hands-on ministry.</p>
              </div>
              <div className="border-l-2 border-plum-500 pl-4">
                <h4 className="font-display text-sm font-bold uppercase text-ink">Community Transformation</h4>
                <p className="mt-1 font-antiqua text-[18px] leading-relaxed text-ink-muted">Being salt and light in Kibera, planting daughter churches across rural and urban Kenya.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 LEADERSHIP & STRUCTURE ── */}
      <section id="leadership" className="section scroll-mt-20 border-b border-line bg-mist">
        <div className="site-wrap">
          <SectionHeading
            eyebrow="Structure & Oversight"
            title="Shepherds of the flock."
            intro="Led by Bishop Andrew Ouma and Dr. Ruth Ouma, alongside a dedicated council of elders, pastors, and ministry heads."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <article className="reveal card overflow-hidden p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
                <img
                  src="/images/hero-slide-3.jpg"
                  alt="Bishop Andrew Ouma"
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                />
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-plum-600">
                    Senior Overseer & Founder
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold uppercase text-ink">
                    Bishop Andrew Ouma
                  </h3>
                  <p className="mt-3 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                    Bishop Andrew is a distinguished Bible expositor and apostolic church leader. His ministry focuses on biblical foundation, church multiplication, and raising spiritual leaders through teaching series such as <em>Increase, Multiplication, Restoration & Establishment</em> and <em>Apostolic Talks</em>.
                  </p>
                  <p className="mt-3 font-mono text-[11px] text-ink-faint">
                    Direct Contact: <a href="mailto:revandrewouma@yahoo.com" className="text-plum-600 underline">revandrewouma@yahoo.com</a>
                  </p>
                </div>
              </div>
            </article>

            <article className="reveal card overflow-hidden p-6 sm:p-8">
              <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
                <img
                  src="/images/hero-slide-1.jpg"
                  alt="Dr. Ruth Ouma"
                  loading="lazy"
                  className="aspect-[4/5] w-full rounded-xl object-cover object-top"
                />
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-plum-600">
                    Co-Leader & Director of Ministries
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-extrabold uppercase text-ink">
                    Dr. Ruth Ouma
                  </h3>
                  <p className="mt-3 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                    Dr. Ruth ministers alongside Bishop Andrew, directing the Alabaster Ladies Fellowship, pastoral care for families, children’s feeding outreaches, and educational initiatives. Her passionate heart for women and vulnerable children has shaped ICA’s community presence for decades.
                  </p>
                  <p className="mt-3 font-mono text-[11px] text-ink-faint">
                    Direct Contact: <a href="mailto:raodhiambo@gmail.com" className="text-plum-600 underline">raodhiambo@gmail.com</a>
                  </p>
                </div>
              </div>
            </article>
          </div>

          <div className="reveal mt-12 rounded-2xl border border-line bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-plum-600 font-bold">
                  Pastoral Council & Elders
                </span>
                <h4 className="font-display text-lg font-bold uppercase text-ink">
                  Equipping the Saints for the Work of Ministry
                </h4>
              </div>
              <Link href="/contact" className="btn-outline !min-h-[38px] text-xs">
                Meet the Team →
              </Link>
            </div>
            <div className="mt-6 overflow-hidden rounded-xl">
              <img
                src="/images/hero-slide-4.jpg"
                alt="ICA Ministers and Pastoral Team"
                loading="lazy"
                className="aspect-[21/9] w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 OUR BRANCHES & ASSEMBLIES ── */}
      <section id="branches" className="section scroll-mt-20 border-b border-line bg-paper">
        <div className="site-wrap">
          <SectionHeading
            eyebrow="Network & Growth"
            title="Our assemblies across Kenya."
            intro="From our mother assembly in Kibera to assemblies across Nairobi, Kajiado, and Homa Bay County, ICA continues to expand as a family."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CHURCH.branches.map((b, i) => (
              <div key={b.name} className="reveal card p-6 transition duration-200 hover:border-plum-500 hover:shadow-md">
                <div className="flex items-center justify-between font-mono text-xs text-ink-faint">
                  <span>Assembly {String(i + 1).padStart(2, '0')}</span>
                  <span className="text-plum-600 font-bold">✦</span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tight text-ink">
                  {b.name}
                </h3>
                <p className="mt-2 text-xs font-medium text-ink-muted">
                  📍 {b.location}
                </p>
                <div className="mt-4 border-t border-line pt-3 font-mono text-[11px] uppercase tracking-wider text-plum-700">
                  {b.role}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-mist p-6 text-center text-xs text-ink-muted">
            Looking for service times or contact details for a specific regional assembly?{' '}
            <Link href="/contact" className="font-semibold text-plum-600 underline">
              Inquire with our head office in Kibera
            </Link>.
          </div>
        </div>
      </section>

      {/* ── 04 MISSIONS & OUTREACH SUITE ── */}
      <section id="outreach" className="section scroll-mt-20 border-b border-line bg-mist">
        <div className="site-wrap">
          <SectionHeading
            eyebrow="Missions & Mercy"
            title="Faith expressed in practical action."
            intro="We believe that a church alive in Christ must touch its community. Here is how ICA puts faith into motion."
          />

          <div className="mt-12 space-y-12">
            {/* Giving Life to the City & Monthly Feeding */}
            <div id="feeding" className="reveal card scroll-mt-24 overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center p-8 sm:p-10">
                <div className="space-y-4 lg:col-span-7">
                  <span className="inline-block rounded-full bg-plum-50 px-3 py-1 font-mono text-xs font-bold uppercase text-plum-700 border border-plum-200">
                    Children’s Feeding Programme
                  </span>
                  <h3 className="font-display text-3xl font-[850] uppercase tracking-tight text-ink">
                    Feeding Over 800 Children Every Month
                  </h3>
                  <p className="font-antiqua text-[18px] leading-relaxed text-ink-muted">
                    In the heart of Kibera, food security remains a daily struggle for countless families. ICA conducts regular, well-organized monthly community feeding days where more than 800 vulnerable children receive hot, nutritious meals, clean drinking water, and personal prayer from our workers.
                  </p>
                  <p className="text-xs text-ink-faint">
                    Partner with us: Every gift of KES 1,000 provides wholesome meals for multiple children.
                  </p>
                  <div className="pt-2">
                    <Link href="/give" className="btn-primary !min-h-[40px] text-xs">
                      Support the Feeding Programme →
                    </Link>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <img
                    src="/images/outreach-children.jpg"
                    alt="Children enjoying meals at ICA Kibera"
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Jesus Film Evangelism & Church Planting */}
            <div id="jesus-film" className="reveal card scroll-mt-24 overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center p-8 sm:p-10">
                <div className="lg:col-span-5 order-2 lg:order-1">
                  <img
                    src="/images/kajiado-service.jpg"
                    alt="Jesus Film and open-air mission in Kenya"
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-xl object-cover shadow-sm"
                  />
                </div>
                <div className="space-y-4 lg:col-span-7 order-1 lg:order-2">
                  <span className="inline-block rounded-full bg-plum-50 px-3 py-1 font-mono text-xs font-bold uppercase text-plum-700 border border-plum-200">
                    Evangelism in Mother Tongues
                  </span>
                  <h3 className="font-display text-3xl font-[850] uppercase tracking-tight text-ink">
                    The Jesus Film Evangelism Outreach
                  </h3>
                  <p className="font-antiqua text-[18px] leading-relaxed text-ink-muted">
                    Taking the Gospel where conventional media rarely reaches. ICA’s mobile evangelism teams travel with generators, projectors, and large outdoor screens to show the Jesus Film in the mother tongues of local communities across Kenya—from informal settlements in Nairobi to rural communities in Kajiado, Homa Bay, and Lodwar.
                  </p>
                  <p className="text-xs text-ink-faint">
                    Each screening is followed by personal counselling, distribution of scripture portions, and immediate integration into local assemblies.
                  </p>
                </div>
              </div>
            </div>

            {/* Kibera Saints FC & Hope Community School */}
            <div className="grid gap-8 md:grid-cols-2">
              <div id="kibera-saints" className="reveal card scroll-mt-24 p-8">
                <span className="font-mono text-xs font-bold uppercase text-plum-600">
                  Youth & Sports Discipleship
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase text-ink">
                  Kibera Saints Football Club
                </h3>
                <p className="mt-3 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                  Sports is a powerful magnet for character development. Kibera Saints FC gathers hundreds of local youths for professional soccer training, mentoring them away from street crime, substance abuse, and despair, while introducing them to Jesus Christ.
                </p>
              </div>

              <div id="school" className="reveal card scroll-mt-24 p-8">
                <span className="font-mono text-xs font-bold uppercase text-plum-600">
                  Christian Education
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold uppercase text-ink">
                  Hope Community School
                </h3>
                <p className="mt-3 font-antiqua text-[18px] leading-relaxed text-ink-muted">
                  Providing quality primary education, Christian discipleship, and daily nourishment to children in Kibera who lack access to public schools, giving them a foundation of excellence and faith.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 BELIEFS & CORE VALUES ── */}
      <section id="beliefs" className="section scroll-mt-20 border-b border-line bg-paper">
        <div className="site-wrap">
          <SectionHeading
            eyebrow="Core Doctrine"
            title="The foundations of our faith."
            intro="Simply stated, these are the biblical convictions that guide our doctrine, leadership and daily walk with Jesus."
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {BELIEFS.map((b) => (
              <div key={b.title} className="reveal bg-white p-7">
                <h3 className="font-display text-lg font-bold uppercase text-ink">{b.title}</h3>
                <p className="mt-2 font-antiqua text-[18px] leading-relaxed text-ink-muted">{b.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-ink-faint">
            Questions about our beliefs?{' '}
            <Link href="/contact" className="font-semibold text-plum-600 underline">
              Speak with one of our pastoral team
            </Link>{' '}
            or call {CHURCH.phone}.
          </p>
        </div>
      </section>

      <CtaBand />
    </Layout>
  );
}
