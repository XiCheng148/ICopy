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
      db
        .prepare(
          `INSERT INTO contents (title,content,category_id,created_at) VALUES('${currentText}','${currentText}',1,datetime());`
        )
        .run().lastInsertRowid
      win.webContents.send('clipboard-changed')
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
