import Head from 'next/head'
import Grid from '../components/Grid'
import { getDisplayFormat } from '../lib/date'
import { getThumbnail } from '../lib/image'

export default function Home({ today, data }) {
  const { stories } = data

  return (
    <div className="flex flex-wrap gap-2 max-w-sm p-4 m-auto">
      <Head>
        <title>투데이 - {today}</title>
      </Head>
      {stories.map((story) => {
        if (story.substyle === 'list') {
          return (
            <div
              key={story.id}
              className="overflow-hidden relative rounded-lg bg-gray-200"
            >
              <div className="py-8 px-5 font-bold">
                <div className="text-md text-gray-600">{story.label}</div>
                <div className="text-3xl">{story.title}</div>
              </div>
              <Grid items={story.apps} />
            </div>
          )
        }

        return (
          <div key={story.id} className="overflow-hidden relative rounded-lg">
            {story.artwork && (
              <img
                src={getThumbnail(story.artwork.url, '960x1266fn')}
                alt=""
                className="w-full overflow-hidden rounded-lg"
              />
            )}
            {story.artwork && (
              <div className="flex flex-col absolute top-0 left-0 w-full h-full pt-8 pb-6 px-5">
                <div className="font-bold">
                  <div className="text-md text-gray-300">{story.label}</div>
                  <div className="text-3xl text-white">{story.title}</div>
                </div>
                <div className="mt-auto text-lg text-white">
                  {story.short_description
                    .replace('〈', '<')
                    .replace('〉', '>')}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export async function getStaticProps() {
  const today = getDisplayFormat('MM월 DD일 dddd')
  const date = getDisplayFormat('YYYY-MM-DD')
  const response = await fetch(
    `https://raw.githubusercontent.com/cbcruk/featured_today/main/raw_data/KR/${date}.json`
  )
  const data = await response.json()

  return {
    props: {
      data,
      today,
    },
  }
}
