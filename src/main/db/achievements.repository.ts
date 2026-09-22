import { db } from './index'
import { getDefaultUser } from './users.repository'
import { getActiveRoutine } from './routines.repository'
import type { Achievement } from '@shared/types'

interface BadgeStats {
  sessionsCompleted: number
  maxStreak: number
  totalHours: number
  distinctMethodsUsed: number
  daysWithSessionLast7: number
  daysHitDailyGoal: number
}

interface BadgeDefinition {
  key: string
  label: string
  description: string
  xpBonus: number
  check: (stats: BadgeStats) => boolean
}

const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    key: 'iniciante',
    label: '🏅 Iniciante',
    description: 'Complete sua primeira sessão de estudo',
    xpBonus: 50,
    check: (s) => s.sessionsCompleted >= 1
  },
  {
    key: 'fire_starter',
    label: '🔥 Fire Starter',
    description: 'Alcance um streak de 3 dias',
    xpBonus: 50,
    check: (s) => s.maxStreak >= 3
  },
  {
    key: 'diamond_study',
    label: '💎 Diamond Study',
    description: 'Alcance um streak de 10 dias',
    xpBonus: 50,
    check: (s) => s.maxStreak >= 10
  },
  {
    key: 'speed_learner',
    label: '🚀 Speed Learner',
    description: 'Complete 100 sessões de estudo',
    xpBonus: 50,
    check: (s) => s.sessionsCompleted >= 100
  },
  {
    key: 'master_mind',
    label: '🧠 Master Mind',
    description: 'Use todos os 6 métodos de estudo',
    xpBonus: 50,
    check: (s) => s.distinctMethodsUsed >= 6
  },
  {
    key: 'perfect_week',
    label: '🌟 Perfect Week',
    description: 'Estude em 6 dos últimos 7 dias',
    xpBonus: 50,
    check: (s) => s.daysWithSessionLast7 >= 6
  },
  {
    key: 'knowledge_master',
    label: '📚 Knowledge Master',
    description: 'Acumule 50 horas de estudo',
    xpBonus: 50,
    check: (s) => s.totalHours >= 50
  },
  {
    key: 'goal_crusher',
    label: '🎯 Goal Crusher',
    description: 'Bata a meta diária de horas em 3 dias',
    xpBonus: 50,
    check: (s) => s.daysHitDailyGoal >= 3
  }
]

function computeStats(): BadgeStats {
  const user = db
    .prepare('SELECT total_hours, max_streak_count FROM users ORDER BY id LIMIT 1')
    .get() as { total_hours: number; max_streak_count: number }

  const { sessionsCompleted } = db
    .prepare('SELECT COUNT(*) as sessionsCompleted FROM sessions WHERE completed = 1')
    .get() as { sessionsCompleted: number }

  const { distinctMethodsUsed } = db
    .prepare(
      'SELECT COUNT(DISTINCT method) as distinctMethodsUsed FROM sessions WHERE completed = 1 AND method IS NOT NULL'
    )
    .get() as { distinctMethodsUsed: number }

  const { daysWithSessionLast7 } = db
    .prepare(
      `SELECT COUNT(DISTINCT date(start_time)) as daysWithSessionLast7 FROM sessions
       WHERE completed = 1 AND date(start_time) >= date('now', '-6 days')`
    )
    .get() as { daysWithSessionLast7: number }

  const dailyHoursGoal = getActiveRoutine().dailyHoursGoal
  const { daysHitDailyGoal } = db
    .prepare(
      `SELECT COUNT(*) as daysHitDailyGoal FROM (
         SELECT SUM(duration_minutes) / 60.0 as dayHours FROM sessions WHERE completed = 1 GROUP BY date(start_time)
       ) WHERE dayHours >= ?`
    )
    .get(dailyHoursGoal) as { daysHitDailyGoal: number }

  return {
    sessionsCompleted,
    maxStreak: user.max_streak_count,
    totalHours: user.total_hours,
    distinctMethodsUsed,
    daysWithSessionLast7,
    daysHitDailyGoal
  }
}

export function evaluateAndUnlock(): void {
  const userId = getDefaultUser().id
  const earnedRows = db.prepare('SELECT badge_key FROM achievements WHERE user_id = ?').all(userId) as {
    badge_key: string
  }[]
  const earnedKeys = new Set(earnedRows.map((r) => r.badge_key))

  const stats = computeStats()
  const newlyEarned = BADGE_DEFINITIONS.filter((b) => !earnedKeys.has(b.key) && b.check(stats))
  if (newlyEarned.length === 0) return

  const insert = db.prepare('INSERT INTO achievements (user_id, badge_key) VALUES (?, ?)')
  for (const badge of newlyEarned) {
    insert.run(userId, badge.key)
  }

  const xpBonus = newlyEarned.reduce((sum, b) => sum + b.xpBonus, 0)
  db.prepare(
    'UPDATE users SET total_xp = total_xp + ?, current_level = CAST((total_xp + ?) / 1000 AS INTEGER) + 1 WHERE id = ?'
  ).run(
    xpBonus,
    xpBonus,
    userId
  )
}

export function listAll(): Achievement[] {
  const userId = getDefaultUser().id
  const earnedRows = db.prepare('SELECT badge_key, earned_at FROM achievements WHERE user_id = ?').all(userId) as {
    badge_key: string
    earned_at: string
  }[]
  const earnedMap = new Map(earnedRows.map((r) => [r.badge_key, r.earned_at]))

  return BADGE_DEFINITIONS.map((b) => ({
    key: b.key,
    label: b.label,
    description: b.description,
    xpBonus: b.xpBonus,
    earned: earnedMap.has(b.key),
    earnedAt: earnedMap.get(b.key) ?? null
  }))
}
