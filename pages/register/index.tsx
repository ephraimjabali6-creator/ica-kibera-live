import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/Layout';
import PageHero from '../../components/PageHero';
import Icon from '../../components/Icon';
import { api, ApiError } from '../../lib/api';
import { formatEventDate, isOpen, registrableEvents } from '../../content/registrations';
import { seatsLeft } from '../../lib/checkout';

interface EventView {
  id: string;
  title: string;
  kind: string;
  startsAt: string;
  when: string;
  place: string;
  summary: string;
  image: string;
  open: boolean;
  seatsLeft: number;
  tickets: { id: string; label: string; price: number; maxPerOrder: number }[];
}

export const getServerSideProps: GetServerSideProps<{ events: EventView[]; selected: string | null }> = async ({ query, res }) => {
  res.setHeader('Cache-Control', 'no-store');
  const now = new Date();
  const events = registrableEvents(now).map((e) => ({
    id: e.id,
    title: e.title,
    kind: e.kind,
    startsAt: e.startsAt,
    when: formatEventDate(e.startsAt),
    place: e.place,
    summary: e.summary,
    image: e.image,
    open: isOpen(e, now),
    seatsLeft: seatsLeft(e),
    tickets: e.tickets,
  }));
  const wanted = typeof query.event === 'string' ? query.event : null;
  const firstOpen = events.find((e) => e.open && e.seatsLeft > 0)?.id || null;
  return { props: { events, selected: events.some((e) => e.id === wanted) ? wanted : firstOpen } };
};

export default function Register({ events, selected }: { events: EventView[]; selected: string | null }) {
  const router = useRouter();
  const [eventId, setEventId] = useState(selected);
  const [qty, setQty] = useState<Record<string, number>>({ adult: 1 });
  const [state, setState] = useState<{ busy: boolean; error?: string }>({ busy: false });
  const event = events.find((e) => e.id === eventId);
  const seats = Object.values(qty).reduce((a, b) => a + b, 0);

  async function start(e: React.FormEvent) {
    e.preventDefault();
    if (!event) return;
    setState({ busy: true });
    try {
      const { session } = await api<{ session: { id: string } }>('/api/checkout/sessions', { method: 'POST', json: { eventId: event.id, quantities: qty } });
      router.push(`/register/${session.id}`);
    } catch (err) {
      setState({ busy: false, error: (err as ApiError).message });
    }
  }

  return (
    <Layout title="Register" description="Reserve seats for Sunday services and register for ICA conferences and special services.">
      <PageHero
        eyebrow="Register"
        title={<>Reserve your <span className="accent text-plum-200">seat.</span></>}
        intro="Booking is free and takes a minute. Our welcome team will be ready for you and your family."
        image="/images/worship-sanctuary.jpg"
      />
      <section className="section">
        <form id="register-form" onSubmit={start} className="site-wrap grid gap-10 lg:grid-cols-12">
          <fieldset className="lg:col-span-7">
            <legend className="eyebrow mb-5">1 · Choose a service or event</legend>
            <div className="grid gap-4">
              {events.map((e) => {
                const disabled = !e.open || e.seatsLeft === 0;
                const active = e.id === eventId;
                return (
                  <label
                    key={e.id}
                    className={`flex cursor-pointer items-center gap-4 rounded-[2px] border-2 p-3 pr-5 transition ${
                      active ? 'border-plum-600 bg-plum-50' : 'border-line bg-mist hover:border-plum-300'
                    } ${disabled ? 'cursor-not-allowed opacity-55' : ''}`}
                  >
                    <input type="radio" name="eventId" value={e.id} checked={active} disabled={disabled} onChange={() => setEventId(e.id)} className="sr-only" />
                    <img src={e.image} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover sm:w-32" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[17px] font-bold leading-snug text-ink">{e.title}</span>
                      <span className="mt-1 block text-sm text-ink-muted">{e.when}</span>
                      <span className="mt-1 block text-sm font-semibold text-plum-600">
                        {!e.open ? 'Registration closed' : e.seatsLeft === 0 ? 'Full' : `${e.seatsLeft} seats left · Free`}
                      </span>
                    </span>
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${active ? 'border-plum-600 bg-plum-500 text-paper' : 'border-line'}`}>
                      {active && <Icon name="check" className="h-4 w-4" />}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="lg:col-span-5">
            <div className="card sticky top-6 p-6 sm:p-8">
              <p className="eyebrow">2 · How many seats?</p>
              {event ? (
                <>
                  <div className="mt-5 divide-y divide-line">
                    {event.tickets.map((t) => (
                      <div key={t.id} className="flex items-center justify-between gap-4 py-4">
                        <span>
                          <span className="block font-semibold text-ink">{t.label}</span>
                          <span className="text-sm text-ink-faint">{t.price ? `KES ${t.price.toLocaleString()} at the venue` : 'Free'}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <button type="button" aria-label={`Fewer ${t.label}`} onClick={() => setQty((q) => ({ ...q, [t.id]: Math.max(0, (q[t.id] || 0) - 1) }))} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xl font-bold hover:border-plum-500">−</button>
                          <input
                            aria-label={`${t.label} seats`}
                            name={`qty-${t.id}`}
                            value={qty[t.id] || 0}
                            onChange={(ev) => setQty((q) => ({ ...q, [t.id]: Math.min(t.maxPerOrder, Math.max(0, Number(ev.target.value.replace(/\D/g, '')) || 0)) }))}
                            inputMode="numeric"
                            className="h-11 w-12 rounded-lg border border-line text-center font-display text-lg font-bold tabular-nums"
                          />
                          <button type="button" aria-label={`More ${t.label}`} onClick={() => setQty((q) => ({ ...q, [t.id]: Math.min(t.maxPerOrder, (q[t.id] || 0) + 1) }))} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xl font-bold hover:border-plum-500">+</button>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl bg-mist p-4 text-sm text-ink-muted">
                    <p className="font-semibold text-ink">{event.title}</p>
                    <p>{event.when} · {event.place}</p>
                  </div>
                  {state.error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{state.error}</p>}
                  <button type="submit" disabled={state.busy || seats === 0} className="btn-primary mt-6 w-full disabled:opacity-50">
                    {state.busy ? 'Holding your seats…' : `Continue with ${seats} seat${seats === 1 ? '' : 's'}`} <Icon name="arrow" className="h-4 w-4" />
                  </button>
                  <p className="mt-3 text-center text-xs text-ink-faint">Seats are held for 15 minutes while you add your details.</p>
                </>
              ) : (
                <p className="body-copy mt-4">There’s nothing open for registration right now. Please check back soon.</p>
              )}
            </div>
          </div>
        </form>
      </section>
    </Layout>
  );
}
