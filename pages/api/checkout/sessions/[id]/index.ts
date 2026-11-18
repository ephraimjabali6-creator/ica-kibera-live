import type { NextApiRequest, NextApiResponse } from 'next';
import { guard } from '../../../../../lib/http';
import { cancelSession, getSession, publicSession } from '../../../../../lib/checkout';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!guard(req, res, { methods: ['GET', 'DELETE'], limit: ['checkout-read', 60] })) return;
  const id = String(req.query.id || '');
  const session = req.method === 'DELETE' ? cancelSession(id) : getSession(id);
  if (!session) return res.status(404).json({ error: 'This checkout session was not found. Please start again.' });
  return res.status(200).json({ session: publicSession(session) });
}
