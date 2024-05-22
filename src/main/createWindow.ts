import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Menu,
  Tray,
  app,
  screen,
  shell
} from 'electron'
import path, { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import url from 'node:url'
import { clipboardInit } from './clipboard'
export interface OptionsType extends Partial<BrowserWindowConstructorOptions> {
  openDevTools?: boolean
  hash?: string
}

export function createWindow(options: OptionsType): BrowserWindow {
  const { height } = screen.getPrimaryDisplay().workAreaSize
  const win = new BrowserWindow(
    Object.assign(
      {
        width: 300,
        height: height,
        center: true,
        x: 0,
        y: 0,
        // show: false,
        // frame: false,
        // transparent: true,
        // alwaysOnTop: true,
        autoHideMenuBar: true,
        ...(process.platform === 'linux' ? { icon } : {}),
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          sandbox: false
        }
      },
      options
    )
  )
  clipboardInit(win)

  // 监听窗口失去焦点事件
  win.on('blur', () => {
    // win.hide()
  })

  // 创建托盘图标和菜单
  const tray = new Tray(path.join(__dirname, '../../resources/icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show App',
      click: () => {
        win.show()
      }
    },
    {
      label: 'Quit',
      click: () => {
        app.quit()
      }
    }
  ])

  tray.setToolTip('My Electron App')
  tray.setContextMenu(contextMenu)

  // 点击托盘图标时显示窗口
  tray.on('click', () => {
    win.show()
  })

  if (is.dev && options.openDevTools) {
    win.webContents.openDevTools()
  }

  win.on('ready-to-show', () => {
    win.show()
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + options.hash)
  } else {
    win.loadURL(
      url.format({
        //编译后的文件
        pathname: join(__dirname, '../renderer/index.html'),
        //协议
        protocol: 'file',
        //protocol 后面需要两个/
        slashes: true,
        //hash 的值
        hash: 'config/category/contentList'
      })
    )
  }

  return win
}
