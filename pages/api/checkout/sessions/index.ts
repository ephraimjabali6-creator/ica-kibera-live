import type { NextApiRequest, NextApiResponse } from 'next';
import { guard, log } from '../../../../lib/http';
import { createSession, publicSession } from '../../../../lib/checkout';

export const config = { api: { bodyParser: { sizeLimit: '8kb' } } };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!guard(req, res, { methods: ['POST'], limit: ['checkout', 10] })) return;
  const result = createSession(req.body);
  if (!result.ok) return res.status(result.status).json({ error: result.error });
  log('checkout.session_created', { session: result.session.id, event: result.session.eventId, seats: result.session.seats });
  return res.status(201).json({ session: publicSession(result.session) });
}
