import { db } from './index'

export function runMigrations(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL DEFAULT '',
      email TEXT UNIQUE,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      current_level INTEGER NOT NULL DEFAULT 1,
      total_xp INTEGER NOT NULL DEFAULT 0,
      total_hours REAL NOT NULL DEFAULT 0,
      streak_count INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS routines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      name TEXT NOT NULL DEFAULT 'Rotina Principal',
      period TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0,1))
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      routine_id INTEGER NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      time_slot TEXT,
      method TEXT,
      estimated_duration INTEGER NOT NULL DEFAULT 25,
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_completed INTEGER NOT NULL DEFAULT 0 CHECK (is_completed IN (0,1)),
      completed_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      routine_id INTEGER NOT NULL REFERENCES routines(id) ON DELETE CASCADE,
      task_id INTEGER NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
      topic TEXT NOT NULL,
      method TEXT,
      start_time TEXT NOT NULL,
      end_time TEXT,
      duration_minutes INTEGER,
      completed INTEGER NOT NULL DEFAULT 0 CHECK (completed IN (0,1)),
      notes TEXT,
      xp_earned INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_tasks_routine ON tasks(routine_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_routine ON sessions(routine_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_task ON sessions(task_id);
  `)

  addColumnIfMissing('routines', 'session_duration_minutes', 'INTEGER NOT NULL DEFAULT 90')
  addColumnIfMissing('routines', 'daily_hours_goal', 'REAL NOT NULL DEFAULT 6')
  addColumnIfMissing('routines', 'weekly_exercises_goal', 'INTEGER NOT NULL DEFAULT 50')
  addColumnIfMissing('routines', 'monthly_projects_goal', 'INTEGER NOT NULL DEFAULT 1')
  addColumnIfMissing('routines', 'method_distribution', 'TEXT')
  addColumnIfMissing('users', 'max_streak_count', 'INTEGER NOT NULL DEFAULT 0')

  seedIfEmpty()
}

function addColumnIfMissing(table: string, column: string, definition: string): void {
  const columns = db.pragma(`table_info(${table})`) as { name: string }[]
  if (columns.some((c) => c.name === column)) return
  db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`)
}

function seedIfEmpty(): void {
  const { n } = db.prepare('SELECT COUNT(*) as n FROM users').get() as { n: number }
  if (n > 0) return

  const { lastInsertRowid: userId } = db.prepare(`INSERT INTO users (name) VALUES ('')`).run()
  db.prepare(`INSERT INTO routines (user_id, name, is_active) VALUES (?, 'Rotina Principal', 1)`).run(userId)
}
