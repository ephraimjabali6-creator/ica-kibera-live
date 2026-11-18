import Icon from './Icon';
import { Sermon, sermonThumb } from '../content/church';

export default function SermonCard({ sermon, onPlay, large = false }: { sermon: Sermon; onPlay: (s: Sermon) => void; large?: boolean }) {
  const url = `https://www.youtube.com/watch?v=${sermon.id}`;
  return (
    <article className="reveal group" data-kind={sermon.kind}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          e.preventDefault();
          onPlay(sermon);
        }}
        className="relative block aspect-video overflow-hidden rounded-[2px] bg-plum-100"
        aria-label={`Play: ${sermon.title}`}
      >
        <img
          src={sermonThumb(sermon.id)}
          alt=""
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            if (!img.src.endsWith('/images/sermon-fallback.jpg')) img.src = '/images/sermon-fallback.jpg';
          }}
          className="img-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-mist text-plum-600 shadow-xl transition group-hover:scale-110 ${large ? 'h-20 w-20' : 'h-14 w-14'}`}>
          <Icon name="play" className={large ? 'ml-1 h-8 w-8' : 'ml-0.5 h-6 w-6'} />
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">{sermon.duration}</span>
      </a>
      <div className="mt-4">
        {sermon.series && <p className="eyebrow !text-[10px]">{sermon.series}</p>}
        <h3 className={`mt-1.5 font-display font-bold leading-snug tracking-[-0.01em] text-ink ${large ? 'text-2xl sm:text-3xl' : 'text-[17px]'}`}>{sermon.title}</h3>
        <p className="mt-1 text-sm text-ink-faint">{sermon.speaker}</p>
      </div>
    </article>
  );
}
