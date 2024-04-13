import type { Story } from '@types'
import Box from './Box'
import Grid from './Grid'

type Props = Partial<Story>

function List({ label, title, apps, url, position }: Props) {
  if (!url) {
    return null
  }

  if (!apps) {
    return null
  }

  return (
    <Box>
      <div className="bg-gray-200 dark:bg-gray-800">
        <div className="py-8 px-5 font-bold">
          <div className="text-md text-gray-600 dark:text-gray-300">
            {label}
          </div>
          <a href={url} target="_blank" rel="noreferrer" className="text-3xl">
            {title}
          </a>
        </div>
        <Grid apps={apps} position={position} />
      </div>
    </Box>
  )
}

export default List
