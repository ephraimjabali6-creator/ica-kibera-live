import type { NextApiRequest, NextApiResponse } from 'next';
import { guard } from '../../lib/http';
import { clientIp } from '../../lib/rateLimit';
import { recordPageView } from '../../lib/analytics';

export const config = { api: { bodyParser: { sizeLimit: '2kb' } } };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!guard(req, res, { methods: ['POST'], limit: ['collect', 120] })) return;
  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body); // sendBeacon posts text/plain
    } catch {
      body = {};
    }
  }
  recordPageView({
    path: body?.path,
    referrer: body?.referrer,
    search: body?.search,
    ua: String(req.headers['user-agent'] || ''),
    ip: clientIp(req.headers, req.socket?.remoteAddress || ''),
    dnt: req.headers['dnt'] === '1' || req.headers['sec-gpc'] === '1',
  });
  return res.status(204).end();
}
