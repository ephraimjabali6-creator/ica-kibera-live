import { describe, expect, it } from 'vitest';
import { normalizePhone, parseContactBody, parsePrayerBody, parseVisitBody, isBot, escapeHtml } from '../lib/validation';
import { rateLimit, resetRateLimits } from '../lib/rateLimit';
import { recordPrayer, listSubmissions, resetMemory } from '../lib/db';
import { SERMONS, sermonThumb } from '../content/church';

describe('validation', () => {
  it('normalises Kenyan phone numbers', () => {
    expect(normalizePhone('0712 345 678')).toBe('+254712345678');
    expect(normalizePhone('254112345678')).toBe('+254112345678');
  });

  it('needs a name, a message and a way to reply', () => {
    expect(parseContactBody({ name: '', phone: '0712345678', message: 'hi' }).ok).toBe(false);
    expect(parseContactBody({ name: 'Wanjiru', message: 'hi' }).ok).toBe(false);
    expect(parseContactBody({ name: 'Wanjiru', phone: '0712345678', message: 'Habari' }).ok).toBe(true);
  });

  it('allows anonymous prayer but needs a phone for a call-back', () => {
    const anon = parsePrayerBody({ request: 'Please pray for my family' });
    expect(anon.ok && anon.data.name).toBe('Anonymous');
    expect(parsePrayerBody({ request: 'Healing', wantsCall: true }).ok).toBe(false);
  });

  it('clamps visit party size', () => {
    const v = parseVisitBody({ name: 'Otieno', phone: '0712345678', adults: 0, children: 99 });
    expect(v.ok).toBe(true);
    if (v.ok) {
      expect(v.data.adults).toBe(1);
      expect(v.data.children).toBe(20);
    }
  });

  it('flags honeypot submissions and escapes html', () => {
    expect(isBot({ company: 'Spam Ltd' })).toBe(true);
    expect(escapeHtml('<b>')).toBe('&lt;b&gt;');
  });
});

describe('storage', () => {
  it('keeps prayer requests in memory without a database', () => {
    resetMemory();
    recordPrayer({ name: 'A', email: '', phone: '', request: 'Peace', isPrivate: true, wantsCall: false });
    expect(listSubmissions('prayer')).toHaveLength(1);
  });
});

describe('rate limit', () => {
  it('blocks after the window fills', () => {
    resetRateLimits();
    expect(rateLimit('t', 2)).toBe(true);
    expect(rateLimit('t', 2)).toBe(true);
    expect(rateLimit('t', 2)).toBe(false);
  });
});

describe('content', () => {
  it('has unique sermon ids and thumbnails', () => {
    const ids = SERMONS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(sermonThumb('jtxc_xak5R4')).toMatch(/^\/images\//);
    expect(sermonThumb('sGws-1NBcGw')).toMatch(/ytimg/);
  });
});
