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

const stories = sqliteTable('stories', {
  id: integer('id').primaryKey(),
  position: integer('position').notNull(),
  storyId: text('story_id').notNull(),
  url: text('url'),
  title: text('title'),
  label: text('label'),
  shortDescription: text('short_description'),
  style: text('style').notNull(),
  videoPreviewUrl: text('video_preview_url'),
  substyle: text('substyle'),
  countryId: integer('country_id')
    .notNull()
    .references(() => countries.id),
})

const artworks = sqliteTable('artworks', {
  id: integer('id').primaryKey(),
  storyId: integer('story_id')
    .notNull()
    .references(() => stories.id),
  url: text('url').notNull(),
  bgColor: text('bg_color'),
  alpha: text('alpha').notNull(),
})

const artworkTextColors = sqliteTable('artwork_text_colors', {
  id: integer('id').primaryKey(),
  artworkId: integer('artwork_id')
    .notNull()
    .references(() => artworks.id),
  textColor: text('text_color'),
})

const apps = sqliteTable('apps', {
  id: integer('id').primaryKey(),
  storyId: integer('story_id')
    .notNull()
    .references(() => stories.id),
  appId: integer('app_id').notNull(),
  name: text('name').notNull(),
  publisherId: text('publisher_id').notNull(),
  publisherName: text('publisher_name').notNull(),
  subtitle: text('subtitle'),
  iconUrl: text('icon_url').notNull(),
  onCard: text('on_card').notNull(),
})

const appOffers = sqliteTable('app_offers', {
  id: integer('id').primaryKey(),
  appId: integer('app_id')
    .notNull()
    .references(() => apps.id),
  actionText: text('action_text').notNull(),
  price: integer('price').notNull(),
  priceFormatted: text('price_formatted').notNull(),
})

const appCategories = sqliteTable('app_categories', {
  id: integer('id').primaryKey(),
  appId: integer('app_id')
    .notNull()
    .references(() => apps.id),
  category: integer('category').notNull(),
})

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
