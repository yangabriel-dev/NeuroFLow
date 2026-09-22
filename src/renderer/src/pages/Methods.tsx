import { useState } from 'react'
import api from '../services/api'
import { useTaskStore } from '../store/useTaskStore'
import { useTimerStore } from '../store/useTimerStore'
import Card from '../components/ui/Card'
import NeonButton from '../components/ui/NeonButton'
import Modal from '../components/ui/Modal'
import { METHOD_DETAILS } from '../constants/methodDetails'
import type { MethodDetail } from '../constants/methodDetails'

function Stars({ count }: { count: number }): React.JSX.Element {
  return <span className="text-warning">{'⭐'.repeat(count)}</span>
}

function Methods(): React.JSX.Element {
  const upsertTask = useTaskStore((s) => s.upsertTask)
  const startTimer = useTimerStore((s) => s.start)
  const [selected, setSelected] = useState<MethodDetail | null>(null)
  const [creating, setCreating] = useState(false)

  function handleStart(detail: MethodDetail): void {
    if (creating) return
    setCreating(true)
    api.tasks
      .create({ title: `Estudo — ${detail.label}`, method: detail.value, estimatedDuration: 25 })
      .then((task) => {
        upsertTask(task)
        return api.sessions.start(task.id).then((session) => {
          startTimer(task, session.id, 25 * 60)
        })
      })
      .finally(() => {
        setCreating(false)
        setSelected(null)
      })
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <h2 className="text-xl font-bold text-text-primary">🧠 Métodos de Aprendizado</h2>
        <p className="mt-2 text-sm text-text-secondary">
          Baseado em ciência cognitiva — técnicas comprovadas para aprender mais em menos tempo.
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METHOD_DETAILS.map((detail) => (
          <Card key={detail.value} className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-neon-cyan">{detail.label}</h3>
            <p className="text-sm text-text-secondary">{detail.tagline}</p>
            <Stars count={detail.effectiveness} />
            <NeonButton variant="secondary" className="mt-2" onClick={() => setSelected(detail)}>
              Ler mais →
            </NeonButton>
          </Card>
        ))}
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)} title={selected?.label ?? ''}>
        {selected && (
          <div className="flex flex-col gap-4">
            <div>
              <h4 className="text-sm font-bold text-text-primary">Quando usar</h4>
              <p className="mt-1 text-sm text-text-secondary">{selected.whenToUse}</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary">Como fazer</h4>
              <ul className="mt-1 flex flex-col gap-1 text-sm text-text-secondary">
                {selected.howTo.map((step, i) => (
                  <li key={i}>• {step}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary">Evidência científica</h4>
              <p className="mt-1 text-sm text-text-secondary">{selected.evidence}</p>
            </div>
            <NeonButton variant="primary" disabled={creating} onClick={() => handleStart(selected)}>
              {creating ? 'Criando...' : 'Começar sessão com esse método'}
            </NeonButton>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Methods
