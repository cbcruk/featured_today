import Head from 'next/head'
import { useRouter } from 'next/router'
import { getDisplayFormat } from '../lib/date'
import Card from './Card'
import DatePicker from './Date'
import List from './List'
import Media from './Media'

function Wrap({ stories, date }) {
  const router = useRouter()
  const today = getDisplayFormat('MM월 DD일 dddd', date)

  return (
    <>
      <Head>
        <title>투데이 - {getDisplayFormat('MM월 DD일 dddd', date)}</title>
      </Head>
      <div className="max-w-sm p-4 m-auto">
        <header className="py-4 pt-0">
          <h1 className="relative text-sm text-gray-500">
            <DatePicker
              onChange={(e) => {
                router.push(`/${e.target.value}`)
              }}
            >
              {today}
            </DatePicker>
          </h1>
          <h2 className="text-2xl font-bold">투데이</h2>
        </header>
        <div className="flex flex-wrap">
          {stories.map((story) => {
            switch (story.substyle) {
              case 'app_of_day':
              case 'game_of_day':
              case 'editorial':
                return <Card key={story.id} {...story} />
              case 'list':
              case 'grid':
              case 'river':
                return (
                  <List
                    key={story.id}
                    label={story.label}
                    title={story.title}
                    apps={story.apps}
                    url={story.url}
                  />
                )
              default:
                return (
                  <Media
                    key={story.id}
                    artwork={story.artwork}
                    video_preview_url={story.video_preview_url}
                    label={story.label}
                    title={story.title}
                    short_description={story.short_description}
                    url={story.url}
                  />
                )
            }
          })}
        </div>
      </div>
    </>
  )
}

export default Wrap
