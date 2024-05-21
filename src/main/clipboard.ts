import { clipboard } from 'electron'
// import { insert } from './db/query'
import { db } from './db/connect'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let inter

export const clipboardInit = (win) => {
  let previousText = clipboard.readText()
  const previousImage = clipboard.readImage()
  let lastImageBuffer = previousImage.toBitmap()

  // 每秒检查一次剪贴板内容
  inter = setInterval(() => {
    const currentText = clipboard.readText()
    if (currentText !== previousText && currentText !== '') {
      previousText = currentText
      insertContent(currentText, win)
      win.webContents.send('clipboard-changed')
    }

    // 检查图片变化
    const currentImage = clipboard.readImage()
    const currentImageBuffer = currentImage.toBitmap()
    if (!currentImage.isEmpty() && Buffer.compare(currentImageBuffer, lastImageBuffer) !== 0) {
      lastImageBuffer = currentImageBuffer
      insertContent(lastImageBuffer, win)
      win.webContents.send('clipboard-changed')
    }
  }, 0)
}

const insertContent = (content, win) => {
  try {
    const stmt = db.prepare(
      'INSERT INTO contents (title, content, category_id, created_at) VALUES (?, ?, ?, ?)'
    )
    stmt.run(content, content, 1, new Date().toISOString()).lastInsertRowid
    win.webContents.send('clipboard-changed')
  } catch (error) {
    console.log('error: ', error)
  }
}

export const stopClipboard = () => {
  clearInterval(inter)
}
