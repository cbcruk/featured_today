import { getDisplayFormat } from '@/lib/date'
import { FeaturedDateParams } from './types'
import { LAST_DATE } from '@/constants'

export function getDateData(date: FeaturedDateParams['date']) {
  const defaultDate = date ?? LAST_DATE
  const title = getDisplayFormat('M월 D일 dddd', `${defaultDate}`)

  return {
    defaultDate,
    title,
  }
}
