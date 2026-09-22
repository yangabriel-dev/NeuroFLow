import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { NewTaskInput, Task } from '@shared/types'
import api from '../services/api'
import { useUserStore } from '../store/useUserStore'
import { useTaskStore } from '../store/useTaskStore'
import { useTimerStore } from '../store/useTimerStore'
import Card from '../components/ui/Card'
import NeonButton from '../components/ui/NeonButton'
import ProgressBar from '../components/ui/ProgressBar'
import TaskItem from '../components/TaskItem/TaskItem'
import TaskFormModal from '../components/TaskFormModal/TaskFormModal'

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

function Home(): React.JSX.Element {
  const user = useUserStore((s) => s.user)
  const tasks = useTaskStore((s) => s.tasks)
  const setTasks = useTaskStore((s) => s.setTasks)
  const upsertTask = useTaskStore((s) => s.upsertTask)
  const removeTaskFromStore = useTaskStore((s) => s.removeTask)
  const startTimer = useTimerStore((s) => s.start)

  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    api.tasks.list().then(setTasks)
  }, [setTasks])

  const totalPlanned = tasks.reduce((sum, t) => sum + t.estimatedDuration, 0)
  const totalDone = tasks.filter((t) => t.isCompleted).reduce((sum, t) => sum + t.estimatedDuration, 0)
  const nextTask = tasks.find((t) => !t.isCompleted) ?? null

  function handleToggle(id: number): void {
    api.tasks.toggleComplete(id).then(upsertTask)
  }

  function handleStart(task: Task): void {
    api.sessions.start(task.id).then((session) => {
      startTimer(task, session.id, task.estimatedDuration * 60)
    })
  }

  function handleOpenCreate(): void {
    setEditingTask(null)
    setFormOpen(true)
  }

  function handleOpenEdit(task: Task): void {
    setEditingTask(task)
    setFormOpen(true)
  }

  function handleDelete(id: number): void {
    api.tasks.remove(id).then(() => removeTaskFromStore(id))
  }

  function handleSubmit(input: NewTaskInput): void {
    const request = editingTask ? api.tasks.update(editingTask.id, input) : api.tasks.create(input)
    request.then((task) => {
      upsertTask(task)
      setFormOpen(false)
    })
  }

  return (
    <motion.div className="flex flex-col gap-4" variants={containerVariants} initial="hidden" animate="show">
      <motion.div variants={itemVariants}>
        <Card>
          <h2 className="text-2xl font-bold text-neon-cyan">🧠 Bem-vindo{user?.name ? `, ${user.name}` : ''}!</h2>
          <p className="mt-2 font-mono text-sm text-text-secondary">Streak: 🔥 {user?.streakCount ?? 0} dias</p>
          <p className="font-mono text-sm text-text-secondary">
            Hoje: {totalDone}min / {totalPlanned}min planejado
          </p>
          {nextTask && (
            <p className="mt-1 font-mono text-sm text-text-secondary">
              Próximo: {nextTask.title} ({nextTask.estimatedDuration} min)
            </p>
          )}
          <NeonButton
            variant="primary"
            className="mt-4"
            disabled={!nextTask}
            title={nextTask ? undefined : 'Adicione uma tarefa'}
            onClick={() => nextTask && handleStart(nextTask)}
          >
            Começar Sessão
          </NeonButton>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-text-primary">Level {user?.currentLevel ?? 1}</h2>
            <span className="font-mono text-sm text-text-secondary">{(user?.totalXp ?? 0) % 1000}/1000 XP</span>
          </div>
          <div className="mt-2">
            <ProgressBar progress={((user?.totalXp ?? 0) % 1000) / 10} />
          </div>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-text-primary">📅 Rotina de Hoje</h2>
            <NeonButton variant="secondary" onClick={handleOpenCreate}>
              ⊕ Adicionar
            </NeonButton>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <AnimatePresence initial={false}>
              {tasks.length === 0 && (
                <motion.p
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-text-secondary"
                >
                  Nenhuma tarefa ainda. Adicione a primeira acima.
                </motion.p>
              )}
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <TaskItem
                    task={task}
                    onToggle={handleToggle}
                    onStart={handleStart}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      </motion.div>

      <TaskFormModal
        open={formOpen}
        initialTask={editingTask}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </motion.div>
  )
}

export default Home
