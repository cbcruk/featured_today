import { DayPicker, type PropsBase, type PropsSingle } from 'react-day-picker'
import { Popover } from '@base-ui-components/react/popover'
import { ko } from 'react-day-picker/locale'

type Props = PropsBase & PropsSingle

export function DatePicker(props: Props) {
  return (
    <>
      <Popover.Root>
        <Popover.Trigger>🗓️</Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup>
              <DayPicker
                locale={ko}
                showOutsideDays
                classNames={{
                  root: 'shadow-lg p-4 bg-gray-800 rounded-xl text-sm',
                  month_caption: 'text-center font-bold',
                  selected: `bg-blue-500`,
                  nav: 'absolute left-0 px-4 flex justify-between w-full',
                  chevron: `w-4 fill-blue-500`,
                  weekday: 'font-bold py-4 text-xs text-center',
                  day: 'p-1 text-center rounded-full overflow-hidden',
                  day_button: 'inline-flex justify-center w-[24px] h-[24px]',
                  outside: 'opacity-50',
                }}
                {...props}
              />
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </>
  )
}
