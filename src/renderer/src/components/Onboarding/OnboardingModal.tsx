import { useState } from 'react'
import type { FormEvent } from 'react'
import NeonButton from '../ui/NeonButton'

interface OnboardingModalProps {
  onSubmit: (name: string) => void
}

function OnboardingModal({ onSubmit }: OnboardingModalProps): React.JSX.Element {
  const [name, setName] = useState('')

  function handleSubmit(e: FormEvent): void {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit(name.trim())
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-deep">
      <div className="w-full max-w-md rounded-xl border border-neon-cyan/40 bg-bg-card p-8 text-center shadow-neon-cyan">
        <h1 className="text-2xl font-bold text-neon-cyan">🧠 Bem-vindo ao NeuroFlow</h1>
        <p className="mt-2 text-sm text-text-secondary">Como podemos te chamar?</p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="rounded-lg border border-neon-purple/30 bg-black/30 px-4 py-3 text-center text-lg text-text-primary
                       focus:border-neon-cyan focus:bg-neon-cyan/5 focus:shadow-neon-cyan focus:outline-none"
          />
          <NeonButton type="submit" variant="primary">
            Começar
          </NeonButton>
        </form>
      </div>
    </div>
  )
}

export default OnboardingModal
