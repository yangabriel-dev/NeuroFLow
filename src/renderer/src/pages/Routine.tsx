import { useEffect, useState } from 'react'
import type { MethodDistribution, Routine as RoutineType } from '@shared/types'
import api from '../services/api'
import Card from '../components/ui/Card'
import NeonButton from '../components/ui/NeonButton'
import { METHOD_OPTIONS } from '../constants/methods'

const inputClass =
  'rounded-lg border border-neon-purple/30 bg-black/30 px-4 py-2 text-text-primary placeholder:text-text-secondary/50 focus:border-neon-cyan focus:bg-neon-cyan/5 focus:shadow-neon-cyan focus:outline-none'

const DEFAULT_DISTRIBUTION: MethodDistribution = {
  feynman: 25,
  active_recall: 50,
  interleaving: 15,
  spaced_repetition: 10
}

function Routine(): React.JSX.Element {
  const [routine, setRoutine] = useState<RoutineType | null>(null)
  const [period, setPeriod] = useState('')
  const [sessionDurationMinutes, setSessionDurationMinutes] = useState(90)
  const [dailyHoursGoal, setDailyHoursGoal] = useState(6)
  const [weeklyExercisesGoal, setWeeklyExercisesGoal] = useState(50)
  const [monthlyProjectsGoal, setMonthlyProjectsGoal] = useState(1)
  const [distribution, setDistribution] = useState<MethodDistribution>(DEFAULT_DISTRIBUTION)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.routine.get().then((r) => {
      setRoutine(r)
      setPeriod(r.period ?? '')
      setSessionDurationMinutes(r.sessionDurationMinutes)
      setDailyHoursGoal(r.dailyHoursGoal)
      setWeeklyExercisesGoal(r.weeklyExercisesGoal)
      setMonthlyProjectsGoal(r.monthlyProjectsGoal)
      setDistribution(r.methodDistribution ?? DEFAULT_DISTRIBUTION)
    })
  }, [])

  function handleDistributionChange(method: string, value: number): void {
    setDistribution((prev) => ({ ...prev, [method]: value }))
  }

  function handleSubmit(): void {
    api.routine
      .updateSettings({
        period: period.trim() || null,
        sessionDurationMinutes,
        dailyHoursGoal,
        weeklyExercisesGoal,
        monthlyProjectsGoal,
        methodDistribution: distribution
      })
      .then((r) => {
        setRoutine(r)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      })
  }

  if (!routine) return <Card>Carregando...</Card>

  const distributionTotal = Object.values(distribution).reduce((sum, v) => sum + (v ?? 0), 0)

  return (
    <Card>
      <h2 className="text-xl font-bold text-text-primary">⚙️ Configurar Rotina</h2>

      <div className="mt-4 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          Período
          <input
            type="text"
            placeholder="Ex: 2º Período, 3º Período, Customizado..."
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          Duração da sessão (minutos)
          <input
            type="number"
            min={1}
            value={sessionDurationMinutes}
            onChange={(e) => setSessionDurationMinutes(Number(e.target.value))}
            className={inputClass}
          />
        </label>

        <div>
          <p className="mb-2 text-sm text-text-secondary">
            Distribuição de métodos (soma atual: {distributionTotal}%)
          </p>
          <div className="flex flex-col gap-2">
            {METHOD_OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center justify-between gap-3 text-sm text-text-secondary">
                <span>{opt.label}</span>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={distribution[opt.value] ?? 0}
                  onChange={(e) => handleDistributionChange(opt.value, Number(e.target.value))}
                  className={`${inputClass} w-20 text-right`}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <label className="flex flex-col gap-1 text-sm text-text-secondary">
            Horas/dia
            <input
              type="number"
              min={0}
              step={0.5}
              value={dailyHoursGoal}
              onChange={(e) => setDailyHoursGoal(Number(e.target.value))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-text-secondary">
            Exercícios/semana
            <input
              type="number"
              min={0}
              value={weeklyExercisesGoal}
              onChange={(e) => setWeeklyExercisesGoal(Number(e.target.value))}
              className={inputClass}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-text-secondary">
            Projetos/mês
            <input
              type="number"
              min={0}
              value={monthlyProjectsGoal}
              onChange={(e) => setMonthlyProjectsGoal(Number(e.target.value))}
              className={inputClass}
            />
          </label>
        </div>

        <div className="flex items-center justify-end gap-3">
          {saved && <span className="text-sm text-neon-cyan">Salvo!</span>}
          <NeonButton variant="primary" onClick={handleSubmit}>
            Salvar
          </NeonButton>
        </div>
      </div>
    </Card>
  )
}

export default Routine
