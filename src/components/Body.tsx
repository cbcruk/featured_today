import clsx from 'clsx'
import styles from './Body.module.css'

export function Body({ children }) {
  return <div className={clsx(['flex flex-wrap', styles.body])}>{children}</div>
}
