import { Component, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/** Sends a cookieless page view on every route change (skips admin, honours Do Not Track). */
export function Analytics() {
  const router = useRouter();
  useEffect(() => {
    const send = (url: string) => {
      try {
        if (navigator.doNotTrack === '1' || url.startsWith('/admin')) return;
        const [path, search = ''] = url.split('?');
        const body = JSON.stringify({ path, search: search ? `?${search}` : '', referrer: document.referrer });
        if (navigator.sendBeacon) navigator.sendBeacon('/api/collect', new Blob([body], { type: 'application/json' }));
        else fetch('/api/collect', { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {});
      } catch {}
    };
    send(router.asPath);
    router.events.on('routeChangeComplete', send);
    return () => router.events.off('routeChangeComplete', send);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

/** Banner that appears when the connection drops and confirms when it is back. */
export function OfflineBanner() {
  const [state, setState] = useState<'online' | 'offline' | 'back'>('online');
  useEffect(() => {
    if (!navigator.onLine) setState('offline');
    const off = () => setState('offline');
    let t: ReturnType<typeof setTimeout>;
    const on = () => {
      setState('back');
      t = setTimeout(() => setState('online'), 3000);
    };
    window.addEventListener('offline', off);
    window.addEventListener('online', on);
    return () => {
      window.removeEventListener('offline', off);
      window.removeEventListener('online', on);
      clearTimeout(t);
    };
  }, []);
  if (state === 'online') return null;
  return (
    <div role="status" aria-live="polite" className={`fixed inset-x-0 top-0 z-[80] px-4 py-2.5 text-center text-sm font-semibold text-white ${state === 'offline' ? 'bg-ink' : 'bg-plum-600'}`}>
      {state === 'offline' ? 'You’re offline. You can keep reading; forms will send once you reconnect.' : 'You’re back online.'}
    </div>
  );
}

/** Thin progress bar during page transitions so slow connections still feel responsive. */
export function RouteProgress() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const start = () => (t = setTimeout(() => setLoading(true), 150));
    const done = () => {
      clearTimeout(t);
      setLoading(false);
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', done);
    router.events.on('routeChangeError', done);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', done);
      router.events.off('routeChangeError', done);
    };
  }, [router]);
  if (!loading) return null;
  return <div aria-hidden="true" className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left animate-pulse bg-plum-400" />;
}

/** Catches rendering errors so one broken section never blanks the whole page. */
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error('[ui]', error);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="font-display text-3xl font-extrabold">Something went wrong on this page.</h1>
        <p className="max-w-md text-ink-muted">Please reload. If it keeps happening, call the church office.</p>
        <button onClick={() => location.reload()} className="btn-primary">Reload page</button>
      </main>
    );
  }
}
