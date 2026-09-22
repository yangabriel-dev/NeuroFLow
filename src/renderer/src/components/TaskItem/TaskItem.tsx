import { useEffect, useRef, useState } from 'react'
import type { StudyMethod, Task } from '@shared/types'
import Card from '../ui/Card'
import ProgressBar from '../ui/ProgressBar'
import NeonButton from '../ui/NeonButton'

const METHOD_LABELS: Record<StudyMethod, string> = {
  feynman: 'Feynman Technique',
  active_recall: 'Active Recall',
  spaced_repetition: 'Spaced Repetition',
  interleaving: 'Interleaving',
  elaboration: 'Elaborative Interrogation',
  dual_coding: 'Dual Coding'
}

interface TaskItemProps {
  task: Task
  onToggle: (id: number) => void
  onStart: (task: Task) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

function TaskItem({ task, onToggle, onStart, onEdit, onDelete }: TaskItemProps): React.JSX.Element {
  const progress = task.isCompleted ? 100 : 0
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  function handleDeleteClick(): void {
    if (confirmingDelete) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      onDelete(task.id)
      return
    }
    setConfirmingDelete(true)
    timeoutRef.current = setTimeout(() => setConfirmingDelete(false), 3000)
  }

  return (
    <Card className="group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onToggle(task.id)}
            className="mt-1 accent-neon-cyan"
          />
          <div>
            {task.timeSlot && <p className="font-mono text-sm text-neon-cyan">{task.timeSlot}</p>}
            <h3 className="text-lg font-bold text-text-primary">{task.title}</h3>
            {task.method && <p className="text-sm text-text-secondary">{METHOD_LABELS[task.method]}</p>}
          </div>
        </div>

        <div className="hidden gap-3 group-hover:flex">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="text-xs text-text-secondary hover:text-neon-cyan"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={handleDeleteClick}
            className={
              confirmingDelete ? 'text-xs font-bold text-error' : 'text-xs text-text-secondary hover:text-error'
            }
          >
            {confirmingDelete ? 'Confirmar?' : 'Excluir'}
          </button>
        </div>
      </div>

      <div className="mt-3">
        <ProgressBar progress={progress} />
        <p className="mt-1 font-mono text-xs text-text-secondary">{task.estimatedDuration} min planejados</p>
      </div>

      {!task.isCompleted && (
        <div className="mt-3 flex justify-end">
          <NeonButton variant="primary" onClick={() => onStart(task)}>
            Começar
          </NeonButton>
        </div>
      )}
    </Card>
  )
}

export default TaskItem
