import { db } from './index'
import { getDefaultUser } from './users.repository'
import { getActiveRoutine } from './routines.repository'
import { listByActiveRoutine } from './tasks.repository'
import { listAll as listAllSessions } from './sessions.repository'
import { listAll as listAllAchievements } from './achievements.repository'
import type { ExportSnapshot } from '@shared/types'

export function getExportSnapshot(): ExportSnapshot {
  return {
    exportedAt: new Date().toISOString(),
    user: getDefaultUser(),
    routine: getActiveRoutine(),
    tasks: listByActiveRoutine(),
    sessions: listAllSessions(),
    achievements: listAllAchievements()
  }
}

const runReset = db.transaction((): void => {
  db.prepare('DELETE FROM sessions').run()
  db.prepare('DELETE FROM tasks').run()
  db.prepare('DELETE FROM achievements').run()

  db.prepare(
    `UPDATE users
     SET total_xp = 0, current_level = 1, total_hours = 0, streak_count = 0, max_streak_count = 0
     WHERE id = (SELECT id FROM users ORDER BY id LIMIT 1)`
  ).run()

  db.prepare(
    `UPDATE routines
     SET period = NULL, session_duration_minutes = 90, daily_hours_goal = 6,
         weekly_exercises_goal = 50, monthly_projects_goal = 1, method_distribution = NULL
     WHERE is_active = 1`
  ).run()
})

export function resetData(): void {
  runReset()
}
