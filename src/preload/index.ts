import { contextBridge, ipcRenderer } from 'electron'
import type { Api, NewTaskInput, RoutineSettingsInput, UserSettingsInput } from '@shared/types'

const api: Api = {
  user: {
    get: () => ipcRenderer.invoke('user:get'),
    updateName: (name) => ipcRenderer.invoke('user:updateName', name),
    updateSettings: (patch: UserSettingsInput) => ipcRenderer.invoke('user:updateSettings', patch)
  },
  tasks: {
    list: () => ipcRenderer.invoke('tasks:list'),
    create: (input: NewTaskInput) => ipcRenderer.invoke('tasks:create', input),
    update: (id, patch) => ipcRenderer.invoke('tasks:update', id, patch),
    remove: (id) => ipcRenderer.invoke('tasks:delete', id),
    toggleComplete: (id) => ipcRenderer.invoke('tasks:toggle', id)
  },
  sessions: {
    start: (taskId) => ipcRenderer.invoke('sessions:start', taskId),
    end: (sessionId) => ipcRenderer.invoke('sessions:end', sessionId),
    discard: (sessionId) => ipcRenderer.invoke('sessions:discard', sessionId)
  },
  routine: {
    get: () => ipcRenderer.invoke('routine:get'),
    updateSettings: (patch: RoutineSettingsInput) => ipcRenderer.invoke('routine:updateSettings', patch)
  },
  stats: {
    get: () => ipcRenderer.invoke('stats:get')
  },
  app: {
    getInfo: () => ipcRenderer.invoke('app:getInfo'),
    exportData: () => ipcRenderer.invoke('app:exportData'),
    resetData: () => ipcRenderer.invoke('app:resetData')
  },
  achievements: {
    list: () => ipcRenderer.invoke('achievements:list')
  }
}

contextBridge.exposeInMainWorld('api', api)
