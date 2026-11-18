import { useEffect, useState } from 'react';

const KEY = 'ica-cookie-ok';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setShow(!localStorage.getItem(KEY));
    } catch {
      setShow(false);
    }
  }, []);
  if (!show) return null;
  const close = () => {
    try {
      localStorage.setItem(KEY, '1');
    } catch {}
    setShow(false);
  };
  return (
    <div role="region" aria-label="Cookie notice" className="fixed inset-x-3 bottom-[72px] z-40 flex items-center gap-4 border border-line glass px-4 py-3 sm:inset-x-auto sm:right-6 sm:max-w-sm lg:bottom-6">
      <p className="text-[12px] leading-5 text-ink-muted">
        No tracking cookies here. Visit counts are anonymous.
      </p>
      <button onClick={close} className="btn-primary !min-h-[36px] shrink-0 !px-4">OK</button>
    </div>
  );
}
