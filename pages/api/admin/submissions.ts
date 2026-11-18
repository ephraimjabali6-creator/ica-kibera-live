import type { NextApiRequest, NextApiResponse } from 'next';
import { guard } from '../../../lib/http';
import { listSubmissions, type SubmissionKind } from '../../../lib/db';

// Protected by middleware.ts (admin session cookie required).
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!guard(req, res, { methods: ['GET'] })) return;
  const kind = typeof req.query.kind === 'string' ? (req.query.kind as SubmissionKind) : undefined;
  return res.status(200).json({ submissions: listSubmissions(kind) });
}
