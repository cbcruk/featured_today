import chroma from 'chroma-js'
import clsx from 'clsx'
import Box from './Box'
import styles from './Card.module.css'
import { getThumbnail } from '@lib/image'
import type { StoryData } from '@lib/collection'

type Props = {
  data: StoryData
}

function getLuminance(artwork: Props['data']['artwork']) {
  if (!artwork?.bg_color) {
    return 1
  }

  return chroma(artwork.bg_color).luminance()
}

function Card({ data }: Props) {
  if (!data.artwork) {
    return null
  }

  if (!data.url) {
    return null
  }

  return (
    <Box
      data-has-artwork="true"
      style={{
        backgroundColor: `#${data.artwork.bg_color}`,
      }}
    >
      <img
        src={getThumbnail(data.artwork.url, '480x633fn')}
        alt=""
        width="480"
        height="633"
        loading={data.position === 1 ? 'eager' : 'lazy'}
      />
      <div className="absolute bottom-0 left-0 flex flex-col w-full h-full">
        <div className="p-4 mt-auto font-extrabold text-4xl whitespace-pre">
          <span
            className={clsx([
              styles.label,
              getLuminance(data.artwork) < 0.5 ? 'is-dark' : 'is-light',
            ])}
          >
            {data.label}
          </span>
        </div>
        <a
          href={data.url}
          target="_blank"
          rel="noreferrer"
          className={clsx(['flex align-middle gap-3 p-4', styles.link])}
        >
          <img
            src={getThumbnail(data.apps[0].icon_url, '160x160sr')}
            alt=""
            width={52}
            height={52}
            className="rounded-lg"
          />
          <div className="flex flex-col justify-center text-white">
            <div className="text-sm">{data.apps[0].name}</div>
            <div className="text-xs">{data.apps[0].subtitle}</div>
          </div>
        </a>
      </div>
    </Box>
  )
}

export default Card
