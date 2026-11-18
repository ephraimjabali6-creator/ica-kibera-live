import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { NAV, NavItem } from '../content/nav';
import { CHURCH } from '../content/church';

export default function Header() {
  const { asPath } = useRouter();
  const menu = useRef<HTMLDetailsElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (menu.current) menu.current.open = false;
    setOpenDropdown(null);
  }, [asPath]);

  return (
    <header data-inspect="header" className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-paper/95 via-paper/70 to-transparent" />
      <div className="site-wrap relative flex h-20 items-center justify-between gap-6">
        <Logo />

        {/* ── DESKTOP NAVIGATION WITH STREAMLINED DROPDOWNS ── */}
        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {NAV.map((item, i) => {
            const isTopActive = asPath === item.href || (item.href !== '/' && asPath.startsWith(item.href));
            const hasChildren = Boolean(item.children && item.children.length > 0);

            return (
              <div
                key={item.label}
                className="group relative"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  aria-current={isTopActive ? 'page' : undefined}
                  aria-haspopup={hasChildren ? 'true' : undefined}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition ${
                    isTopActive ? 'text-plum-600 font-bold' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  <span className="text-[9px] text-ink-faint group-hover:text-plum-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{item.label}</span>
                  {hasChildren && (
                    <svg
                      className="h-3 w-3 text-ink-faint transition duration-200 group-hover:rotate-180 group-hover:text-plum-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown Card */}
                {hasChildren && (
                  <div className="invisible pointer-events-none absolute left-0 top-full -mt-0.5 min-w-[270px] translate-y-1 rounded-xl border border-line bg-white p-2 opacity-0 shadow-xl ring-1 ring-black/5 transition duration-200 ease-out group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="py-1">
                      {item.children!.map((sub) => {
                        const isSubActive = asPath === sub.href;
                        return (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className={`flex flex-col rounded-lg px-3 py-2.5 transition ${
                              isSubActive ? 'bg-plum-50 text-plum-700' : 'hover:bg-mist'
                            }`}
                          >
                            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-ink group-hover:text-plum-600">
                              {sub.label}
                            </span>
                            {sub.desc && (
                              <span className="mt-0.5 text-xs text-ink-faint">
                                {sub.desc}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/templates"
            className="flex items-center gap-1.5 rounded-full border border-plum-200 bg-plum-50/80 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-plum-700 transition hover:bg-plum-100 hover:border-plum-300 shadow-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-plum-600 animate-pulse" />
            <span>7 Templates</span>
          </Link>
          <Link href="/visit" className="btn-primary !min-h-[42px] whitespace-nowrap !px-5">
            Plan a visit
          </Link>
        </div>

        {/* ── MOBILE MENU ACCORDION ── */}
        <details ref={menu} className="menu-details xl:hidden">
          <summary
            className="relative z-[60] flex h-11 cursor-pointer items-center gap-2 border border-line bg-glass px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink backdrop-blur"
            aria-label="Open menu"
          >
            <span className="menu-open-icon">Menu</span>
            <span className="menu-close-icon">Close</span>
          </summary>
          <div className="fixed inset-0 z-50 overflow-y-auto bg-paper">
            <div className="site-wrap flex h-20 items-center justify-between border-b border-line">
              <Logo size="sm" />
              <span className="eyebrow">[ Menu ]</span>
            </div>

            <nav aria-label="Mobile" className="site-wrap flex flex-col py-6">
              <Link
                href="/"
                className="flex items-baseline gap-3 border-b border-line py-3.5 font-display text-2xl font-[850] uppercase text-ink"
              >
                <span className="font-mono text-xs text-plum-600">00</span>
                <span>Home</span>
              </Link>

              {NAV.map((item, i) => (
                <div key={item.label} className="border-b border-line py-3">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className="group flex items-baseline gap-3"
                    >
                      <span className="font-mono text-xs text-plum-600">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display text-2xl font-[850] uppercase tracking-[-0.01em] text-ink group-hover:text-plum-600">
                        {item.label}
                      </span>
                    </Link>
                  </div>

                  {item.children && (
                    <div className="mt-2.5 grid grid-cols-1 gap-1 pl-7">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="flex items-center justify-between rounded-md py-1.5 text-sm font-medium text-ink-muted hover:text-plum-600"
                        >
                          <span>{sub.label}</span>
                          <span className="font-mono text-[10px] text-ink-faint">→</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/templates"
                className="flex items-baseline gap-3 border-b border-line py-3.5 font-display text-2xl font-[850] uppercase text-plum-600"
              >
                <span className="font-mono text-xs text-plum-600">✦</span>
                <span>7 Church Templates</span>
              </Link>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Link href="/visit" className="btn-primary w-full text-center">
                  Plan a visit
                </Link>
                <Link href="/give" className="btn-outline w-full text-center">
                  Give & Partner
                </Link>
              </div>

              <div className="mt-8 border-t border-line pt-6 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                <p>{CHURCH.location.area}</p>
                <p className="mt-1">{CHURCH.phone}</p>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
