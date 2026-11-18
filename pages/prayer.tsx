import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { PrayerForm } from '../components/Forms';
import Icon from '../components/Icon';
import { CHURCH, GATHERINGS } from '../content/church';

export default function Prayer() {
  const kesha = GATHERINGS.find((g) => g.day === 'Friday');
  return (
    <Layout title="Prayer Request" description="Share a prayer request with the pastors and intercessors of ICA.">
      <PageHero
        eyebrow="Prayer"
        title={<>You don’t have to <span className="accent">carry it alone.</span></>}
        intro="“The effective, fervent prayer of a righteous man avails much.” — James 5:16"
        image="/images/laying-on-of-hands.jpg"
        position="50% 30%"
      />
      <section data-inspect="prayer" className="section">
        <div className="site-wrap grid gap-12 lg:grid-cols-12">
          <div className="reveal space-y-6 lg:col-span-5">
            <p className="eyebrow">Share your request</p>
            <h2 className="h-section">Our intercessors will pray with you.</h2>
            <p className="lead">Every request is read and prayed over by our pastoral and intercessory team. Tick “private” and only the pastors will see it.</p>
            <ul className="space-y-4 pt-2 font-antiqua text-[18px] leading-relaxed text-ink-muted">
              <li className="flex gap-3"><Icon name="hands" className="h-5 w-5 shrink-0 text-plum-600" />Prayed over at midweek prayer{kesha ? ` and the ${kesha.name}` : ''}.</li>
              <li className="flex gap-3"><Icon name="phone" className="h-5 w-5 shrink-0 text-plum-600" />Need to talk now? Call <a href={CHURCH.phoneHref} className="font-semibold text-plum-600 underline underline-offset-4">{CHURCH.phone}</a>.</li>
            </ul>
          </div>
          <div className="reveal card p-6 sm:p-10 lg:col-span-7"><PrayerForm /></div>
        </div>
      </section>
    </Layout>
  );
}
