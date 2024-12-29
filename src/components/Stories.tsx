import Card from './Card'
import Media from './Media'
import { isList } from './Stories.helpers'
import List from './List'
import type { StoriesData } from '@lib/collection'
import Grid from './Grid'

type Props = {
  data: StoriesData
}

export function Stories({ data }: Props) {
  return (
    <>
      {data
        .filter((story) => !isList(story.substyle))
        .map((story) => {
          switch (story.substyle) {
            case 'app_of_day':
            case 'game_of_day':
            case 'editorial':
              return <Card data={story} />
            default:
              return <Media data={story} />
          }
        })}
      {data
        .filter((story) => isList(story.substyle))
        .map((story) => {
          return (
            <List data={story}>
              <Grid data={story} />
            </List>
          )
        })}
    </>
  )
}
