import { app, dialog, ipcMain } from 'electron'
import { writeFileSync } from 'node:fs'
import * as appRepo from '../db/app.repository'

export function registerAppHandlers(): void {
  ipcMain.handle('app:getInfo', () => ({ name: app.getName(), version: app.getVersion() }))

  ipcMain.handle('app:exportData', async () => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Exportar dados do NeuroFlow',
      defaultPath: 'neuroflow-backup.json',
      filters: [{ name: 'JSON', extensions: ['json'] }]
    })

    if (canceled || !filePath) return { canceled: true }

    const snapshot = appRepo.getExportSnapshot()
    writeFileSync(filePath, JSON.stringify(snapshot, null, 2), 'utf-8')
    return { canceled: false, path: filePath }
  })

  ipcMain.handle('app:resetData', () => appRepo.resetData())
}
