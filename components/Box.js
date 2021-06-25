function Box({ children }) {
  return (
    <div className="overflow-hidden relative w-full rounded-lg shadow-lg mt-4">
      <style jsx>{`
        .mt-4:first-child {
          margin-top: 0;
        }
      `}</style>
      {children}
    </div>
  )
}

export default Box
