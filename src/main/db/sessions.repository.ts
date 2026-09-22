import { db } from './index'
import { getActiveRoutineId, getDefaultUser } from './users.repository'
import { getById as getTaskById } from './tasks.repository'
import type { Session, StudyMethod, Task, User } from '@shared/types'

interface SessionRow {
  id: number
  routine_id: number
  task_id: number
  topic: string
  method: StudyMethod | null
  start_time: string
  end_time: string | null
  duration_minutes: number | null
  completed: number
  notes: string | null
}

function mapSession(row: SessionRow): Session {
  return {
    id: row.id,
    routineId: row.routine_id,
    taskId: row.task_id,
    topic: row.topic,
    method: row.method,
    startTime: row.start_time,
    endTime: row.end_time,
    durationMinutes: row.duration_minutes,
    completed: row.completed === 1,
    notes: row.notes
  }
}

function getById(id: number): Session {
  const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id) as SessionRow
  return mapSession(row)
}

export function start(taskId: number): Session {
  const task = getTaskById(taskId)
  const routineId = getActiveRoutineId()
  const startTime = new Date().toISOString()

  const { lastInsertRowid } = db
    .prepare('INSERT INTO sessions (routine_id, task_id, topic, method, start_time) VALUES (?, ?, ?, ?, ?)')
    .run(routineId, taskId, task.title, task.method, startTime)

  return getById(Number(lastInsertRowid))
}

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function recalcStreakAndHours(): void {
  const rows = db
    .prepare('SELECT DISTINCT date(start_time) as day FROM sessions WHERE completed = 1 ORDER BY day DESC')
    .all() as { day: string }[]

  const days = new Set(rows.map((r) => r.day))
  let streak = 0

  if (days.size > 0) {
    let cursor = toDateStr(new Date())
    if (!days.has(cursor)) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      cursor = toDateStr(yesterday)
    }

    while (days.has(cursor)) {
      streak += 1
      const [y, m, d] = cursor.split('-').map(Number)
      const prev = new Date(Date.UTC(y, m - 1, d))
      prev.setUTCDate(prev.getUTCDate() - 1)
      cursor = toDateStr(prev)
    }
  }

  const { totalMinutes } = db
    .prepare('SELECT COALESCE(SUM(duration_minutes), 0) as totalMinutes FROM sessions WHERE completed = 1')
    .get() as { totalMinutes: number }

  db.prepare(
    'UPDATE users SET streak_count = ?, total_hours = ? WHERE id = (SELECT id FROM users ORDER BY id LIMIT 1)'
  ).run(streak, totalMinutes / 60)
}

const runEndAndComplete = db.transaction(
  (sessionId: number): { session: Session; task: Task; user: User } => {
    const session = getById(sessionId)
    const endTime = new Date().toISOString()
    const durationMinutes = Math.max(
      1,
      Math.round((new Date(endTime).getTime() - new Date(session.startTime).getTime()) / 60000)
    )

    db.prepare('UPDATE sessions SET end_time = ?, duration_minutes = ?, completed = 1 WHERE id = ?').run(
      endTime,
      durationMinutes,
      sessionId
    )

    db.prepare('UPDATE tasks SET is_completed = 1, completed_at = ? WHERE id = ?').run(endTime, session.taskId)

    recalcStreakAndHours()

    return {
      session: getById(sessionId),
      task: getTaskById(session.taskId),
      user: getDefaultUser()
    }
  }
)

export function endAndComplete(sessionId: number): { session: Session; task: Task; user: User } {
  return runEndAndComplete(sessionId)
}

export function discard(sessionId: number): { id: number } {
  db.prepare('DELETE FROM sessions WHERE id = ?').run(sessionId)
  return { id: sessionId }
}
