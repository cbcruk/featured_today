import chroma from 'chroma-js'
import clsx from 'clsx'
import { getThumbnail } from '../lib/image'
import Box from './Box'
import styles from './Card.module.css'

function Card({ apps, label, artwork, url, position }) {
  return (
    <Box
      style={{
        backgroundColor: `#${artwork.bg_color}`,
      }}
    >
      <img
        src={getThumbnail(artwork.url, '480x633fn')}
        alt=""
        width="480"
        height="633"
        loading={position === 1 ? 'eager' : 'lazy'}
      />
      <div className="absolute bottom-0 left-0 flex flex-col w-full h-full">
        <div className="p-4 mt-auto font-extrabold text-4xl whitespace-pre">
          <span
            className={clsx([
              styles.label,
              chroma(artwork.bg_color).luminance() < 0.5
                ? 'is-dark'
                : 'is-light',
            ])}
          >
            {label}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className={clsx(['flex align-middle gap-3 p-4', styles.link])}
        >
          <img
            src={getThumbnail(apps[0].icon_url, '160x160sr')}
            alt=""
            width={52}
            height={52}
            className="rounded-lg"
          />
          <div className="flex flex-col justify-center text-white">
            <div className="text-sm">{apps[0].name}</div>
            <div className="text-xs">{apps[0].subtitle}</div>
          </div>
        </a>
      </div>
    </Box>
  )
}

export default Card
