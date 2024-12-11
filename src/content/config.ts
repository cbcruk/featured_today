import { db, schemas } from '@lib/db'
import { defineCollection, z, reference } from 'astro:content'
import { eq, getTableColumns, sql } from 'drizzle-orm'

const dates = defineCollection({
  async loader() {
    const rows = await db
      .select({
        id: schemas.countries.id,
        date: schemas.countries.date,
        stories: sql<string>`GROUP_CONCAT(stories.story_id)`,
      })
      .from(schemas.countries)
      .leftJoin(
        schemas.stories,
        eq(schemas.countries.id, schemas.stories.countryId)
      )
      .groupBy(schemas.countries.id, schemas.countries.date)

    return rows.map((row) => {
      return {
        ...row,
        id: `${row.id}`,
        stories: row.stories.split(','),
      }
    })
  },
  schema: z.object({
    date: z.string(),
    stories: z.array(reference('stories')),
  }),
})

// const stories = defineCollection({
//   async loader() {
//     const rows = await db
//       .select({
//         ...getTableColumns(schemas.stories),
//         artwork: schemas.artworks.id,
//         apps: sql<string>`GROUP_CONCAT(apps.app_id)`,
//       })
//       .from(schemas.stories)
//       .leftJoin(
//         schemas.stories,
//         eq(schemas.stories.id, schemas.artworks.storyId)
//       )
//       .leftJoin(schemas.apps, eq(schemas.stories.id, schemas.apps.storyId))
//       .groupBy(schemas.stories.id)

//     return rows
//   },
//   schema: z.object({
//     position: z.number(),
//     id: z.string(),
//     url: z.string().nullable(),
//     title: z.string().nullable(),
//     label: z.string().nullable(),
//     short_description: z.string().nullable(),
//     style: z.string(),
//     artwork: reference('artworks'),
//     video_preview_url: z.string().nullable(),
//     apps: z.array(reference('apps')),
//     substyle: z.string().nullable(),
//   }),
// })

// const artworks = defineCollection({
//   async loader() {
//     const rows = await db.select().from(schemas.artworks)

//     return rows
//   },
//   schema: z
//     .object({
//       url: z.string(),
//       text_colors: z.array(z.string().nullable()),
//       bg_color: z.string().nullable(),
//       alpha: z.boolean(),
//     })
//     .nullable(),
// })

// const apps = defineCollection({
//   async loader() {
//     const rows = await db
//       .select({
//         ...getTableColumns(schemas.apps),
//         offer: schemas.appOffers,
//         categories: sql<string>`GROUP_CONCAT(appCategories.id)`,
//       })
//       .from(schemas.apps)
//       .leftJoin(schemas.appOffers, eq(schemas.appOffers.appId, schemas.apps.id))
//       .leftJoin(
//         schemas.appCategories,
//         eq(schemas.appCategories.appId, schemas.apps.id)
//       )

//     return rows
//   },
//   schema: z.object({
//     app_id: z.number(),
//     name: z.string(),
//     publisher_id: z.string(),
//     publisher_name: z.string(),
//     categories: z.array(z.number()),
//     subtitle: z.string().nullable(),
//     icon_url: z.string(),
//     offer: z.object({
//       action_text: z.string(),
//       price: z.number(),
//       price_formatted: z.string(),
//     }),
//     on_card: z.boolean(),
//   }),
// })

export const collections = {
  dates,
  // stories,
  // artworks,
  // apps,
}
