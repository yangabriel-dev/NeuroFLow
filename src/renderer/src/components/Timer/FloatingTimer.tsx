import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import api from '../../services/api'
import { useTimerStore } from '../../store/useTimerStore'
import { useTaskStore } from '../../store/useTaskStore'
import { useUserStore } from '../../store/useUserStore'
import NeonButton from '../ui/NeonButton'

const DURATION_CHIPS = [25, 45, 50, 90]

function formatTime(totalSeconds: number): string {
  const sign = totalSeconds < 0 ? '-' : ''
  const abs = Math.abs(totalSeconds)
  const minutes = Math.floor(abs / 60)
  const seconds = abs % 60
  return `${sign}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function FloatingTimer(): React.JSX.Element {
  const status = useTimerStore((s) => s.status)
  const task = useTimerStore((s) => s.task)
  const sessionId = useTimerStore((s) => s.sessionId)
  const totalSeconds = useTimerStore((s) => s.totalSeconds)
  const remainingSeconds = useTimerStore((s) => s.remainingSeconds)
  const tick = useTimerStore((s) => s.tick)
  const pause = useTimerStore((s) => s.pause)
  const resume = useTimerStore((s) => s.resume)
  const reset = useTimerStore((s) => s.reset)
  const start = useTimerStore((s) => s.start)

  const upsertTask = useTaskStore((s) => s.upsertTask)
  const setUser = useUserStore((s) => s.setUser)
  const notifiedRef = useRef(false)

  useEffect(() => {
    if (status !== 'running') return undefined
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [status, tick])

  useEffect(() => {
    if (status === 'idle') {
      notifiedRef.current = false
      return
    }
    if (remainingSeconds === 0 && !notifiedRef.current) {
      notifiedRef.current = true
      new Notification('Sessão concluída!', { body: task ? task.title : 'Tempo esgotado' })
    }
  }, [remainingSeconds, status, task])

  function handleChipClick(minutes: number): void {
    if (!task || sessionId === null) return
    start(task, sessionId, minutes * 60)
  }

  function handleComplete(): void {
    if (sessionId === null) return
    api.sessions.end(sessionId).then(({ task: updatedTask, user }) => {
      upsertTask(updatedTask)
      setUser(user)
      reset()
    })
  }

  function handleDiscard(): void {
    if (sessionId === null) return
    api.sessions.discard(sessionId).then(() => reset())
  }

  const progress = totalSeconds > 0 ? Math.min(100, ((totalSeconds - remainingSeconds) / totalSeconds) * 100) : 0
  const isVisible = status !== 'idle' && task !== null && sessionId !== null

  return (
    <AnimatePresence>
      {isVisible && task && (
        <motion.div
          key="floating-timer"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 w-80 rounded-xl border border-neon-cyan/40 bg-bg-card/90 p-5 shadow-neon-cyan backdrop-blur-xl"
        >
          <h3 className="text-sm font-bold text-neon-cyan">🎯 Sessão Ativa</h3>
          <p className="mt-2 text-center font-mono text-4xl font-bold text-text-primary">
            {formatTime(remainingSeconds)}
          </p>
          <p className="mt-1 truncate text-center text-sm text-text-secondary">{task.title}</p>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/50">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple shadow-neon-cyan"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {DURATION_CHIPS.map((minutes) => (
              <button
                key={minutes}
                type="button"
                onClick={() => handleChipClick(minutes)}
                className="rounded border border-neon-purple/30 px-2 py-1 text-xs text-text-secondary hover:border-neon-purple hover:text-neon-purple"
              >
                {minutes}min
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {status === 'running' ? (
              <NeonButton variant="secondary" onClick={pause}>
                ⏸ Pausar
              </NeonButton>
            ) : (
              <NeonButton variant="secondary" onClick={resume}>
                ▶ Retomar
              </NeonButton>
            )}
            <NeonButton variant="success" onClick={handleComplete}>
              ✓ Concluir
            </NeonButton>
            <NeonButton variant="danger" onClick={handleDiscard}>
              🔴 Desistir
            </NeonButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingTimer
