import { ipcMain } from 'electron'
import * as usersRepo from '../db/users.repository'
import type { UserSettingsInput } from '@shared/types'

export function registerUserHandlers(): void {
  ipcMain.handle('user:get', () => usersRepo.getDefaultUser())
  ipcMain.handle('user:updateName', (_event, name: string) => usersRepo.updateUserName(name))
  ipcMain.handle('user:updateSettings', (_event, patch: UserSettingsInput) => usersRepo.updateSettings(patch))
}
