import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain } from 'electron'
import './windows'
import './ipc'
import './db'
import { registerAppGlobShortcut } from './shortCut'
import { createWindow } from './createWindow'
import { stopClipboard } from './clipboard'
app.whenReady().then(() => {
  registerAppGlobShortcut()
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow({})
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    stopClipboard()
    app.quit()
  }
})
