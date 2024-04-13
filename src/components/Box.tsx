import clsx from 'clsx'
import styles from './Box.module.css'
import type { ComponentProps } from 'react'

function Box({ style, children }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx([
        'overflow-hidden relative w-full rounded-lg shadow-lg mt-4',
        styles.wrapper,
      ])}
      style={style}
    >
      {children}
    </div>
  )
}

export default Box
