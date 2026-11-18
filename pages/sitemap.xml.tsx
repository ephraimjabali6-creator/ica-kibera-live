import type { GetServerSideProps } from 'next';
import { NAV } from '../content/nav';

const PRIORITY: Record<string, string> = { '/': '1.0', '/visit': '0.9', '/give': '0.9', '/messages': '0.8' };

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ica.or.ke').replace(/\/$/, '');
  const today = new Date().toISOString().slice(0, 10);
  const urls = ['/', '/about', '/visit', '/ministries', '/events', '/messages', '/give', '/prayer', '/contact'];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((p) => `  <url><loc>${origin}${p === '/' ? '' : p}</loc><lastmod>${today}</lastmod><changefreq>${p === '/messages' ? 'weekly' : 'monthly'}</changefreq><priority>${PRIORITY[p] || '0.6'}</priority></url>`)
  .join('\n')}
</urlset>`;
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.write(xml);
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
