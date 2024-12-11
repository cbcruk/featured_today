import { drizzle } from 'drizzle-orm/better-sqlite3'
import { Database } from 'limbo-wasm'

const client = new Database('kr.db')

export const db = drizzle({ client })