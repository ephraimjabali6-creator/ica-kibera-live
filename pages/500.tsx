import Link from 'next/link';
import Layout from '../components/Layout';
import { CHURCH } from '../content/church';

export default function ServerError() {
  return (
    <Layout title="Something went wrong" noIndex>
      <section className="bg-plum-900 pb-24 pt-40 text-white">
        <div className="site-wrap">
          <p className="eyebrow-light">Error 500</p>
          <h1 className="h-display mt-4 max-w-3xl">Something went wrong on our side.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
            Please try again in a minute. If you were sending a prayer request or registration, nothing was lost on your phone — just send it again, or call {CHURCH.phone}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="btn-white">Back to the homepage</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
