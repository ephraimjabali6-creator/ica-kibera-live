import type { NextApiRequest, NextApiResponse } from 'next';
import { guard } from '../../../lib/http';
import { listSubmissions, type SubmissionKind } from '../../../lib/db';
import { listRegistrations } from '../../../lib/checkout';

function csv(rows: Record<string, unknown>[]) {
  if (!rows.length) return '';
  const cols = Array.from(new Set(rows.flatMap((r) => Object.keys(r))));
  // Prefix cells that start with = + - @ to stop spreadsheet formula injection.
  const cell = (v: unknown) => {
    let s = typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v ?? '');
    if (/^[=@]/.test(s) || /^[+-](?!\d)/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  return [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n');
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!guard(req, res, { methods: ['GET'] })) return;
  const kind = String(req.query.kind || 'registrations');
  const rows =
    kind === 'registrations'
      ? listRegistrations().map((r) => ({ ...r, items: r.items.map((i) => `${i.qty}x ${i.label}`).join('; ') }))
      : listSubmissions(kind as SubmissionKind).map((s) => ({ id: s.id, createdAt: s.createdAt, ...s.data }));
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="ica-${kind}-${new Date().toISOString().slice(0, 10)}.csv"`);
  res.status(200).send(csv(rows as Record<string, unknown>[]));
}
