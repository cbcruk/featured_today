import { db, schemas } from '@lib/db'
import { defineCollection, z } from 'astro:content'
import { eq, getTableColumns, sql } from 'drizzle-orm'

const dates = defineCollection({
  async loader() {
    const rows = await db
      .select({
        ...getTableColumns(schemas.dates),
        stories: sql<string>`GROUP_CONCAT(stories.id)`,
      })
      .from(schemas.dates)
      .leftJoin(schemas.stories, eq(schemas.dates.id, schemas.stories.date_id))
      .groupBy(schemas.dates.id, schemas.dates.date)

    const result = rows.map((row) => {
      return {
        ...row,
        id: `${row.id}`,
        stories: row.stories.split(','),
      }
    })

    return result
  },
  schema: z.object({
    date: z.string(),
    stories: z.array(z.string()),
  }),
})

const stories = defineCollection({
  async loader() {
    const rows = await db
      .select({
        ...getTableColumns(schemas.stories),
        artwork: schemas.artworks.id,
        apps: sql<string>`GROUP_CONCAT(apps.id)`,
      })
      .from(schemas.stories)
      .leftJoin(
        schemas.artworks,
        eq(schemas.stories.id, schemas.artworks.story_id)
      )
      .leftJoin(schemas.apps, eq(schemas.stories.id, schemas.apps.story_id))
      .groupBy(schemas.stories.id)
    const result = rows.map((row) => {
      return {
        ...row,
        id: `${row.id}`,
        date_id: `${row.date_id}`,
        artwork: row.artwork?.toString() ?? null,
        apps: row.apps?.split(',') ?? [],
      }
    })

    return result
  },
  schema: z.object({
    id: z.string(),
    position: z.number(),
    url: z.string().nullable(),
    title: z.string(),
    label: z.string().nullable(),
    style: z.string(),
    substyle: z.string().nullable(),
    video_preview_url: z.string().nullable().optional(),
    short_description: z.string().nullable().optional(),
    artwork: z.string().nullable(),
    apps: z.array(z.string()).nullable(),
    date_id: z.string(),
  }),
})

const artworks = defineCollection({
  async loader() {
    const rows = await db.select().from(schemas.artworks)
    const result = rows.map((row) => {
      return {
        ...row,
        id: `${row.id}`,
        story_id: `${row.story_id}`,
      }
    })

    return result
  },
  schema: z.object({
    story_id: z.string(),
    url: z.string(),
    bg_color: z.string().nullable().optional(),
    alpha: z.string(),
  }),
})

const artworkTextColors = defineCollection({
  async loader() {
    const rows = await db.select().from(schemas.artworkTextColors)
    const result = rows.map((row) => {
      return {
        ...row,
        id: `${row.id}`,
        artwork_id: `${row.artwork_id}`,
      }
    })

    return result
  },
  schema: z.object({
    artwork_id: z.string(),
    text_color: z.string().nullable(),
  }),
})

const apps = defineCollection({
  async loader() {
    const rows = await db
      .select({
        ...getTableColumns(schemas.apps),
        offer: schemas.appOffers,
        categories: sql<string>`GROUP_CONCAT(app_categories.category)`,
      })
      .from(schemas.apps)
      .leftJoin(
        schemas.appOffers,
        eq(schemas.appOffers.app_id, schemas.apps.id)
      )
      .leftJoin(
        schemas.appCategories,
        eq(schemas.appCategories.app_id, schemas.apps.id)
      )
      .groupBy(schemas.apps.id)
    const result = rows.map((row) => {
      return {
        ...row,
        id: `${row.id}`,
        story_id: `${row.story_id}`,
        on_card: JSON.parse(row.on_card),
        offer: {
          ...row.offer,
          app_id: `${row.app_id}`,
        },
        categories: row.categories.split(','),
      }
    })

    return result
  },
  schema: z.object({
    name: z.string(),
    publisher_id: z.string(),
    publisher_name: z.string(),
    subtitle: z.string().nullable(),
    icon_url: z.string(),
    on_card: z.boolean(),
    offer: z.object({
      action_text: z.string(),
      price: z.number(),
      price_format: z.string().optional(),
    }),
    categories: z.array(z.string()),
    story_id: z.string(),
  }),
})

const appOffers = defineCollection({
  async loader() {
    const rows = await db.select().from(schemas.appOffers)
    const result = rows.map((row) => {
      return {
        ...row,
        id: `${row.id}`,
        app_id: `${row.app_id}`,
      }
    })

    return result
  },
  schema: z.object({
    app_id: z.string(),
    action_text: z.string(),
    price: z.number(),
    price_format: z.string().optional(),
  }),
})

const appCategories = defineCollection({
  async loader() {
    const rows = await db.select().from(schemas.appCategories)
    const result = rows.map((row) => {
      return {
        ...row,
        id: `${row.id}`,
        app_id: `${row.app_id}`,
      }
    })

    return result
  },
  schema: z.object({
    app_id: z.string(),
    category: z.number(),
  }),
})

export const collections = {
  dates,
  stories,
  artworks,
  artworkTextColors,
  apps,
  appOffers,
  appCategories,
}
