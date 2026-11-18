import { randomBytes } from 'crypto';
import { findEvent, isOpen, type RegEvent } from '../content/registrations';
import { persist } from './db';

/**
 * Checkout sessions for event registration.
 *
 * 1. createSession  – holds seats for 15 minutes while the visitor fills in their details
 * 2. confirmSession – turns the hold into a registration with a reference (idempotent)
 * 3. expired / cancelled sessions release their seats automatically
 */

import { HOLD_MINUTES } from '../content/registrations';
export { HOLD_MINUTES };

export interface LineItem {
  ticketId: string;
  label: string;
  qty: number;
  price: number;
}

export interface CheckoutSession {
  id: string;
  eventId: string;
  items: LineItem[];
  seats: number;
  total: number;
  status: 'open' | 'complete' | 'expired' | 'cancelled';
  expiresAt: string;
  createdAt: string;
  registrationRef?: string;
}

export interface Registration {
  ref: string;
  sessionId: string;
  eventId: string;
  items: LineItem[];
  seats: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

type Store = { sessions: Map<string, CheckoutSession>; registrations: Map<string, Registration> };
const g = global as unknown as { checkoutStore?: Store };
function store(): Store {
  if (!g.checkoutStore) g.checkoutStore = { sessions: new Map(), registrations: new Map() };
  return g.checkoutStore;
}

export function resetCheckout() {
  g.checkoutStore = { sessions: new Map(), registrations: new Map() };
}

function token(prefix: string, bytes = 12) {
  return `${prefix}_${randomBytes(bytes).toString('base64url')}`;
}

/** Human-friendly reference without look-alike characters, e.g. ICA-7KQ2MX */
function reference() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = randomBytes(6);
  return 'ICA-' + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
}

function expireStale(now = Date.now()) {
  store().sessions.forEach((s) => {
    if (s.status === 'open' && new Date(s.expiresAt).getTime() <= now) s.status = 'expired';
  });
}

export function seatsTaken(eventId: string, exceptSession?: string) {
  expireStale();
  let taken = 0;
  store().registrations.forEach((r) => {
    if (r.eventId === eventId) taken += r.seats;
  });
  store().sessions.forEach((s) => {
    if (s.eventId === eventId && s.status === 'open' && s.id !== exceptSession) taken += s.seats;
  });
  return taken;
}

export function seatsLeft(e: RegEvent, exceptSession?: string) {
  return Math.max(0, e.capacity - seatsTaken(e.id, exceptSession));
}

type Fail = { ok: false; status: number; error: string };

export function createSession(input: unknown, now = new Date()): { ok: true; session: CheckoutSession } | Fail {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const event = typeof raw.eventId === 'string' ? findEvent(raw.eventId, now) : null;
  if (!event) return { ok: false, status: 404, error: 'That event could not be found.' };
  if (!isOpen(event, now)) return { ok: false, status: 409, error: 'Registration for this event has closed.' };

  const qty = (raw.quantities && typeof raw.quantities === 'object' ? raw.quantities : {}) as Record<string, unknown>;
  const items: LineItem[] = [];
  for (const t of event.tickets) {
    const n = Math.floor(Number(qty[t.id]) || 0);
    if (n < 0 || n > t.maxPerOrder) return { ok: false, status: 400, error: `You can book up to ${t.maxPerOrder} ${t.label.toLowerCase()} seats at a time.` };
    if (n > 0) items.push({ ticketId: t.id, label: t.label, qty: n, price: t.price });
  }
  const seats = items.reduce((a, i) => a + i.qty, 0);
  if (seats === 0) return { ok: false, status: 400, error: 'Choose at least one seat.' };
  const left = seatsLeft(event);
  if (seats > left) return { ok: false, status: 409, error: left === 0 ? 'This event is full.' : `Only ${left} seats are left.` };

  const session: CheckoutSession = {
    id: token('cs'),
    eventId: event.id,
    items,
    seats,
    total: items.reduce((a, i) => a + i.qty * i.price, 0),
    status: 'open',
    expiresAt: new Date(now.getTime() + HOLD_MINUTES * 60_000).toISOString(),
    createdAt: now.toISOString(),
  };
  store().sessions.set(session.id, session);
  persist(
    `INSERT INTO checkout_sessions (id, event_id, items, status, expires_at) VALUES ($1,$2,$3,$4,$5)`,
    [session.id, session.eventId, JSON.stringify(items), session.status, session.expiresAt]
  );
  return { ok: true, session };
}

export function getSession(id: string) {
  expireStale();
  return store().sessions.get(id) || null;
}

export function getRegistration(ref: string) {
  return store().registrations.get(ref) || null;
}

export function cancelSession(id: string) {
  const s = getSession(id);
  if (s && s.status === 'open') {
    s.status = 'cancelled';
    persist(`UPDATE checkout_sessions SET status='cancelled' WHERE id=$1`, [id]);
  }
  return s;
}

export function confirmSession(
  id: string,
  attendee: { name: string; phone: string; email: string }
): { ok: true; registration: Registration; replay: boolean } | Fail {
  const s = getSession(id);
  if (!s) return { ok: false, status: 404, error: 'This checkout session was not found. Please start again.' };
  if (s.status === 'complete' && s.registrationRef) {
    // Idempotent: a double-click or a retry after a network drop returns the same registration.
    return { ok: true, registration: store().registrations.get(s.registrationRef)!, replay: true };
  }
  if (s.status === 'expired') return { ok: false, status: 410, error: `Your seats were held for ${HOLD_MINUTES} minutes and have been released. Please start again.` };
  if (s.status === 'cancelled') return { ok: false, status: 410, error: 'This checkout was cancelled. Please start again.' };

  const event = findEvent(s.eventId);
  if (!event) return { ok: false, status: 404, error: 'That event is no longer available.' };

  let ref = reference();
  while (store().registrations.has(ref)) ref = reference();
  const registration: Registration = {
    ref,
    sessionId: s.id,
    eventId: s.eventId,
    items: s.items,
    seats: s.seats,
    ...attendee,
    createdAt: new Date().toISOString(),
  };
  store().registrations.set(ref, registration);
  s.status = 'complete';
  s.registrationRef = ref;
  persist(`UPDATE checkout_sessions SET status='complete' WHERE id=$1`, [s.id]);
  persist(
    `INSERT INTO registrations (ref, session_id, event_id, items, seats, name, phone, email) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     ON CONFLICT (session_id) DO NOTHING`,
    [ref, s.id, s.eventId, JSON.stringify(s.items), s.seats, attendee.name, attendee.phone || null, attendee.email || null]
  );
  return { ok: true, registration, replay: false };
}

export function listRegistrations() {
  return Array.from(store().registrations.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Public view of a session (no personal data). */
export function publicSession(s: CheckoutSession) {
  const event = findEvent(s.eventId);
  return {
    id: s.id,
    status: s.status,
    expiresAt: s.expiresAt,
    items: s.items,
    seats: s.seats,
    total: s.total,
    registrationRef: s.registrationRef,
    event: event && { id: event.id, title: event.title, startsAt: event.startsAt, place: event.place, image: event.image },
  };
}
