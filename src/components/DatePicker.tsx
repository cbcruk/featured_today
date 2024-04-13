import clsx from 'clsx'
import styles from './DatePicker.module.css'
import type { ComponentProps } from 'react'

type Props = ComponentProps<'input'>

export function DatePicker({ onChange, ...props }: Props) {
  return (
    <label className="relative text-xl self-end">
      🗓️
      <input
        data-testid="input"
        type="date"
        className={clsx([
          'absolute top-0 left-0 w-full opacity-0',
          styles.input,
        ])}
        onChange={onChange}
        {...props}
      />
    </label>
  )
}
