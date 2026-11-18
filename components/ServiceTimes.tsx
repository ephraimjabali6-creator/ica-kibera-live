import Icon from './Icon';
import { GATHERINGS } from '../content/church';

/** Overlapping white card listing weekly gatherings (sits under a hero). */
export default function ServiceTimes() {
  return (
    <div data-inspect="servicetimes" className="site-wrap relative z-10 -mt-14 sm:-mt-16">
      <div className="grid overflow-hidden rounded-[2px] border border-line bg-mist shadow-[0_30px_60px_-30px_rgba(36,16,58,0.35)] sm:grid-cols-2 lg:grid-cols-4">
        {GATHERINGS.map((g, i) => (
          <div key={g.name} className={`flex gap-4 p-6 sm:p-7 ${i > 0 ? 'border-t border-line sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l' : ''} ${i > 1 ? 'sm:border-t lg:border-t-0' : ''} ${i > 0 ? 'lg:border-l' : ''}`}>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-plum-50 text-plum-600">
              <Icon name="clock" />
            </span>
            <div>
              <p className="eyebrow !text-[10px]">{g.day}</p>
              <p className="mt-1 font-display text-lg font-extrabold text-ink">{g.time}</p>
              <p className="text-sm font-semibold text-ink">{g.name}</p>
              <p className="mt-1 text-sm leading-6 text-ink-faint">{g.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
