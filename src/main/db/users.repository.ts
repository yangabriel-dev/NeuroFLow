import { db } from './index'
import type { User } from '@shared/types'

interface UserRow {
  id: number
  name: string
  email: string | null
  created_at: string
  current_level: number
  total_xp: number
  total_hours: number
  streak_count: number
}

function mapUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    createdAt: row.created_at,
    currentLevel: row.current_level,
    totalXp: row.total_xp,
    totalHours: row.total_hours,
    streakCount: row.streak_count
  }
}

export function getDefaultUser(): User {
  const row = db.prepare('SELECT * FROM users ORDER BY id LIMIT 1').get() as UserRow
  return mapUser(row)
}

export function updateUserName(name: string): User {
  db.prepare('UPDATE users SET name = ? WHERE id = (SELECT id FROM users ORDER BY id LIMIT 1)').run(name)
  return getDefaultUser()
}

export function getActiveRoutineId(): number {
  const row = db
    .prepare('SELECT id FROM routines WHERE is_active = 1 ORDER BY id LIMIT 1')
    .get() as { id: number }
  return row.id
}
