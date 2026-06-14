-- Run this once to set up the D1 database
-- Command: wrangler d1 execute ai-roadmap-db --file=schema.sql

CREATE TABLE IF NOT EXISTS progress (
  user_id    TEXT NOT NULL,
  task_id    TEXT NOT NULL,
  checked    INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT,
  PRIMARY KEY (user_id, task_id)
);
