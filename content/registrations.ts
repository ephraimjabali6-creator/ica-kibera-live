// Events people can register for online. Sunday services are generated for the
// next two Sundays automatically; add conferences to CONFERENCES below.

export interface Ticket {
  id: string;
  label: string;
  /** KES. 0 = free. Paid tickets are settled at the venue (no online payment). */
  price: number;
  maxPerOrder: number;
}

export interface RegEvent {
  id: string;
  title: string;
  kind: 'service' | 'conference';
  startsAt: string; // ISO, Nairobi time (+03:00)
  place: string;
  summary: string;
  image: string;
  capacity: number;
  tickets: Ticket[];
  closesAt?: string;
}

export const HOLD_MINUTES = 15;

const FREE_TICKETS: Ticket[] = [
  { id: 'adult', label: 'Adult', price: 0, maxPerOrder: 10 },
  { id: 'child', label: 'Child (under 13)', price: 0, maxPerOrder: 10 },
];

/** Add conferences, camps and special services here. */
export const CONFERENCES: RegEvent[] = [
  {
    id: 'feast-of-the-word-2026',
    title: 'Feast of the Word — Joint Special Sunday Service',
    kind: 'conference',
    startsAt: '2026-08-09T09:00:00+03:00',
    place: 'ICA, Kibera',
    summary: 'A joint service with Bishop Andrew & Dr. Ruth Ouma. Lunch served.',
    image: '/images/feast-of-the-word-2026.jpg',
    capacity: 600,
    tickets: FREE_TICKETS,
  },
];

const SUNDAY_SERVICES = [
  { slot: '0830', time: '08:30', title: 'Sunday First Service', capacity: 250 }, // CONFIRM capacity
  { slot: '1100', time: '11:00', title: 'Sunday Second Service', capacity: 350 }, // CONFIRM capacity
];

/** YYYY-MM-DD of the next `count` Sundays in Nairobi time (today counts if before 11:00). */
export function nextSundays(now: Date, count = 2): string[] {
  const nairobi = new Date(now.getTime() + 3 * 3600_000); // UTC+3, no DST
  const out: string[] = [];
  const d = new Date(Date.UTC(nairobi.getUTCFullYear(), nairobi.getUTCMonth(), nairobi.getUTCDate()));
  const dow = d.getUTCDay();
  let add = (7 - dow) % 7;
  if (add === 0 && nairobi.getUTCHours() >= 11) add = 7;
  d.setUTCDate(d.getUTCDate() + add);
  for (let i = 0; i < count; i++) {
    out.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 7);
  }
  return out;
}

export function registrableEvents(now = new Date()): RegEvent[] {
  const sundays: RegEvent[] = nextSundays(now).flatMap((day) =>
    SUNDAY_SERVICES.map((s) => ({
      id: `sunday-${day}-${s.slot}`,
      title: s.title,
      kind: 'service' as const,
      startsAt: `${day}T${s.time}:00+03:00`,
      place: 'ICA, Kibera',
      summary: 'Reserve seats so our welcome team can greet you and seat your family together.',
      image: s.slot === '0830' ? '/images/worship-sanctuary.jpg' : '/images/sanctuary-keyboard.jpg',
      capacity: s.capacity,
      tickets: FREE_TICKETS,
    }))
  );
  return [...sundays, ...CONFERENCES].sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export function findEvent(id: string, now = new Date()) {
  return registrableEvents(now).find((e) => e.id === id) || null;
}

export function isOpen(e: RegEvent, now = new Date()) {
  const closes = new Date(e.closesAt || e.startsAt).getTime();
  return now.getTime() < closes;
}

export function formatEventDate(iso: string) {
  return new Intl.DateTimeFormat('en-KE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Africa/Nairobi',
  }).format(new Date(iso));
}
