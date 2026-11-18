import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileActionBar from './MobileActionBar';
import CookieBanner from './CookieBanner';
import { CHURCH, GATHERINGS } from '../content/church';

interface Props {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export default function Layout({ children, title, description, image = '/og-image.jpg', noIndex = false }: Props) {
  const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ica.or.ke').replace(/\/$/, '');
  const { asPath } = useRouter();
  const canonical = `${site}${asPath.split(/[?#]/)[0] === '/' ? '' : asPath.split(/[?#]/)[0]}`;
  const imageUrl = image.startsWith('http') ? image : `${site}${image}`;
  const pageTitle = title ? `${title} · ICA` : `ICA · International Christian Assemblies, Kibera, Nairobi`;
  const desc = description || `${CHURCH.tagline} Led by ${CHURCH.seniorLeaders}. Join us this Sunday.`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Church',
    name: CHURCH.fullName,
    alternateName: CHURCH.shortName,
    description: desc,
    url: site || CHURCH.website,
    logo: `${site}/images/ica-logo-full.png`,
    image: `${site}/og-image.jpg`,
    telephone: CHURCH.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Kibera, Nairobi', addressCountry: 'KE' },
    sameAs: [CHURCH.social.facebook, CHURCH.social.youtube],
    event: GATHERINGS.filter((g) => g.day === 'Sunday').map((g) => ({
      '@type': 'Event',
      name: `${g.name} (${g.day})`,
      eventSchedule: { '@type': 'Schedule', byDay: 'https://schema.org/Sunday', startTime: g.time },
      location: { '@type': 'Place', name: CHURCH.fullName, address: CHURCH.location.area },
    })),
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="canonical" href={canonical} />
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:locale" content="en_KE" />
        <meta property="og:site_name" content="ICA" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="ICA — International Christian Assemblies, Kibera, Nairobi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Head>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-lg focus:bg-mist focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <div className="grid-lines" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className={i > 3 ? 'hidden lg:block' : ''} />
        ))}
      </div>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <div className="h-[60px] bg-paper lg:hidden" aria-hidden="true" />
      <MobileActionBar />
      <CookieBanner />
    </>
  );
}
