import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko')

export function getDisplayFormat(format) {
  return dayjs().format(format)
}
