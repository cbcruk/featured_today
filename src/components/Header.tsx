import type { ComponentProps, PropsWithChildren } from 'react'
import { navigate } from 'astro:transitions/client'
import { DatePicker as DatePickerPrimitive } from './DatePicker'
import dayjs from 'dayjs'

export function Header({ children }: PropsWithChildren) {
  return (
    <header className="flex justify-between py-4 pb-0 pt-0">{children}</header>
  )
}

function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="flex items-end gap-2 relative font-bold text-2xl">
      <a href="/">투데이</a>
      <span className="text-gray-500 font-medium text-sm">{children}</span>
    </h1>
  )
}

type DatePicker = ComponentProps<typeof DatePickerPrimitive>

function DatePicker(props: Pick<DatePicker, 'defaultMonth'>) {
  return (
    <DatePickerPrimitive
      mode="single"
      defaultMonth={props.defaultMonth}
      selected={props.defaultMonth}
      onSelect={(value) => {
        const date = dayjs(value).format('YYYY-MM-DD')

        navigate(`/featured/${date}/`)
      }}
    />
  )
}

Header.Title = Title
Header.DatePicker = DatePicker
