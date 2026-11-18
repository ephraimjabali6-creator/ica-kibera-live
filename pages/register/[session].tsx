import type { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, useEffect, useRef, useState } from 'react';
import Layout from '../../components/Layout';
import Icon from '../../components/Icon';
import { api, ApiError } from '../../lib/api';
import { getSession, publicSession } from '../../lib/checkout';
import { formatEventDate, HOLD_MINUTES } from '../../content/registrations';
import { CHURCH } from '../../content/church';

type Session = ReturnType<typeof publicSession>;

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  const s = getSession(String(params?.session || ''));
  if (!s) return { notFound: true };
  const view = publicSession(s);
  return { props: { initial: view, when: view.event ? formatEventDate(view.event.startsAt) : '' } };
};

function useCountdown(expiresAt: string, active: boolean) {
  const [left, setLeft] = useState(() => Math.max(0, new Date(expiresAt).getTime() - Date.now()));
  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => setLeft(Math.max(0, new Date(expiresAt).getTime() - Date.now())), 1000);
    return () => clearInterval(t);
  }, [expiresAt, active]);
  const m = Math.floor(left / 60000);
  const s = Math.floor((left % 60000) / 1000);
  return { left, label: `${m}:${String(s).padStart(2, '0')}` };
}

function icsHref(title: string, startsAt: string, place: string, ref: string) {
  const start = new Date(startsAt);
  const end = new Date(start.getTime() + 2 * 3600_000);
  const f = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//ICA//Registration//EN', 'BEGIN:VEVENT',
    `UID:${ref}@ica`, `DTSTAMP:${f(new Date())}`, `DTSTART:${f(start)}`, `DTEND:${f(end)}`,
    `SUMMARY:${title}`, `LOCATION:${place}`, `DESCRIPTION:Registration ${ref}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

export default function Checkout({ initial, when }: { initial: Session; when: string }) {
  const router = useRouter();
  const [session, setSession] = useState<Session>(initial);
  const [status, setStatus] = useState<{ busy: boolean; error?: string; field?: string }>({ busy: false });
  const { left, label } = useCountdown(session.expiresAt, session.status === 'open');
  const formRef = useRef<HTMLFormElement>(null);
  const expired = session.status === 'expired' || (session.status === 'open' && left === 0);

  // Keep what the visitor typed if they lose connection or refresh.
  useEffect(() => {
    const f = formRef.current;
    if (!f) return;
    try {
      const saved = JSON.parse(sessionStorage.getItem('ica-reg-draft') || '{}');
      Object.entries(saved).forEach(([k, v]) => {
        const el = f.elements.namedItem(k) as HTMLInputElement | null;
        if (el && !el.value) el.value = String(v);
      });
    } catch {}
  }, []);

  function saveDraft() {
    const f = formRef.current;
    if (!f) return;
    const d: Record<string, string> = {};
    new FormData(f).forEach((v, k) => (d[k] = String(v)));
    try {
      sessionStorage.setItem('ica-reg-draft', JSON.stringify(d));
    } catch {}
  }

  async function confirm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: Record<string, string> = {};
    new FormData(e.currentTarget).forEach((v, k) => (data[k] = String(v)));
    setStatus({ busy: true });
    try {
      const out = await api<{ ref: string; session: Session }>(`/api/checkout/sessions/${session.id}/confirm`, { method: 'POST', json: data, retries: 2 });
      setSession(out.session);
      setStatus({ busy: false });
      try {
        sessionStorage.removeItem('ica-reg-draft');
      } catch {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const ae = err as ApiError;
      setStatus({ busy: false, error: ae.message, field: ae.field });
      if (ae.status === 410) setSession((s) => ({ ...s, status: 'expired' }));
    }
  }

  async function cancel() {
    await api(`/api/checkout/sessions/${session.id}`, { method: 'DELETE' }).catch(() => null);
    router.push(`/register?event=${session.event?.id || ''}`);
  }

  const ev = session.event;
  const summary = (
    <div className="card overflow-hidden">
      {ev && <img src={ev.image} alt="" className="aspect-[16/9] w-full object-cover" />}
      <div className="p-6">
        <p className="eyebrow">Your booking</p>
        <h2 className="mt-2 font-display text-xl font-extrabold leading-snug">{ev?.title}</h2>
        <p className="mt-1 text-sm text-ink-muted">{when}</p>
        <p className="text-sm text-ink-muted">{ev?.place}</p>
        <ul className="mt-4 divide-y divide-line border-y border-line text-[15px]">
          {session.items.map((i) => (
            <li key={i.ticketId} className="flex justify-between py-3">
              <span>{i.qty} × {i.label}</span>
              <span className="font-semibold tabular-nums">{i.price ? `KES ${(i.qty * i.price).toLocaleString()}` : 'Free'}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between font-display font-bold">
          <span>Total</span>
          <span className="tabular-nums">{session.total ? `KES ${session.total.toLocaleString()}` : 'Free'}</span>
        </p>
      </div>
    </div>
  );

  return (
    <Layout noIndex title={session.status === "complete" ? "You’re registered" : "Complete registration"} description="Complete your ICA event registration.">
      <section className="bg-plum-900 pb-14 pt-32 text-white sm:pt-36">
        <div className="site-wrap">
          <ol className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.12em] text-white/60" aria-label="Progress">
            <li>1 · Choose</li><li aria-hidden="true">→</li>
            <li className={session.status !== 'complete' ? 'text-white' : ''}>2 · Your details</li><li aria-hidden="true">→</li>
            <li className={session.status === 'complete' ? 'text-white' : ''}>3 · Confirmed</li>
          </ol>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.02em] sm:text-5xl">
            {session.status === 'complete' ? <>You’re <span className="accent text-plum-200">registered!</span></> : 'Almost there.'}
          </h1>
        </div>
      </section>

      <section className="section !pt-12">
        <div className="site-wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {session.status === 'complete' ? (
              <div className="rounded-[2px] bg-plum-50 p-8 sm:p-10" role="status">
                <p className="eyebrow">Your reference</p>
                <p className="mt-2 font-display text-4xl font-extrabold tracking-[0.06em] text-plum-300 sm:text-5xl">{session.registrationRef}</p>
                <p className="body-copy mt-4">Show this reference at the welcome desk. If you gave us an email address, a confirmation is on its way.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {ev && session.registrationRef && (
                    <a href={icsHref(ev.title, ev.startsAt, ev.place, session.registrationRef)} download={`ica-${session.registrationRef}.ics`} className="btn-primary">
                      <Icon name="calendar" className="h-4 w-4" /> Add to calendar
                    </a>
                  )}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`I've registered for ${ev?.title} at ICA (${when}). Join me! ${process.env.NEXT_PUBLIC_SITE_URL || ''}/register`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    Invite a friend on WhatsApp
                  </a>
                </div>
                <Link href="/visit" className="link-arrow mt-8">What to expect on the day <Icon name="arrow" className="h-4 w-4" /></Link>
              </div>
            ) : expired ? (
              <div className="rounded-[2px] border border-line p-8" role="alert">
                <h2 className="font-display text-2xl font-extrabold">Your seats were released</h2>
                <p className="body-copy mt-2">We hold seats for {HOLD_MINUTES} minutes. Start again — it only takes a moment.</p>
                <Link href={`/register?event=${ev?.id || ''}`} className="btn-primary mt-6">Start again</Link>
              </div>
            ) : (
              <form ref={formRef} id="checkout-form" onSubmit={confirm} onInput={saveDraft} noValidate className="grid gap-5">
                <div className="flex items-center justify-between gap-4 rounded-2xl bg-plum-50 px-5 py-4 text-sm" aria-live="polite">
                  <span className="font-semibold text-plum-200">Your seats are held</span>
                  <span className="font-display text-lg font-extrabold tabular-nums text-plum-300">{label}</span>
                </div>
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
                </div>
                {[
                  { name: 'name', label: 'Full name', type: 'text', auto: 'name', hint: '' },
                  { name: 'phone', label: 'Phone / WhatsApp', type: 'tel', auto: 'tel', hint: 'We’ll only use this about your booking.' },
                  { name: 'email', label: 'Email (optional)', type: 'email', auto: 'email', hint: 'For your confirmation and calendar invite.' },
                ].map((f) => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="label">{f.label}</label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.auto}
                      aria-invalid={status.field === f.name || undefined}
                      aria-describedby={`${f.name}-help`}
                      className="field"
                    />
                    <p id={`${f.name}-help`} className={`mt-1.5 text-[13px] ${status.field === f.name ? 'font-medium text-red-700' : 'text-ink-faint'}`}>
                      {status.field === f.name ? status.error : f.hint}
                    </p>
                  </div>
                ))}
                {status.error && !status.field && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{status.error}</p>}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button type="submit" disabled={status.busy} className="btn-primary disabled:opacity-60">
                    {status.busy ? 'Confirming…' : 'Confirm registration'}
                  </button>
                  <button type="button" onClick={cancel} className="btn-outline">Cancel</button>
                </div>
                <p className="text-xs leading-5 text-ink-faint">
                  By registering you agree that {CHURCH.shortName} may contact you about this event. We never share your details.
                </p>
              </form>
            )}
          </div>
          <aside className="lg:col-span-5">{summary}</aside>
        </div>
      </section>
    </Layout>
  );
}
