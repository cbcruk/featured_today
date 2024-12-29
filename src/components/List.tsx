import type { StoryData } from '@lib/collection'
import Box from './Box'
import type { PropsWithChildren } from 'react'

type Props = {
  data: StoryData
}

function List({ data, children }: PropsWithChildren<Props>) {
  if (!data.url) {
    return null
  }

  return (
    <Box>
      <div className="bg-gray-200 dark:bg-gray-800">
        <div className="py-8 px-5 font-bold">
          <div className="text-md text-gray-600 dark:text-gray-300">
            {data.label}
          </div>
          <a
            href={data.url}
            target="_blank"
            rel="noreferrer"
            className="text-3xl"
          >
            {data.title}
          </a>
        </div>
        {children}
      </div>
    </Box>
  )
}

export default List
