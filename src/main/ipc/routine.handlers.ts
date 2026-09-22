import { ipcMain } from 'electron'
import * as routinesRepo from '../db/routines.repository'
import type { RoutineSettingsInput } from '@shared/types'

export function registerRoutineHandlers(): void {
  ipcMain.handle('routine:get', () => routinesRepo.getActiveRoutine())
  ipcMain.handle('routine:updateSettings', (_event, patch: RoutineSettingsInput) =>
    routinesRepo.updateSettings(patch)
  )
}
