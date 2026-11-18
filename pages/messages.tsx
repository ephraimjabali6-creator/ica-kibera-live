import { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import PageHero from '../components/PageHero';
import SermonCard from '../components/SermonCard';
import VideoModal from '../components/VideoModal';
import Icon from '../components/Icon';
import { CHURCH, SERMONS, Sermon } from '../content/church';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'message', label: 'Messages' },
  { key: 'worship', label: 'Worship' },
  { key: 'event', label: 'Missions & events' },
] as const;

export default function Messages() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['key']>('all');
  const [playing, setPlaying] = useState<Sermon | null>(null);
  const list = useMemo(() => SERMONS.filter((s) => filter === 'all' || (s as any).kind === filter), [filter]);

  return (
    <Layout title="Messages" description="Watch sermons from Bishop Andrew Ouma and worship from ICA.">
      <PageHero
        eyebrow="Messages"
        title={<>Hear the Word. <span className="accent">Live it out.</span></>}
        intro="Teaching from Bishop Andrew Ouma, plus worship from Uzima Choir, the Praise Team and the wider ICA family."
        image="/images/bishop-preaching.jpg"
        position="50% 25%"
      >
        <a href={CHURCH.social.youtube} target="_blank" rel="noreferrer" className="btn-white">
          <Icon name="youtube" className="h-5 w-5 text-[#E62117]" /> Subscribe on YouTube
        </a>
      </PageHero>

      <section data-inspect="sermons" className="section">
        <div className="site-wrap">
          <div role="tablist" aria-label="Filter videos" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                role="tab"
                data-filter={f.key}
                aria-selected={filter === f.key}
                onClick={() => setFilter(f.key)}
                className={`min-h-[44px] rounded-full px-5 font-display text-[13px] font-bold uppercase tracking-[0.08em] transition ${
                  filter === f.key ? 'bg-plum-500 text-paper' : 'bg-plum-50 text-plum-300 hover:bg-plum-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => <SermonCard key={s.id} sermon={s} onPlay={setPlaying} />)}
          </div>
          <div className="mt-16 rounded-[2px] bg-plum-50 p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-extrabold">Looking for more?</h2>
            <p className="body-copy mx-auto mt-2 max-w-lg">Every service and conference we record is posted on our YouTube channel.</p>
            <a href={CHURCH.social.youtube} target="_blank" rel="noreferrer" className="btn-primary mt-6">Visit @ICAKIBERA</a>
          </div>
        </div>
      </section>

      {playing && <VideoModal id={playing.id} title={playing.title} onClose={() => setPlaying(null)} />}
    </Layout>
  );
}
