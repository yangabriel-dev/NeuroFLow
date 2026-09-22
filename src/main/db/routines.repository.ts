import { db } from './index'
import { getActiveRoutineId } from './users.repository'
import type { MethodDistribution, Routine, RoutineSettingsInput } from '@shared/types'

interface RoutineRow {
  id: number
  period: string | null
  session_duration_minutes: number
  daily_hours_goal: number
  weekly_exercises_goal: number
  monthly_projects_goal: number
  method_distribution: string | null
}

function mapRoutine(row: RoutineRow): Routine {
  return {
    id: row.id,
    period: row.period,
    sessionDurationMinutes: row.session_duration_minutes,
    dailyHoursGoal: row.daily_hours_goal,
    weeklyExercisesGoal: row.weekly_exercises_goal,
    monthlyProjectsGoal: row.monthly_projects_goal,
    methodDistribution: row.method_distribution
      ? (JSON.parse(row.method_distribution) as MethodDistribution)
      : null
  }
}

function getById(id: number): Routine {
  const row = db.prepare('SELECT * FROM routines WHERE id = ?').get(id) as RoutineRow
  return mapRoutine(row)
}

export function getActiveRoutine(): Routine {
  return getById(getActiveRoutineId())
}

export function updateSettings(patch: RoutineSettingsInput): Routine {
  const id = getActiveRoutineId()
  const current = getById(id)

  const period = patch.period ?? current.period
  const sessionDurationMinutes = patch.sessionDurationMinutes ?? current.sessionDurationMinutes
  const dailyHoursGoal = patch.dailyHoursGoal ?? current.dailyHoursGoal
  const weeklyExercisesGoal = patch.weeklyExercisesGoal ?? current.weeklyExercisesGoal
  const monthlyProjectsGoal = patch.monthlyProjectsGoal ?? current.monthlyProjectsGoal
  const methodDistribution = patch.methodDistribution ?? current.methodDistribution

  db.prepare(
    `UPDATE routines
     SET period = ?, session_duration_minutes = ?, daily_hours_goal = ?,
         weekly_exercises_goal = ?, monthly_projects_goal = ?, method_distribution = ?
     WHERE id = ?`
  ).run(
    period,
    sessionDurationMinutes,
    dailyHoursGoal,
    weeklyExercisesGoal,
    monthlyProjectsGoal,
    methodDistribution ? JSON.stringify(methodDistribution) : null,
    id
  )

  return getById(id)
}
