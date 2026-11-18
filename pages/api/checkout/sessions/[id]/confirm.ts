import type { NextApiRequest, NextApiResponse } from 'next';
import { guard, log } from '../../../../../lib/http';
import { confirmSession, publicSession, getSession } from '../../../../../lib/checkout';
import { cleanText, isBot, isValidEmail, isValidPhone, normalizePhone } from '../../../../../lib/validation';
import { notifyRegistration } from '../../../../../lib/email';
import { findEvent, formatEventDate } from '../../../../../content/registrations';

export const config = { api: { bodyParser: { sizeLimit: '8kb' } } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!guard(req, res, { methods: ['POST'], limit: ['checkout-confirm', 8] })) return;
  const id = String(req.query.id || '');
  const body = (req.body || {}) as Record<string, unknown>;
  if (isBot(body)) return res.status(400).json({ error: 'Could not complete registration.' });

  const name = cleanText(body.name, 80);
  const email = cleanText(body.email, 254).toLowerCase();
  const phoneRaw = cleanText(body.phone, 30);
  if (!name) return res.status(400).json({ error: 'Please tell us your name.', field: 'name' });
  if (!phoneRaw && !email) return res.status(400).json({ error: 'Add a phone number or email so we can send your confirmation.', field: 'phone' });
  if (phoneRaw && !isValidPhone(phoneRaw)) return res.status(400).json({ error: 'That phone number doesn’t look right.', field: 'phone' });
  if (email && !isValidEmail(email)) return res.status(400).json({ error: 'That email address doesn’t look right.', field: 'email' });

  const result = confirmSession(id, { name, email, phone: phoneRaw ? normalizePhone(phoneRaw) : '' });
  if (!result.ok) return res.status(result.status).json({ error: result.error });

  const r = result.registration;
  if (!result.replay) {
    log('checkout.completed', { session: id, ref: r.ref, event: r.eventId, seats: r.seats });
    const event = findEvent(r.eventId);
    notifyRegistration({ ...r, eventTitle: event?.title || r.eventId, when: event ? formatEventDate(event.startsAt) : '' }).catch((e) =>
      console.warn('[registration email]', e)
    );
  }
  return res.status(200).json({ ref: r.ref, session: publicSession(getSession(id)!) });
}
