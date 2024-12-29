import clsx from 'clsx'
import styles from './Body.module.css'
import type { PropsWithChildren } from 'react'

export function Body({ children }: PropsWithChildren) {
  return <div className={clsx(['flex flex-wrap', styles.body])}>{children}</div>
}
