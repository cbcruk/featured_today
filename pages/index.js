import Head from 'next/head'
import { useRouter } from 'next/router'
import Card from '../components/Card'
import List from '../components/List'
import Media from '../components/Media'
import { getDisplayFormat } from '../lib/date'

export default function Home({ data }) {
  const router = useRouter()

  if (!data) {
    return null
  }

  const { stories } = data
  const today = getDisplayFormat('MM월 DD일 dddd', router.query.date)

  return (
    <div className="max-w-sm p-4 m-auto">
      <Head>
        <title>투데이 - {today}</title>
      </Head>
      <header className="py-4 pt-0">
        <h1 className="relative text-sm text-gray-500">
          <label htmlFor="date">{today}</label>
          <input
            id="date"
            type="date"
            className="absolute top-0 left-0 opacity-0"
            onChange={(e) => {
              router.push({
                query: {
                  date: e.target.value,
                },
              })
            }}
          />
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
  )
}

export async function getServerSideProps(context) {
  const date = context.query.date || 'data'
  const response = await fetch(
    `https://raw.githubusercontent.com/cbcruk/featured_today/main/raw_data/KR/${date}.json`
  )
  const data = await response.json()

  return {
    props: {
      data,
    },
  }
}
