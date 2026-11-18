import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import { ContactForm } from '../components/Forms';
import Icon from '../components/Icon';
import { CHURCH } from '../content/church';

export default function Contact() {
  const { query } = useRouter();
  const subject = typeof query.subject === 'string' ? query.subject : undefined;
  const items = [
    { icon: 'phone' as const, label: 'Call Phone', value: CHURCH.phone, href: CHURCH.phoneHref },
    { icon: 'phone' as const, label: 'WhatsApp', value: 'Chat with Church Office', href: CHURCH.whatsapp },
    { icon: 'mail' as const, label: 'Email', value: CHURCH.email, href: `mailto:${CHURCH.email}` },
    { icon: 'pin' as const, label: 'Sanctuary Location', value: CHURCH.location.area, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('ICA Church ' + CHURCH.location.mapQuery)}` },
    { icon: 'facebook' as const, label: 'Facebook', value: 'ICA Kibera', href: CHURCH.social.facebook },
    { icon: 'youtube' as const, label: 'YouTube', value: '@ICAKIBERA', href: CHURCH.social.youtube },
  ];
  return (
    <Layout title="Contact" description="Get in touch with ICA.">
      <PageHero
        eyebrow="Contact"
        title={<>We’d love to <span className="accent">hear from you.</span></>}
        intro="Questions about Sunday, weddings, dedications, counselling or joining a ministry — send us a message."
        image="/images/commissioning.jpg"
      />
      <section data-inspect="contact" className="section">
        <div className="site-wrap grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-4">
            <ul className="divide-y divide-line border-y border-line">
              {items.map((i) => (
                <li key={i.label} className="flex items-center gap-4 py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-plum-50 text-plum-600"><Icon name={i.icon} /></span>
                  <span>
                    <span className="block text-sm text-ink-faint">{i.label}</span>
                    {i.href ? (
                      <a href={i.href} target={i.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="font-semibold text-ink hover:text-plum-600">{i.value}</a>
                    ) : (
                      <span className="font-semibold text-ink">{i.value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal card p-6 sm:p-10 lg:col-span-8"><ContactForm defaultSubject={subject} /></div>
        </div>
      </section>
    </Layout>
  );
}
