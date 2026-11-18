import { useEffect, useRef } from 'react';
import Icon from './Icon';

export default function VideoModal({ id, title, onClose }: { id: string; title: string; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prev?.focus();
    };
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-label={title} className="fixed inset-0 z-[70] flex items-center justify-center bg-plum-900/90 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4 text-white">
          <p className="truncate font-display text-sm font-bold">{title}</p>
          <button ref={closeBtn} onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Close video">
            <Icon name="close" />
          </button>
        </div>
        <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
