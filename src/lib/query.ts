import type { AstroGlobal } from 'astro'
import { db, schemas, type SelectStory } from './db'
import { eq } from 'drizzle-orm'

type Params = AstroGlobal['params']

export async function getDateId(date: Params[string]) {
  if (!date) {
    return null
  }

  const rows = await db
    .select()
    .from(schemas.dates)
    .where(eq(schemas.dates.date, date))
  const row = rows.at(0)

  if (!row) {
    return null
  }

  return row.id
}

type StoryId = SelectStory['id']

export async function getArtWork(storyId: StoryId) {
  const rows = await db
    .select()
    .from(schemas.artworks)
    .where(eq(schemas.artworks.story_id, storyId))

  return rows.at(0)
}

export async function getApps(storyId: StoryId) {
  const rows = await db
    .select()
    .from(schemas.apps)
    .where(eq(schemas.apps.story_id, storyId))

  return rows
}

type GetStoriesParams = Awaited<ReturnType<typeof getDateId>>

export async function getStories(dateId: GetStoriesParams) {
  if (!dateId) {
    return []
  }

  const storyRows = await db
    .select()
    .from(schemas.stories)
    .where(eq(schemas.stories.date_id, dateId))
    .groupBy(schemas.stories.id)
  const stories = await Promise.all(
    storyRows.map(async (row) => {
      return {
        ...row,
        id: `${row.id}`,
        date_id: `${row.date_id}`,
        artwork: await getArtWork(row.id),
        apps: await getApps(row.id),
      }
    })
  )

  return stories
}
