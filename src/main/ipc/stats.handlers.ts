import { ipcMain } from 'electron'
import * as statsRepo from '../db/stats.repository'

export function registerStatsHandlers(): void {
  ipcMain.handle('stats:get', () => statsRepo.getSnapshot())
}
