import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const countries = sqliteTable('countries', {
    id: integer('id').primaryKey(),
    country: text('country').notNull(),
    date: text('date').notNull(),
})

export const stories = sqliteTable('stories', {
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
    countryId: integer('country_id').notNull().references(() => countries.id),
  });
   
  export const artworks = sqliteTable('artworks', {
    id: integer('id').primaryKey(),
    storyId: integer('story_id').notNull().references(() => stories.id),
    url: text('url').notNull(),
    bgColor: text('bg_color'),
    alpha: text('alpha').notNull(),
  });
  
  export const artworkTextColors = sqliteTable('artwork_text_colors', {
    id: integer('id').primaryKey(),
    artworkId: integer('artwork_id').notNull().references(() => artworks.id),
    textColor: text('text_color'),
  });
  
  export const apps = sqliteTable('apps', {
    id: integer('id').primaryKey(),
    storyId: integer('story_id').notNull().references(() => stories.id),
    appId: integer('app_id').notNull(),
    name: text('name').notNull(),
    publisherId: text('publisher_id').notNull(),
    publisherName: text('publisher_name').notNull(),
    subtitle: text('subtitle'),
    iconUrl: text('icon_url').notNull(),
    onCard: text('on_card').notNull(),
  });
  
  export const appOffers = sqliteTable('app_offers', {
    id: integer('id').primaryKey(),
    appId: integer('app_id').notNull().references(() => apps.id),
    actionText: text('action_text').notNull(),
    price: integer('price').notNull(),
    priceFormatted: text('price_formatted').notNull(),
  });
  
  export const appCategories = sqliteTable('app_categories', {
    id: integer('id').primaryKey(),
    appId: integer('app_id').notNull().references(() => apps.id),
    category: integer('category').notNull(),
  });