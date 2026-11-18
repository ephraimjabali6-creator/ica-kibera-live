import Link from 'next/link';
import Icon from './Icon';
import { CHURCH } from '../content/church';

/** Thumb-reachable actions on phones: visit, watch, call. */
export default function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/90 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="grid grid-cols-4">
        <Link href="/visit" className="flex min-h-[60px] flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] text-plum-500">
          <Icon name="pin" /> Visit
        </Link>
        <a href={CHURCH.social.youtube} target="_blank" rel="noreferrer" className="flex min-h-[60px] flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
          <Icon name="play" /> Watch
        </a>
        <Link href="/give" className="flex min-h-[60px] flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
          <Icon name="heart" /> Give
        </Link>
        <Link href="/prayer" className="flex min-h-[60px] flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] text-ink">
          <Icon name="hands" /> Prayer
        </Link>
      </div>
    </div>
  );
}
