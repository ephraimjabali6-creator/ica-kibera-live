import type { NextApiRequest, NextApiResponse } from 'next';
import { guard } from '../../lib/http';
import { isOpen, registrableEvents } from '../../content/registrations';
import { seatsLeft } from '../../lib/checkout';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!guard(req, res, { methods: ['GET'], limit: ['events', 60] })) return;
  const now = new Date();
  res.status(200).json({
    events: registrableEvents(now).map((e) => ({
      id: e.id,
      title: e.title,
      kind: e.kind,
      startsAt: e.startsAt,
      place: e.place,
      summary: e.summary,
      image: e.image,
      tickets: e.tickets,
      open: isOpen(e, now),
      seatsLeft: seatsLeft(e),
    })),
  });
}
