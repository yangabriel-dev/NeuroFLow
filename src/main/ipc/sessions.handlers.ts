import { ipcMain } from 'electron'
import * as sessionsRepo from '../db/sessions.repository'

export function registerSessionHandlers(): void {
  ipcMain.handle('sessions:start', (_event, taskId: number) => sessionsRepo.start(taskId))
  ipcMain.handle('sessions:end', (_event, sessionId: number) => sessionsRepo.endAndComplete(sessionId))
  ipcMain.handle('sessions:discard', (_event, sessionId: number) => sessionsRepo.discard(sessionId))
}
