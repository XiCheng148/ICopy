import { clipboard } from 'electron'
// import { insert } from './db/query'
import { db } from './db/connect'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let inter

export const clipboardInit = (win) => {
  let previousText = clipboard.readText()
  let previousImage = clipboard.readImage()

  // 每秒检查一次剪贴板内容
  inter = setInterval(() => {
    const currentText = clipboard.readText()
    // 检查图片变化
    const currentImage = clipboard.readImage()
    const isSend: boolean = false
    if (currentText !== previousText) {
      previousText = currentText
      const stmt = db.prepare(
        'INSERT INTO contents (title,content,category_id,created_at) VALUES(?, ?, ?, ?)'
      )
      try {
        stmt.run(currentText, currentText, 1, new Date().toISOString()).lastInsertRowid
        win.webContents.send('clipboard-changed')
      } catch (error) {
        console.log('error: ', error)
      }
    }
    if (!currentImage.isEmpty() && previousImage.toDataURL() !== currentImage.toDataURL()) {
      console.log('img', currentImage.toJPEG(100))
      previousImage = currentImage
    }

    if (isSend) {
      console.log('isSend: ', isSend)
    }
  }, 0)
}

export const stopClipboard = () => {
  clearInterval(inter)
}
