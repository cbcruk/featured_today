import { getThumbnail } from '@lib/image'
import { normalize } from '@lib/text'
import Box from './Box'
import type { StoryData } from '@lib/collection'

type Props = {
  data: StoryData
}

function Media({ data }: Props) {
  if (data.video_preview_url) {
    return (
      <Box
        style={{
          backgroundColor: `#${data.artwork?.bg_color ?? 'transparent'}`,
        }}
      >
        <img
          src={getThumbnail(data.video_preview_url, '960x1266cc')}
          alt=""
          width="960"
          height="1266"
          loading={data.position === 1 ? 'eager' : 'lazy'}
          className="w-full overflow-hidden rounded-lg rounded-b-none"
        />
        <div className="flex flex-col p-4 bg-gray-700">
          <div className="text-sm text-gray-300">{data.label}</div>
          {data.url && (
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className="text-2xl text-white font-bold"
            >
              {data.title}
            </a>
          )}
          <div className="mt-4 text-sm text-gray-400">
            {normalize(data.short_description)}
          </div>
        </div>
      </Box>
    )
  }

  return (
    <Box
      style={{
        backgroundColor: `#${data.artwork?.bg_color ?? 'transparent'}`,
      }}
    >
      {data.artwork && (
        <img
          src={getThumbnail(data.artwork.url, '960x1266fn')}
          alt=""
          width="960"
          height="1266"
          loading={data.position === 1 ? 'eager' : 'lazy'}
        />
      )}
      <div className="flex flex-col absolute top-0 left-0 w-full h-full pt-8 pb-6 px-5">
        <div className="font-bold">
          <div className="text-md text-gray-300">{data.label}</div>
          {data.url && (
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className="text-3xl text-white"
            >
              {data.title}
            </a>
          )}
        </div>
        <div className="mt-auto text-lg text-white">
          {normalize(data.short_description)}
        </div>
      </div>
    </Box>
  )
}

export default Media
