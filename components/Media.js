import { getThumbnail } from '../lib/image'
import { normalize } from '../lib/text'
import Box from './Box'

function Link({ url, className, children }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}

function Media({
  artwork,
  video_preview_url,
  label,
  title,
  short_description,
  url,
  position,
}) {
  if (video_preview_url) {
    return (
      <Box
        style={{
          backgroundColor: `#${artwork.bg_color}`,
        }}
      >
        {video_preview_url && (
          <img
            src={getThumbnail(video_preview_url, '960x1266cc')}
            alt=""
            width="960"
            height="1266"
            loading={position === 1 ? 'eager' : 'lazy'}
            className="w-full overflow-hidden rounded-lg rounded-b-none"
          />
        )}
        <div className="flex flex-col p-4 bg-gray-700">
          <div className="text-sm text-gray-300">{label}</div>
          <Link url={url} className="text-2xl text-white font-bold">
            {title}
          </Link>
          <div className="mt-4 text-sm text-gray-400">
            {normalize(short_description)}
          </div>
        </div>
      </Box>
    )
  }

  return (
    <Box
      style={{
        backgroundColor: `#${artwork.bg_color}`,
      }}
    >
      {artwork && (
        <img
          src={getThumbnail(artwork.url, '960x1266fn')}
          alt=""
          width="960"
          height="1266"
          loading={position === 1 ? 'eager' : 'lazy'}
        />
      )}
      <div className="flex flex-col absolute top-0 left-0 w-full h-full pt-8 pb-6 px-5">
        <div className="font-bold">
          <div className="text-md text-gray-300">{label}</div>
          <Link url={url} className="text-3xl text-white">
            {title}
          </Link>
        </div>
        <div className="mt-auto text-lg text-white">
          {normalize(short_description)}
        </div>
      </div>
    </Box>
  )
}

export default Media
