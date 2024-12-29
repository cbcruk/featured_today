import type { ArtworkEntry, DateEntry, StoryEntry } from '@content/types'
import { getCollection } from 'astro:content'

export async function getStories(dataEntryId: DateEntry['id']) {
  const storyCollection = await getCollection('stories')
  const artworkCollection = await getCollection('artworks')
  const artworkTextColorCollection = await getCollection('artworkTextColors')
  const appCollection = await getCollection('apps')

  function getArtworkTextColors(id: ArtworkEntry['id']) {
    const textColors = artworkTextColorCollection
      .filter((artworkTextColor) => artworkTextColor.data.artwork_id === id)
      .map((artworkTextColor) => artworkTextColor.data.text_color)

    return textColors
  }

  function getArtwork(artwork: ArtworkEntry | undefined) {
    if (typeof artwork === 'undefined') {
      return null
    }

    return {
      ...artwork.data,
      text_colors: getArtworkTextColors(artwork.id),
    }
  }

  function getApps(storyId: StoryEntry['id']) {
    return appCollection
      .filter((app) => app.data.story_id === storyId)
      .map((app) => {
        return {
          id: app.id,
          ...app.data,
        }
      })
  }

  const stories = storyCollection
    .filter((story) => story.data.date_id === dataEntryId)
    .map((story) => {
      const data = story.data
      const artwork = artworkCollection.find(
        (artwork) => artwork.data.story_id === data.id
      )

      return {
        ...data,
        id: story.id,
        artwork: getArtwork(artwork),
        apps: getApps(data.id),
      }
    })

  return stories
}

export type StoriesData = Awaited<ReturnType<typeof getStories>>
export type StoryData = StoriesData[number]
