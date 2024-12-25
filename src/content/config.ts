import { db, schemas } from '@lib/db'
import { defineCollection, z, reference } from 'astro:content'
import { eq, getTableColumns, sql } from 'drizzle-orm'

const dates = defineCollection({
  async loader() {
    const rows = await db
      .select({
        id: schemas.countries.id,
        date: schemas.countries.date,
        stories: sql<string>`GROUP_CONCAT(stories.id)`,
      })
      .from(schemas.countries)
      .leftJoin(
        schemas.stories,
        eq(schemas.countries.id, schemas.stories.countryId)
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
    stories: z.array(reference('stories')),
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
        eq(schemas.stories.id, schemas.artworks.storyId)
      )
      .leftJoin(schemas.apps, eq(schemas.stories.id, schemas.apps.storyId))
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
    artwork: reference('artworks').nullable(),
    apps: z.array(reference('apps')).nullable(),
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
  loader() {
    // const rows = await db
    //   .select({
    //     ...getTableColumns(schemas.apps),
    //     // offer: schemas.appOffers,
    //     // categories: sql<string>`GROUP_CONCAT(appCategories.id)`,
    //   })
    //   .from(schemas.apps)
    //   .leftJoin(schemas.appOffers, eq(schemas.appOffers.appId, schemas.apps.id))
    //   .leftJoin(
    //     schemas.appCategories,
    //     eq(schemas.appCategories.appId, schemas.apps.id)
    //   )
    //   .groupBy(schemas.apps.id)
    // const result = rows.slice(0, 2).map((row) => {
    //   return {
    //     id: `${row.id}`,
    //     name: row.name,
    //     publisherId: row.publisherId,
    //     publisherName: row.publisherName,
    //     subtitle: row.subtitle,
    //     iconUrl: row.iconUrl,
    //     onCard: JSON.parse(row.onCard),
    //   }
    // })

    // console.log(result)

    return [
      {
        id: '1',
        name: 'Score! Hero 2',
        publisherId: '471316020',
        publisherName: 'First Touch Games Ltd.',
        subtitle: '새로운 영웅!',
        iconUrl:
          'https://is5-ssl.mzstatic.com/image/thumb/Purple125/v4/d1/8d/fc/d18dfcc8-42ef-bafc-8dad-2960964ce190/AppIcon-1x_U007emarketing-0-10-0-85-220.png/1024x1024bb.png',
        onCard: true,
      },
    ]
  },
  schema: z.object({
    name: z.string(),
    publisherId: z.string(),
    publisherName: z.string(),
    subtitle: z.string().nullable(),
    iconUrl: z.string(),
    onCard: z.boolean(),
  }),
})

export const collections = {
  dates,
  stories,
  artworks,
  apps,
}
