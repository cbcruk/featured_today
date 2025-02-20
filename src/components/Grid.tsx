import clsx from 'clsx'
import styles from './Grid.module.css'
import { GetStoriesParamsReturn } from '@/lib/query'
import { getThumbnail } from '@/lib/image'

type Props = {
  data: GetStoriesParamsReturn[number]
}

function Grid({ data }: Props) {
  return (
    <div
      className={clsx([
        'aspect-ratio overflow-hidden',
        styles.wrapper,
        {
          'is-not-visible': data.position !== 1,
        },
      ])}
    >
      <div className={clsx(['absolute grid', styles.template2])}>
        {data.apps.slice(0, 6).map((item, index) => (
          <div
            key={item.id}
            className={clsx([
              'overflow-hidden rounded-2xl shadow m-2',
              styles.item,
            ])}
            style={{
              gridArea: `g${index + 1}`,
            }}
          >
            <img
              src={getThumbnail(item.icon_url, '128x128cc')}
              alt={item.name}
              width={128}
              height={128}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Grid
