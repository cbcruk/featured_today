import Card from './Card'
import Media from './Media'
import { isList } from './Stories.helpers'
import List from './List'
import Grid from './Grid'
import { GetStoriesParamsReturn } from '@/lib/query'

type Props = {
  data: GetStoriesParamsReturn
}

export function Stories({ data }: Props) {
  return (
    <div className="flex flex-col flex-1 gap-4">
      {data
        .filter((story) => !isList(story.substyle))
        .map((story) => {
          switch (story.substyle) {
            case 'app_of_day':
            case 'game_of_day':
            case 'editorial':
              return <Card key={story.id} data={story} />
            default:
              return <Media key={story.id} data={story} />
          }
        })}
      {data
        .filter((story) => isList(story.substyle))
        .map((story) => {
          return (
            <List key={story.id} data={story}>
              <Grid data={story} />
            </List>
          )
        })}
    </div>
  )
}
