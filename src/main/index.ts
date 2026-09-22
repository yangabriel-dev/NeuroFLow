import { app, BrowserWindow } from 'electron'
import { join } from 'node:path'
import { runMigrations } from './db/migrations'
import { registerUserHandlers } from './ipc/user.handlers'
import { registerTaskHandlers } from './ipc/tasks.handlers'
import { registerSessionHandlers } from './ipc/sessions.handlers'
import { registerRoutineHandlers } from './ipc/routine.handlers'
import { registerStatsHandlers } from './ipc/stats.handlers'
import { registerAppHandlers } from './ipc/app.handlers'
import { registerAchievementHandlers } from './ipc/achievements.handlers'

// Evita crash fatal em ambientes com driver/GPU instável (comum em algumas
// distros Linux) — o app é leve o suficiente para não depender de aceleração de hardware.
app.disableHardwareAcceleration()

const isDev = !app.isPackaged

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#0a0e27',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  mainWindow.once('ready-to-show', () => mainWindow.show())

  if (isDev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  app.setName('NeuroFlow')
  runMigrations()
  registerUserHandlers()
  registerTaskHandlers()
  registerSessionHandlers()
  registerRoutineHandlers()
  registerStatsHandlers()
  registerAppHandlers()
  registerAchievementHandlers()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
