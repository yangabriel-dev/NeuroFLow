import { ipcMain } from 'electron'
import * as usersRepo from '../db/users.repository'

export function registerUserHandlers(): void {
  ipcMain.handle('user:get', () => usersRepo.getDefaultUser())
  ipcMain.handle('user:updateName', (_event, name: string) => usersRepo.updateUserName(name))
}
