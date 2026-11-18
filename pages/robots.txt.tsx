import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ica.or.ke').replace(/\/$/, '');
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.write(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`);
  res.end();
  return { props: {} };
};

export default function Robots() {
  return null;
}
