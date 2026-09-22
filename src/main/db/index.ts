import { app } from 'electron'
import { join } from 'node:path'
import Database from 'better-sqlite3'

app.setName('NeuroFlow')

const dbPath = join(app.getPath('userData'), 'neuroflow.db')

export const db: Database.Database = new Database(dbPath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')
