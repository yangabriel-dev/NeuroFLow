import { contextBridge, ipcRenderer } from 'electron'
import type { Api, NewTaskInput } from '@shared/types'

const api: Api = {
  user: {
    get: () => ipcRenderer.invoke('user:get'),
    updateName: (name) => ipcRenderer.invoke('user:updateName', name)
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
  }
}

contextBridge.exposeInMainWorld('api', api)
