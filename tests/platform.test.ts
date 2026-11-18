import { describe, expect, it, beforeEach } from 'vitest';
import { createSession, confirmSession, getSession, seatsLeft, resetCheckout, cancelSession } from '../lib/checkout';
import { findEvent, nextSundays, registrableEvents } from '../content/registrations';
import { createSessionToken, verifySessionToken, passwordMatches, serializeCookie } from '../lib/session';
import { recordPageView, summary, resetAnalytics, cleanPath } from '../lib/analytics';

describe('event registration checkout', () => {
  beforeEach(() => resetCheckout());
  const firstOpen = () => registrableEvents().find((e) => e.kind === 'service')!;

  it('computes upcoming Sundays in Nairobi time', () => {
    // Sunday 11 Oct 2026, 12:00 Nairobi → services have started, so next is the 18th
    expect(nextSundays(new Date('2026-10-11T09:00:00Z'))[0]).toBe('2026-10-18');
    // Saturday → tomorrow
    expect(nextSundays(new Date('2026-10-17T09:00:00Z'))[0]).toBe('2026-10-18');
  });

  it('holds seats, confirms once and is idempotent', () => {
    const e = firstOpen();
    const before = seatsLeft(e);
    const s = createSession({ eventId: e.id, quantities: { adult: 2, child: 1 } });
    expect(s.ok).toBe(true);
    if (!s.ok) return;
    expect(seatsLeft(e)).toBe(before - 3);
    const a = confirmSession(s.session.id, { name: 'Akinyi', phone: '+254712345678', email: '' });
    const b = confirmSession(s.session.id, { name: 'Akinyi', phone: '+254712345678', email: '' });
    expect(a.ok && b.ok && a.registration.ref === b.registration.ref).toBe(true);
    expect(b.ok && b.replay).toBe(true);
    expect(seatsLeft(e)).toBe(before - 3);
  });

  it('rejects empty, oversized and unknown orders', () => {
    const e = firstOpen();
    expect(createSession({ eventId: e.id, quantities: {} }).ok).toBe(false);
    expect(createSession({ eventId: e.id, quantities: { adult: 99 } }).ok).toBe(false);
    expect(createSession({ eventId: 'nope', quantities: { adult: 1 } }).ok).toBe(false);
  });

  it('releases seats when a session is cancelled', () => {
    const e = firstOpen();
    const before = seatsLeft(e);
    const s = createSession({ eventId: e.id, quantities: { adult: 4 } });
    if (!s.ok) throw new Error('expected session');
    cancelSession(s.session.id);
    expect(seatsLeft(e)).toBe(before);
    expect(getSession(s.session.id)?.status).toBe('cancelled');
  });

  it('closes registration for past events', () => {
    expect(createSession({ eventId: 'feast-of-the-word-2026', quantities: { adult: 1 } }).ok).toBe(false);
    expect(findEvent('feast-of-the-word-2026')).not.toBeNull();
  });
});

describe('admin session', () => {
  it('signs and verifies tokens, rejecting tampering and expiry', async () => {
    const t = await createSessionToken('admin', Date.now());
    expect(await verifySessionToken(t)).not.toBeNull();
    expect(await verifySessionToken(t.slice(0, -2) + 'xx')).toBeNull();
    expect(await verifySessionToken(t, Date.now() + 9 * 3600_000)).toBeNull();
  });
  it('checks the password and writes hardened cookies', async () => {
    expect(await passwordMatches('ica-admin-dev')).toBe(true);
    expect(await passwordMatches('wrong')).toBe(false);
    expect(serializeCookie('x', 'y', 60)).toMatch(/HttpOnly; SameSite=Strict/);
  });
});

describe('analytics', () => {
  it('counts anonymous visitors and ignores bots, admin and DNT', () => {
    resetAnalytics();
    const ua = 'Mozilla/5.0 (Linux; Android 14) Mobile';
    recordPageView({ path: '/visit?x=1', ua, ip: '1.1.1.1' });
    recordPageView({ path: '/visit', ua, ip: '1.1.1.1' });
    recordPageView({ path: '/', ua: 'Googlebot', ip: '2.2.2.2' });
    recordPageView({ path: '/admin', ua, ip: '3.3.3.3' });
    recordPageView({ path: '/', ua, ip: '4.4.4.4', dnt: true });
    const s = summary(30);
    expect(s.pageViews).toBe(2);
    expect(s.visitors).toBe(1);
    expect(s.devices[0].key).toBe('mobile');
    expect(cleanPath('/register/cs_abc')).toBe('/register/[session]');
  });
});
