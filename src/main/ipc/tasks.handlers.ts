import { ipcMain } from 'electron'
import * as tasksRepo from '../db/tasks.repository'
import type { NewTaskInput } from '@shared/types'

export function registerTaskHandlers(): void {
  ipcMain.handle('tasks:list', () => tasksRepo.listByActiveRoutine())
  ipcMain.handle('tasks:create', (_event, input: NewTaskInput) => tasksRepo.create(input))
  ipcMain.handle('tasks:update', (_event, id: number, patch: Partial<NewTaskInput>) =>
    tasksRepo.update(id, patch)
  )
  ipcMain.handle('tasks:delete', (_event, id: number) => tasksRepo.remove(id))
  ipcMain.handle('tasks:toggle', (_event, id: number) => tasksRepo.toggleComplete(id))
}
