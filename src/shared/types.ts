export type StudyMethod =
  | 'feynman'
  | 'active_recall'
  | 'spaced_repetition'
  | 'interleaving'
  | 'elaboration'
  | 'dual_coding'

export interface User {
  id: number
  name: string
  email: string | null
  createdAt: string
  currentLevel: number
  totalXp: number
  totalHours: number
  streakCount: number
}

export interface Task {
  id: number
  routineId: number
  title: string
  timeSlot: string | null
  method: StudyMethod | null
  estimatedDuration: number
  sortOrder: number
  isCompleted: boolean
  completedAt: string | null
}

export interface NewTaskInput {
  title: string
  timeSlot?: string
  method?: StudyMethod
  estimatedDuration: number
}

export interface Session {
  id: number
  routineId: number
  taskId: number
  topic: string
  method: StudyMethod | null
  startTime: string
  endTime: string | null
  durationMinutes: number | null
  completed: boolean
  notes: string | null
  xpEarned: number
}

export type MethodDistribution = Partial<Record<StudyMethod, number>>

export interface Routine {
  id: number
  period: string | null
  sessionDurationMinutes: number
  dailyHoursGoal: number
  weeklyExercisesGoal: number
  monthlyProjectsGoal: number
  methodDistribution: MethodDistribution | null
}

export interface RoutineSettingsInput {
  period?: string | null
  sessionDurationMinutes?: number
  dailyHoursGoal?: number
  weeklyExercisesGoal?: number
  monthlyProjectsGoal?: number
  methodDistribution?: MethodDistribution | null
}

export interface StatsSnapshot {
  dailyHours: { date: string; hours: number }[]
  methodBreakdown: { method: StudyMethod; sessions: number; percent: number }[]
  streakCalendar: { date: string; studied: boolean }[]
  summary: {
    totalHours: number
    avgDailyHours: number
    bestDayHours: number
    currentStreak: number
    maxStreak: number
    sessionsCompleted: number
    sessionsCompletedThisWeek: number
  }
}

export interface Api {
  user: {
    get(): Promise<User>
    updateName(name: string): Promise<User>
  }
  tasks: {
    list(): Promise<Task[]>
    create(input: NewTaskInput): Promise<Task>
    update(id: number, patch: Partial<NewTaskInput>): Promise<Task>
    remove(id: number): Promise<{ id: number }>
    toggleComplete(id: number): Promise<Task>
  }
  sessions: {
    start(taskId: number): Promise<Session>
    end(sessionId: number): Promise<{ session: Session; task: Task; user: User }>
    discard(sessionId: number): Promise<{ id: number }>
  }
  routine: {
    get(): Promise<Routine>
    updateSettings(patch: RoutineSettingsInput): Promise<Routine>
  }
  stats: {
    get(): Promise<StatsSnapshot>
  }
}

declare global {
  interface Window {
    api: Api
  }
}
