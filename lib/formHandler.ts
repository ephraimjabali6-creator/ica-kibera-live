import type { NextApiRequest, NextApiResponse } from 'next';
import { guard, log } from './http';
import { isBot } from './validation';

type Parsed<T> = { ok: true; data: T } | { ok: false; error: string; field?: string };

/** Shared POST handler: method guard, rate limit, honeypot, validation, save, notify. */
export function formHandler<T>(opts: {
  name: string;
  limit?: number;
  parse: (body: unknown) => Parsed<T>;
  save: (data: T) => { id: string };
  notify: (data: T & { id: string }) => Promise<unknown>;
  success: (data: T) => string;
}) {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!guard(req, res, { methods: ['POST'], limit: [opts.name, opts.limit ?? 6] })) return;

    // Quietly accept bot submissions without storing them.
    if (isBot(req.body)) return res.status(200).json({ success: true, message: opts.success({} as T) });

    const parsed = opts.parse(req.body);
    if (!parsed.ok) return res.status(400).json({ error: parsed.error, field: parsed.field });

    try {
      const saved = opts.save(parsed.data);
      await opts.notify({ ...parsed.data, id: saved.id }).catch((err) => console.warn(`[${opts.name} email]`, err));
      log('form.submitted', { form: opts.name, id: saved.id });
      return res.status(200).json({ success: true, id: saved.id, message: opts.success(parsed.data) });
    } catch (error) {
      console.error(`[${opts.name}]`, error);
      return res.status(500).json({ error: 'Something went wrong. Please try again or call the church office.' });
    }
  };
}
