import { useEffect, useState } from 'react'
import type { AppInfo } from '@shared/types'
import api from '../services/api'
import { useUserStore } from '../store/useUserStore'
import Card from '../components/ui/Card'
import NeonButton from '../components/ui/NeonButton'
import ConfirmButton from '../components/ui/ConfirmButton'

function Settings(): React.JSX.Element {
  const user = useUserStore((s) => s.user)
  const setUser = useUserStore((s) => s.setUser)
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null)
  const [exportMessage, setExportMessage] = useState('')

  useEffect(() => {
    api.app.getInfo().then(setAppInfo)
  }, [])

  function handleToggleNotifications(): void {
    api.user.updateSettings({ notificationsEnabled: !user?.notificationsEnabled }).then(setUser)
  }

  function handleExport(): void {
    api.app.exportData().then((result) => {
      setExportMessage(result.canceled ? '' : `Exportado para: ${result.path}`)
    })
  }

  function handleReset(): void {
    api.app.resetData().then(() => window.location.reload())
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <h2 className="text-xl font-bold text-text-primary">🎨 Tema</h2>
        <div className="mt-3 flex gap-2">
          <span className="rounded-lg border border-neon-cyan/40 bg-neon-cyan/10 px-4 py-2 text-sm font-bold text-neon-cyan">
            Dark
          </span>
          <span className="flex cursor-not-allowed items-center gap-2 rounded-lg px-4 py-2 text-sm text-text-secondary/50">
            Light
            <span className="text-[10px]">em breve</span>
          </span>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-text-primary">🔔 Notificações</h2>
        <label className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={user?.notificationsEnabled ?? true}
            onChange={handleToggleNotifications}
            className="accent-neon-cyan"
          />
          Notificar quando uma sessão terminar
        </label>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-text-primary">💾 Dados</h2>
        <div className="mt-3 flex items-center gap-3">
          <NeonButton variant="secondary" onClick={handleExport}>
            Exportar dados
          </NeonButton>
          {exportMessage && <span className="text-sm text-neon-cyan">{exportMessage}</span>}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ConfirmButton label="Resetar dados" confirmLabel="Tem certeza? Clique de novo" onConfirm={handleReset} />
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold text-text-primary">ℹ️ Sobre</h2>
        <p className="mt-2 text-sm text-text-secondary">
          {appInfo?.name ?? 'NeuroFlow'} v{appInfo?.version ?? '...'}
        </p>
        <p className="mt-1 text-sm text-text-secondary">Electron + React + TypeScript + SQLite</p>
      </Card>
    </div>
  )
}

export default Settings
