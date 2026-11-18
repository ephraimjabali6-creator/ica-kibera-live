-- ICA Kibera schema. Safe to run more than once. (The app also creates these tables on first write.)
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prayer_requests (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone TEXT,
  request TEXT NOT NULL,
  is_private BOOLEAN NOT NULL DEFAULT FALSE,
  wants_call BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','praying','answered','archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS visit_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  visit_date DATE,
  service TEXT,
  adults INT,
  children INT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS prayer_requests_created_idx ON prayer_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS visit_plans_date_idx ON visit_plans(visit_date);
