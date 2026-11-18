import { Pool } from 'pg';
import type { ContactInput, PrayerInput, VisitInput } from './validation';

export type SubmissionKind = 'contact' | 'prayer' | 'visit';

export interface Submission<T = Record<string, unknown>> {
  id: string;
  kind: SubmissionKind;
  data: T;
  createdAt: string;
}

const globalForDb = global as unknown as {
  submissions?: Submission[];
  pgPool?: Pool;
  schemaReady?: Promise<void>;
};

function memory(): Submission[] {
  if (!globalForDb.submissions) globalForDb.submissions = [];
  return globalForDb.submissions;
}

export function getPool(): Pool | null {
  if (!process.env.DATABASE_URL) return null;
  if (!globalForDb.pgPool) {
    globalForDb.pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? undefined : { rejectUnauthorized: false },
    });
  }
  return globalForDb.pgPool;
}

export function ensureSchema(): Promise<void> {
  const pool = getPool();
  if (!pool) return Promise.resolve();
  if (!globalForDb.schemaReady) {
    globalForDb.schemaReady = pool
      .query(
        `CREATE TABLE IF NOT EXISTS contact_messages (
           id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT, phone TEXT, subject TEXT,
           message TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
         CREATE TABLE IF NOT EXISTS prayer_requests (
           id TEXT PRIMARY KEY, name TEXT, email TEXT, phone TEXT, request TEXT NOT NULL,
           is_private BOOLEAN NOT NULL DEFAULT FALSE, wants_call BOOLEAN NOT NULL DEFAULT FALSE,
           status TEXT NOT NULL DEFAULT 'new', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
         CREATE TABLE IF NOT EXISTS checkout_sessions (
           id TEXT PRIMARY KEY, event_id TEXT NOT NULL, items JSONB NOT NULL, status TEXT NOT NULL,
           expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
         CREATE TABLE IF NOT EXISTS registrations (
           ref TEXT PRIMARY KEY, session_id TEXT UNIQUE NOT NULL, event_id TEXT NOT NULL, items JSONB NOT NULL,
           seats INT NOT NULL, name TEXT NOT NULL, phone TEXT, email TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
         CREATE TABLE IF NOT EXISTS page_views (
           id BIGSERIAL PRIMARY KEY, path TEXT NOT NULL, referrer TEXT, utm_source TEXT, device TEXT,
           visitor TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
         CREATE TABLE IF NOT EXISTS visit_plans (
           id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT, phone TEXT, visit_date DATE,
           service TEXT, adults INT, children INT, notes TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());`
      )
      .then(() => undefined);
  }
  return globalForDb.schemaReady;
}

function newId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function remember<T extends Record<string, unknown>>(kind: SubmissionKind, id: string, data: T): Submission<T> {
  const entry: Submission<T> = { id, kind, data, createdAt: new Date().toISOString() };
  const list = memory();
  list.unshift(entry as Submission);
  if (list.length > 500) list.length = 500;
  return entry;
}

export function persist(sql: string, params: unknown[]) {
  const pool = getPool();
  if (!pool) return;
  ensureSchema()
    .then(() => pool.query(sql, params))
    .catch((err) => console.error('[db] persist failed', err));
}

export function recordContact(input: ContactInput) {
  const id = newId('msg');
  persist(
    `INSERT INTO contact_messages (id, name, email, phone, subject, message) VALUES ($1,$2,$3,$4,$5,$6)`,
    [id, input.name, input.email || null, input.phone || null, input.subject || null, input.message]
  );
  return remember('contact', id, { ...input });
}

export function recordPrayer(input: PrayerInput) {
  const id = newId('pr');
  persist(
    `INSERT INTO prayer_requests (id, name, email, phone, request, is_private, wants_call) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [id, input.name, input.email || null, input.phone || null, input.request, input.isPrivate, input.wantsCall]
  );
  return remember('prayer', id, { ...input });
}

export function recordVisit(input: VisitInput) {
  const id = newId('vst');
  persist(
    `INSERT INTO visit_plans (id, name, email, phone, visit_date, service, adults, children, notes) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
    [id, input.name, input.email || null, input.phone || null, input.visitDate || null, input.service, input.adults, input.children, input.notes || null]
  );
  return remember('visit', id, { ...input });
}

export function listSubmissions(kind?: SubmissionKind) {
  return memory().filter((s) => !kind || s.kind === kind);
}

export function resetMemory() {
  globalForDb.submissions = [];
}
