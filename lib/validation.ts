const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Kenyan mobile (07xx / 01xx / +2547xx / +2541xx) or any international number with 7–15 digits.
const PHONE_PATTERN = /^\+?[0-9 ()-]{7,20}$/;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function cleanText(value: unknown, max = 2000): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Keeps line breaks (for prayer requests / messages) while trimming noise. */
export function cleanMultiline(value: unknown, max = 4000): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim().slice(0, max);
}

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value) && value.length <= 254;
}

export function isValidPhone(value: string): boolean {
  return PHONE_PATTERN.test(value) && value.replace(/\D/g, '').length >= 7;
}

/** Normalises Kenyan numbers to +254 format; leaves others untouched. */
export function normalizePhone(value: string): string {
  const digits = value.replace(/[^\d+]/g, '');
  if (/^0[17]\d{8}$/.test(digits)) return `+254${digits.slice(1)}`;
  if (/^254[17]\d{8}$/.test(digits)) return `+${digits}`;
  return digits;
}

type Result<T> = { ok: true; data: T } | { ok: false; error: string; field?: string };

function obj(body: unknown): Record<string, unknown> | null {
  return body && typeof body === 'object' ? (body as Record<string, unknown>) : null;
}

/** Honeypot: real people never fill the hidden "company" field. */
export function isBot(body: unknown): boolean {
  const raw = obj(body);
  return Boolean(raw && cleanText(raw.company, 100));
}

function contactPoint(raw: Record<string, unknown>) {
  const email = cleanText(raw.email, 254).toLowerCase();
  const phoneRaw = cleanText(raw.phone, 30);
  if (!email && !phoneRaw) return { error: 'Please give us a phone number or an email so we can reach you.', field: 'phone' };
  if (email && !isValidEmail(email)) return { error: 'That email address doesn’t look right.', field: 'email' };
  if (phoneRaw && !isValidPhone(phoneRaw)) return { error: 'That phone number doesn’t look right.', field: 'phone' };
  return { email, phone: phoneRaw ? normalizePhone(phoneRaw) : '' };
}

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function parseContactBody(body: unknown): Result<ContactInput> {
  const raw = obj(body);
  if (!raw) return { ok: false, error: 'A message is required.' };
  const name = cleanText(raw.name, 80);
  const subject = cleanText(raw.subject, 160);
  const message = cleanMultiline(raw.message, 4000);
  if (!name) return { ok: false, error: 'Please tell us your name.', field: 'name' };
  if (!message) return { ok: false, error: 'Please write a message.', field: 'message' };
  const cp = contactPoint(raw);
  if ('error' in cp) return { ok: false, error: cp.error!, field: cp.field };
  return { ok: true, data: { name, email: cp.email, phone: cp.phone, subject, message } };
}

export interface PrayerInput {
  name: string;
  email: string;
  phone: string;
  request: string;
  isPrivate: boolean;
  wantsCall: boolean;
}

export function parsePrayerBody(body: unknown): Result<PrayerInput> {
  const raw = obj(body);
  if (!raw) return { ok: false, error: 'A prayer request is required.' };
  const name = cleanText(raw.name, 80) || 'Anonymous';
  const request = cleanMultiline(raw.request, 3000);
  if (request.length < 3) return { ok: false, error: 'Please share what you’d like us to pray about.', field: 'request' };
  const wantsCall = Boolean(raw.wantsCall);
  const email = cleanText(raw.email, 254).toLowerCase();
  const phoneRaw = cleanText(raw.phone, 30);
  if (email && !isValidEmail(email)) return { ok: false, error: 'That email address doesn’t look right.', field: 'email' };
  if (phoneRaw && !isValidPhone(phoneRaw)) return { ok: false, error: 'That phone number doesn’t look right.', field: 'phone' };
  if (wantsCall && !phoneRaw) return { ok: false, error: 'Add a phone number so a pastor can call you.', field: 'phone' };
  return {
    ok: true,
    data: { name, email, phone: phoneRaw ? normalizePhone(phoneRaw) : '', request, isPrivate: Boolean(raw.isPrivate), wantsCall },
  };
}

export interface VisitInput {
  name: string;
  email: string;
  phone: string;
  visitDate: string;
  service: string;
  adults: number;
  children: number;
  notes: string;
}

export function parseVisitBody(body: unknown): Result<VisitInput> {
  const raw = obj(body);
  if (!raw) return { ok: false, error: 'Visit details are required.' };
  const name = cleanText(raw.name, 80);
  if (!name) return { ok: false, error: 'Please tell us your name.', field: 'name' };
  const cp = contactPoint(raw);
  if ('error' in cp) return { ok: false, error: cp.error!, field: cp.field };
  const visitDate = cleanText(raw.visitDate, 10);
  if (visitDate && !/^\d{4}-\d{2}-\d{2}$/.test(visitDate)) return { ok: false, error: 'Choose a valid date.', field: 'visitDate' };
  const service = cleanText(raw.service, 60) || 'Not sure yet';
  const clamp = (v: unknown, max: number) => Math.max(0, Math.min(max, Math.floor(Number(v) || 0)));
  return {
    ok: true,
    data: {
      name,
      email: cp.email,
      phone: cp.phone,
      visitDate,
      service,
      adults: Math.max(1, clamp(raw.adults, 20)),
      children: clamp(raw.children, 20),
      notes: cleanMultiline(raw.notes, 1000),
    },
  };
}
