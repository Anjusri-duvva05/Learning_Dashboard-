-- =============================================================
-- LearnOS — Supabase Setup Script
-- Run this in your Supabase SQL Editor (project > SQL Editor)
-- =============================================================

-- 1. Create the courses table
CREATE TABLE IF NOT EXISTS courses (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  title       text        NOT NULL,
  progress    integer     NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name   text        NOT NULL DEFAULT 'Code',
  created_at  timestamptz DEFAULT now()
);

-- 2. Enable Row-Level Security (RLS) — allows public read access
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read courses (public dashboard)
CREATE POLICY "Allow public read access"
  ON courses FOR SELECT
  USING (true);

-- 3. Seed with sample data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns',         75, 'Code'),
  ('TypeScript Mastery',              45, 'FileCode'),
  ('Next.js 14 & App Router',         90, 'Layers'),
  ('Node.js Backend Engineering',     30, 'Server')
ON CONFLICT DO NOTHING;

-- 4. Verify
SELECT * FROM courses ORDER BY created_at;
