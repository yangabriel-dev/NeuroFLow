import { create } from 'zustand'
import type { Task } from '@shared/types'

export type TimerStatus = 'idle' | 'running' | 'paused'

interface TimerState {
  status: TimerStatus
  task: Task | null
  sessionId: number | null
  totalSeconds: number
  remainingSeconds: number
  start: (task: Task, sessionId: number, totalSeconds: number) => void
  pause: () => void
  resume: () => void
  tick: () => void
  reset: () => void
}

export const useTimerStore = create<TimerState>((set) => ({
  status: 'idle',
  task: null,
  sessionId: null,
  totalSeconds: 0,
  remainingSeconds: 0,
  start: (task, sessionId, totalSeconds) =>
    set({ status: 'running', task, sessionId, totalSeconds, remainingSeconds: totalSeconds }),
  pause: () => set({ status: 'paused' }),
  resume: () => set({ status: 'running' }),
  tick: () =>
    set((state) => ({
      remainingSeconds:
        state.status === 'running' ? Math.max(0, state.remainingSeconds - 1) : state.remainingSeconds
    })),
  reset: () => set({ status: 'idle', task: null, sessionId: null, totalSeconds: 0, remainingSeconds: 0 })
}))
