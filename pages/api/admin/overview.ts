import type { NextApiRequest, NextApiResponse } from 'next';
import { guard } from '../../../lib/http';
import { listSubmissions } from '../../../lib/db';
import { listRegistrations, seatsLeft } from '../../../lib/checkout';
import { summary } from '../../../lib/analytics';
import { registrableEvents } from '../../../content/registrations';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!guard(req, res, { methods: ['GET'] })) return;
  const regs = listRegistrations();
  res.status(200).json({
    analytics: summary(30),
    events: registrableEvents().map((e) => ({
      id: e.id,
      title: e.title,
      startsAt: e.startsAt,
      capacity: e.capacity,
      seatsLeft: seatsLeft(e),
      registrations: regs.filter((r) => r.eventId === e.id).length,
    })),
    registrations: regs.slice(0, 50),
    prayer: listSubmissions('prayer').slice(0, 50),
    visits: listSubmissions('visit').slice(0, 50),
    messages: listSubmissions('contact').slice(0, 50),
  });
}
