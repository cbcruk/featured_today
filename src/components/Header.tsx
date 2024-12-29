import type { PropsWithChildren } from 'react'
import { navigate } from 'astro:transitions/client'
import { DatePicker as DatePickerPrimitive } from './DatePicker'

export function Header({ children }: PropsWithChildren) {
  return <header className="flex justify-between py-4 pt-0">{children}</header>
}

function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="flex items-end gap-2 relative font-bold text-2xl">
      투데이
      <span className="text-gray-500 font-medium text-sm">{children}</span>
    </h1>
  )
}

function DatePicker() {
  return (
    <DatePickerPrimitive
      min="2021-05-30"
      max="2022-10-01"
      onChange={(e) => {
        navigate(`/featured/${e.target.value}/`)
      }}
    />
  )
}

Header.Title = Title
Header.DatePicker = DatePicker
