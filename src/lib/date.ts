import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

export function getDisplayFormat(format: string, date: dayjs.ConfigType) {
  return dayjs(date || new Date()).format(format)
}
