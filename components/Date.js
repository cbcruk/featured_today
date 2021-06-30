function DatePicker({ children, onChange }) {
  return (
    <label className="relative">
      <style jsx>{`
        input[type='date']::-webkit-datetime-edit {
          display: none;
        }
        input[type='date']::-webkit-calendar-picker-indicator {
          width: 100%;
          margin-left: 0;
        }
      `}</style>
      {children}
      <input
        type="date"
        className="absolute top-0 left-0 w-full opacity-0"
        onChange={onChange}
      />
    </label>
  )
}

export default DatePicker
