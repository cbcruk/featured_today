import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const countries = sqliteTable(
  'countries',
  {
    id: integer('id').primaryKey(),
    country: text('country').notNull(),
    date: text('date').notNull(),
  },
  () => []
)

const stories = sqliteTable(
  'stories',
  {
    id: integer('id').primaryKey(),
    position: integer('position').notNull(),
    storyId: text('story_id').notNull(),
    url: text('url'),
    title: text('title'),
    label: text('label'),
    short_description: text('short_description'),
    style: text('style').notNull(),
    video_preview_url: text('video_preview_url'),
    substyle: text('substyle'),
    country_id: integer('country_id')
      .notNull()
      .references(() => countries.id),
  },
  () => []
)

const artworks = sqliteTable(
  'artworks',
  {
    id: integer('id').primaryKey(),
    story_id: integer('story_id')
      .notNull()
      .references(() => stories.id),
    url: text('url').notNull(),
    bg_color: text('bg_color'),
    alpha: text('alpha').notNull(),
  },
  () => []
)

const artworkTextColors = sqliteTable(
  'artwork_text_colors',
  {
    id: integer('id').primaryKey(),
    artwork_id: integer('artwork_id')
      .notNull()
      .references(() => artworks.id),
    text_color: text('text_color'),
  },
  () => []
)

const apps = sqliteTable(
  'apps',
  {
    id: integer('id').primaryKey(),
    story_id: integer('story_id')
      .notNull()
      .references(() => stories.id),
    app_id: integer('app_id').notNull(),
    name: text('name').notNull(),
    publisher_id: text('publisher_id').notNull(),
    publisher_name: text('publisher_name').notNull(),
    subtitle: text('subtitle'),
    icon_url: text('icon_url').notNull(),
    on_card: text('on_card').notNull(),
  },
  () => []
)

const appOffers = sqliteTable(
  'app_offers',
  {
    id: integer('id').primaryKey(),
    app_id: integer('app_id')
      .notNull()
      .references(() => apps.id),
    action_text: text('action_text').notNull(),
    price: integer('price').notNull(),
    price_formatted: text('price_formatted').notNull(),
  },
  () => []
)

const appCategories = sqliteTable(
  'app_categories',
  {
    id: integer('id').primaryKey(),
    appId: integer('app_id')
      .notNull()
      .references(() => apps.id),
    category: integer('category').notNull(),
  },
  () => []
)

const client = new Database('db/kr.db')

export const db = drizzle({ client })

export const schemas = {
  countries,
  stories,
  artworks,
  artworkTextColors,
  apps,
  appOffers,
  appCategories,
}
