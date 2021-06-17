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
    <div className="flex flex-wrap gap-2 max-w-sm p-4 m-auto">
      <Head>
        <title>투데이 - {today}</title>
      </Head>

      {stories.map((story) => {
        switch (story.substyle) {
          case 'app_of_day':
          case 'game_of_day':
            return <Card key={story.id} {...story} />
          case 'list':
          case 'grid':
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
