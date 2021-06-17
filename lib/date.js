import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

export function getDisplayFormat(format, date) {
  return dayjs(date || new Date()).format(format)
}
