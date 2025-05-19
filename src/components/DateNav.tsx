'use client'

import { getDisplayFormat } from '@/lib/date'
import dayjs from 'dayjs'
import Link from 'next/link'

type DateNavProps = {
  date: string
}

export function DateNav({ date }: DateNavProps) {
  const d = dayjs(date)
  const prev = getDisplayFormat('YYYY-MM-DD', d.add(-1, 'day'))
  const next = getDisplayFormat('YYYY-MM-DD', d.add(1, 'day'))

  return (
    <div className="fixed bottom-4 right-4 flex gap-2 text-lg shadow-lg">
      <Link prefetch href={`/featured/${prev}`}>
        ◀️
      </Link>
      <Link prefetch href={`/featured/${next}`}>
        ▶️
      </Link>
    </div>
  )
}
