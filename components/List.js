import Box from './Box'
import Grid from './Grid'

function List({ label, title, apps }) {
  return (
    <Box>
      <div className="bg-gray-200">
        <div className="py-8 px-5 font-bold">
          <div className="text-md text-gray-600">{label}</div>
          <div className="text-3xl">{title}</div>
        </div>
        <Grid items={apps} />
      </div>
    </Box>
  )
}

export default List
