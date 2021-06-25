import { getThumbnail } from '../lib/image'

const SIZE = '156px'

function Grid({ items }) {
  return (
    <div className="aspect-ratio overflow-hidden">
      <style jsx>
        {`
          .aspect-ratio {
            position: relative;
          }

          .aspect-ratio::before {
            float: left;
            padding-top: calc(284 / 335.7 * 100%);
            content: '';
          }

          .aspect-ratio::after {
            display: block;
            content: '';
            clear: both;
          }
        `}
      </style>
      <div
        className="absolute grid"
        style={{
          gridTemplate: `'g21 g22 g23 g24 g25 g26' ${SIZE}
            'g20 g7 g8 g9 g10 g27' ${SIZE}
            'g19 g6 g1 g2 g11 g28' ${SIZE}
            'g18 g5 g4 g3 g12 g29' ${SIZE}
            'g17 g16 g15 g14 g13 g30' ${SIZE} / ${SIZE} ${SIZE} ${SIZE} ${SIZE} ${SIZE} ${SIZE}`,
          transform: `translate(-32px, 24px) rotate(-30deg) translate(-85px, -${SIZE})`,
          transformOrigin: (352 - 153) / 2,
        }}
      >
        {items.map((item, index) => (
          <div
            key={item.app_id}
            className="overflow-hidden rounded-2xl shadow m-2"
            style={{
              gridArea: `g${index + 1}`,
            }}
          >
            <img
              src={getThumbnail(item.icon_url, '256x256cc')}
              alt={item.name}
              width={156}
              height={156}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Grid
