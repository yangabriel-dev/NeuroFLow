import { ipcMain } from 'electron'
import * as achievementsRepo from '../db/achievements.repository'

export function registerAchievementHandlers(): void {
  ipcMain.handle('achievements:list', () => achievementsRepo.listAll())
}
