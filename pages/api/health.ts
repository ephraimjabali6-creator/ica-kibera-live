import type { NextApiRequest, NextApiResponse } from 'next';
import { getPool } from '../../lib/db';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  let database: 'not configured' | 'ok' | 'error' = 'not configured';
  const pool = getPool();
  if (pool) {
    try {
      await pool.query('SELECT 1');
      database = 'ok';
    } catch {
      database = 'error';
    }
  }
  res.status(database === 'error' ? 503 : 200).json({
    ok: database !== 'error',
    service: 'ica-website',
    database,
    email: Boolean(process.env.RESEND_API_KEY),
    adminConfigured: Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET),
    time: new Date().toISOString(),
  });
}
