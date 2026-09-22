import { db } from './index'
import { getActiveRoutineId } from './users.repository'
import type { NewTaskInput, StudyMethod, Task } from '@shared/types'

interface TaskRow {
  id: number
  routine_id: number
  title: string
  time_slot: string | null
  method: StudyMethod | null
  estimated_duration: number
  sort_order: number
  is_completed: number
  completed_at: string | null
}

function mapTask(row: TaskRow): Task {
  return {
    id: row.id,
    routineId: row.routine_id,
    title: row.title,
    timeSlot: row.time_slot,
    method: row.method,
    estimatedDuration: row.estimated_duration,
    sortOrder: row.sort_order,
    isCompleted: row.is_completed === 1,
    completedAt: row.completed_at
  }
}

export function getById(id: number): Task {
  const row = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id) as TaskRow
  return mapTask(row)
}

export function listByActiveRoutine(): Task[] {
  const routineId = getActiveRoutineId()
  const rows = db
    .prepare('SELECT * FROM tasks WHERE routine_id = ? ORDER BY sort_order, time_slot, id')
    .all(routineId) as TaskRow[]
  return rows.map(mapTask)
}

export function create(input: NewTaskInput): Task {
  const routineId = getActiveRoutineId()
  const { maxOrder } = db
    .prepare('SELECT COALESCE(MAX(sort_order), -1) as maxOrder FROM tasks WHERE routine_id = ?')
    .get(routineId) as { maxOrder: number }

  const { lastInsertRowid } = db
    .prepare(
      `INSERT INTO tasks (routine_id, title, time_slot, method, estimated_duration, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(
      routineId,
      input.title,
      input.timeSlot ?? null,
      input.method ?? null,
      input.estimatedDuration,
      maxOrder + 1
    )

  return getById(Number(lastInsertRowid))
}

export function update(id: number, patch: Partial<NewTaskInput>): Task {
  const current = getById(id)
  const title = patch.title ?? current.title
  const timeSlot = patch.timeSlot ?? current.timeSlot
  const method = patch.method ?? current.method
  const estimatedDuration = patch.estimatedDuration ?? current.estimatedDuration

  db.prepare('UPDATE tasks SET title = ?, time_slot = ?, method = ?, estimated_duration = ? WHERE id = ?').run(
    title,
    timeSlot,
    method,
    estimatedDuration,
    id
  )

  return getById(id)
}

export function remove(id: number): { id: number } {
  db.prepare('DELETE FROM tasks WHERE id = ?').run(id)
  return { id }
}

export function toggleComplete(id: number): Task {
  const current = getById(id)
  const next = current.isCompleted ? 0 : 1
  const completedAt = next === 1 ? new Date().toISOString() : null
  db.prepare('UPDATE tasks SET is_completed = ?, completed_at = ? WHERE id = ?').run(next, completedAt, id)
  return getById(id)
}
