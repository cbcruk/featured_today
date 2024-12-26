import { db, schemas } from '@lib/db'
import { defineCollection, z, reference } from 'astro:content'
import { eq, getTableColumns, sql } from 'drizzle-orm'

const dates = defineCollection({
  async loader() {
    const rows = await db
      .select({
        ...getTableColumns(schemas.dates),
        stories: sql<string>`GROUP_CONCAT(stories.id)`,
      })
      .from(schemas.countries)
      .leftJoin(
        schemas.stories,
        eq(schemas.countries.id, schemas.stories.country_id)
      )
      .groupBy(schemas.countries.id, schemas.countries.date)

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
  }),
})

const artworks = defineCollection({
  async loader() {
    const rows = await db.select().from(schemas.artworks)

    const result = rows.map((row) => {
      return {
        ...row,
        id: `${row.id}`,
      }
    })

    return result
  },
  schema: z.object({
    url: z.string(),
    bg_color: z.string().nullable().optional(),
    alpha: z.string(),
  }),
})

const apps = defineCollection({
  async loader() {
    const rows = await db
      .select({
        ...getTableColumns(schemas.apps),
        offer: schemas.appOffers.id,
        categories: sql<string>`GROUP_CONCAT(appCategories.id)`,
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
    const result = rows.slice(0, 2).map((row) => {
      return {
        id: `${row.id}`,
        name: row.name,
        publisher_id: row.publisher_id,
        publisher_name: row.publisher_name,
        subtitle: row.subtitle,
        icon_url: row.icon_url,
        on_card: JSON.parse(row.on_card),
        offer: `${row.offer}`,
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
    offer: z.string(),
    categories: z.array(z.string()),
  }),
})

export const collections = {
  dates,
  stories,
  artworks,
  apps,
}
