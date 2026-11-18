import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import '../styles/globals.css';
import { Analytics, ErrorBoundary, OfflineBanner, RouteProgress } from '../components/SiteChrome';
import TemplateSwitcher from '../components/TemplateSwitcher';
import ComponentInspector from '../components/ComponentInspector';
import VisualStudioEditor from '../components/VisualStudioEditor';

function useReveal(deps: unknown[]) {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
          } else {
            // Re-arm slide-in animation when element leaves the viewport
            e.target.classList.remove('is-visible');
          }
        }),
      { rootMargin: '0px 0px -4% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

function useExperience(path: string) {
  // Site-wide WebGL/GSAP layer (loaded on the client only, in its own chunk)
  useEffect(() => {
    let off: (() => void) | undefined;
    let cancelled = false;
    import('../lib/experience').then((m) => {
      if (!cancelled) off = m.initGlobal();
    });
    return () => {
      cancelled = true;
      off?.();
    };
  }, []);
  // Per-page interactive sections, re-initialised on every route change
  useEffect(() => {
    let off: (() => void) | undefined;
    let cancelled = false;
    const main = document.getElementById('main');
    if (!main) return;
    import('../lib/experience').then((m) => {
      if (!cancelled) off = m.initPage(main);
    });
    return () => {
      cancelled = true;
      off?.();
    };
  }, [path]);
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useReveal([router.asPath]);
  useExperience(router.asPath.split(/[?#]/)[0]);
  return (
    <ErrorBoundary>
      <RouteProgress />
      <OfflineBanner />
      <Analytics />
      <Component {...pageProps} />
      <TemplateSwitcher />
      <ComponentInspector />
      <VisualStudioEditor />
    </ErrorBoundary>
  );
}
