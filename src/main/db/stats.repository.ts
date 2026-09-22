import { db } from './index'
import type { StatsSnapshot, StudyMethod } from '@shared/types'

function toDateStr(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function getDailyHours(days: number): StatsSnapshot['dailyHours'] {
  const rows = db
    .prepare(
      `SELECT date(start_time) as day, SUM(duration_minutes) as minutes
       FROM sessions WHERE completed = 1 AND date(start_time) >= date('now', ?)
       GROUP BY day`
    )
    .all(`-${days - 1} days`) as { day: string; minutes: number }[]

  const byDay = new Map(rows.map((r) => [r.day, r.minutes]))
  const result: StatsSnapshot['dailyHours'] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setUTCDate(d.getUTCDate() - i)
    const day = toDateStr(d)
    result.push({ date: day, hours: Math.round(((byDay.get(day) ?? 0) / 60) * 10) / 10 })
  }
  return result
}

function getMethodBreakdown(): StatsSnapshot['methodBreakdown'] {
  const rows = db
    .prepare(
      `SELECT method, COUNT(*) as sessions FROM sessions
       WHERE completed = 1 AND method IS NOT NULL GROUP BY method`
    )
    .all() as { method: StudyMethod; sessions: number }[]

  const total = rows.reduce((sum, r) => sum + r.sessions, 0)
  return rows.map((r) => ({
    method: r.method,
    sessions: r.sessions,
    percent: total > 0 ? Math.round((r.sessions / total) * 100) : 0
  }))
}

function getStreakCalendar(days: number): StatsSnapshot['streakCalendar'] {
  const rows = db
    .prepare(
      `SELECT DISTINCT date(start_time) as day FROM sessions
       WHERE completed = 1 AND date(start_time) >= date('now', ?)`
    )
    .all(`-${days - 1} days`) as { day: string }[]
  const studiedDays = new Set(rows.map((r) => r.day))

  const result: StatsSnapshot['streakCalendar'] = []
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setUTCDate(d.getUTCDate() - i)
    const day = toDateStr(d)
    result.push({ date: day, studied: studiedDays.has(day) })
  }
  return result
}

function getSummary(): StatsSnapshot['summary'] {
  const user = db
    .prepare('SELECT total_hours, streak_count, max_streak_count FROM users ORDER BY id LIMIT 1')
    .get() as { total_hours: number; streak_count: number; max_streak_count: number }

  const { sessionsCompleted } = db
    .prepare('SELECT COUNT(*) as sessionsCompleted FROM sessions WHERE completed = 1')
    .get() as { sessionsCompleted: number }

  const { sessionsCompletedThisWeek } = db
    .prepare(
      `SELECT COUNT(*) as sessionsCompletedThisWeek FROM sessions
       WHERE completed = 1 AND date(start_time) >= date('now', '-6 days')`
    )
    .get() as { sessionsCompletedThisWeek: number }

  const { studiedDays } = db
    .prepare('SELECT COUNT(DISTINCT date(start_time)) as studiedDays FROM sessions WHERE completed = 1')
    .get() as { studiedDays: number }

  const { bestDayMinutes } = db
    .prepare(
      `SELECT COALESCE(MAX(dayMinutes), 0) as bestDayMinutes FROM (
         SELECT SUM(duration_minutes) as dayMinutes FROM sessions WHERE completed = 1 GROUP BY date(start_time)
       )`
    )
    .get() as { bestDayMinutes: number }

  return {
    totalHours: Math.round(user.total_hours * 10) / 10,
    avgDailyHours: studiedDays > 0 ? Math.round((user.total_hours / studiedDays) * 10) / 10 : 0,
    bestDayHours: Math.round((bestDayMinutes / 60) * 10) / 10,
    currentStreak: user.streak_count,
    maxStreak: user.max_streak_count,
    sessionsCompleted,
    sessionsCompletedThisWeek
  }
}

export function getSnapshot(): StatsSnapshot {
  return {
    dailyHours: getDailyHours(7),
    methodBreakdown: getMethodBreakdown(),
    streakCalendar: getStreakCalendar(42),
    summary: getSummary()
  }
}
