import chroma from 'chroma-js'
import { getThumbnail } from '../lib/image'
import Box from './Box'

function Card({ apps, label, artwork, url }) {
  return (
    <Box>
      <img src={getThumbnail(artwork.url, '960x1266fn')} alt="" />
      <div className="absolute bottom-0 left-0 flex flex-col w-full h-full">
        <div className="p-4 mt-auto font-extrabold text-4xl whitespace-pre">
          <span
            style={{
              color:
                chroma(artwork.bg_color).luminance() < 0.5 ? '#fff' : '#000',
            }}
          >
            {label}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex align-middle gap-3 p-4"
          style={{
            backdropFilter: 'blur(30px)',
            backgroundColor: 'rgba(0, 0, 0, 0.34)',
          }}
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
