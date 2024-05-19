import { db } from './connect'
import { findOne } from './query'
// import { is } from '@electron-toolkit/utils'

db.exec(`
  create table if not exists categories (
    id integer primary key autoincrement not null,
    name text not null,
    created_at text not null
  );
`)

db.exec(`
  create table if not exists contents (
    id integer primary key autoincrement not null,
    title text not null,
    content text not null,
    category_id integer,
    created_at text not null
  );
`)

db.exec(`
  create table if not exists config (
    id integer primary key autoincrement not null,
    content text not null
  );
`)
function initData() {
  const isInit = findOne('select * from contents')
  if (isInit) return
  db.exec(`
  INSERT INTO config (content) VALUES('{"shortCut":"Alt+Space","databaseDirectory":"df"}');
`)
  for (let i = 1; i <= 10; i++) {
    const name = Math.random().toString(36).slice(i)
    db.exec(`
    INSERT INTO categories (name,created_at) VALUES('${name}',datetime());
  `)
    for (let j = 1; j < 20; j++) {
      const title = Math.random()
        .toString(j * 2 + i - j + i * 2)
        .slice(-5)
      const content = Math.random()
        .toString(j * i - j + i * 2)
        .slice(-5)
      db.exec(`
    INSERT INTO contents (title,content,category_id,created_at) VALUES('${title}','${content}',${i},datetime());
  `)
    }
  }
}

// initData()
