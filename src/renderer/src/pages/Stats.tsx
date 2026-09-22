import { useEffect, useState } from 'react'
import type { Achievement, Routine, StatsSnapshot } from '@shared/types'
import api from '../services/api'
import Card from '../components/ui/Card'
import ProgressBar from '../components/ui/ProgressBar'
import HoursBarChart from '../components/Stats/HoursBarChart'
import StreakCalendar from '../components/Stats/StreakCalendar'
import { METHOD_OPTIONS } from '../constants/methods'

function Stats(): React.JSX.Element {
  const [snapshot, setSnapshot] = useState<StatsSnapshot | null>(null)
  const [routine, setRoutine] = useState<Routine | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    api.stats.get().then(setSnapshot)
    api.routine.get().then(setRoutine)
    api.achievements.list().then(setAchievements)
  }, [])

  if (!snapshot) return <Card>Carregando...</Card>

  const { summary } = snapshot

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <h2 className="text-xl font-bold text-text-primary">📅 Horas Estudadas (7 dias)</h2>
        <div className="mt-4">
          <HoursBarChart data={snapshot.dailyHours} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-text-primary">🎯 Métodos Mais Usados</h2>
        <div className="mt-4 flex flex-col gap-3">
          {snapshot.methodBreakdown.length === 0 && (
            <p className="text-sm text-text-secondary">Nenhuma sessão completada ainda.</p>
          )}
          {snapshot.methodBreakdown.map((m) => {
            const label = METHOD_OPTIONS.find((opt) => opt.value === m.method)?.label ?? m.method
            const target = routine?.methodDistribution?.[m.method]
            return (
              <div key={m.method}>
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>{label}</span>
                  <span>
                    {m.percent}% {target !== undefined && `(meta: ${target}%)`}
                  </span>
                </div>
                <ProgressBar progress={m.percent} />
              </div>
            )
          })}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-text-primary">🔥 Streak Calendar (6 semanas)</h2>
        <div className="mt-4">
          <StreakCalendar data={snapshot.streakCalendar} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-text-primary">🏅 Conquistas</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {achievements.map((a) => (
            <div
              key={a.key}
              title={a.description}
              className={
                a.earned
                  ? 'flex flex-col items-center gap-1 rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 p-3 text-center'
                  : 'flex flex-col items-center gap-1 rounded-lg border border-text-secondary/20 p-3 text-center opacity-40'
              }
            >
              <span className="text-2xl">{a.label.split(' ')[0]}</span>
              <span className="text-xs text-text-secondary">{a.label.split(' ').slice(1).join(' ')}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-text-primary">📊 Resumo</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-sm text-text-secondary sm:grid-cols-3">
          <p>Total estudado: {summary.totalHours}h</p>
          <p>Média diária: {summary.avgDailyHours}h</p>
          <p>Melhor dia: {summary.bestDayHours}h</p>
          <p>Streak atual: 🔥 {summary.currentStreak} dias</p>
          <p>Maior streak: {summary.maxStreak} dias</p>
          <p>Sessões completadas: {summary.sessionsCompleted}</p>
          {routine && (
            <p>
              Esta semana: {summary.sessionsCompletedThisWeek}/{routine.weeklyExercisesGoal} sessões
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}

export default Stats
