import Head from 'next/head';
import TrinityAnglicanTemplate from '../components/templates/TrinityAnglicanTemplate';

export default function Home() {
  return (
    <>
      <Head>
        <title>ICA Sanctuary Community Classic — ICA Kibera</title>
        <meta name="description" content="Welcome to International Christian Assemblies, Kibera, Nairobi. Led by Bishop Andrew & Dr. Ruth Ouma." />
      </Head>
      <TrinityAnglicanTemplate />
    </>
  );
}
