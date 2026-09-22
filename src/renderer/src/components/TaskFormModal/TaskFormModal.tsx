import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { NewTaskInput, StudyMethod, Task } from '@shared/types'
import Modal from '../ui/Modal'
import NeonButton from '../ui/NeonButton'

const METHOD_OPTIONS: { value: StudyMethod; label: string }[] = [
  { value: 'feynman', label: 'Feynman Technique' },
  { value: 'active_recall', label: 'Active Recall' },
  { value: 'spaced_repetition', label: 'Spaced Repetition' },
  { value: 'interleaving', label: 'Interleaving' },
  { value: 'elaboration', label: 'Elaborative Interrogation' },
  { value: 'dual_coding', label: 'Dual Coding' }
]

const inputClass =
  'rounded-lg border border-neon-purple/30 bg-black/30 px-4 py-2 text-text-primary placeholder:text-text-secondary/50 focus:border-neon-cyan focus:bg-neon-cyan/5 focus:shadow-neon-cyan focus:outline-none'

interface TaskFormModalProps {
  open: boolean
  initialTask: Task | null
  onClose: () => void
  onSubmit: (input: NewTaskInput) => void
}

function TaskFormModal({ open, initialTask, onClose, onSubmit }: TaskFormModalProps): React.JSX.Element {
  const [title, setTitle] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [method, setMethod] = useState<StudyMethod | ''>('')
  const [estimatedDuration, setEstimatedDuration] = useState(25)

  useEffect(() => {
    if (!open) return
    setTitle(initialTask?.title ?? '')
    setTimeSlot(initialTask?.timeSlot ?? '')
    setMethod(initialTask?.method ?? '')
    setEstimatedDuration(initialTask?.estimatedDuration ?? 25)
  }, [open, initialTask])

  function handleSubmit(e: FormEvent): void {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({
      title: title.trim(),
      timeSlot: timeSlot.trim() || undefined,
      method: method || undefined,
      estimatedDuration
    })
  }

  return (
    <Modal open={open} onClose={onClose} title={initialTask ? 'Editar Tarefa' : 'Nova Tarefa'}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          Horário (opcional)
          <input
            type="text"
            placeholder="09:00-09:30"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          Título
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          Método
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as StudyMethod | '')}
            className={inputClass}
          >
            <option value="">Nenhum</option>
            {METHOD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          Duração estimada (minutos)
          <input
            type="number"
            min={1}
            required
            value={estimatedDuration}
            onChange={(e) => setEstimatedDuration(Number(e.target.value))}
            className={inputClass}
          />
        </label>

        <div className="mt-2 flex justify-end gap-2">
          <NeonButton type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </NeonButton>
          <NeonButton type="submit" variant="primary">
            Salvar
          </NeonButton>
        </div>
      </form>
    </Modal>
  )
}

export default TaskFormModal
