import Card from './Card'
import Media from './Media'
import type { Props } from './Stories.types'
import { isList } from './Stories.helpers'
import List from './List'

export function Stories({ stories }: Props) {
  return (
    <>
      {stories
        .filter((story) => !isList(story.substyle))
        .map((story) => {
          switch (story.substyle) {
            case 'app_of_day':
            case 'game_of_day':
            case 'editorial':
              return <Card {...story} />
            default:
              return (
                <Media
                  artwork={story.artwork}
                  video_preview_url={story.video_preview_url}
                  label={story.label}
                  title={story.title}
                  short_description={story.short_description}
                  url={story.url}
                  position={story.position}
                />
              )
          }
        })}
      {stories
        .filter((story) => isList(story.substyle))
        .map((story) => {
          return (
            <List
              position={story.position}
              label={story.label}
              title={story.title}
              apps={story.apps}
              url={story.url}
            />
          )
        })}
    </>
  )
}
