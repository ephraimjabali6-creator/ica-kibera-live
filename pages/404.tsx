import Link from 'next/link';
import Layout from '../components/Layout';
import Icon from '../components/Icon';

const LINKS = [
  { href: '/visit', label: 'Plan a visit', text: 'Service times and directions' },
  { href: '/messages', label: 'Messages', text: 'Watch recent sermons' },
  { href: '/give', label: 'Give & Partner', text: 'Tithes, offerings & outreach' },
  { href: '/prayer', label: 'Prayer', text: 'Send us a prayer request' },
];

export default function NotFound() {
  return (
    <Layout title="Page not found" noIndex>
      <section className="bg-plum-900 pb-20 pt-40 text-white">
        <div className="site-wrap">
          <p className="eyebrow-light">Error 404</p>
          <h1 className="h-display mt-4 max-w-3xl">This page <span className="accent">wandered off.</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">The link may be old or mistyped. “The Son of Man came to seek and to save the lost.” Let’s get you back.</p>
          <Link href="/" className="btn-white mt-8">Go to the homepage <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
      </section>
      <section className="section">
        <div className="site-wrap grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="card p-6 transition hover:border-plum-300">
              <p className="font-display text-lg font-bold">{l.label}</p>
              <p className="mt-1 text-sm text-ink-muted">{l.text}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
