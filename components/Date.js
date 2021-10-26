import clsx from 'clsx'
import styles from './Date.module.css'

function DatePicker({ children, onChange }) {
  return (
    <label className="relative">
      {children}
      <input
        type="date"
        className={clsx([
          'absolute top-0 left-0 w-full opacity-0',
          styles.input,
        ])}
        onChange={onChange}
      />
    </label>
  )
}

export default DatePicker
