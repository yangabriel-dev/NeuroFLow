import { create } from 'zustand'
import type { Task } from '@shared/types'

interface TaskState {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  upsertTask: (task: Task) => void
  removeTask: (id: number) => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  upsertTask: (task) =>
    set((state) => {
      const exists = state.tasks.some((t) => t.id === task.id)
      return {
        tasks: exists
          ? state.tasks.map((t) => (t.id === task.id ? task : t))
          : [...state.tasks, task].sort((a, b) => a.sortOrder - b.sortOrder)
      }
    }),
  removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }))
}))
